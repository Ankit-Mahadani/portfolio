"use client";

import { useEffect, useState } from "react";
import { reducedMotionNow } from "@/lib/motion";

const KEY = "run-rail-booted";
const MAX_MS = 800;

export function BootSequence() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alreadyBooted = true;
    try {
      alreadyBooted = sessionStorage.getItem(KEY) === "1";
    } catch {
      alreadyBooted = false;
    }

    if (alreadyBooted || reducedMotionNow()) {
      setDone(true);
      return;
    }

    setShow(true);
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, MAX_MS);
      setCount(Math.round((elapsed / MAX_MS) * 100));
      if (elapsed >= MAX_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const finish = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* harmless */
      }
      setCount(100);
      window.setTimeout(() => setDone(true), 200);
    };

    const skip = () => {
      cancelAnimationFrame(raf);
      finish();
    };

    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  if (!show || done) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf8f5] p-4 transition-opacity duration-200"
      style={{ opacity: count >= 100 ? 0 : 1 }}
      role="status"
      aria-label="Loading"
    >
      <div className="relative w-full max-w-sm border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#000] text-center">
        <span className="absolute -top-3.5 left-4 -rotate-2 border-2 border-black bg-[#ff66c4] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
          INIT // KERNEL
        </span>

        <h3 className="font-mono text-sm font-black uppercase tracking-wider text-black mt-1">
          BOOTING ANKIT.DEV
        </h3>

        <div className="mt-4 h-6 w-full border-3 border-black bg-[#faf8f5] p-0.5 shadow-[2px_2px_0px_#000]">
          <div
            className="h-full bg-[#ffe600] border-r-2 border-black transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-xs font-black text-black">
          <span>LOADING MODULES</span>
          <span className="tabular-nums">{count}%</span>
        </div>
      </div>
    </div>
  );
}
