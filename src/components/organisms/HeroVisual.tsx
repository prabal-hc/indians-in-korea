"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

// ─── Flash News Icons ─────────────────────────────────────────────────────────
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

// ─── FloatingCard (kept for fallback) ────────────────────────────────────────
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
      <span className="text-[13px] font-semibold text-gray-800 leading-tight truncate">
        {title}
      </span>
      {subtitle && (
        <span className="text-[11px] text-gray-400 leading-tight mt-0.5 truncate">
          {subtitle}
        </span>
      )}
    </div>
  </div>
);

const IconBubble = ({
  icon,
  color = "text-blue-400",
}: {
  icon: React.ReactNode;
  color?: string;
}) => (
  <div
    className={`w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center ${color}`}
  >
    {icon}
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
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
    <rect
      x="3"
      y="10"
      width="18"
      height="11"
      rx="1"
      stroke="#f97316"
      strokeWidth="1.8"
    />
    <path d="M9 21V14h6v7" stroke="#f97316" strokeWidth="1.8" />
    <path
      d="M2 10l10-7 10 7"
      stroke="#f97316"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3" stroke="#6366f1" strokeWidth="1.8" />
    <circle cx="17" cy="9" r="2.5" stroke="#6366f1" strokeWidth="1.8" />
    <path
      d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
      stroke="#6366f1"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M17 14c2.2 0 4 1.8 4 4"
      stroke="#6366f1"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const GraduationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3L2 9l10 6 10-6-10-6z"
      stroke="#60a5fa"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M6 12v5c0 2.2 2.7 4 6 4s6-1.8 6-4v-5"
      stroke="#60a5fa"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Live Pulse Dot ───────────────────────────────────────────────────────────
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
        inset: 0,
        borderRadius: "50%",
        background: color,
        opacity: 0.5,
        animation: "livePing 1.4s ease-in-out infinite",
      }}
    />
    <span
      style={{
        position: "relative",
        borderRadius: "50%",
        width: 10,
        height: 10,
        background: color,
        flexShrink: 0,
      }}
    />
    <style>{`
      @keyframes livePing {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(2.2); opacity: 0; }
      }
    `}</style>
  </span>
);

