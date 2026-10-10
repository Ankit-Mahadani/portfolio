"use client";

import { useState } from "react";

export function CodeCompare({
  leftTitle = "PyTorch (Boilerplate)",
  leftBadge = "35+ LINES",
  leftCode,
  rightTitle = "Neuva (Pure ML Syntax)",
  rightBadge = "5 LINES",
  rightCode,
}: {
  leftTitle?: string;
  leftBadge?: string;
  leftCode: string;
  rightTitle?: string;
  rightBadge?: string;
  rightCode: string;
}) {
  const [copied, setCopied] = useState<"left" | "right" | null>(null);

  const copy = (text: string, side: "left" | "right") => {
    navigator.clipboard.writeText(text);
    setCopied(side);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="my-10 w-full space-y-3">
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
          Boilerplate Comparison: Standard PyTorch vs. Neuva
        </span>
        <span className="border border-black bg-[#ffe600] px-2 py-0.5 font-mono text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
          85% Less Code
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: PyTorch */}
        <div className="border-3 border-black bg-[#18181b] shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between border-b-2 border-black bg-[#27272a] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-black bg-[#ff5964]" />
              <span className="font-mono text-xs font-black uppercase tracking-wide text-white">
                {leftTitle}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="border border-black bg-[#ff5964] px-1.5 py-0.5 font-mono text-[10px] font-black text-black">
                {leftBadge}
              </span>
              <button
                type="button"
                onClick={() => copy(leftCode, "left")}
                className="border border-black bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-white hover:bg-white/20"
              >
                {copied === "left" ? "COPIED" : "COPY"}
              </button>
            </div>
          </div>
          <pre className="max-h-[460px] overflow-auto p-4 font-mono text-xs leading-relaxed text-[#d4d4d8] select-text">
            <code>{leftCode}</code>
          </pre>
        </div>

        {/* Right: Neuva */}
        <div className="border-3 border-black bg-[#0e1726] shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between border-b-2 border-black bg-[#00f0ff] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-black bg-[#a6ff00]" />
              <span className="font-mono text-xs font-black uppercase tracking-wide text-black">
                {rightTitle}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="border border-black bg-[#a6ff00] px-1.5 py-0.5 font-mono text-[10px] font-black text-black shadow-[1px_1px_0px_#000]">
                {rightBadge}
              </span>
              <button
                type="button"
                onClick={() => copy(rightCode, "right")}
                className="border border-black bg-black px-2 py-0.5 font-mono text-[10px] font-bold text-white hover:bg-[#ffe600] hover:text-black"
              >
                {copied === "right" ? "COPIED" : "COPY"}
              </button>
            </div>
          </div>
          <pre className="max-h-[460px] overflow-auto p-4 font-mono text-xs leading-relaxed text-[#e0f2fe] select-text">
            <code>{rightCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
