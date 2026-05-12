"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────────────────────
// ICON COMPONENTS (unchanged from original)
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
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="#0ea5e9" strokeWidth="1.8" />
    <path d="M7 8h10M7 12h6M7 16h4" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const FloatingCard = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-2.5 bg-white rounded-2xl shadow-xl px-3.5 py-2.5 min-w-[160px] max-w-[230px] border border-gray-100">
    {icon && (
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-50">
        {icon}
      </div>
    )}
    <div className="flex flex-col min-w-0">
      <span className="text-[13px] font-semibold text-gray-800 leading-tight truncate">{title}</span>
      {subtitle && (
        <span className="text-[11px] text-gray-400 leading-tight mt-0.5 truncate">{subtitle}</span>
      )}
    </div>
  </div>
);

const LiveConnectionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" fill="#22c55e" />
    <circle cx="5" cy="8" r="2" fill="#22c55e" opacity="0.7" />
    <circle cx="19" cy="8" r="2" fill="#22c55e" opacity="0.7" />
    <circle cx="5" cy="16" r="2" fill="#22c55e" opacity="0.7" />
    <circle cx="19" cy="16" r="2" fill="#22c55e" opacity="0.7" />
    <line x1="12" y1="12" x2="5" y2="8" stroke="#22c55e" strokeWidth="1.5" />
    <line x1="12" y1="12" x2="19" y2="8" stroke="#22c55e" strokeWidth="1.5" />
    <line x1="12" y1="12" x2="5" y2="16" stroke="#22c55e" strokeWidth="1.5" />
    <line x1="12" y1="12" x2="19" y2="16" stroke="#22c55e" strokeWidth="1.5" />
  </svg>
);

const AssociationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="10" width="18" height="11" rx="1" stroke="#f97316" strokeWidth="1.8" />
    <path d="M9 21V14h6v7" stroke="#f97316" strokeWidth="1.8" />
    <path d="M2 10l10-7 10 7" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3" stroke="#6366f1" strokeWidth="1.8" />
    <circle cx="17" cy="9" r="2.5" stroke="#6366f1" strokeWidth="1.8" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17 14c2.2 0 4 1.8 4 4" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const GraduationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L2 9l10 6 10-6-10-6z" stroke="#60a5fa" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 12v5c0 2.2 2.7 4 6 4s6-1.8 6-4v-5" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// LIVE DOT — enhanced with layered pulse
// ─────────────────────────────────────────────────────────────────────────────

const LiveDot = ({ color = "#ef4444" }: { color?: string }) => (
  <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10, flexShrink: 0 }}>
    {/* Outer ring pulse */}
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
    {/* Inner glow pulse */}
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
// FLASH NEWS CARD — enhanced glassmorphism + hover glow
// ─────────────────────────────────────────────────────────────────────────────