// ─── Flash News Card (top right) ─────────────────────────────────────────────
const FlashNewsCard = ({
  headline,
  tag,
}: {
  headline: string;
  tag: string;
}) => (
  <div
    style={{
      background: "white",
      borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      border: "1px solid rgba(249,115,22,0.18)",
      padding: "10px 14px 10px 17px",
      minWidth: 210,
      maxWidth: 250,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Left accent bar */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: "linear-gradient(180deg, #f97316, #ef4444)",
        borderRadius: "16px 0 0 16px",
      }}
    />
    {/* Top row */}
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
          background: "#ef4444",
          color: "white",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "2px 7px",
          borderRadius: 4,
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.6,
        }}
      >
        ⚡ FLASH
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
    {/* Headline */}
    <p
      style={{
        margin: 0,
        fontSize: 12,
        fontWeight: 600,
        color: "#1e293b",
        lineHeight: 1.45,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {headline}
    </p>
  </div>
);

// ─── Ticker Card (mid right) ──────────────────────────────────────────────────
const TickerCard = ({ items }: { items: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
        border: "1px solid rgba(99,102,241,0.18)",
        padding: "9px 13px",
        minWidth: 190,
        maxWidth: 230,
      }}
    >
      {/* Header */}
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
            background: "#6366f1",
            borderRadius: 6,
            width: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <MegaphoneIcon />
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#6366f1",
            letterSpacing: "0.06em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          IIK UPDATES
        </span>
        <LiveDot color="#6366f1" />
      </div>
      {/* Cycling text */}
      <div
        style={{
          fontSize: 11.5,
          color: "#334155",
          lineHeight: 1.45,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 500,
          minHeight: 34,
          transition: "opacity 0.35s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        {items[idx]}
      </div>
      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 4, marginTop: 7 }}>
        {items.map((_, i) => (
          <div
            key={i}
            style={{
              height: 3,
              width: i === idx ? 18 : 6,
              borderRadius: 2,
              background: i === idx ? "#6366f1" : "#e2e8f0",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Breaking Card (bottom left) ─────────────────────────────────────────────
const BreakingCard = ({ text }: { text: string }) => (
  <div
    style={{
      background: "white",
      borderRadius: 14,
      boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
      border: "1px solid rgba(14,165,233,0.18)",
      padding: "9px 13px",
      minWidth: 175,
      maxWidth: 215,
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}
    >
      <div
        style={{
          background: "#f0f9ff",
          borderRadius: 6,
          width: 22,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <NewsIcon />
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#0ea5e9",
          letterSpacing: "0.05em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        BREAKING
      </span>
      <LiveDot color="#0ea5e9" />
    </div>
    <p
      style={{
        margin: 0,
        fontSize: 11.5,
        color: "#1e293b",
        lineHeight: 1.4,
        fontFamily: "system-ui, sans-serif",
        fontWeight: 500,
      }}
    >
      {text}
    </p>
  </div>
);

// ─── Animated Rings ───────────────────────────────────────────────────────────
const AnimatedRings = ({ size }: { size: number }) => {
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const ring4Ref = useRef<HTMLDivElement>(null);
  const ring5Ref = useRef<HTMLDivElement>(null);
  const spinCWRef = useRef<HTMLDivElement>(null);
  const spinCCWRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ring1Ref.current, {
        scale: 1.06,
        opacity: 0.8,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(ring2Ref.current, {
        scale: 1.05,
        opacity: 0.55,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
      gsap.to(ring3Ref.current, {
        scale: 1.04,
        opacity: 0.3,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.0,
      });
      const sonar = (el: HTMLDivElement | null, delay: number) => {
        if (!el) return;
        gsap.set(el, { scale: 1, opacity: 0.6 });
        gsap.to(el, {
          scale: 1.55,
          opacity: 0,
          duration: 2.8,
          repeat: -1,
          ease: "power1.out",
          delay,
        });
      };
      sonar(ring4Ref.current, 0);
      sonar(ring5Ref.current, 1.4);
      gsap.to(spinCWRef.current, {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to(spinCCWRef.current, {
        rotation: -360,
        duration: 26,
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
  };

  return (
    <>
      <div
        ref={ring4Ref}
        style={{
          ...center,
          width: size,
          height: size,
          border: "2px solid rgba(100,160,240,0.5)",
          zIndex: 24,
        }}
      />
      <div
        ref={ring5Ref}
        style={{
          ...center,
          width: size,
          height: size,
          border: "2px solid rgba(100,160,240,0.45)",
          zIndex: 24,
        }}
      />
      <div
        ref={spinCWRef}
        style={{
          ...center,
          width: size * 1.11,
          height: size * 1.11,
          border: "1.5px dashed rgba(140,190,255,0.4)",
          zIndex: 26,
        }}
      />
      <div
        ref={ring1Ref}
        style={{
          ...center,
          width: size * 1.08,
          height: size * 1.08,
          border: "2px solid rgba(150,195,255,0.55)",
          boxShadow:
            "0 0 14px 5px rgba(110,165,240,0.30),inset 0 0 12px 3px rgba(110,165,240,0.12)",
          zIndex: 29,
          opacity: 0.6,
        }}
      />
      <div
        ref={ring2Ref}
        style={{
          ...center,
          width: size * 1.18,
          height: size * 1.18,
          border: "1.5px solid rgba(135,180,245,0.38)",
          boxShadow: "0 0 22px 8px rgba(100,155,225,0.16)",
          zIndex: 28,
          opacity: 0.45,
        }}
      />
      <div
        ref={spinCCWRef}
        style={{
          ...center,
          width: size * 1.24,
          height: size * 1.24,
          border: "1px dashed rgba(130,180,245,0.25)",
          zIndex: 25,
        }}
      />
      <div
        ref={ring3Ref}
        style={{
          ...center,
          width: size * 1.32,
          height: size * 1.32,
          border: "1px solid rgba(120,170,235,0.20)",
          background:
            "radial-gradient(circle, transparent 55%, rgba(100,155,230,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 35px 14px rgba(85,140,215,0.08)",
          zIndex: 27,
          opacity: 0.25,
        }}
      />
    </>
  );
};

// ─── Cycling Hero Image ───────────────────────────────────────────────────────
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
  const [fading, setFading] = useState(false);

  const currentLayerRef = useRef<HTMLDivElement>(null);
  const nextLayerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      const nextIdx = (current + 1) % images.length;
      setNext(nextIdx);
      setFading(true);

      gsap.set(nextLayerRef.current, { opacity: 0, scale: 1.06 });
      gsap.to(nextLayerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.to(currentLayerRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        ease: "power2.in",
        onComplete: () => {
          setCurrent(nextIdx);
          setNext(null);
          setFading(false);
          gsap.set(currentLayerRef.current, { opacity: 1, scale: 1 });
        },
      });

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.to(dot, {
          width: i === nextIdx ? 20 : 6,
          background:
            i === nextIdx ? "rgba(99,153,255,0.9)" : "rgba(150,185,255,0.4)",
          duration: 0.35,
          ease: "power2.out",
        });
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [current, images.length, intervalMs]);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        zIndex: 30,
        boxShadow:
          "0 0 0 5px rgba(150,190,255,0.22), 0 0 0 11px rgba(130,175,240,0.10), 0 24px 60px rgba(0,0,0,0.28)",
        transition: "width 0.4s ease, height 0.4s ease",
      }}
    >
      <div ref={currentLayerRef} style={{ position: "absolute", inset: 0 }}>
        <Image
          src={images[current]}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {fading && next !== null && (
        <div
          ref={nextLayerRef}
          style={{ position: "absolute", inset: 0, opacity: 0 }}
        >
          <Image
            src={images[next]}
            alt="Hero next"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 16,
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
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background:
                i === current
                  ? "rgba(99,153,255,0.9)"
                  : "rgba(150,185,255,0.4)",
              transition: "width 0.35s, background 0.35s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Config ───────────────────────────────────────────────────────────────────
const CARD_POSITIONS = [
  { x: 140, y: -165, type: "flash", cardIdx: 0 },
  { x: 175, y: -55, type: "ticker", cardIdx: 0 },
  { x: -90, y: 145, type: "breaking", cardIdx: 0 },
];

const defaultCards = [
  {
    id: 1,
    title: "Live Connections",
    subtitle: "842 online now",
    icon: <LiveConnectionIcon />,
  },
  {
    id: 2,
    title: "Bengali Association",
    subtitle: "Cultural",
    icon: <AssociationIcon />,
  },
  {
    id: 3,
    title: "Tamil Nanbargal",
    subtitle: "Social",
    icon: <GroupIcon />,
  },
];

const FLASH_NEWS = {
  headline:
    "IIK hosts its biggest Diwali celebration in Seoul — 3,000 attendees!",
  tag: "2m ago",
};

const TICKER_ITEMS = [
  "New Kannada chapter launched in Incheon 🎉",
  "IIK Holi Fest registrations now open!",
  "Job fair for Indian professionals — June 14",
  "Monthly meetup: Pangyo tech hub, Sat 6pm",
];

const BREAKING_TEXT =
  "India–Korea cultural exchange program expanded to 5 new cities";

const defaultImages = [
  "/images/city_lights.jpg",
  "/images/gallery_pic5.jpg",
  "/images/gallery_pic1.jpg",
  "/images/gallery_pic8.jpg",
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface HeroVisualProps {
  images?: string[];
  floatingCards?: {
    id: number;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
  }[];
  imageIntervalMs?: number;
  flashNews?: { headline: string; tag: string };
  tickerItems?: string[];
  breakingText?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────
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

  const scale = circleSize / 360;

  const scaledCardPositions = useMemo(
    () =>
      CARD_POSITIONS.map((pos) => ({
        ...pos,
        x: pos.x * scale,
        y: pos.y * scale,
      })),
    [scale],
  );

  const resolvedImages = images && images.length > 0 ? images : defaultImages;

  // ── Responsive size via ResizeObserver ────────────────────────────────────
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

  // ── Card entrance + float animations ─────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      scaledCardPositions.forEach((pos, i) => {
        const el = elementRefs.current[i];
        if (!el) return;
        basePositions.current[i] = { x: pos.x, y: pos.y };
        gsap.set(el, { x: pos.x, y: pos.y, opacity: 0, scale: 0.8 });
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          delay: 0.3 + i * 0.13,
          ease: "back.out(1.5)",
        });
        gsap.to(el, {
          y: `+=${gsap.utils.random(8, 18)}`,
          duration: gsap.utils.random(2.2, 3.8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.35,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [scaledCardPositions]);

  // ── Mouse parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMove = (e: MouseEvent) => {
      elementRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          gsap.to(el, {
            x: basePositions.current[i].x - dx * 0.18,
            y: basePositions.current[i].y - dy * 0.18,
            duration: 0.3,
            ease: "power3.out",
          });
        } else {
          gsap.to(el, {
            x: basePositions.current[i].x + dx * 0.015,
            y: basePositions.current[i].y + dy * 0.015,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      });
    };
    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, []);

  // ── Render cards ──────────────────────────────────────────────────────────
  const renderCard = (pos: (typeof scaledCardPositions)[0], i: number) => {
    const ref = (el: HTMLDivElement | null) => {
      elementRefs.current[i] = el;
    };

    const wrapper = (children: React.ReactNode) => (
      <div
        key={`card-${i}`}
        ref={ref}
        className="absolute will-change-transform"
        style={{ zIndex: 100 }}
      >
        {children}
      </div>
    );

    if (pos.type === "flash")
      return wrapper(
        <FlashNewsCard headline={flashNews.headline} tag={flashNews.tag} />,
      );
    if (pos.type === "ticker")
      return wrapper(<TickerCard items={tickerItems} />);
    if (pos.type === "breaking")
      return wrapper(<BreakingCard text={breakingText} />);

    // Fallback: original FloatingCard / IconBubble
    if (pos.type === "card") {
      const card = floatingCards[pos.cardIdx!];
      if (!card) return null;
      return wrapper(
        <FloatingCard
          title={card.title}
          subtitle={card.subtitle}
          icon={card.icon}
        />,
      );
    }
    if (pos.type === "icon") {
      return wrapper(
        <IconBubble icon={<GraduationIcon />} color="text-blue-400" />,
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
      <AnimatedRings size={circleSize} />

      <CyclingImage
        images={resolvedImages}
        size={circleSize}
        intervalMs={imageIntervalMs}
      />

      {scaledCardPositions.map((pos, i) => renderCard(pos, i))}
    </div>
  );
};

export default HeroVisual;
