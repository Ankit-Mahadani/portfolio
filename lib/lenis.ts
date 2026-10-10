"use client";

import Lenis from "lenis";

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

export function createLenis(): Lenis {
  if (instance) return instance;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  instance = new Lenis({
    lerp: isTouch ? 1 : 0.1,
    duration: 1.2,
    smoothWheel: !isTouch,
    syncTouch: false,
  });

  function raf(time: number) {
    instance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return instance;
}

export function destroyLenis() {
  instance?.destroy();
  instance = null;
}
