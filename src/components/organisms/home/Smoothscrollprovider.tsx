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
    // Small guard: wait one frame so the DOM is fully painted
    const raf = requestAnimationFrame(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // ── 1. Create the smoother ────────────────────────────────────────────
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: isMobile ? 0 : 2.2, // seconds to "catch up" (your ref uses 3)
        effects: true, // honour data-speed / data-lag attrs
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      const smoother = smootherRef.current;

      // ── 2. Auto-parallax on every <img> (data-speed="auto") ──────────────
      smoother.effects("img[data-speed='auto']", { speed: "auto" });

      // ── 3. js-title: SplitText char-level lag (the "Smoother" word effect) ─
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

      // ── 4. js-splittext-lines: scroll-scrubbed line reveal ────────────────
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

      // ── 5. Section heading reveal (all .gsap-reveal-heading) ─────────────
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 55, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── 6. Paragraph reveals ─────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-para").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── 7. Card stagger groups (.gsap-card-group > children) ─────────────
      gsap.utils.toArray<HTMLElement>(".gsap-card-group").forEach((group) => {
        const cards = group.children;
        gsap.fromTo(
          cards,
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
      });

      // ── 8. Slide-in from left (.gsap-slide-left) ─────────────────────────
      gsap.utils.toArray<HTMLElement>(".gsap-slide-left").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── 9. Slide-in from right (.gsap-slide-right) ───────────────────────
      gsap.utils.toArray<HTMLElement>(".gsap-slide-right").forEach((el) => {
        gsap.fromTo(
          el,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── 10. Ambient blob parallax (.gsap-blob-up / .gsap-blob-down) ──────
      gsap.utils.toArray<HTMLElement>(".gsap-blob-up").forEach((el) => {
        const section = el.closest("section") ?? el.parentElement;
        gsap.to(el, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: section ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".gsap-blob-down").forEach((el) => {
        const section = el.closest("section") ?? el.parentElement;
        gsap.to(el, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: section ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    // The wrapper must be position:fixed + overflow:hidden so ScrollSmoother
    // can intercept native scroll and drive its own synthetic scroll position.
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
