// hooks/useScrollReveal.ts
"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up gsap-reveal-heading / gsap-reveal-para / gsap-card-group /
 * gsap-slide-left / gsap-slide-right / gsap-blob-up / gsap-blob-down
 * animations, scoped to a single section's own ref.
 *
 * This replaces the equivalent global document-wide queries that used to
 * live in SmoothScrollProvider. Because it runs in this section's own
 * useEffect, it can never touch a sibling section that hasn't hydrated yet.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const triggers: ScrollTrigger[] = [];

    const reveal = (
      selector: string,
      from: gsap.TweenVars,
      to: gsap.TweenVars,
      start = "top 85%",
    ) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const tween = gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
    };

    reveal(
      ".gsap-reveal-heading",
      { y: 55, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      },
    );

    reveal(
      ".gsap-reveal-para",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
      "top 88%",
    );

    root.querySelectorAll<HTMLElement>(".gsap-card-group").forEach((group) => {
      const tween = gsap.fromTo(
        group.children,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    reveal(
      ".gsap-slide-left",
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
      "top 82%",
    );

    reveal(
      ".gsap-slide-right",
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
      "top 80%",
    );

    const parallax = (selector: string, y: number) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const section = el.closest("section") ?? el.parentElement;
        const tween = gsap.to(el, {
          y,
          ease: "none",
          scrollTrigger: {
            trigger: section ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
    };

    parallax(".gsap-blob-up", -80);
    parallax(".gsap-blob-down", 50);

    // ScrollSmoother/ScrollTrigger may already be running by the time this
    // section mounts — refresh so positions account for these new triggers.
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [containerRef]);
}
