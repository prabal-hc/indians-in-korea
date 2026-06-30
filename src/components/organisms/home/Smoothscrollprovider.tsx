"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.75 : 1.05,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      syncTouch: true,
      touchMultiplier: 1.6,
      lerp: prefersReducedMotion ? 0.14 : 0.085,
    });

    setLenis(lenis);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number | string | HTMLElement) {
        if (arguments.length) {
          lenis.scrollTo(value as string | number | HTMLElement, {
            immediate: true,
          });
          return;
        }
        return lenis.scroll;
      },
      scrollLeft(value?: number | string | HTMLElement) {
        if (arguments.length) {
          lenis.scrollTo(value as string | number | HTMLElement, {
            immediate: true,
          });
          return;
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    let rafId = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      ScrollTrigger.refresh();
      setTimeout(() => lenis.resize(), 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrollProvider;