const FlashNewsCard = ({ headline, tag }: { headline: string; tag: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () =>
      gsap.to(el, {
        boxShadow: "0 16px 48px rgba(249,115,22,0.22), 0 4px 16px rgba(0,0,0,0.10)",
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
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
        border: "1px solid rgba(249,115,22,0.18)",
        padding: "10px 14px 10px 17px",
        minWidth: 210,
        maxWidth: 250,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        willChange: "transform",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Left accent bar — animated shimmer */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: "linear-gradient(180deg, #f97316 0%, #ef4444 50%, #f97316 100%)",
          backgroundSize: "100% 200%",
          borderRadius: "18px 0 0 18px",
          animation: "accentShimmer 2.5s ease-in-out infinite",
        }}
      />
      {/* Subtle inner glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at top left, rgba(249,115,22,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
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
          ⚡ FLASH
        </span>
        <LiveDot color="#ef4444" />
        <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: "auto", fontFamily: "system-ui, sans-serif" }}>
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
// TICKER CARD — enhanced with smoother transitions + glass
// ─────────────────────────────────────────────────────────────────────────────

const TickerCard = ({ items }: { items: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"visible" | "out" | "in">("visible");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      gsap.to(el, { boxShadow: "0 14px 40px rgba(99,102,241,0.2), 0 4px 12px rgba(0,0,0,0.08)", y: -3, scale: 1.02, duration: 0.3, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(el, { boxShadow: "0 8px 28px rgba(0,0,0,0.10)", y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
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
        boxShadow: "0 8px 28px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
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
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top right, rgba(99,102,241,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
        <div style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", borderRadius: 7, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 10px rgba(99,102,241,0.35)" }}>
          <MegaphoneIcon />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "0.07em", fontFamily: "system-ui, sans-serif" }}>
          IIK UPDATES
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
          transition: "opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {items[idx]}
      </div>
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
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BREAKING CARD — enhanced glass + hover
// ─────────────────────────────────────────────────────────────────────────────

const BreakingCard = ({ text }: { text: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onEnter = () => gsap.to(el, { boxShadow: "0 14px 36px rgba(14,165,233,0.2), 0 4px 12px rgba(0,0,0,0.08)", y: -3, scale: 1.02, duration: 0.3, ease: "power2.out" });
    const onLeave = () => gsap.to(el, { boxShadow: "0 8px 28px rgba(0,0,0,0.10)", y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 16,
        boxShadow: "0 8px 28px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
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
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at bottom left, rgba(14,165,233,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <div style={{ background: "#f0f9ff", borderRadius: 7, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(14,165,233,0.18)" }}>
          <NewsIcon />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.06em", fontFamily: "system-ui, sans-serif" }}>
          BREAKING
        </span>
        <LiveDot color="#0ea5e9" />
      </div>
      <p style={{ margin: 0, fontSize: 11.5, color: "#1e293b", lineHeight: 1.45, fontFamily: "system-ui, sans-serif", fontWeight: 500, position: "relative" }}>
        {text}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT BLOB — soft moving background gradient
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
    // Subtle scale breathing
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
// CURSOR SPOTLIGHT — soft radial glow following the mouse
// ─────────────────────────────────────────────────────────────────────────────

const CursorSpotlight = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const spotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const spot = spotRef.current;
    if (!container || !spot) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      if (spot) {
        const cur = { x: parseFloat(spot.style.left) || 0, y: parseFloat(spot.style.top) || 0 };
        const lerped = {
          x: cur.x + (posRef.current.x - cur.x) * 0.09,
          y: cur.y + (posRef.current.y - cur.y) * 0.09,
        };
        spot.style.left = `${lerped.x}px`;
        spot.style.top = `${lerped.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    const onEnter = () => gsap.to(spot, { opacity: 1, duration: 0.4, ease: "power2.out" });
    const onLeave = () => gsap.to(spot, { opacity: 0, duration: 0.6, ease: "power2.out" });
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

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
        background: "radial-gradient(circle, rgba(155,180,255,0.13) 0%, rgba(100,150,255,0.06) 45%, transparent 70%)",
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
// ANIMATED RINGS — premium atmospheric with shimmer + depth
// ─────────────────────────────────────────────────────────────────────────────

const AnimatedRings = ({ size }: { size: number }) => {
  const ring1Ref = useRef<HTMLDivElement>(null);   // Inner breathing ring
  const ring2Ref = useRef<HTMLDivElement>(null);   // Mid breathing ring
  const ring3Ref = useRef<HTMLDivElement>(null);   // Outer soft ring
  const ring4Ref = useRef<HTMLDivElement>(null);   // Sonar pulse A
  const ring5Ref = useRef<HTMLDivElement>(null);   // Sonar pulse B
  const ring6Ref = useRef<HTMLDivElement>(null);   // Sonar pulse C (new, offset)
  const spinCWRef = useRef<HTMLDivElement>(null);  // Clockwise dashed
  const spinCCWRef = useRef<HTMLDivElement>(null); // Counter-clockwise dashed
  const spinCW2Ref = useRef<HTMLDivElement>(null); // Slow CW large ring
  const glowRingRef = useRef<HTMLDivElement>(null);// Atmospheric glow halo

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Breathing rings (organic, non-uniform timing) ──────────────────
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

      // ── Atmospheric glow halo — very slow ambient breathe ─────────────
      gsap.to(glowRingRef.current, {
        opacity: 0.18,
        scale: 1.06,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // ── Sonar pulses — staggered, organic timing ───────────────────────
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

      // ── Dual-direction rotation — smooth, premium pacing ──────────────
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
      {/* Atmospheric glow halo — outermost, very soft */}
      <div
        ref={glowRingRef}
        style={{
          ...center,
          width: size * 1.55,
          height: size * 1.55,
          background: "radial-gradient(circle, transparent 42%, rgba(100,155,240,0.07) 65%, rgba(80,130,220,0.04) 80%, transparent 100%)",
          zIndex: 20,
          opacity: 0.12,
        }}
      />

      {/* Sonar pulse rings */}
      <div ref={ring4Ref} style={{ ...center, width: size, height: size, border: "1.5px solid rgba(110,165,245,0.48)", zIndex: 24 }} />
      <div ref={ring5Ref} style={{ ...center, width: size, height: size, border: "1.5px solid rgba(120,170,250,0.42)", zIndex: 24 }} />
      <div ref={ring6Ref} style={{ ...center, width: size * 0.94, height: size * 0.94, border: "1px solid rgba(130,175,255,0.35)", zIndex: 24 }} />

      {/* Rotating dashed ring — CW */}
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

      {/* Inner breathing ring — most visible */}
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

      {/* Mid breathing ring */}
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

      {/* Counter-clockwise dashed ring */}
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

      {/* Outer very slow CW ring */}
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

      {/* Outer breathing ring — subtlest */}
      <div
        ref={ring3Ref}
        style={{
          ...center,
          width: size * 1.34,
          height: size * 1.34,
          border: "1px solid rgba(118,168,238,0.16)",
          background: "radial-gradient(circle, transparent 55%, rgba(100,155,230,0.05) 80%, transparent 100%)",
          boxShadow: "0 0 42px 16px rgba(85,140,215,0.06)",
          zIndex: 27,
          opacity: 0.22,
        }}
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CYCLING HERO IMAGE — enhanced with breathing, atmospheric overlay, glow
// ─────────────────────────────────────────────────────────────────────────────

interface CyclingImageProps {
  images: string[];
  size: number;
  intervalMs?: number;
}

const CyclingImage = ({ images, size, intervalMs = 2000 }: CyclingImageProps) => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentLayerRef = useRef<HTMLDivElement>(null);
  const nextLayerRef = useRef<HTMLDivElement>(null);
  const breatheRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Subtle breathing scale animation on image
  useEffect(() => {
    if (!breatheRef.current) return;
    gsap.to(breatheRef.current, {
      scale: 1.04,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // Ambient glow pulse
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
      const nextIdx = (current + 1) % images.length;
      setNext(nextIdx);
      setFading(true);

      // Next layer: scale down from slight zoom, fade in
      gsap.set(nextLayerRef.current, { opacity: 0, scale: 1.08 });
      gsap.to(nextLayerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      });
      // Current layer: subtle scale down + fade out
      gsap.to(currentLayerRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.75,
        ease: "power3.in",
        onComplete: () => {
          setCurrent(nextIdx);
          setNext(null);
          setFading(false);
          gsap.set(currentLayerRef.current, { opacity: 1, scale: 1 });
        },
      });

      // Dot indicators with smooth width transition
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.to(dot, {
          width: i === nextIdx ? 22 : 6,
          background: i === nextIdx ? "rgba(99,153,255,0.9)" : "rgba(150,185,255,0.35)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [current, images.length, intervalMs]);

  return (
    <div
      ref={containerRef}
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
      {/* Layered ambient glow behind image */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: -16,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,155,255,0.18) 0%, rgba(80,130,220,0.10) 50%, transparent 72%)",
          filter: "blur(12px)",
          zIndex: 0,
          opacity: 0.5,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      />

      {/* Image container with inner shadow ring */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow:
            "0 0 0 5px rgba(155,195,255,0.20), 0 0 0 12px rgba(130,175,240,0.09), 0 28px 70px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(255,255,255,0.08)",
          zIndex: 1,
        }}
      >
        {/* Breathing wrapper */}
        <div ref={breatheRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <div ref={currentLayerRef} style={{ position: "absolute", inset: 0 }}>
            <Image src={images[current]} alt="Hero" fill className="object-cover" priority />
          </div>
          {fading && next !== null && (
            <div ref={nextLayerRef} style={{ position: "absolute", inset: 0, opacity: 0 }}>
              <Image src={images[next]} alt="Hero next" fill className="object-cover" />
            </div>
          )}
        </div>

        {/* Cinematic inner gradient overlay — depth + atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 55%), linear-gradient(180deg, transparent 55%, rgba(10,15,30,0.35) 100%)",
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
              ref={(el) => { dotsRef.current[i] = el; }}
              style={{
                width: i === current ? 22 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? "rgba(99,153,255,0.9)" : "rgba(150,185,255,0.35)",
                transition: "width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s ease",
                boxShadow: i === current ? "0 0 8px rgba(100,153,255,0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────

const CARD_POSITIONS = [
  { x: 140, y: -165, type: "flash", cardIdx: 0 },
  { x: 175, y: -55, type: "ticker", cardIdx: 0 },
  { x: -90, y: 145, type: "breaking", cardIdx: 0 },
];

const defaultCards = [
  { id: 1, title: "Live Connections", subtitle: "842 online now", icon: <LiveConnectionIcon /> },
  { id: 2, title: "Bengali Association", subtitle: "Cultural", icon: <AssociationIcon /> },
  { id: 3, title: "Tamil Nanbargal", subtitle: "Social", icon: <GroupIcon /> },
];

const FLASH_NEWS = {
  headline: "IIK hosts its biggest Diwali celebration in Seoul — 3,000 attendees!",
  tag: "2m ago",
};

const TICKER_ITEMS = [
  "New Kannada chapter launched in Incheon 🎉",
  "IIK Holi Fest registrations now open!",
  "Job fair for Indian professionals — June 14",
  "Monthly meetup: Pangyo tech hub, Sat 6pm",
];

const BREAKING_TEXT = "India–Korea cultural exchange program expanded to 5 new cities";

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
  floatingCards?: { id: number; title: string; subtitle?: string; icon: React.ReactNode }[];
  imageIntervalMs?: number;
  flashNews?: { headline: string; tag: string };
  tickerItems?: string[];
  breakingText?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const HeroVisual = ({
  images,
  floatingCards = defaultCards,
  imageIntervalMs = 2000,
  flashNews = FLASH_NEWS,
  tickerItems = TICKER_ITEMS,
  breakingText = BREAKING_TEXT,
}: HeroVisualProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const basePositions = useRef<{ x: number; y: number }[]>([]);
  const [circleSize, setCircleSize] = useState(360);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const scale = circleSize / 360;

  const scaledCardPositions = useMemo(
    () =>
      CARD_POSITIONS.map((pos) => ({
        ...pos,
        x: pos.x * scale,
        y: pos.y * scale,
      })),
    [scale]
  );

  const resolvedImages = images && images.length > 0 ? images : defaultImages;

  // ── Responsive size ───────────────────────────────────────────────────────
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const updateSize = () => {
      const width = element.clientWidth;
      setCircleSize(Math.min(Math.max(width, 280), 900));
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(element);
    return () => ro.disconnect();
  }, []);

  // ── ENTRANCE ANIMATION TIMELINE — orchestrated, cinematic sequence ────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current = tl;

      // 1. Rings are always visible (CSS based), just ensure cards start hidden
      elementRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scale: 0.75 });
      });

      // 2. Cards stagger in from different directions with cinematic feel
      scaledCardPositions.forEach((pos, i) => {
        const el = elementRefs.current[i];
        if (!el) return;

        // Starting offset directions per card for variety
        const directions = [
          { x: pos.x + 30, y: pos.y - 20 },  // flash: from top-right
          { x: pos.x + 30, y: pos.y + 10 },  // ticker: from right
          { x: pos.x - 20, y: pos.y + 25 },  // breaking: from bottom-left
        ];

        basePositions.current[i] = { x: pos.x, y: pos.y };
        gsap.set(el, {
          x: directions[i]?.x ?? pos.x,
          y: directions[i]?.y ?? pos.y,
          opacity: 0,
          scale: 0.78,
          filter: "blur(4px)",
        });

        tl.to(
          el,
          {
            x: pos.x,
            y: pos.y,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "back.out(1.3)",
          },
          0.6 + i * 0.18
        );
      });
    });
    return () => ctx.revert();
  }, [scaledCardPositions]);

  // ── FLOAT ANIMATION — organic, layered timing ─────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      scaledCardPositions.forEach((_, i) => {
        const el = elementRefs.current[i];
        if (!el) return;

        // Vertical float
        gsap.to(el, {
          y: `+=${gsap.utils.random(10, 20)}`,
          duration: gsap.utils.random(2.4, 4.0),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.45,
        });

        // Subtle lateral drift (very small)
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
  }, [scaledCardPositions]);

  // ── MOUSE PARALLAX — improved depth layering ──────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Per-card parallax depth factor (varies for 3D feel)
    const depthFactors = [0.022, 0.016, 0.019];

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      elementRefs.current.forEach((el, i) => {
        if (!el) return;
        const factor = depthFactors[i] ?? 0.018;
        const base = basePositions.current[i];
        if (!base) return;

        // Magnetic repulsion when cursor is very close
        const elRect = el.getBoundingClientRect();
        const elCx = elRect.left + elRect.width / 2;
        const elCy = elRect.top + elRect.height / 2;
        const edx = e.clientX - elCx;
        const edy = e.clientY - elCy;
        const dist = Math.sqrt(edx * edx + edy * edy);

        if (dist < 90) {
          // Magnetic: push away slightly
          gsap.to(el, {
            x: base.x - edx * 0.22,
            y: base.y - edy * 0.22,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          // Normal parallax drift
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
        const base = basePositions.current[i];
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

  // ── Render floating cards ─────────────────────────────────────────────────
  const renderCard = (pos: (typeof scaledCardPositions)[0], i: number) => {
    const ref = (el: HTMLDivElement | null) => { elementRefs.current[i] = el; };
    const wrapper = (children: React.ReactNode) => (
      <div key={`card-${i}`} ref={ref} className="absolute will-change-transform" style={{ zIndex: 100 }}>
        {children}
      </div>
    );

    if (pos.type === "flash") return wrapper(<FlashNewsCard headline={flashNews.headline} tag={flashNews.tag} />);
    if (pos.type === "ticker") return wrapper(<TickerCard items={tickerItems} />);
    if (pos.type === "breaking") return wrapper(<BreakingCard text={breakingText} />);
    if (pos.type === "card") {
      const card = floatingCards[pos.cardIdx!];
      if (!card) return null;
      return wrapper(<FloatingCard title={card.title} subtitle={card.subtitle} icon={card.icon} />);
    }
    if (pos.type === "icon") {
      return wrapper(
        <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-blue-400">
          <GraduationIcon />
        </div>
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
      {/* Ambient background blobs — subtle moving gradients */}
      <div style={{ position: "absolute", inset: "-30%", pointerEvents: "none", zIndex: 0, overflow: "hidden", borderRadius: "50%" }}>
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

      {/* Cursor spotlight */}
      <CursorSpotlight containerRef={containerRef as React.RefObject<HTMLDivElement>} />

      {/* Animated concentric rings */}
      <AnimatedRings size={circleSize} />

      {/* Hero cycling image */}
      <CyclingImage images={resolvedImages} size={circleSize} intervalMs={imageIntervalMs} />

      {/* Floating cards */}
      {scaledCardPositions.map((pos, i) => renderCard(pos, i))}
    </div>
  );
};

export default HeroVisual;