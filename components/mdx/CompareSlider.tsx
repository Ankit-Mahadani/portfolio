"use client";

import Image from "next/image";
import { useState } from "react";

type Side = {
  src?: string;
  alt: string;
  exists: boolean;
  expectedPath: string;
};

export function CompareSlider({ before, after }: { before: Side; after: Side }) {
  const [pct, setPct] = useState(50);

  return (
    <div className="my-10 w-full">
      <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl select-none overflow-hidden border-3 border-black bg-white shadow-[6px_6px_0px_#000]">
        <div className="absolute inset-0">
          <Frame side={before} />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <Frame side={after} />
        </div>

        <div
          className="absolute inset-y-0 z-10 flex w-6 -translate-x-1/2 items-center justify-center"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        >
          <div className="h-full w-1 bg-black" />
          <div className="absolute flex h-9 w-9 items-center justify-center border-2 border-black bg-[#ffe600] font-mono text-xs font-black text-black shadow-[2px_2px_0px_#000]">
            ↔
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Reveal after image"
          data-cursor="DRAG"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="mt-3 flex justify-between font-mono text-xs font-black uppercase">
        <span className="border-2 border-black bg-[#00f0ff] px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
          BEFORE
        </span>
        <span className="border-2 border-black bg-[#a6ff00] px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
          AFTER
        </span>
      </div>
    </div>
  );
}

function Frame({ side }: { side: Side }) {
  if (!side.exists || !side.src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-black/40 bg-[#faf8f5] p-6 text-center">
        <span className="border border-black bg-[#ffe600] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black">
          ASSET PENDING
        </span>
        <span className="font-mono text-xs font-bold text-black break-all">{side.expectedPath}</span>
      </div>
    );
  }
  return <Image src={side.src} alt={side.alt} fill sizes="100vw" style={{ objectFit: "cover" }} />;
}
