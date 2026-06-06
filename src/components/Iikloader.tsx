"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface IIKLoaderProps {
  navLogoSelector?: string;
  onComplete?: () => void;
}

export default function IIKLoader({
  navLogoSelector = "#navbar-logo",
  onComplete,
}: IIKLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const logoMarkRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const overlay = overlayRef.current;
    const logoGroup = logoGroupRef.current;
    const logoMark = logoMarkRef.current;
    const brandText = brandTextRef.current;
    const pulse = pulseRef.current;

    if (!overlay || !logoGroup || !logoMark || !brandText || !pulse) return;

    document.body.style.overflow = "hidden";

    gsap.set(overlay, { opacity: 1, y: 0 });
    gsap.set(logoGroup, {
      x: 0,
      y: 32,
      opacity: 0,
      scale: 0.92,
      filter: "blur(14px)",
      transformOrigin: "center center",
    });
    gsap.set(logoMark, {
      x: -140,
      opacity: 0.35,
      scale: 0.9,
      filter: "blur(8px)",
      transformOrigin: "center center",
    });
    gsap.set(brandText, {
      x: 150,
      opacity: 0,
      filter: "blur(10px)",
      transformOrigin: "center center",
    });
    gsap.set(pulse, {
      opacity: 0,
      scale: 0.82,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(logoGroup, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.9,
    })
      .to(
        logoMark,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
        },
        0,
      )
      .to(
        brandText,
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
        },
        0.05,
      )
      .to(
        pulse,
        {
          opacity: 0.35,
          scale: 1.15,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        0.08,
      )
      .to({}, { duration: 0.45 })
      .to(
        brandText,
        {
          opacity: 0,
          y: -10,
          duration: 0.35,
          ease: "power2.inOut",
        },
        "fade",
      )
      .to(
        logoMark,
        {
          scale: 1.03,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "fade",
      )
      .add(() => {
        const navEl = document.querySelector<HTMLElement>(navLogoSelector);

        if (!navEl) {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              overlay.style.display = "none";
              document.body.style.overflow = "";
              onComplete?.();
            },
          });
          return;
        }

        const logoRect = logoGroup.getBoundingClientRect();
        const navRect = navEl.getBoundingClientRect();
        const dx =
          navRect.left +
          navRect.width / 2 -
          (logoRect.left + logoRect.width / 2);
        const dy =
          navRect.top +
          navRect.height / 2 -
          (logoRect.top + logoRect.height / 2);
        const scaleTo = navRect.height / Math.max(logoRect.height, 1);

        gsap.to(logoGroup, {
          x: dx,
          y: dy,
          scale: scaleTo,
          duration: 0.95,
          ease: "power4.inOut",
        });
      })
      .to({}, { duration: 0.95 })
      .to(
        overlay,
        {
          y: "-100%",
          duration: 0.65,
          ease: "power3.inOut",
        },
        "<",
      )
      .add(() => {
        overlay.style.display = "none";
        document.body.style.overflow = "";
        onComplete?.();
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 overflow-hidden bg-white"
      role="status"
      aria-label="Loading Indians in Korea"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(251, 146, 60, 0.12), transparent 28%), radial-gradient(circle at bottom, rgba(19, 136, 8, 0.08), transparent 34%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/80 to-transparent" />
      <div
        ref={pulseRef}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={logoGroupRef}
          className="relative flex items-center gap-4 will-change-transform"
          style={{ transformOrigin: "center center" }}
        >
          <div
            ref={logoMarkRef}
            className="relative flex items-center justify-center rounded-3xl border border-white/90 bg-white/85 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 rounded-3xl border border-orange-100/70" />
            <Image
              src="/images/iik.png"
              alt="Indians in Korea Logo"
              width={84}
              height={84}
              priority
            />
          </div>

          <div
            ref={brandTextRef}
            className="flex flex-col leading-tight text-gray-800"
          >
            <span className="font-black text-[2.35rem] tracking-[0.28em] text-gray-800 whitespace-nowrap drop-shadow-sm">
              <span className="text-orange-600">INDIANS</span>
              {" IN "}
              <span className="text-[#138808]">KOREA</span>
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-400 whitespace-nowrap">
              Community · Culture · Connection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
