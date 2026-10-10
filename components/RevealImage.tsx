"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { reducedMotionNow } from "@/lib/motion";

type RevealImageProps = {
  src?: string;
  alt: string;
  exists: boolean;
  expectedPath?: string;
  kind?: "screenshot" | "diagram" | "photo" | "ui";
  focal?: string;
  priority?: boolean;
  aspect?: string;
  sizes?: string;
  transitionName?: string;
  fit?: "cover" | "contain";
  bg?: string;
};

export function RevealImage({
  src,
  alt,
  exists,
  expectedPath,
  kind = "screenshot",
  focal = "50% 50%",
  priority = false,
  aspect = "4 / 3",
  sizes = "100vw",
  transitionName,
  fit = "cover",
  bg,
}: RevealImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    if (reducedMotionNow()) {
      wrap.style.clipPath = "inset(0 0 0% 0)";
      inner.style.transform = "scale(1)";
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    gsap.set(wrap, { clipPath: "inset(0 0 100% 0)" });
    gsap.set(inner, { scale: 1.12 });

    const tween = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 90%",
        end: "top 45%",
        scrub: 1,
      },
    });
    tween.to(wrap, { clipPath: "inset(0 0 0% 0)", ease: "none" }, 0);
    tween.to(inner, { scale: 1, ease: "none" }, 0);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden border-2 border-black ${bg ?? (fit === "contain" ? "bg-[#141416]" : "bg-white")}`}
      style={{ aspectRatio: aspect, viewTransitionName: transitionName }}
    >
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        {exists && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            style={{ objectFit: fit, objectPosition: focal }}
          />
        ) : (
          <Placeholder path={expectedPath} kind={kind} alt={alt} />
        )}
      </div>
    </div>
  );
}

function Placeholder({ path, kind, alt }: { path?: string; kind: string; alt: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-black/40 bg-[#faf8f5] p-5 text-center">
      <span className="border border-black bg-[#ffe600] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[1px_1px_0px_#000]">
        {kind} — ASSET PENDING
      </span>
      <span className="font-mono text-[11px] font-bold text-black break-all">{path}</span>
      <span className="max-w-[34ch] text-xs font-medium text-black/70">{alt}</span>
    </div>
  );
}
