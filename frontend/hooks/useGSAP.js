"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(effect, deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    let ctx;
    try {
      ctx = gsap.context(effect, containerRef.current);
    } catch (e) {
      // safe fallback
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, deps);

  return containerRef;
}

export { gsap, ScrollTrigger };
