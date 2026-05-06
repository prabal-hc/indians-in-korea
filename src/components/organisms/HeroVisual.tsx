"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

// ─── FloatingCard ─────────────────────────────────────────────────────────────
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
      const nextIdx = (current + 1) % images.length; // keep cycling in loop
      setNext(nextIdx);
      setFading(true);

      // Animate next layer in, current layer out
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
          // Reset current layer for next cycle
          gsap.set(currentLayerRef.current, { opacity: 1, scale: 1 });
        },
      });

      // Animate dot indicator
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
      }}
    >
      {/* Current image layer */}
      <div ref={currentLayerRef} style={{ position: "absolute", inset: 0 }}>
        <Image
          src={images[current]}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Next image layer (only mounted when transitioning) */}
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

      {/* Dot indicators — bottom center inside the circle */}
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

// ─── Orbiting Avatar ──────────────────────────────────────────────────────────
const TRAIL_LENGTH = 12;

interface OrbitingAvatarProps {
  emoji: string;
  label: string;
  orbitRadius: number;
  startAngleDeg: number;
  speedDegPerSec: number;
  trailColor?: string;
  zIndex?: number;
}

const OrbitingAvatar = ({
  emoji,
  label,
  orbitRadius,
  startAngleDeg,
  speedDegPerSec,
  trailColor = "rgba(99,153,255,0.3)",
  zIndex = 40,
}: OrbitingAvatarProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const angleRef = useRef(startAngleDeg);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const speedMultRef = useRef(1);
  const historyRef = useRef<{ x: number; y: number }[]>([]);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min(now - lastTimeRef.current, 50);
      lastTimeRef.current = now;

      angleRef.current += speedDegPerSec * speedMultRef.current * (dt / 1000);

      const rad = (angleRef.current * Math.PI) / 180;
      const x = Math.cos(rad) * orbitRadius;
      const y = Math.sin(rad) * orbitRadius;

      gsap.set(wrapRef.current, { x, y });

      historyRef.current.unshift({ x, y });
      if (historyRef.current.length > TRAIL_LENGTH) historyRef.current.pop();

      trailRefs.current.forEach((dot, j) => {
        const pt = historyRef.current[j];
        if (!dot) return;
        if (pt) {
          dot.style.display = "block";
          dot.style.transform = `translate(calc(${pt.x}px - 50%), calc(${pt.y}px - 50%))`;
        } else {
          dot.style.display = "none";
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    speedMultRef.current = 2.5;
    gsap.to(bubbleRef.current, {
      scale: 1.25,
      duration: 0.3,
      ease: "back.out(2)",
    });
    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.6,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.fromTo(
      tooltipRef.current,
      { opacity: 0, y: 8, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.8)" },
    );
  };

  const handleMouseLeave = () => {
    setHovered(false);
    speedMultRef.current = 1;
    gsap.to(bubbleRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1,0.45)",
    });
    gsap.to(glowRef.current, { opacity: 0, scale: 1, duration: 0.4 });
    gsap.to(tooltipRef.current, {
      opacity: 0,
      y: 8,
      scale: 0.85,
      duration: 0.2,
    });
  };

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, j) => {
        const size = Math.max(2, 7 - j * 0.42);
        return (
          <div
            key={`trail-${emoji}-${j}`}
            ref={(el) => {
              trailRefs.current[j] = el;
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: size,
              height: size,
              borderRadius: "50%",
              background: trailColor,
              opacity: (1 - j / TRAIL_LENGTH) * 0.55,
              pointerEvents: "none",
              zIndex: zIndex - 1,
              display: "none",
            }}
          />
        );
      })}

      <div
        ref={wrapRef}
        style={{ position: "absolute", zIndex, cursor: "pointer" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,153,255,0.6) 0%, transparent 70%)",
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15,15,35,0.90)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: 20,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: 0,
            boxShadow: "0 4px 18px rgba(0,0,0,0.30)",
            backdropFilter: "blur(8px)",
            letterSpacing: "0.03em",
          }}
        >
          {label}
          <span
            style={{
              position: "absolute",
              bottom: -5,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid rgba(15,15,35,0.90)",
            }}
          />
        </div>
        <div
          ref={bubbleRef}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: hovered
              ? "linear-gradient(135deg,#ddeeff,#ffffff)"
              : "#ffffff",
            boxShadow: hovered
              ? "0 0 0 3px rgba(99,153,255,0.65), 0 8px 24px rgba(80,130,240,0.35)"
              : "0 4px 16px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            border: "2.5px solid #fff",
            transition: "background 0.3s, box-shadow 0.3s",
            willChange: "transform",
          }}
        >
          {emoji}
        </div>
      </div>
    </>
  );
};

