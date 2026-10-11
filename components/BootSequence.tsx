"use client";

import { useEffect, useState } from "react";
import { reducedMotionNow } from "@/lib/motion";

const GREETINGS = [
  { text: "Hello", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "নমস্কার", lang: "Bengali" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "Ciao", lang: "Italian" },
  { text: "Olá", lang: "Portuguese" },
];

const STEP_INTERVAL_MS = 190;

export function BootSequence() {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (reducedMotionNow()) {
      setIsDone(true);
      return;
    }

    // Lock page scroll during the intro
    document.body.style.overflow = "hidden";

    // Cycle through greetings
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Wait slightly on the last word, then slide curtain up
          setTimeout(() => {
            setIsExiting(true);
          }, 240);
          return prev;
        }
      });
    }, STEP_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  // Unlock scroll when exit animation completes
  const handleTransitionEnd = () => {
    if (isExiting) {
      document.body.style.overflow = "";
      setIsDone(true);
    }
  };

  if (isDone) return null;

  const current = GREETINGS[index]!;

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      aria-hidden="true"
      className="fixed inset-0 z-[999999] flex flex-col justify-between bg-[#111113] p-8 sm:p-12 text-white select-none pointer-events-auto"
      style={{
        transform: isExiting ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)",
        willChange: "transform",
      }}
    >
      {/* Background Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Header Label */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-widest text-white/50">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ffe600] animate-ping" />
          <span>PORTFOLIO // 2026</span>
        </div>
        <span>ANKIT MAHADANI</span>
      </div>

      {/* Center Multilingual Greeting Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="flex items-center justify-center">
          <span className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#ffe600] mr-4 sm:mr-6 animate-pulse" />
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none min-h-[1.2em] flex items-center">
            {current.text}
          </h1>
        </div>

        {/* Language Subtitle */}
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-white/70">
            {current.lang}
          </span>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] font-semibold text-white/40 uppercase">
        <span>AI &amp; AUTOMATION SYSTEMS</span>
        <span>LOADING EXPERIENCE...</span>
      </div>
    </div>
  );
}
