"use client";

import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/Counter";

export function Metric({ value, unit, label }: { value: string; unit: string; label: string }) {
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
      className="my-8 inline-flex flex-col border-3 border-black bg-[#ffe600] p-5 shadow-[5px_5px_0px_#000] text-black"
    >
      <span className="font-display text-4xl sm:text-5xl font-black text-black">
        <Counter value={value} active={active} />
        <span className="ml-2 font-mono text-sm font-bold text-black/70">{unit}</span>
      </span>
      <span className="mt-1.5 font-mono text-xs font-black uppercase tracking-wider text-black">
        {label}
      </span>
    </div>
  );
}
