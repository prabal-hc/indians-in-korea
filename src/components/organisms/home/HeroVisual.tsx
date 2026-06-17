"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { AnnouncementItem } from "@/services/admin/announcements.service";
import Image from "next/image";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────────────────────
// ICON COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const MegaphoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 11v2a1 1 0 001 1h1l2 4h2l-1-4h8l2 2V7l-2 2H8L6 7H4a1 1 0 00-1 1v1"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NewsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      stroke="#0ea5e9"
      strokeWidth="1.8"
    />
    <path
      d="M7 8h10M7 12h6M7 16h4"
      stroke="#0ea5e9"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LIVE DOT
// ─────────────────────────────────────────────────────────────────────────────

const LiveDot = ({ color = "#ef4444" }: { color?: string }) => (
  <span
    style={{
      position: "relative",
      display: "inline-flex",
      width: 10,
      height: 10,
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: "absolute",
        inset: -2,
        borderRadius: "50%",
        border: `1px solid ${color}`,
        opacity: 0,
        animation: "livePingOuter 2s ease-in-out infinite",
      }}
    />
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: color,
        opacity: 0.4,
        animation: "livePing 1.6s ease-in-out infinite",
      }}
    />
    <span
      style={{
        position: "relative",
        borderRadius: "50%",
        width: 10,
        height: 10,
        background: color,
        boxShadow: `0 0 6px 1px ${color}55`,
        flexShrink: 0,
      }}
    />
    <style>{`
      @keyframes livePing {
        0%, 100% { transform: scale(1); opacity: 0.45; }
        50% { transform: scale(2.4); opacity: 0; }
      }
      @keyframes livePingOuter {
        0% { transform: scale(0.8); opacity: 0.6; }
        100% { transform: scale(2.8); opacity: 0; }
      }
    `}</style>
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// FLASH NEWS CARD
// ─────────────────────────────────────────────────────────────────────────────

