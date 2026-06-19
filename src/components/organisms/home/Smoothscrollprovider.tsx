"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: isMobile ? 0 : 2.2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      const smoother = smootherRef.current;

      smoother.effects("img[data-speed='auto']", { speed: "auto" });

      const headings = gsap.utils.toArray<HTMLElement>(".js-title").reverse();
      headings.forEach((heading, i) => {
        const headingIndex = i + 1;
        const split = new SplitText(heading, { type: "chars" });
        split.chars.forEach((char, j) => {
          smoother.effects(char as HTMLElement, {
            lag: (j + headingIndex) * 0.1,
            speed: 1,
          });
        });
      });

      const splitTargets = gsap.utils.toArray<HTMLElement>(
        ".js-splittext-lines",
      );
      if (splitTargets.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: splitTargets,
            start: "top 90%",
            end: "bottom 60%",
            scrub: 2,
            toggleActions: "play none play reset",
          },
        });
        const itemSplit = new SplitText(splitTargets, { type: "lines" });
        tl.from(itemSplit.lines, {
          y: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.inOut",
        });
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      style={{
        overflow: "hidden",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <div id="smooth-content">{children}</div>
    </div>
  );
}

export default SmoothScrollProvider;
