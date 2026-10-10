"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
    gsap.defaults({ ease: "expo.out" });
    registered = true;
  }
  return { gsap, ScrollTrigger, Flip };
}