const FlashNewsCard = ({
  label,
  headline,
  tag,
}: {
  label: string;
  headline: string;
  tag: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () =>
      gsap.to(el, {
        boxShadow:
          "0 16px 48px rgba(249,115,22,0.22), 0 4px 16px rgba(0,0,0,0.10)",
        y: -3,
        scale: 1.025,
        duration: 0.35,
        ease: "power2.out",
      });
    const onLeave = () =>
      gsap.to(el, {
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 18,
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
        border: "1px solid rgba(249,115,22,0.18)",
        padding: "10px 14px 10px 17px",
        minWidth: 210,
        maxWidth: 250,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background:
            "linear-gradient(180deg, #f97316 0%, #ef4444 50%, #f97316 100%)",
          backgroundSize: "100% 200%",
          borderRadius: "18px 0 0 18px",
          animation: "accentShimmer 2.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at top left, rgba(249,115,22,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 7,
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "white",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "2px 7px",
            borderRadius: 4,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.6,
            boxShadow: "0 2px 6px rgba(239,68,68,0.35)",
          }}
        >
          {label}
        </span>
        <LiveDot color="#ef4444" />
        <span
          style={{
            fontSize: 10,
            color: "#94a3b8",
            marginLeft: "auto",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {tag}
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 600,
          color: "#1e293b",
          lineHeight: 1.45,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {headline}
      </p>
      <style>{`
        @keyframes accentShimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TICKER CARD
// ─────────────────────────────────────────────────────────────────────────────

const TickerCard = ({ items, label }: { items: string[]; label: string }) => {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"visible" | "out" | "in">("visible");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setPhase("in");
        setTimeout(() => setPhase("visible"), 320);
      }, 320);
    }, 3200);
    return () => clearInterval(t);
  }, [items.length]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () =>
      gsap.to(el, {
        boxShadow:
          "0 14px 40px rgba(99,102,241,0.2), 0 4px 12px rgba(0,0,0,0.08)",
        y: -3,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    const onLeave = () =>
      gsap.to(el, {
        boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const textOpacity = phase === "visible" ? 1 : 0;
  const textY = phase === "out" ? -8 : phase === "in" ? 8 : 0;

  return (
    <div
      ref={cardRef}
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 16,
        boxShadow:
          "0 8px 28px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
        border: "1px solid rgba(99,102,241,0.18)",
        padding: "10px 13px",
        minWidth: 195,
        maxWidth: 235,
        cursor: "default",
        willChange: "transform",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at top right, rgba(99,102,241,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 7,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            borderRadius: 7,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 3px 10px rgba(99,102,241,0.35)",
          }}
        >
          <MegaphoneIcon />
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#6366f1",
            letterSpacing: "0.07em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {label}
        </span>
        <LiveDot color="#6366f1" />
      </div>
      <div
        style={{
          fontSize: 11.5,
          color: "#334155",
          lineHeight: 1.5,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 500,
          minHeight: 36,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          transition:
            "opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {items[idx]}
      </div>
      {items.length > 1 && (
        <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
          {items.map((_, i) => (
            <div
              key={i}
              style={{
                height: 3,
                width: i === idx ? 20 : 6,
                borderRadius: 2,
                background: i === idx ? "#6366f1" : "#e2e8f0",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                boxShadow: i === idx ? "0 0 6px rgba(99,102,241,0.4)" : "none",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BREAKING CARD
// ─────────────────────────────────────────────────────────────────────────────

const BreakingCard = ({ text, label }: { text: string; label: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () =>
      gsap.to(el, {
        boxShadow:
          "0 14px 36px rgba(14,165,233,0.2), 0 4px 12px rgba(0,0,0,0.08)",
        y: -3,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    const onLeave = () =>
      gsap.to(el, {
        boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 16,
        boxShadow:
          "0 8px 28px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
        border: "1px solid rgba(14,165,233,0.18)",
        padding: "10px 13px",
        minWidth: 178,
        maxWidth: 218,
        cursor: "default",
        willChange: "transform",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at bottom left, rgba(14,165,233,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            background: "#f0f9ff",
            borderRadius: 7,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(14,165,233,0.18)",
          }}
        >
          <NewsIcon />
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#0ea5e9",
            letterSpacing: "0.06em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {label}
        </span>
        <LiveDot color="#0ea5e9" />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 11.5,
          color: "#1e293b",
          lineHeight: 1.45,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 500,
          position: "relative",
        }}
      >
        {text}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT BLOB
// ─────────────────────────────────────────────────────────────────────────────

const AmbientBlob = ({
  color,
  size,
  style,
}: {
  color: string;
  size: number;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dur = 7 + Math.random() * 5;
    const xAmp = 18 + Math.random() * 14;
    const yAmp = 14 + Math.random() * 10;
    gsap.to(ref.current, {
      x: `+=${xAmp}`,
      y: `+=${yAmp}`,
      duration: dur,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(ref.current, {
      scale: 1.08 + Math.random() * 0.08,
      duration: dur * 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 2,
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(55px)",
        opacity: 0.28,
        pointerEvents: "none",
        willChange: "transform",
        ...style,
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR SPOTLIGHT
// ─────────────────────────────────────────────────────────────────────────────

const CursorSpotlight = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const spotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const spot = spotRef.current;
    if (!container || !spot) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const animate = () => {
      if (spot) {
        const cur = {
          x: parseFloat(spot.style.left) || 0,
          y: parseFloat(spot.style.top) || 0,
        };
        spot.style.left = `${cur.x + (posRef.current.x - cur.x) * 0.09}px`;
        spot.style.top = `${cur.y + (posRef.current.y - cur.y) * 0.09}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () =>
      gsap.to(spot, { opacity: 1, duration: 0.4, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(spot, { opacity: 0, duration: 0.6, ease: "power2.out" });

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return (
    <div
      ref={spotRef}
      style={{
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(155,180,255,0.13) 0%, rgba(100,150,255,0.06) 45%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 50,
        opacity: 0,
        willChange: "transform, left, top",
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED RINGS
// ─────────────────────────────────────────────────────────────────────────────

const AnimatedRings = ({ size }: { size: number }) => {
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const ring4Ref = useRef<HTMLDivElement>(null);
  const ring5Ref = useRef<HTMLDivElement>(null);
  const ring6Ref = useRef<HTMLDivElement>(null);
  const spinCWRef = useRef<HTMLDivElement>(null);
  const spinCCWRef = useRef<HTMLDivElement>(null);
  const spinCW2Ref = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ring1Ref.current, {
        scale: 1.055,
        opacity: 0.72,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(ring2Ref.current, {
        scale: 1.04,
        opacity: 0.48,
        duration: 3.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.7,
      });
      gsap.to(ring3Ref.current, {
        scale: 1.03,
        opacity: 0.22,
        duration: 4.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      });
      gsap.to(glowRingRef.current, {
        opacity: 0.18,
        scale: 1.06,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      const sonar = (el: HTMLDivElement | null, delay: number, dur: number) => {
        if (!el) return;
        gsap.set(el, { scale: 0.95, opacity: 0.5 });
        gsap.to(el, {
          scale: 1.62,
          opacity: 0,
          duration: dur,
          repeat: -1,
          ease: "power1.out",
          delay,
        });
      };
      sonar(ring4Ref.current, 0, 2.9);
      sonar(ring5Ref.current, 1.45, 3.1);
      sonar(ring6Ref.current, 2.2, 2.7);

      gsap.to(spinCWRef.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to(spinCCWRef.current, {
        rotation: -360,
        duration: 32,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to(spinCW2Ref.current, {
        rotation: 360,
        duration: 55,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    });
    return () => ctx.revert();
  }, []);

  const center: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    willChange: "transform, opacity",
  };

  return (
    <>
      <div
        ref={glowRingRef}
        style={{
          ...center,
          width: size * 1.55,
          height: size * 1.55,
          background:
            "radial-gradient(circle, transparent 42%, rgba(100,155,240,0.07) 65%, rgba(80,130,220,0.04) 80%, transparent 100%)",
          zIndex: 20,
          opacity: 0.12,
        }}
      />
      <div
        ref={ring4Ref}
        style={{
          ...center,
          width: size,
          height: size,
          border: "1.5px solid rgba(110,165,245,0.48)",
          zIndex: 24,
        }}
      />
      <div
        ref={ring5Ref}
        style={{
          ...center,
          width: size,
          height: size,
          border: "1.5px solid rgba(120,170,250,0.42)",
          zIndex: 24,
        }}
      />
      <div
        ref={ring6Ref}
        style={{
          ...center,
          width: size * 0.94,
          height: size * 0.94,
          border: "1px solid rgba(130,175,255,0.35)",
          zIndex: 24,
        }}
      />
      <div
        ref={spinCWRef}
        style={{
          ...center,
          width: size * 1.12,
          height: size * 1.12,
          border: "1.5px dashed rgba(145,190,255,0.32)",
          zIndex: 26,
        }}
      />
      <div
        ref={ring1Ref}
        style={{
          ...center,
          width: size * 1.08,
          height: size * 1.08,
          border: "1.5px solid rgba(155,195,255,0.52)",
          boxShadow:
            "0 0 18px 6px rgba(110,165,245,0.22), inset 0 0 14px 3px rgba(110,165,240,0.10)",
          zIndex: 29,
          opacity: 0.58,
        }}
      />
      <div
        ref={ring2Ref}
        style={{
          ...center,
          width: size * 1.19,
          height: size * 1.19,
          border: "1px solid rgba(140,182,248,0.36)",
          boxShadow: "0 0 26px 8px rgba(100,155,228,0.12)",
          zIndex: 28,
          opacity: 0.42,
        }}
      />
      <div
        ref={spinCCWRef}
        style={{
          ...center,
          width: size * 1.26,
          height: size * 1.26,
          border: "1px dashed rgba(132,178,248,0.22)",
          zIndex: 25,
        }}
      />
      <div
        ref={spinCW2Ref}
        style={{
          ...center,
          width: size * 1.38,
          height: size * 1.38,
          border: "0.8px dashed rgba(120,168,244,0.14)",
          zIndex: 23,
        }}
      />
      <div
        ref={ring3Ref}
        style={{
          ...center,
          width: size * 1.34,
          height: size * 1.34,
          border: "1px solid rgba(118,168,238,0.16)",
          background:
            "radial-gradient(circle, transparent 55%, rgba(100,155,230,0.05) 80%, transparent 100%)",
          boxShadow: "0 0 42px 16px rgba(85,140,215,0.06)",
          zIndex: 27,
          opacity: 0.22,
        }}
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CYCLING HERO IMAGE
// ─────────────────────────────────────────────────────────────────────────────

interface CyclingImageProps {
  images: string[];
  size: number;
  intervalMs?: number;
}

const CyclingImage = ({
  images,
  size,
  intervalMs = 2000,
}: CyclingImageProps) => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);

  const currentLayerRef = useRef<HTMLDivElement>(null);
  const nextLayerRef = useRef<HTMLDivElement>(null);
  const breatheRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Breathing lives on the outermost wrapper — outside overflow:hidden — so it never clips
  useEffect(() => {
    if (!breatheRef.current) return;
    gsap.to(breatheRef.current, {
      scale: 1.03,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      opacity: 0.65,
      scale: 1.06,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      if (sliding) return; // Prevent overlapping transitions
      const nextIdx = (current + 1) % images.length;
      setNext(nextIdx);
      setSliding(true);

      const dur = 0.9;
      const ease = "power3.inOut";

      // Stage incoming image: starts fully off-screen to the RIGHT
      gsap.set(nextLayerRef.current, { x: size, opacity: 1 });

      // Slide current LEFT out, slide next LEFT in — simultaneous
      gsap.to(currentLayerRef.current, {
        x: -size,
        duration: dur,
        ease,
      });
      gsap.to(nextLayerRef.current, {
        x: 0,
        duration: dur,
        ease,
        onComplete: () => {
          setCurrent(nextIdx);
          setNext(null);
          setSliding(false);
          // Reset current layer so it's ready for the next transition
          gsap.set(currentLayerRef.current, { x: 0 });
        },
      });

      // Update dot indicators
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.to(dot, {
          width: i === nextIdx ? 22 : 6,
          background:
            i === nextIdx ? "rgba(99,153,255,0.9)" : "rgba(150,185,255,0.35)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [current, images.length, intervalMs, size, sliding]);

  return (
    // breatheRef is the outermost wrapper — breathing scale happens before overflow:hidden
    <div
      ref={breatheRef}
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        zIndex: 30,
        willChange: "transform",
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: -16,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,155,255,0.18) 0%, rgba(80,130,220,0.10) 50%, transparent 72%)",
          filter: "blur(12px)",
          zIndex: 0,
          opacity: 0.5,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          // Dark fallback — never shows because both layers always cover 100% width
          background: "#0a0f1e",
          boxShadow:
            "0 0 0 5px rgba(155,195,255,0.20), 0 0 0 12px rgba(130,175,240,0.09), 0 28px 70px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(255,255,255,0.08)",
          zIndex: 1,
        }}
      >
        {/* Current image — slides out to the left */}
        <div
          ref={currentLayerRef}
          style={{ position: "absolute", inset: 0, willChange: "transform" }}
        >
          <Image
            src={images[current]}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Incoming image — slides in from the right, only mounted during transition */}
        {next !== null && (
          <div
            ref={nextLayerRef}
            style={{ position: "absolute", inset: 0, willChange: "transform" }}
          >
            <Image
              src={images[next]}
              alt="Hero next"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Cinematic overlay — always on top */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 55%), linear-gradient(180deg, transparent 55%, rgba(10,15,30,0.35) 100%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Dot indicators */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 5,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {images.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              style={{
                width: i === current ? 22 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === current
                    ? "rgba(99,153,255,0.9)"
                    : "rgba(150,185,255,0.35)",
                transition:
                  "width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s ease",
                boxShadow:
                  i === current ? "0 0 8px rgba(100,153,255,0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// POSITION GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

function generateCardPositions(
  count: number,
  imageRadius: number,
): { x: number; y: number }[] {
  if (count === 0) return [];

  // Orbit just outside the image circle edge
  // imageRadius is circleSize/2, so orbit = imageRadius + small gap for the card to sit beside it
  const orbitRadius = imageRadius + 20;

  // Angular slots (degrees from top = 0°, clockwise)
  // Avoids 270° (pure left) and 90° (pure right) dead zones where cards clip the image
  const angleSlots = [
    -50, // top-left
    40, // top-right
    130, // bottom-right
    220, // bottom-left
    -10, // near top
    170, // near bottom
    75, // right
    285, // left
  ];

  return Array.from({ length: Math.min(count, angleSlots.length) }, (_, i) => {
    const angleRad = (angleSlots[i] * Math.PI) / 180;
    return {
      x: Math.sin(angleRad) * orbitRadius,
      y: -Math.cos(angleRad) * orbitRadius,
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD TYPE CYCLE
// ─────────────────────────────────────────────────────────────────────────────

const CARD_TYPES = ["flash", "ticker", "breaking"] as const;
type CardType = (typeof CARD_TYPES)[number];

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT IMAGES
// ─────────────────────────────────────────────────────────────────────────────

const defaultImages = [
  "/images/city_lights.jpg",
  "/images/gallery_pic5.jpg",
  "/images/gallery_pic1.jpg",
  "/images/gallery_pic8.jpg",
];

// ─────────────────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────────────────

interface HeroVisualProps {
  images?: string[];
  imageIntervalMs?: number;
  announcements?: AnnouncementItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const HeroVisual = ({
  images,
  imageIntervalMs = 2000,
  announcements = [],
}: HeroVisualProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storedBasePositions = useRef<{ x: number; y: number }[]>([]);
  const [circleSize, setCircleSize] = useState(360);

  const resolvedImages = images && images.length > 0 ? images : defaultImages;

  // Derive card positions from announcements count
  // No extra scale needed — circleSize is already the real pixel size
  const cardPositions = useMemo(() => {
    return generateCardPositions(announcements.length, circleSize / 2);
  }, [announcements.length, circleSize]);

  // ── Responsive size ─────────────────────────────────────────────────────
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const updateSize = () => {
      setCircleSize(Math.min(Math.max(element.clientWidth, 280), 900));
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(element);
    return () => ro.disconnect();
  }, []);

  // ── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (cardPositions.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      cardPositions.forEach((pos, i) => {
        const el = elementRefs.current[i];
        if (!el) return;

        // Offset x/y so the card center sits on the orbit point
        // Card is ~220px wide, ~80px tall on average — subtract half
        const cx = pos.x - el.offsetWidth / 2;
        const cy = pos.y - el.offsetHeight / 2;

        storedBasePositions.current[i] = { x: cx, y: cy };

        // Varied entrance directions per card
        const offsets = [
          { x: cx + 30, y: cy - 20 },
          { x: cx + 30, y: cy + 10 },
          { x: cx - 20, y: cy + 25 },
        ];
        const offset = offsets[i % offsets.length];

        gsap.set(el, {
          x: offset.x,
          y: offset.y,
          opacity: 0,
          scale: 0.78,
          filter: "blur(4px)",
        });
        tl.to(
          el,
          {
            x: cx,
            y: cy,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "back.out(1.3)",
          },
          0.6 + i * 0.18,
        );
      });
    });

    return () => ctx.revert();
  }, [cardPositions]);

  // ── Float animation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (cardPositions.length === 0) return;

    const ctx = gsap.context(() => {
      cardPositions.forEach((_, i) => {
        const el = elementRefs.current[i];
        if (!el) return;

        gsap.to(el, {
          y: `+=${gsap.utils.random(10, 20)}`,
          duration: gsap.utils.random(2.4, 4.0),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.45,
        });

        gsap.to(el, {
          x: `+=${gsap.utils.random(-4, 4)}`,
          duration: gsap.utils.random(3.5, 5.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3 + 0.8,
        });
      });
    });

    return () => ctx.revert();
  }, [cardPositions]);

  // ── Mouse parallax ──────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const depthFactors = [
      0.022, 0.016, 0.019, 0.018, 0.02, 0.015, 0.021, 0.017,
    ];

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      elementRefs.current.forEach((el, i) => {
        if (!el) return;
        const factor = depthFactors[i] ?? 0.018;
        const base = storedBasePositions.current[i];
        if (!base) return;

        const elRect = el.getBoundingClientRect();
        const edx = e.clientX - (elRect.left + elRect.width / 2);
        const edy = e.clientY - (elRect.top + elRect.height / 2);
        const dist = Math.sqrt(edx * edx + edy * edy);

        if (dist < 90) {
          gsap.to(el, {
            x: base.x - edx * 0.22,
            y: base.y - edy * 0.22,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(el, {
            x: base.x + dx * factor,
            y: base.y + dy * factor,
            duration: 0.9,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    const handleLeave = () => {
      elementRefs.current.forEach((el, i) => {
        const base = storedBasePositions.current[i];
        if (!el || !base) return;
        gsap.to(el, {
          x: base.x,
          y: base.y,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
        });
      });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // ── Render one card per announcement ───────────────────────────────────
  const renderCard = (announcement: AnnouncementItem, i: number) => {
    const type: CardType = CARD_TYPES[i % CARD_TYPES.length];

    const ref = (el: HTMLDivElement | null) => {
      elementRefs.current[i] = el;
    };

    const wrapper = (children: React.ReactNode) => (
      <div
        key={announcement.id}
        ref={ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 100,
          willChange: "transform",
          // GSAP will set x/y to offset from this center anchor
        }}
      >
        {children}
      </div>
    );

    if (type === "flash") {
      return wrapper(
        <FlashNewsCard
          label={`⚡ ${announcement.title.toUpperCase()}`}
          headline={announcement.description}
          tag="live"
        />,
      );
    }

    if (type === "ticker") {
      // Split on sentence boundaries for multi-item ticker, fallback to single item
      const items = announcement.description
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      return wrapper(
        <TickerCard
          items={items.length > 1 ? items : [announcement.description]}
          label={announcement.title.toUpperCase()}
        />,
      );
    }

    if (type === "breaking") {
      return wrapper(
        <BreakingCard
          text={announcement.description}
          label={announcement.title.toUpperCase()}
        />,
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[380px] sm:max-w-[450px] lg:max-w-[560px] xl:max-w-[720px] pt-10 mx-auto aspect-square flex items-center justify-center"
      style={{ overflow: "visible" }}
    >
      {/* Ambient background blobs */}
      <div
        style={{
          position: "absolute",
          inset: "-30%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <AmbientBlob
          color="radial-gradient(circle, rgba(255,153,51,0.55) 0%, rgba(255,120,30,0.3) 40%, transparent 70%)"
          size={circleSize * 0.55}
          style={{ top: "5%", left: "10%" }}
        />
        <AmbientBlob
          color="radial-gradient(circle, rgba(100,150,255,0.5) 0%, rgba(80,120,235,0.28) 40%, transparent 70%)"
          size={circleSize * 0.48}
          style={{ bottom: "8%", right: "8%" }}
        />
        <AmbientBlob
          color="radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(220,235,255,0.14) 50%, transparent 75%)"
          size={circleSize * 0.38}
          style={{ top: "30%", right: "15%" }}
        />
      </div>

      {/* Cursor spotlight removed */}

      {/* Animated concentric rings */}
      <AnimatedRings size={circleSize} />

      {/* Hero cycling image */}
      <CyclingImage
        images={resolvedImages}
        size={circleSize}
        intervalMs={imageIntervalMs}
      />

      {/* One card per announcement */}
      {announcements.map((announcement, i) =>
        cardPositions[i] ? renderCard(announcement, i) : null,
      )}
    </div>
  );
};

export default HeroVisual;
