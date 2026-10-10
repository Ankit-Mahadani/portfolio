"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

type Hotspot = { x: number; y: number; label: string };

export function AnnotateHotspots({
  src,
  alt,
  exists,
  expectedPath,
  hotspots,
}: {
  src?: string;
  alt: string;
  exists: boolean;
  expectedPath: string;
  hotspots: Hotspot[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="my-10">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-3 border-black bg-white shadow-[6px_6px_0px_#000]">
        {exists && src ? (
          <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-black/40 bg-[#faf8f5] p-6 text-center">
            <span className="border border-black bg-[#ffe600] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black">
              UI ANNOTATION — ASSET PENDING
            </span>
            <span className="font-mono text-xs font-bold text-black break-all">{expectedPath}</span>
          </div>
        )}

        {hotspots.map((h, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-label={`Annotation ${i + 1}: ${h.label}`}
            data-cursor="OPEN"
            className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-black bg-[#ffe600] font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000] hover:bg-[#ff66c4] transition-colors"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <ol className="mt-5 space-y-2.5">
        {hotspots.map((h, i) => (
          <Reveal
            key={i}
            as="li"
            delay={i * 60}
            className={`border-2 border-black p-3 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000] transition-colors ${
              openIndex === i ? "bg-[#ffe600]" : "bg-white"
            }`}
          >
            <span className="mr-2 inline-block border border-black bg-black text-white px-1.5 py-0.2 text-[10px]">
              #{i + 1}
            </span>
            <span>{h.label}</span>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
