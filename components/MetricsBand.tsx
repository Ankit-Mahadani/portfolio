"use client";

import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/Counter";
import type { Metric } from "@/lib/schema";

export function MetricsBand({ metrics }: { metrics: Metric[] }) {
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="full-bleed my-14 border-y-4 border-black bg-[#00f0ff] px-4 py-10 sm:px-6 lg:px-10 shadow-[0_4px_0px_#000]"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="border-3 border-black bg-white p-6 shadow-[5px_5px_0px_#000] text-center sm:text-left"
          >
            <div className="font-display text-4xl sm:text-5xl font-black text-black">
              <Counter value={m.value} active={active} />
              <span className="ml-2 font-mono text-sm font-bold text-black/60">{m.unit}</span>
            </div>
            <p className="mt-2 font-mono text-xs font-black uppercase tracking-wider text-black">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
