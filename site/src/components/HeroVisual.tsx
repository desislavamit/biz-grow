"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Dictionary } from "@/i18n/types";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroVisual({ hero }: { hero: Dictionary["hero"] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const art = artRef.current;
    if (!frame || !art || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        art.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      art.style.transform = "";
    };

    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const value = hero.overlayValue;

  useEffect(() => {
    const el = countRef.current;
    if (!el || prefersReducedMotion()) return;

    const target = value;
    const duration = 1600;
    let raf = 0;
    let start = 0;
    el.textContent = "0";

    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        raf = requestAnimationFrame(tick);
      }
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(target);
    };
  }, [value]);

  return (
    <div className="enter relative mb-12 sm:mb-14" style={{ "--enter-delay": "200ms" } as CSSProperties}>
      <div className="float relative">
        <div
          ref={frameRef}
          className="relative aspect-[1436/1074] overflow-hidden rounded-visual bg-art-bg shadow-visual ring-1 ring-white/70"
        >
          <div ref={artRef} className="absolute inset-0 scale-[1.03] transition-transform duration-700 ease-out-soft">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized WebP */}
            <img
              src={hero.imageSrc}
              alt={hero.imageAlt}
              width={1436}
              height={1074}
              fetchPriority="high"
              className="size-full object-cover"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-visual bg-[linear-gradient(160deg,rgb(255_255_255/0.1),transparent_40%)]"
          />
        </div>

        {/* Sits in the banner's empty bottom strip so it never covers the banner's labels. */}
        <div className="glass absolute top-[calc(100%-16px)] -left-3 rounded-overlay px-4 py-3 shadow-card sm:top-[calc(100%-24px)] sm:-left-6 sm:px-5 sm:py-3.5">
          <p className="text-[0.78rem] font-medium text-ink-muted sm:text-[0.82rem]">{hero.overlayLabel}</p>
          <p className="mt-0.5 flex items-baseline gap-1.5">
            <span className="font-serif text-[1.6rem] leading-none font-medium text-ink tabular-nums sm:text-[1.85rem]">
              <span ref={countRef} aria-hidden>
                {hero.overlayValue}
              </span>
              <span className="sr-only">{hero.overlayValue}</span>
            </span>
            <span className="font-serif text-[0.95rem] font-medium text-blue-dot">{hero.overlayUnit}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
