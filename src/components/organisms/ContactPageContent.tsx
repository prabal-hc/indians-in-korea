"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, animate } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — mirrors HeroText's orange/warm palette exactly
// ─────────────────────────────────────────────────────────────────────────────

const ORANGE = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c",
};

// ─────────────────────────────────────────────────────────────────────────────
// WORD VARIANT — same staggered reveal as HeroText
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
      delay: 0.18 + i * 0.07,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER — same as HeroText stats
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
// MAGNETIC WRAP — same hook as HeroText
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
// SECTION BADGE — identical to HeroText badge pattern
// ─────────────────────────────────────────────────────────────────────────────

function SectionBadge({ label, inView }: { label: string; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-fit"
      style={{
        animationName: inView ? "badgeFloat" : "none",
        animationDuration: "3.5s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDelay: "0.8s",
      }}
    >
      <div
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full w-fit cursor-default select-none relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)",
          border: "1px solid rgba(249,115,22,0.22)",
        }}
      >
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
        <span
          className="text-base text-orange-500 relative z-10"
          style={{
            display: "inline-block",
            animationName: "iconPulse",
            animationDuration: "2.6s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: "0.9s",
          }}
        >
          ⊙
        </span>
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-orange-600 relative z-10">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGHLIGHT HEADLINE — same word-split gradient + underline as HeroText
// ─────────────────────────────────────────────────────────────────────────────

function HighlightHeadline({
  headline,
  highlight,
  inView,
}: {
  headline: string;
  highlight: string;
  inView: boolean;
}) {
  const words = headline.split(" ");
  const hlWords = highlight.trim().split(" ");
  type Seg = { text: string; isHighlight: boolean; index: number };
  const segments: Seg[] = [];
  let wi = 0;
  for (let i = 0; i < words.length; ) {
    const chunk = words.slice(i, i + hlWords.length).join(" ");
    if (chunk === highlight) {
      segments.push({ text: chunk, isHighlight: true, index: wi++ });
      i += hlWords.length;
    } else {
      segments.push({ text: words[i], isHighlight: false, index: wi++ });
      i++;
    }
  }

  return (
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
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING INPUT — animated focus ring matching orange palette
// ─────────────────────────────────────────────────────────────────────────────

function FloatingField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  rows,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: any) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const sharedClass = `
    w-full bg-white/70 px-4 pt-6 pb-2.5 rounded-xl border transition-all duration-200
    text-gray-900 placeholder-transparent peer resize-none outline-none
    ${
      focused
        ? "border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
        : "border-gray-200 hover:border-orange-200"
    }
  `;

  return (
    <div className="relative">
      {rows ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClass}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClass}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium
          ${
            focused || hasValue
              ? "top-2 text-[10px] tracking-wider uppercase text-orange-500"
              : "top-4 text-sm text-gray-400"
          }`}
      >
        {label}
      </label>
      {/* animated bottom bar */}
      <motion.span
        className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 origin-left"
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT INFO CARD — uses same ambient-glow + hover-lift as HeroText stat
// ─────────────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@indiansinkorea.com",
    href: "mailto:contact@indiansinkorea.com",
    color: "#f97316",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+82 (0)10-XXXX-XXXX",
    href: "tel:+82",
    color: "#fb923c",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Seoul, South Korea",
    href: "#",
    color: "#ea580c",
  },
];

function ContactCard({
  info,
  delay,
}: {
  info: (typeof contactInfo)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = info.icon;

  return (
    <motion.a
      href={info.href}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -3,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      className="group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer"
      style={{
        background: hovered
          ? "linear-gradient(135deg,#fff7ed,#ffedd5)"
          : "rgba(255,255,255,0.8)",
        border: hovered
          ? `1px solid rgba(249,115,22,0.3)`
          : "1px solid rgba(203,213,225,0.6)",
        boxShadow: hovered
          ? "0 10px 30px rgba(249,115,22,0.1), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Icon blob glow — mirrors HeroText ambient blob */}
      <div
        aria-hidden
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${info.color}22 0%, transparent 70%)`,
          filter: "blur(12px)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <motion.div
        animate={hovered ? { scale: 1.12, rotate: 6 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: hovered
            ? `linear-gradient(135deg,${info.color}25,${info.color}10)`
            : "#fff7ed",
          border: `1px solid ${info.color}30`,
        }}
      >
        <Icon size={20} style={{ color: info.color }} />
      </motion.div>

      <div className="relative z-10 min-w-0">
        <p className="text-[10px] font-bold tracking-wider uppercase text-orange-500 mb-0.5">
          {info.label}
        </p>
        <p className="text-gray-800 font-semibold text-sm truncate group-hover:text-orange-700 transition-colors duration-300">
          {info.value}
        </p>
      </div>

      {/* Shimmer on hover — same as HeroText badge */}
      {hovered && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.5) 50%,transparent 60%)",
            animation: "shimmerSweep 0.7s ease-out",
          }}
        />
      )}
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBMIT BUTTON — matches HeroText primary CTA exactly
// ─────────────────────────────────────────────────────────────────────────────

