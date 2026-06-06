"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, animate } from "framer-motion";
import { Button } from "@/components/atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface HeroTextProps {
  badge: string;
  headline: string;
  highlightWord: string;
  description: string;
  primaryCta: { label: string; href: string; icon?: string };
  secondaryCta: { label: string; href: string };
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER — counts from 0 to target when in view
// ─────────────────────────────────────────────────────────────────────────────

const AnimatedCounter = ({
  target,
  suffix = "",
  delay = 0,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const controls = animate(0, target, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, delay]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON WRAPPER — cursor-reactive subtle pull
// ─────────────────────────────────────────────────────────────────────────────

const MagneticWrap = ({
  children,
  strength = 0.28,
}: {
  children: React.ReactNode;
  strength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 22 });
  const y = useSpring(0, { stiffness: 180, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WORD VARIANT — staggered headline word reveal
// ─────────────────────────────────────────────────────────────────────────────

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(5px)", scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.38 + i * 0.07,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const HeroText: React.FC<HeroTextProps> = ({
  badge,
  headline,
  highlightWord,
  description,
  primaryCta,
  secondaryCta,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-40px" });

  const [shineActive, setShineActive] = useState(false);
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  // Build word segments preserving highlight phrase (single or multi-word)
  const words = headline.split(" ");
  const highlightWords = highlightWord.trim().split(" ");
  type Segment = { text: string; isHighlight: boolean; index: number };
  const segments: Segment[] = [];
  let widx = 0;
  for (let i = 0; i < words.length; ) {
    const chunk = words.slice(i, i + highlightWords.length).join(" ");
    if (chunk === highlightWord) {
      segments.push({ text: chunk, isHighlight: true, index: widx++ });
      i += highlightWords.length;
    } else {
      segments.push({ text: words[i], isHighlight: false, index: widx++ });
      i++;
    }
  }

  const stats = [
    { value: 5000, suffix: "k+", label: "Members", delay: 0 },
    { value: 120, suffix: "+", label: "Events", delay: 0.12 },
    { value: 15, suffix: "+", label: "Organizations", delay: 0.24 },
  ];

  return (
    <div
      ref={rootRef}
      className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 relative"
    >
      {/* Global keyframes */}
      <style>{`
        @keyframes blobDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(18px,14px) scale(1.08); }
        }
        @keyframes shimmerSweep {
          0%   { left: -100%; }
          100% { left: 160%; }
        }
        @keyframes gradShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes badgeFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes iconPulse {
          0%,100% { transform: scale(1) rotate(0deg); }
          50%      { transform: scale(1.18) rotate(8deg); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,153,51,0.0); }
          50%      { box-shadow: 0 0 18px 4px rgba(255,153,51,0.22); }
        }
        @keyframes underlineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* ── Ambient glow blob ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-24 w-[340px] h-[340px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,153,51,0.10) 0%, rgba(255,120,30,0.05) 45%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
          animation: "blobDrift 9s ease-in-out infinite alternate",
        }}
      />

      {/* ── BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: -14, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-fit"
        style={{
          zIndex: 1,
          animationName: inView ? "badgeFloat" : "none",
          animationDuration: inView ? "3.5s" : "0s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: inView ? "infinite" : "1",
          animationDelay: "0.8s",
        }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full w-fit cursor-default select-none relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)",
            border: "1px solid rgba(249,115,22,0.22)",
            animationName: inView ? "glowPulse" : "none",
            animationDuration: inView ? "3s" : "0s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: inView ? "infinite" : "1",
            animationDelay: "1s",
          }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 22px 5px rgba(255,153,51,0.22)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Shimmer sweep */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 w-12 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              animationName: "shimmerSweep",
              animationDuration: "2.8s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: "1.2s",
            }}
          />
          {/* Pulsing icon */}
          <span
            className="text-base sm:text-lg text-orange-500 relative z-10"
            style={{
              animationName: inView ? "iconPulse" : "none",
              animationDuration: inView ? "2.6s" : "0s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: inView ? "infinite" : "1",
              animationDelay: "0.9s",
              display: "inline-block",
            }}
          >
            ⊙
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase text-orange-600 relative z-10">
            {badge}
          </span>
        </motion.div>
      </motion.div>

      {/* ── HEADLINE — word-by-word reveal ── */}
      <div style={{ zIndex: 1 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          {segments.map((seg, i) => (
            <React.Fragment key={i}>
              {i > 0 && " "}
              {seg.isHighlight ? (
                <motion.span
                  custom={seg.index}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  variants={wordVariant}
                  className="inline-block relative"
                >
                  {/* Animated gradient on highlight word */}
                  <motion.span
                    style={{
                      background:
                        "linear-gradient(90deg, #f97316 0%, #fb923c 30%, #fdba74 55%, #f97316 80%, #ea580c 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "gradShift 3.5s ease-in-out infinite",
                      display: "inline-block",
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    {seg.text}
                  </motion.span>
                  {/* Animated underline */}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 right-0 rounded-full"
                    style={{
                      bottom: "-2px",
                      height: "2.5px",
                      background:
                        "linear-gradient(90deg, #f97316, #fb923c, #f97316)",
                      backgroundSize: "200% auto",
                      animation: "gradShift 2.5s ease-in-out infinite",
                      transformOrigin: "left",
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 0.7 } : {}}
                    transition={{
                      duration: 0.65,
                      delay: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </motion.span>
              ) : (
                <motion.span
                  custom={seg.index}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  variants={wordVariant}
                  style={{ display: "inline-block" }}
                >
                  {seg.text}
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </h1>
      </div>

      {/* ── DESCRIPTION ── */}
      <motion.p
        initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-lg md:max-w-xl leading-relaxed"
        style={{ zIndex: 1 }}
      >
        {description}
      </motion.p>

      {/* ── CTA BUTTONS ── */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
        style={{ zIndex: 1 }}
      >
        {/* Primary CTA */}
        <motion.div
          className="relative overflow-hidden rounded-full"
          onMouseEnter={() => {
            setPrimaryHovered(true);
            setShineActive(true);
          }}
          onMouseLeave={() => {
            setPrimaryHovered(false);
            setTimeout(() => setShineActive(false), 500);
          }}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{ scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          style={{
            boxShadow: primaryHovered
              ? "0 10px 35px rgba(249,115,22,0.35), 0 2px 12px rgba(249,115,22,0.18)"
              : "0 4px 18px rgba(249,115,22,0.16)",
          }}
        >
          {/* Shine Sweep */}
          {shineActive && (
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)",
                animation: "shimmerSweep 0.65s ease-out forwards",
              }}
            />
          )}

          <Button
            variant="primary"
            href={primaryCta.href}
            icon={primaryCta.icon}
            className="text-base relative"
          >
            <span className="flex items-center gap-2">
              {primaryCta.label}

              <motion.span
                animate={primaryHovered ? { x: 4 } : { x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                }}
                className="inline-flex"
              ></motion.span>
            </span>
          </Button>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          onMouseEnter={() => setSecondaryHovered(true)}
          onMouseLeave={() => setSecondaryHovered(false)}
          whileHover={{
            scale: 1.02,
            y: -1,
          }}
          whileTap={{ scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          style={{
            borderRadius: 9999,
            boxShadow: secondaryHovered
              ? "0 0 0 1.5px rgba(249,115,22,0.28), 0 8px 24px rgba(0,0,0,0.06)"
              : "0 0 0 1px rgba(0,0,0,0.05)",
            backdropFilter: secondaryHovered ? "blur(8px)" : "blur(0px)",
          }}
        >
          <Button
            variant="secondary"
            href={secondaryCta.href}
            className="text-base"
          >
            {secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* ── STATS ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-6 md:gap-8 pt-6 relative"
        style={{ zIndex: 1 }}
      >
        {/* Gradient divider */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(249,115,22,0.28), rgba(203,213,225,0.5), transparent)",
          }}
        />

        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              duration: 0.6,
              delay: 1.18 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -2,
              transition: { type: "spring", stiffness: 300, damping: 22 },
            }}
            className="cursor-default group"
          >
            <div
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #ea580c 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition: "filter 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "drop-shadow(0 0 8px rgba(249,115,22,0.45))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter = "none";
              }}
            >
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                delay={1.2 + i * 0.1}
              />
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5 font-medium tracking-wide group-hover:text-gray-700 transition-colors duration-300">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroText;