// ─── Config ───────────────────────────────────────────────────────────────────
const CARD_POSITIONS = [
  { x: 195, y: -160, type: "card", cardIdx: 0 },
  { x: 170, y: -75, type: "card", cardIdx: 1 },
  { x: 325, y: 5, type: "icon" },
  { x: -65, y: 210, type: "card", cardIdx: 2 },
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
  { id: 3, title: "Tamil Nanbargal", subtitle: "Social", icon: <GroupIcon /> },
];

const ORBIT_AVATARS: OrbitingAvatarProps[] = [
  {
    emoji: "🧑‍💼",
    label: "Professional",
    orbitRadius: 150,
    startAngleDeg: 0,
    speedDegPerSec: 28,
    trailColor: "rgba(99,153,255,0.32)",
  },
  {
    emoji: "👩‍🎓",
    label: "Student",
    orbitRadius: 150,
    startAngleDeg: 180,
    speedDegPerSec: 28,
    trailColor: "rgba(160,99,255,0.32)",
  },
  {
    emoji: "👨‍💻",
    label: "Developer",
    orbitRadius: 190,
    startAngleDeg: 90,
    speedDegPerSec: -20,
    trailColor: "rgba(50,190,150,0.32)",
  },
  {
    emoji: "🎨",
    label: "Designer",
    orbitRadius: 190,
    startAngleDeg: 270,
    speedDegPerSec: -20,
    trailColor: "rgba(240,140,80,0.32)",
  },
];

// ─── Default images — replace with your actual paths ─────────────────────────
const defaultImages = [
  "/images/city_lights.jpg",
  "/images/gallery_pic5.jpg",
  "/images/city_lights_3.jpg",
  "/images/gallery_pic5.jpg",
];

interface HeroVisualProps {
  images?: string[]; // array of image paths to cycle through
  imageSrc?: string; // fallback single image (ignored when images is provided)
  floatingCards?: {
    id: number;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
  }[];
  imageIntervalMs?: number; // how fast to cycle, default 2000ms
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const HeroVisual = ({
  images,
  imageSrc = "/images/city_lights.jpg",
  floatingCards = defaultCards,
  imageIntervalMs = 2000,
}: HeroVisualProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const basePositions = useRef<{ x: number; y: number }[]>([]);

  const CIRCLE_SIZE = 360;

  // Resolve which images array to use
  const resolvedImages = images && images.length > 0 ? images : defaultImages;

  useEffect(() => {
    const ctx = gsap.context(() => {
      CARD_POSITIONS.forEach((pos, i) => {
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
  }, []);

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

  const renderCard = (pos: (typeof CARD_POSITIONS)[0], i: number) => {
    const ref = (el: HTMLDivElement | null) => {
      elementRefs.current[i] = el;
    };
    if (pos.type === "card") {
      const card = floatingCards[pos.cardIdx!];
      if (!card) return null;
      return (
        <div
          key={`card-${i}`}
          ref={ref}
          className="absolute will-change-transform"
          style={{ zIndex: 40 }}
        >
          <FloatingCard
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
          />
        </div>
      );
    }
    if (pos.type === "icon") {
      return (
        <div
          key={`card-${i}`}
          ref={ref}
          className="absolute will-change-transform"
          style={{ zIndex: 40 }}
        >
          <IconBubble icon={<GraduationIcon />} color="text-blue-400" />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] md:h-[540px] flex items-center justify-center"
      style={{ overflow: "visible" }}
    >
      <AnimatedRings size={CIRCLE_SIZE} />

      {/* Cycling image — replaces the static <Image> */}
      <CyclingImage
        images={resolvedImages}
        size={CIRCLE_SIZE}
        intervalMs={imageIntervalMs}
      />

      {ORBIT_AVATARS.map((av, i) => (
        <OrbitingAvatar key={`av-${i}`} {...av} />
      ))}

      {CARD_POSITIONS.map((pos, i) => renderCard(pos, i))}
    </div>
  );
};

export default HeroVisual;
