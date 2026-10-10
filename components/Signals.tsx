"use client";

import { useEffect, useRef, useState } from "react";
import { signals } from "@/content/experience";
import { RevealText } from "@/components/RevealText";
import { Counter } from "@/components/Counter";

const CARD_COLORS = [
  "bg-[#ffe600]", // Yellow
  "bg-[#00f0ff]", // Cyan
  "bg-[#ff66c4]", // Pink
  "bg-[#a6ff00]", // Lime
];

export function Signals() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="signals" ref={ref} className="relative border-t-4 border-black px-4 py-20 sm:px-6 lg:px-10 overflow-hidden bg-[#faf8f5]">
      {/* Background Frame Treatment: Staggered Polka Dots & Geometric Retro Sparkles */}
      <div className="pointer-events-none absolute inset-0 bg-pattern-polka opacity-75" aria-hidden="true" />
      <div className="pointer-events-none absolute left-8 bottom-6 select-none font-mono text-8xl font-black uppercase text-black/[0.03]">
        DATA.PULSE
      </div>
      <div className="pointer-events-none absolute right-12 top-10 font-mono text-2xl text-black/15 select-none hidden sm:block">
        ✦ &nbsp; ✖ &nbsp; ✦
      </div>

      <div className="relative z-10">
        <div className="mb-4 inline-block rotate-1">
          <span className="border-2 border-black bg-[#ff5964] px-3.5 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000]">
            05 // SIGNALS & STATS
          </span>
        </div>

        <RevealText
          as="h2"
          lines={["Signals"]}
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight text-black"
        />
        <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-black/70">
          Quantified proof of work & verified outputs
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map((s, idx) => {
          const bg = CARD_COLORS[idx % CARD_COLORS.length];
          return (
            <div
              key={s.label}
              className={`border-3 border-black ${bg} p-6 shadow-[6px_6px_0px_#000] text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#000]`}
            >
              <div className="flex items-center justify-between">
                <span className="border-2 border-black bg-white px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                  #{idx + 1}
                </span>
                <span className="h-2 w-2 border border-black bg-black" />
              </div>

              <div className="font-display mt-5 text-5xl sm:text-6xl font-black text-black tracking-tight">
                <Counter value={s.value} active={active} />
                {s.value === "300" && "+"}
              </div>

              <p className="mt-3 font-mono text-sm font-black uppercase tracking-wide text-black">
                {s.label}
              </p>
              <p className="mt-1 font-mono text-xs font-bold text-black/70">
                {s.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
