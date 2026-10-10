"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { reducedMotionNow } from "@/lib/motion";

type Step = { label: string; detail: string };

export function Trace({ steps }: { steps: Step[] }) {
  const lineRef = useRef<SVGLineElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const wrap = wrapRef.current;
    if (!line || !wrap) return;

    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;

    if (reducedMotionNow()) {
      line.style.strokeDashoffset = "0";
      return;
    }
    line.style.strokeDashoffset = `${length}`;

    const { gsap, ScrollTrigger } = getGsap();
    const tween = gsap.to(line, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [steps.length]);

  return (
    <div ref={wrapRef} className="my-12 w-full">
      <div className="relative">
        <svg
          className="absolute left-0 top-[14px] hidden h-1 w-full sm:block"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="2" x2="100%" y2="2" stroke="#000000" strokeWidth="3" />
          <line
            ref={lineRef}
            x1="0"
            y1="2"
            x2="100%"
            y2="2"
            stroke="#ffe600"
            strokeWidth="3"
          />
        </svg>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-[#ffe600] font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000]">
                  {i + 1}
                </span>
                <p className="font-mono text-xs font-black uppercase text-black">{step.label}</p>
              </div>
              <p className="text-xs font-medium text-black/80">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
