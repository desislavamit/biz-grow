// Rewrites host-absolute asset URLs in the static export so the same `out`
// folder works as the web root and from a subdirectory (GitHub project pages).
// The GITHUB_PAGES build keeps its `/biz-grow` prefix and is left untouched.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out");

if (process.env.GITHUB_PAGES === "1") {
  console.log("Skipping relative asset rewrite for the GitHub Pages build.");
  process.exit(0);
}

const assetSlash =
  /(?<![A-Za-z0-9.])\/(?=_next\/|favicon\.ico|icon\.png|apple-icon\.png|bizgrow-)/g;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && (entry.name.endsWith(".html") || entry.name.endsWith(".txt"))) files.push(full);
  }
  return files;
}

const files = await walk(outDir);
let rewritten = 0;

for (const file of files) {
  const depth = path.relative(outDir, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const rel = "../".repeat(depth);
  const original = await readFile(file, "utf8");
  let next = original.replace(assetSlash, rel);
  if (file.endsWith(".html") && !next.includes("TURBOPACK_CHUNK_BASE_PATH")) {
    const snippet = `<script>self.TURBOPACK_CHUNK_BASE_PATH=${JSON.stringify(`${rel}_next/`)}</script>`;
    if (!next.includes("<head>")) {
      throw new Error(`${path.relative(outDir, file)} has no <head>, so chunk URLs cannot be made relative.`);
    }
    next = next.replace("<head>", `<head>${snippet}`);
  }
  if (next !== original) {
    await writeFile(file, next);
    rewritten += 1;
  }
}

const index = await readFile(path.join(outDir, "index.html"), "utf8");
if (index.includes('"/_next/') || index.includes("href=\"/_next/") || index.includes("src=\"/_next/")) {
  throw new Error("index.html still has root-absolute /_next URLs.");
}
if (!index.includes('self.TURBOPACK_CHUNK_BASE_PATH="_next/"')) {
  throw new Error("index.html is missing the relative chunk base.");
}

console.log(`Rewrote asset URLs in ${rewritten} export files.`);
