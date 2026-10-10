"use client";

import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/lenis";
import { reducedMotionNow } from "@/lib/motion";

export function Marquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);

  useEffect(() => {
    if (reducedMotionNow()) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const baseSpeed = 0.5;

    const loop = () => {
      const velocity = getLenis()?.velocity ?? 0;
      const speed = baseSpeed + Math.min(Math.abs(velocity) * 0.6, 6);
      offset.current -= speed;

      const width = track.scrollWidth / 2;
      if (Math.abs(offset.current) >= width) offset.current = 0;

      const skew = Math.max(-3, Math.min(3, velocity * -0.6));
      track.style.transform = `translate3d(${offset.current}px, 0, 0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  const content = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y-4 border-black bg-[#ffe600] py-3.5 shadow-[0_4px_0px_#000] -rotate-1 select-none"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max gap-8 whitespace-nowrap will-change-transform">
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-4 font-mono text-sm font-black uppercase text-black tracking-wider">
            <span>{item}</span>
            <span className="text-black/60 font-mono">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
