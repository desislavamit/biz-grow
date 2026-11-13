#!/usr/bin/env bash
# Build the static site at site root (/) and publish only the contents of site/out
# to https://github.com/desislavamit/bizgrow-pub (main).
# The token is read into GH_TOKEN for this process. It is never written into a
# remote URL, git config, or this script.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TOKEN_FILE="${BIZGROW_TOKEN_FILE:-$ROOT/githubtoken.rtf}"
REMOTE="https://github.com/desislavamit/bizgrow-pub.git"

if [[ ! -f "$TOKEN_FILE" ]]; then
  echo "Token file not found: $TOKEN_FILE" >&2
  exit 1
fi

GH_TOKEN="$(
  python3 - "$TOKEN_FILE" << 'PY'
import re, subprocess, sys
from pathlib import Path
path = Path(sys.argv[1])
if path.suffix.lower() == ".rtf":
    raw = subprocess.check_output(["textutil", "-convert", "txt", "-stdout", str(path)])
else:
    raw = path.read_bytes()
match = re.search(r"(github_pat_[A-Za-z0-9_]+|ghp_[A-Za-z0-9]+)", raw.decode("utf-8", "replace"))
if not match:
    sys.exit(2)
sys.stdout.write(match.group(1))
PY
)"
export GH_TOKEN

WORKDIR="$(mktemp -d "${TMPDIR:-/tmp}/bizgrow-pub.XXXXXX")"
ASKPASS="$(mktemp "${TMPDIR:-/tmp}/bizgrow-askpass.XXXXXX")"
cleanup() {
  rm -rf "$WORKDIR"
  rm -f "$ASKPASS"
  unset GH_TOKEN
}
trap cleanup EXIT

cat > "$ASKPASS" << 'EOF'
#!/bin/sh
case "$1" in
  *[Uu]sername*) printf '%s\n' 'x-access-token' ;;
  *) printf '%s\n' "$GH_TOKEN" ;;
esac
EOF
chmod 700 "$ASKPASS"

git_auth() {
  GIT_ASKPASS="$ASKPASS" GIT_TERMINAL_PROMPT=0 git -c credential.helper= "$@"
}

python3 - << 'PY'
import json, os, sys, urllib.error, urllib.request
token = os.environ["GH_TOKEN"]

def call(method, url, body=None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": "Bearer " + token,
            "Accept": "application/vnd.github+json",
            "User-Agent": "bizgrow-push-out",
            "X-GitHub-Api-Version": "2022-11-28",
            **({"Content-Type": "application/json"} if body is not None else {}),
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            return resp.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as err:
        raw = err.read().decode("utf-8", "replace")
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = {"message": f"HTTP {err.code}"}
        return err.code, payload

status, repo = call("GET", "https://api.github.com/repos/desislavamit/bizgrow-pub")
if status == 200:
    print(f"repo_exists {repo.get('full_name')} {repo.get('visibility')}")
elif status == 404:
    status, created = call(
        "POST",
        "https://api.github.com/user/repos",
        {
            "name": "bizgrow-pub",
            "private": False,
            "auto_init": False,
            "description": "Built BizGrow site. Contents of site/out at the repository root.",
        },
    )
    if status not in (200, 201):
        print(f"repo_create_failed {status} {created.get('message')}", file=sys.stderr)
        for item in created.get("errors") or []:
            if isinstance(item, dict):
                print(f"error {item.get('field')} {item.get('code')} {item.get('message')}", file=sys.stderr)
        sys.exit(1)
    print(f"repo_created {created.get('html_url')} {created.get('visibility')}")
else:
    print(f"repo_lookup_failed {status} {repo.get('message')}", file=sys.stderr)
    sys.exit(1)

PY

HAS_MAIN="$(python3 - << 'PY'
import os, urllib.error, urllib.request
token = os.environ["GH_TOKEN"]
req = urllib.request.Request(
    "https://api.github.com/repos/desislavamit/bizgrow-pub/commits/main",
    headers={
        "Authorization": "Bearer " + token,
        "Accept": "application/vnd.github+json",
        "User-Agent": "bizgrow-push-out",
        "X-GitHub-Api-Version": "2022-11-28",
    },
)
try:
    with urllib.request.urlopen(req) as resp:
        print("yes" if resp.status == 200 else "no")
except urllib.error.HTTPError as err:
    print("no" if err.code == 409 or err.code == 404 else "error")
    if err.code not in (404, 409):
        raise SystemExit(1)
PY
)"

echo "Building site/ without GITHUB_PAGES"
(
  cd "$ROOT/site"
  env -u GITHUB_PAGES npm run build
)

if [[ ! -f "$ROOT/site/out/index.html" || ! -f "$ROOT/site/out/en/index.html" ]]; then
  echo "Build did not produce site/out/index.html and site/out/en/index.html." >&2
  exit 1
fi
if grep -R -q --include='*.html' --include='*.css' --include='*.js' --fixed-string "/biz-grow/" "$ROOT/site/out"; then
  echo "Refusing to publish: this build still uses the /biz-grow prefix." >&2
  exit 1
fi
if [[ ! -f "$ROOT/site/out/.nojekyll" ]]; then
  echo "Refusing to publish: site/out is missing .nojekyll, so GitHub Pages would hide _next." >&2
  exit 1
fi
if grep -R -q --include='*.html' --fixed-string '"/_next/' "$ROOT/site/out"; then
  echo "Refusing to publish: HTML still points at root-absolute /_next assets." >&2
  exit 1
fi

cd "$WORKDIR"
git init -b main >/dev/null
git remote add origin "$REMOTE"

NAME="$(git -C "$ROOT" config --get user.name | tr -d '\n' || true)"
EMAIL="$(git -C "$ROOT" config --get user.email | tr -d '\n' || true)"
if [[ -n "$NAME" && -n "$EMAIL" ]]; then
  git config user.name "$NAME"
  git config user.email "$EMAIL"
fi

if [[ "$HAS_MAIN" == "yes" ]]; then
  git_auth fetch origin main
  git checkout -B main origin/main
fi

rsync -a --delete --filter 'protect .git/' --exclude '.DS_Store' "$ROOT/site/out/" "$WORKDIR/"

if find "$WORKDIR" \( -iname 'githubtoken*' -o -name '.env' -o -name '.env.*' \) -print | grep -q .; then
  echo "Refusing to publish: the build output contains a secret file." >&2
  exit 1
fi

git add -A
if git diff --cached --quiet; then
  echo "Published tree already matches site/out."
  echo "https://github.com/desislavamit/bizgrow-pub/commit/$(git rev-parse HEAD)"
  exit 0
fi

git commit -m "Publish the static site."
git_auth push -u origin main
echo "https://github.com/desislavamit/bizgrow-pub/commit/$(git rev-parse HEAD)"
echo "Remote: $REMOTE"
