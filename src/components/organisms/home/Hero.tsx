"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  getAll,
  AnnouncementItem,
} from "@/services/admin/announcements.service";
import { getLenis } from "@/lib/scroll";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const ROTATING_WORDS = [
  { text: "Connect", color: "#ff9933" },
  { text: "Celebrate", color: "#60a5fa" },
  { text: "Belong", color: "#4ade80" },
  { text: "Grow", color: "#c084fc" },
  { text: "Thrive", color: "#fb923c" },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Members" },
  { value: 120, suffix: "+", label: "Events Hosted" },
  { value: 8, suffix: "+", label: "Cities Connected" },
  { value: 15, suffix: "+", label: "Partners" },
];

const CHIP_DOT_COLORS = ["#f87171", "#4ade80", "#60a5fa", "#fbbf24", "#c084fc"];

// ─────────────────────────────────────────────────────────────────────────────
// useWindowSize
// ─────────────────────────────────────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

// ─────────────────────────────────────────────────────────────────────────────
// Easing
// ─────────────────────────────────────────────────────────────────────────────
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ─────────────────────────────────────────────────────────────────────────────
// useAnimatedCounter
// ─────────────────────────────────────────────────────────────────────────────
function useAnimatedCounter(target: number, active: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    let start: number | null = null;
    const duration = 1800;
    const timer = setTimeout(() => {
      const tick = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.round(easeOutExpo(p) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, target, delay]);

  return val;
}

// ─────────────────────────────────────────────────────────────────────────────
// RotatingWord
// ─────────────────────────────────────────────────────────────────────────────
function RotatingWord({ visible }: { visible: boolean }) {
  const [idx, setIdx] = useState(0);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setAnimIn(true), 200);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setAnimIn(false);
      setTimeout(() => {
        setIdx((p) => (p + 1) % ROTATING_WORDS.length);
        setAnimIn(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, [visible]);

  const w = ROTATING_WORDS[idx];
  return (
    <span
      style={{
        display: "inline-block",
        color: w.color,
        opacity: animIn ? 1 : 0,
        transform: animIn ? "translateY(0)" : "translateY(16px)",
        filter: animIn ? "blur(0)" : "blur(4px)",
        transition:
          "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
      }}
    >
      {w.text}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LiveDot
// ─────────────────────────────────────────────────────────────────────────────
function LiveDot({ color }: { color: string }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        width: 7,
        height: 7,
        flexShrink: 0,
      }}
    >
      <style>{`@keyframes pingDot{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.2);opacity:0}}`}</style>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: color,
          animation: "pingDot 1.6s ease-out infinite",
        }}
      />
      <span
        style={{
          position: "relative",
          borderRadius: "50%",
          width: 7,
          height: 7,
          background: color,
          display: "block",
        }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FloatingChip
// ─────────────────────────────────────────────────────────────────────────────
interface FloatingChipProps {
  category: string;
  text: string;
  dotColor: string;
  floatDelay?: number;
  visible: boolean;
  chipDelay?: number;
  compact?: boolean;
}

function FloatingChip({
  category,
  text,
  dotColor,
  floatDelay = 0,
  visible,
  chipDelay = 0,
  compact = false,
}: FloatingChipProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShow(true), chipDelay);
    return () => clearTimeout(t);
  }, [visible, chipDelay]);

  return (
    <div
      style={{
        background: "rgba(8,10,20,0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 10,
        padding: compact ? "8px 11px" : "10px 14px",
        display: "flex",
        alignItems: "flex-start",
        gap: 9,
        minWidth: compact ? 160 : 200,
        maxWidth: compact ? 210 : 250,
        opacity: show ? 1 : 0,
        transform: show ? "translateX(0)" : "translateX(24px)",
        transition:
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        animation: show
          ? `chipFloat${floatDelay} ${3.5 + floatDelay * 0.7}s ease-in-out ${floatDelay * 0.4}s infinite alternate`
          : "none",
      }}
    >
      <style>{`
        @keyframes chipFloat0{from{transform:translateY(0)}to{transform:translateY(-8px)}}
        @keyframes chipFloat1{from{transform:translateY(0)}to{transform:translateY(-10px)}}
        @keyframes chipFloat2{from{transform:translateY(0)}to{transform:translateY(-6px)}}
      `}</style>
      <div style={{ marginTop: 2 }}>
        <LiveDot color={dotColor} />
      </div>
      <div>
        <div
          style={{
            fontSize: 8,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: dotColor,
            fontWeight: 600,
            marginBottom: 3,
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: compact ? 11 : 12,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.45,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ParticleCanvas
// ─────────────────────────────────────────────────────────────────────────────
function ParticleCanvas({
  mouse,
  isMobile,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = [
      "#ff9933",
      "#138808",
      "rgba(255,255,255,0.9)",
      "#3b82f6",
      "#a78bfa",
    ];
    const COUNT = isMobile ? 28 : 50;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.28 + 0.06,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;
        if (!isMobile) {
          const dx = p.x - mx,
            dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90 && dist > 0) {
            p.x += (dx / dist) * 0.35;
            p.y += (dy / dist) * 0.35;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const h = Math.round(p.alpha * 255)
          .toString(16)
          .padStart(2, "0");
        ctx.fillStyle = p.color.startsWith("rgba")
          ? p.color.replace(/[\d.]+\)$/, `${p.alpha})`)
          : p.color + h;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [mouse, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StatCounter
// ─────────────────────────────────────────────────────────────────────────────
function StatCounter({
  value,
  suffix,
  label,
  active,
  delay,
  isMobile,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  delay: number;
  isMobile: boolean;
}) {
  const count = useAnimatedCounter(value, active, delay);
  return (
    <>
      <div
        style={{
          fontFamily: "'Bebas Neue','Impact',sans-serif",
          fontSize: isMobile
            ? "clamp(22px,6vw,30px)"
            : "clamp(24px,2.8vw,40px)",
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "0.02em",
        }}
      >
        {count >= 1000 ? count.toLocaleString() : count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          marginTop: 5,
        }}
      >
        {label}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
export const Hero = () => {
  const { w } = useWindowSize();

  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;

  const px = isMobile ? 20 : isTablet ? 32 : 52;
  const pbBottom = isMobile ? 36 : isTablet ? 48 : 56;

  const [phase, setPhase] = useState<"video" | "line" | "content">("video");
  const [lineProgress, setLineProgress] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  useEffect(() => {
    getAll()
      .then((data) => setAnnouncements(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  const mouse = useRef({ x: -999, y: -999 });

  // ── Intro sequence ───────────────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 2200);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "line") return;
    let start: number | null = null;
    const duration = 900;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setLineProgress(easeOutExpo(p));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("content");
          setContentVisible(true);
          setTimeout(() => setStatsActive(true), 1200);
        }, 120);
      }
    };
    requestAnimationFrame(tick);
  }, [phase]);

  // ── Scroll ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = getLenis();

    if (lenis) {
      const onLenisScroll = (event: { scroll: number }) =>
        setScrollY(event.scroll);
      lenis.on("scroll", onLenisScroll);
      return () => lenis.off("scroll", onLenisScroll);
    }

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll-based fade: 0 → fully hidden by 350px ────────────────────────
  const contentOpacity = Math.max(0, 1 - scrollY / 350);
  const chipsOpacity = Math.max(0, 1 - scrollY / 280);
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollY / 200);
  const isContentHidden = scrollY > 300;

  // Custom cursor removed — use default system cursor.
  const onBtnEnter = useCallback(() => {}, []);
  const onBtnLeave = useCallback(() => {}, []);

  const cs = (delay: number): React.CSSProperties => ({
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? "translateY(0)" : "translateY(36px)",
    filter: contentVisible ? "blur(0)" : "blur(6px)",
    transition: `opacity 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                 transform 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                 filter 1s ease ${delay}ms`,
  });

  const videoParallax = isMobile ? 0 : -scrollY * 0.22;
  const contentParallax = isMobile ? 0 : -scrollY * 0.07;

  const headlineSz = isMobile
    ? "clamp(38px, 11vw, 52px)"
    : isTablet
      ? "clamp(44px, 7vw, 64px)"
      : "clamp(52px, 5.5vw, 82px)";

  return (
    <>
      {/* custom cursor removed */}

      {/* ── SECTION ── */}
      <section
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100svh",
          minHeight: isMobile ? 580 : 640,
          background: "#050710",
          overflow: "hidden",
          cursor: "auto",
          zIndex: 0,
        }}
      >
        {/* Layer 1 — Video */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            willChange: "transform",
            transform: `translateY(${videoParallax}px) scale(1.05)`,
            transformOrigin: "center",
          }}
        >
          <video
            autoPlay
            muted
            playsInline
            loop
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 1,
            }}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Layer 2 — Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom," +
              "rgba(5,7,16,0.60) 0%," +
              "rgba(5,7,16,0.10) 28%," +
              "rgba(5,7,16,0.30) 60%," +
              "rgba(5,7,16,0.96) 100%)",
          }}
        />

        {/* Layer 3 — Ambient glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "-8%",
              width: "55%",
              height: "60%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(255,153,51,0.07) 0%,transparent 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              right: "-5%",
              width: "42%",
              height: "45%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(19,136,8,0.055) 0%,transparent 65%)",
            }}
          />
        </div>

        {/* Layer 4 — Particles */}
        <ParticleCanvas mouse={mouse} isMobile={isMobile} />

        {/* ── Reveal Line ── */}
        {(phase === "line" || phase === "content") && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              zIndex: 20,
              pointerEvents: "none",
              transform: "translateY(-50%)",
              opacity: phase === "content" ? 0 : 1,
              transition: phase === "content" ? "opacity 0.5s ease" : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                height: 1,
                width: `${lineProgress * 100}%`,
                background:
                  "linear-gradient(to right,transparent,#ff9933 30%,#fff 50%,#ff9933 70%,transparent)",
                transform: "translateY(-50%)",
                boxShadow:
                  "0 0 12px rgba(255,153,51,0.85),0 0 30px rgba(255,153,51,0.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${lineProgress * 100}%`,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#ff9933",
                transform: "translate(-50%,-50%)",
                boxShadow: "0 0 14px 4px rgba(255,153,51,0.95)",
              }}
            />
          </div>
        )}

        {/* ── Floating Chips ── */}
        {!isMobile && announcements.length > 0 && (
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              top: "50%",
              right: isTablet ? 16 : 32,
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: isTablet ? 10 : 12,
              opacity: chipsOpacity,
              transition: "opacity 0.1s linear",
              pointerEvents: isContentHidden ? "none" : "auto",
            }}
          >
            {announcements.map((a, i) => (
              <FloatingChip
                key={a.id}
                category={a.category ?? a.title}
                text={a.description}
                dotColor={CHIP_DOT_COLORS[i % CHIP_DOT_COLORS.length]}
                floatDelay={i % 3}
                visible={contentVisible}
                chipDelay={600 + i * 180}
                compact={isTablet}
              />
            ))}
          </div>
        )}

        {/* ── Hero Content ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: `0 ${px}px ${pbBottom}px`,
            willChange: "transform, opacity",
            transform: `translateY(${contentParallax}px)`,
            opacity: contentOpacity,
            transition: "opacity 0.1s linear",
            pointerEvents: isContentHidden ? "none" : "auto",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: isMobile ? 9 : 10,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "rgba(255,153,51,0.78)",
              marginBottom: isMobile ? 12 : 16,
              ...cs(100),
            }}
          >
            <span
              style={{
                width: 20,
                height: 1,
                background: "rgba(255,153,51,0.35)",
                flexShrink: 0,
              }}
            />
            Connecting Indians Across Korea
          </div>

          {/* Headline line 1 */}
          <div style={{ overflow: "hidden", marginBottom: 2 }}>
            <h1
              style={{
                fontFamily: "'Bebas Neue','Impact',sans-serif",
                fontSize: headlineSz,
                lineHeight: 1.0,
                letterSpacing: "0.01em",
                color: "#fff",
                margin: 0,
                ...cs(200),
              }}
            >
              Where Indians
            </h1>
          </div>

          {/* Headline line 2 */}
          <div style={{ overflow: "hidden", marginBottom: isMobile ? 18 : 24 }}>
            <h1
              style={{
                fontFamily: "'Bebas Neue','Impact',sans-serif",
                fontSize: headlineSz,
                lineHeight: 1.0,
                letterSpacing: "0.01em",
                color: "#fff",
                margin: 0,
                ...cs(340),
              }}
            >
              in Korea&nbsp;
              <RotatingWord visible={contentVisible} />
            </h1>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: isMobile ? 13 : 14,
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.5)",
              maxWidth: isMobile ? "100%" : 440,
              marginBottom: isMobile ? 28 : 36,
              letterSpacing: "0.015em",
              ...cs(500),
            }}
          >
            A thriving community of students, professionals, entrepreneurs,
            families, and creators building meaningful connections across South
            Korea.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              gap: isMobile ? 12 : 16,
              marginBottom: isMobile ? 28 : 48,
              ...cs(660),
            }}
          >
            <Link
              href="/community"
              onMouseEnter={onBtnEnter}
              onMouseLeave={onBtnLeave}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: "#ff9933",
                color: "#000",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: isMobile ? "14px 0" : "14px 30px",
                borderRadius: 5,
                textDecoration: "none",
                boxShadow: "0 0 32px rgba(255,153,51,0.28)",
                transition: "transform .2s,box-shadow .2s,background .2s",
              }}
            >
              Explore Community
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/contact"
              onMouseEnter={onBtnEnter}
              onMouseLeave={onBtnLeave}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.18)",
                padding: isMobile ? "13px 0" : "13px 26px",
                borderRadius: 5,
                background: "rgba(255,255,255,0.04)",
                textDecoration: "none",
                transition: "background .25s,border-color .25s,color .25s",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Become a Member
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              flexWrap: isMobile ? "wrap" : "nowrap",
              gap: 0,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: isMobile ? 20 : 26,
              ...cs(820),
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  flex: isMobile ? "1 1 50%" : "1 1 0",
                  borderRight: isMobile
                    ? i % 2 === 0
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none"
                    : i < STATS.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                  borderBottom:
                    isMobile && i < 2
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                  padding: isMobile
                    ? `14px ${i % 2 === 0 ? 16 : 0}px 14px ${i % 2 === 0 ? 0 : 16}px`
                    : `0 ${i === STATS.length - 1 ? 0 : 24}px 0 ${i === 0 ? 0 : 24}px`,
                }}
              >
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  active={statsActive}
                  delay={i * 120}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: 32,
              right: px,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              writingMode: "vertical-rl",
              opacity: scrollIndicatorOpacity,
              transition: "opacity 0.1s linear",
              pointerEvents: "none",
              ...cs(1000),
            }}
          >
            <style>{`@keyframes sdrop{0%{transform:translateY(-40px)}100%{transform:translateY(80px)}}`}</style>
            <div
              style={{
                width: 1,
                height: 40,
                background: "rgba(255,255,255,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: 1,
                  height: 40,
                  background: "rgba(255,255,255,0.55)",
                  animation: "sdrop 2s ease-in-out infinite",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 8,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              Scroll
            </span>
          </div>
        )}

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: isMobile ? 140 : 220,
            zIndex: 15,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom,transparent,rgba(5,7,16,0.98) 85%,rgba(255,247,237,0.15) 100%)",
          }}
        />
      </section>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        a:hover { opacity: 0.85; }
      `}</style>
    </>
  );
};

export default Hero;
