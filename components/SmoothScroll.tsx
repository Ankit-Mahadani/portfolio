"use client";

import { useEffect } from "react";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = createLenis();
    const { ScrollTrigger } = getGsap();
    lenis.on("scroll", ScrollTrigger.update);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      destroyLenis();
    };
  }, [reduced]);

  return null;
}
