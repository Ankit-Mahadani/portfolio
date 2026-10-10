"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only disable custom cursor if it's strictly a pure touch-only mobile screen
    const isTouchOnly =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(any-pointer: fine)").matches;

    if (isTouchOnly) return;

    document.documentElement.classList.add("cursor-none-js");

    let dotX = -200;
    let dotY = -200;
    let glowX = -200;
    let glowY = -200;
    let targetX = -200;
    let targetY = -200;
    let initialized = false;
    let raf = 0;

    const move = (e: MouseEvent) => {
      if (!initialized) {
        dotX = e.clientX;
        dotY = e.clientY;
        glowX = e.clientX;
        glowY = e.clientY;
        targetX = e.clientX;
        targetY = e.clientY;
        initialized = true;
      } else {
        const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
        if (target) {
          const rect = target.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const pull = 6;
          targetX = cx + Math.max(-pull, Math.min(pull, e.clientX - cx));
          targetY = cy + Math.max(-pull, Math.min(pull, e.clientY - cy));
          setLabel(target.dataset.cursor ?? "");
        } else {
          targetX = e.clientX;
          targetY = e.clientY;
          setLabel("");
        }
      }
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const loop = () => {
      // 1. Black dot moves directly with cursor
      dotX += (targetX - dotX) * 0.85;
      dotY += (targetY - dotY) * 0.85;

      // 2. Yellow glow trails smoothly behind the dot
      const dx = dotX - glowX;
      const dy = dotY - glowY;
      const dist = Math.hypot(dx, dy);
      const maxOffset = 55; // Strict limit: dot can never leave the yellow glow halo

      glowX += dx * 0.18;
      glowY += dy * 0.18;

      // Hard clamp so the dot never escapes the glow even during rapid sweeps
      if (dist > maxOffset) {
        const angle = Math.atan2(dy, dx);
        glowX = dotX - Math.cos(angle) * maxOffset;
        glowY = dotY - Math.sin(angle) * maxOffset;
      }

      // Apply transforms
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-js");
    };
  }, []);

  return (
    <>
      {/* 1. Trailing Yellow Halo Glow (fluidly follows behind the dot) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[99998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className="h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 230, 0, 0.55) 0%, rgba(255, 215, 0, 0.25) 35%, rgba(255, 230, 0, 0.08) 55%, transparent 72%)",
          }}
        />
      </div>

      {/* 2. Direct Black Dot Cursor (snaps 1:1 with mouse) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[99999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="relative flex items-center justify-center">
          <span className="block h-3 w-3 rounded-full bg-black shadow-[0_0_1px_rgba(0,0,0,0.9)] ring-1 ring-white/50" />

          {/* Action Badge (when hovering elements with data-cursor) */}
          {label && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap border-2 border-black bg-[#ffe600] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