function SubmitButton({ loading }: { loading: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [shineActive, setShineActive] = useState(false);

  return (
    <MagneticWrap strength={0.22}>
      <motion.div
        className="relative overflow-hidden rounded-full"
        onMouseEnter={() => {
          setHovered(true);
          setShineActive(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setTimeout(() => setShineActive(false), 500);
        }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          boxShadow: hovered
            ? "0 10px 35px rgba(249,115,22,0.35), 0 2px 12px rgba(249,115,22,0.18)"
            : "0 4px 18px rgba(249,115,22,0.16)",
        }}
      >
        {shineActive && (
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.4) 50%,transparent 65%)",
              animation: "shimmerSweep 0.65s ease-out forwards",
            }}
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase text-white transition-all duration-200 disabled:opacity-60 relative z-10"
          style={{
            background: loading
              ? "#9ca3af"
              : "linear-gradient(135deg,#f97316 0%,#fb923c 50%,#ea580c 100%)",
            backgroundSize: "200% auto",
            animation: loading ? "none" : "gradShift 3.5s ease-in-out infinite",
          }}
        >
          {loading ? (
            <>
              <Loader size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
              <motion.span
                animate={hovered ? { x: 4 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="inline-flex"
              />
            </>
          )}
        </button>
      </motion.div>
    </MagneticWrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS — identical pattern to HeroText
// ─────────────────────────────────────────────────────────────────────────────

const stats = [
  { value: 5000, suffix: "k+", label: "Members", delay: 0 },
  { value: 120, suffix: "+", label: "Events", delay: 0.12 },
  { value: 15, suffix: "+", label: "Organizations", delay: 0.24 },
];
// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-40px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("idle");
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3500);
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Failed to send. Please try again.");
      setTimeout(() => setSubmitStatus("idle"), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen overflow-hidden relative"
      style={{
        background:
          "linear-gradient(160deg,#fff7ed 0%,#ffffff 35%,#fff7ed 70%,#ffffff 100%)",
      }}
    >
      {/* ── Global keyframes — identical set to HeroText ── */}
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
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .field-group { position: relative; }
        input::placeholder,textarea::placeholder { color: transparent; }
      `}</style>

      {/* ── Large ambient blobs — mirrors HeroText blob ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle,rgba(255,153,51,0.09) 0%,rgba(255,120,30,0.04) 45%,transparent 70%)",
          filter: "blur(60px)",
          animation: "blobDrift 9s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 70%)",
          filter: "blur(50px)",
          animation: "blobDrift 11s ease-in-out infinite alternate-reverse",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse,rgba(255,153,51,0.06) 0%,transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── HERO HEADER — replicates HeroText layout ── */}
      <section className="relative px-6 lg:px-16 pt-20 lg:pt-28 pb-10 lg:pb-14">
        <div className="mx-auto max-w-8xl">
          <div className="flex flex-col space-y-5 max-w-2xl">
            <SectionBadge label="Community Hub" inView={inView} />

            <HighlightHeadline
              headline="Get in Touch With Us"
              highlight="in Touch"
              inView={inView}
            />

            <motion.p
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.7,
                delay: 0.72,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
            >
              Have questions or want to connect with the Indian community in
              Korea? Reach out — let's build something stronger together.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <div className="relative px-6 lg:px-16 pb-20 lg:pb-28">
        <div className="mx-auto max-w-8xl">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* ── FORM COLUMN (wider) ── */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={scaleIn}
              className="lg:col-span-3 relative"
            >
              {/* Floating decoration dot — same visual language as HeroText underline */}
              <div
                aria-hidden
                className="absolute -top-3 -left-3 w-6 h-6 rounded-full border-2 border-orange-200 hidden lg:block"
                style={{ animation: "floatY 4s ease-in-out infinite" }}
              />
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 w-4 h-4 rounded-full bg-orange-100 border border-orange-300 hidden lg:block"
                style={{ animation: "floatY 5s ease-in-out infinite reverse" }}
              />

              <form
                onSubmit={handleSubmit}
                className="relative rounded-2xl p-8 sm:p-10 backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.82)",
                  border: "1px solid rgba(249,115,22,0.1)",
                  boxShadow:
                    "0 24px 64px rgba(249,115,22,0.08), 0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                {/* Card shimmer line at top — decorative gradient border */}
                <div
                  className="absolute top-0 left-8 right-8 h-[1.5px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(249,115,22,0.4),transparent)",
                  }}
                />

                <div className="mb-7">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    Send us a Message
                  </h2>
                  <p className="text-sm text-gray-400 tracking-wide">
                    We'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingField
                      label="Full Name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                    <FloatingField
                      label="Email Address"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>

                  <FloatingField
                    label="Subject"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                  />

                  <FloatingField
                    label="Message"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more..."
                    rows={5}
                  />
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <SubmitButton loading={loading} />

                  <p className="text-[10px] text-gray-400 tracking-wide max-w-[200px] leading-relaxed">
                    By submitting you agree to our{" "}
                    <span className="text-orange-500 underline cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </p>
                </div>

                {/* Status messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      color: "#166534",
                    }}
                  >
                    <CheckCircle size={16} />
                    Message sent successfully! We'll be in touch soon.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#991b1b",
                    }}
                  >
                    <AlertCircle size={16} />
                    {errorMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* ── INFO COLUMN ── */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={stagger}
              className="lg:col-span-2 flex flex-col space-y-4 lg:pt-2"
            >
              <motion.div variants={fadeUp} className="mb-2">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Contact Information
                </h2>
                <p className="text-sm text-gray-400">
                  Find us through any of these channels.
                </p>
              </motion.div>

              {contactInfo.map((info, i) => (
                <ContactCard key={i} info={info} delay={0.1 + i * 0.08} />
              ))}

              {/* Social card — matches HeroText badge aesthetic */}
              <motion.div
                variants={fadeUp}
                className="mt-2 p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg,#fff7ed 0%,#ffedd5 60%,#fed7aa 100%)",
                  border: "1px solid rgba(249,115,22,0.18)",
                  boxShadow: "0 4px 20px rgba(249,115,22,0.08)",
                }}
              >
                {/* Decorative dot grid */}
                <div
                  aria-hidden
                  className="absolute top-3 right-4 grid grid-cols-3 gap-1.5 opacity-20"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-orange-500"
                    />
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-orange-500 mb-3">
                  <span
                    style={{
                      animationName: "iconPulse",
                      animationDuration: "2.6s",
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                      display: "inline-block",
                    }}
                  >
                    ⊙
                  </span>
                  Follow &amp; Connect
                </span>

                <h3 className="font-bold text-gray-900 mb-1.5 text-base">
                  Stay in the Loop
                </h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Follow our channels for community events, announcements, and
                  more.
                </p>

                <div className="flex gap-2.5">
                  {["Facebook", "Instagram"].map((label) => (
                    <MagneticWrap key={label} strength={0.18}>
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase text-orange-600 transition-all duration-200 relative overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.8)",
                          border: "1px solid rgba(249,115,22,0.22)",
                          backdropFilter: "blur(6px)",
                          boxShadow: "0 2px 8px rgba(249,115,22,0.1)",
                        }}
                      >
                        {label}
                      </motion.a>
                    </MagneticWrap>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CTA SECTION — same pattern as HeroText CTAs ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative px-6 lg:px-16 py-16 lg:py-20 border-t"
        style={{ borderColor: "rgba(249,115,22,0.1)" }}
      >
        {/* Same ambient blob as section header */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-[500px] h-[200px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse,rgba(255,153,51,0.07) 0%,transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
      </motion.section>
    </div>
  );
}
