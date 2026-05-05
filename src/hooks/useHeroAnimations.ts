"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const useHeroAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // TEXT ENTRY
      tl.from(textRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // VISUAL ENTRY
      tl.from(
        visualRef.current,
        {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // BACKGROUND FLOAT
      gsap.to(".hero-blob-1", {
        y: 40,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-blob-2", {
        y: -40,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef, textRef, visualRef };
};
