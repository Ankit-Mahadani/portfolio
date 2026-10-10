"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { reducedMotionNow } from "@/lib/motion";

type RevealTextProps = {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  stagger?: number;
  scrub?: boolean;
};

export function RevealText({
  lines,
  as: Tag = "div",
  className = "",
  stagger = 0.06,
  scrub = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const spans = root.querySelectorAll<HTMLElement>("[data-line]");

    if (reducedMotionNow()) {
      spans.forEach((s) => (s.style.transform = "translateY(0)"));
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    gsap.set(spans, { yPercent: 110 });

    const tween = gsap.to(spans, {
      yPercent: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger,
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger]);

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span data-line style={{ willChange: "transform" }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
