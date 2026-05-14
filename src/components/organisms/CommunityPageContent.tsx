"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const communities = [
  {
    id: "ktn",
    name: "Korea Tamil Nanbargal",
    abbr: "KTN",
    tag: "Cultural & Regional",
    tagColor: "#c2410c",
    tagBg: "rgba(234,88,12,0.09)",
    accentColor: "#ea580c",
    borderColor: "rgba(234,88,12,0.22)",
    cardBg: "linear-gradient(135deg, #fff8f4 0%, #ffffff 65%)",
    description:
      "Founded in 2003, Korea Tamil Nanbargal is the first Tamil organization in Korea. Uniting Tamils across the nation, KTN provides medical emergency funds, supports underprivileged students in Tamil Nadu, and serves orphanages during festivals.",
    highlights: [
      "Est. 2003 — First Tamil org in Korea",
      "Emergency medical funds for members",
      "Free education support in Tamil Nadu",
      "Cultural exchange & language programs",
    ],
    links: {
      website: "http://koreatamilnanbargal.com/",
      facebook: "https://www.facebook.com/groups/KTN2011/",
    },
    icon: "🎶",
    size: "large",
    members: "2,000+",
    since: "2003",
  },
  {
    id: "ktn-school",
    name: "KTN Digital Online School",
    abbr: "KDS",
    tag: "Educational",
    tagColor: "#1d4ed8",
    tagBg: "rgba(37,99,235,0.08)",
    accentColor: "#2563eb",
    borderColor: "rgba(37,99,235,0.22)",
    cardBg: "linear-gradient(135deg, #f4f8ff 0%, #ffffff 65%)",
    description:
      'Motto: "Education for All and Education for Free." Founded Nov 2019, KTN Digital Online School offers CBSE curriculum K–8 entirely free, powered by 26+ volunteer teachers.',
    highlights: [
      "Free CBSE K–8 online education",
      "26+ dedicated volunteer teachers",
      "English, Math, Science, Tamil, Hindi, Telugu & Korean",
      "Annual Day, exams & report cards",
    ],
    links: { email: "ktndigitalonlineschool@gmail.com" },
    icon: "📚",
    size: "medium",
    members: "300+ students",
    since: "2019",
  },
  {
    id: "bak",
    name: "Bengali Association of Korea",
    abbr: "BAK",
    tag: "Cultural",
    tagColor: "#7e22ce",
    tagBg: "rgba(126,34,206,0.08)",
    accentColor: "#9333ea",
    borderColor: "rgba(147,51,234,0.22)",
    cardBg: "linear-gradient(135deg, #faf4ff 0%, #ffffff 65%)",
    description:
      "The major Bengali group in Korea. BAK celebrates Bengal events, fosters brotherhood among Bongs, and participates in events organized by the Embassies of India and Bangladesh.",
    highlights: [
      "Nababarsho & Saraswati Puja",
      "HokKolorob — autumn Durga Puja celebration",
      "Embassy India & Bangladesh events",
      "Tagore & Nazrul cultural celebrations",
    ],
    links: {
      facebook: "https://www.facebook.com/groups/BongKorea",
      email: "bengaliassociationinkorea@gmail.com",
    },
    icon: "🏛️",
    size: "medium",
    members: "800+",
    since: "2005",
  },
  {
    id: "kkk",
    name: "Korea Kannada Koota",
    abbr: "KKK",
    tag: "Regional",
    tagColor: "#15803d",
    tagBg: "rgba(21,128,61,0.08)",
    accentColor: "#16a34a",
    borderColor: "rgba(22,163,74,0.22)",
    cardBg: "linear-gradient(135deg, #f2fdf5 0%, #ffffff 65%)",
    description:
      "Korea Kannada Koota (ಕೊರಿಯಾ ಕನ್ನಡ ಕೂಟ) is a regional community for people from Karnataka State. Started in 2011, KKK connects Kannadigas living across Korea.",
    highlights: [
      "Connecting Karnataka people in Korea",
      "Est. 2011 — 13+ years of community",
      "Cultural events & get-togethers",
      "Support network for new arrivals",
    ],
    links: { facebook: "https://www.facebook.com/groups/KoreaKannadaKoota" },
    icon: "🌄",
    size: "medium",
    members: "500+",
    since: "2011",
  },
  {
    id: "mmk",
    name: "Marathi Mandal Korea",
    abbr: "MMK",
    tag: "Regional",
    tagColor: "#b45309",
    tagBg: "rgba(180,83,9,0.08)",
    accentColor: "#d97706",
    borderColor: "rgba(217,119,6,0.22)",
    cardBg: "linear-gradient(135deg, #fffbf0 0%, #ffffff 65%)",
    description:
      "Marathi Mandal Korea unites all Marathi-loving people in South Korea. MMK provides a platform for sharing Marathi culture, celebrating major festivals, and supporting writers, artists, and students.",
    highlights: [
      "Shri Ganesh Utsav — biggest annual event",
      "Makar Sankranti & Gudi Padwa",
      "Kojagiri Purnima (full moon celebration)",
      "Support for Marathi students & job seekers",
    ],
    links: { facebook: "https://www.facebook.com/MarathiMandalKorea" },
    icon: "🪔",
    size: "medium",
    members: "600+",
    since: "2010",
  },
  {
    id: "iskcon",
    name: "ISKCON Korea",
    abbr: "ISKCON",
    tag: "Spiritual",
    tagColor: "#be185d",
    tagBg: "rgba(190,24,93,0.08)",
    accentColor: "#db2777",
    borderColor: "rgba(219,39,119,0.22)",
    cardBg: "linear-gradient(135deg, #fff4f9 0%, #ffffff 65%)",
    description:
      "The only ISKCON Temple in Korea, opened in 2003 near Uijeongbu outside Seoul. Deities worshipped for 20+ years in this newly renovated, spiritually vibrant temple open to all.",
    highlights: [
      "Only ISKCON temple in Korea",
      "Near Uijeongbu, Seoul outskirts",
      "Worshipped for 20+ years",
      "Newly renovated temple",
    ],
    links: {
      website: "https://www.iskcon-korea.com/beginning-of-a-new-temple",
    },
    icon: "🙏",
    size: "medium",
    members: "400+",
    since: "2003",
  },
];

const filters = [
  "All",
  "Cultural & Regional",
  "Educational",
  "Cultural",
  "Regional",
  "Spiritual",
];

const stats = [
  {
    value: 12000,
    suffix: "k+",
    display: "12k+",
    label: "Members",
    color: "#ea580c",
  },
  {
    value: 120,
    suffix: "+",
    display: "120+",
    label: "Events",
    color: "#16a34a",
  },
  {
    value: 15,
    suffix: "+",
    display: "15+",
    label: "Chapters",
    color: "#d97706",
  },
  {
    value: 2002,
    suffix: "",
    display: "2002",
    label: "Est. Year",
    color: "#ea580c",
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
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
  const inView = useInView(ref, { once: true });
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

// ─── Rangoli Decor ────────────────────────────────────────────────────────────
const RangoliDecor = ({
  size = 120,
  opacity = 0.07,
}: {
  size?: number;
  opacity?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    style={{ opacity }}
  >
    {[0, 45, 90, 135].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 60 60)`}>
        <ellipse cx="60" cy="30" rx="6" ry="22" fill="#ea580c" />
        <ellipse cx="60" cy="90" rx="6" ry="22" fill="#16a34a" />
      </g>
    ))}
    <circle cx="60" cy="60" r="14" fill="#ea580c" />
    <circle cx="60" cy="60" r="9" fill="#fff" />
    <circle cx="60" cy="60" r="5" fill="#d97706" />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <circle
        key={angle}
        cx={60 + 28 * Math.cos((angle * Math.PI) / 180)}
        cy={60 + 28 * Math.sin((angle * Math.PI) / 180)}
        r="4"
        fill="#ea580c"
      />
    ))}
  </svg>
);

// ─── Community Card ───────────────────────────────────────────────────────────
type Community = (typeof communities)[0];

const CommunityCard = ({
  community,
  index,
  isLarge,
}: {
  community: Community;
  index: number;
  isLarge: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const [shineActive, setShineActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`relative rounded-2xl overflow-hidden cursor-default ${isLarge ? "md:col-span-2" : ""}`}
      style={{
        background: community.cardBg,
        border: `1.5px solid ${hovered ? community.accentColor : community.borderColor}`,
        boxShadow: hovered
          ? `0 16px 48px ${community.accentColor}22, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.28s ease, border-color 0.28s ease",
      }}
      onMouseEnter={() => {
        setHovered(true);
        setShineActive(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setTimeout(() => setShineActive(false), 600);
      }}
    >
      {/* Shimmer sweep on hover — matching HeroText primary button */}
      {shineActive && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
            animation: "shimmerSweep 0.7s ease-out forwards",
          }}
        />
      )}

      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          background: `linear-gradient(90deg, ${community.accentColor}, ${community.accentColor}88, ${community.accentColor})`,
          backgroundSize: "200% auto",
          animation: "gradShift 2.5s ease-in-out infinite",
        }}
      />

      {/* Ambient glow blob — matching HeroText blob */}
      <div
        aria-hidden
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${community.accentColor}18 0%, transparent 70%)`,
          filter: "blur(20px)",
          opacity: hovered ? 1 : 0.4,
        }}
      />

      <div
        className={
          isLarge ? "md:grid md:grid-cols-2 md:gap-8 md:items-start p-8" : "p-6"
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {/* Tag — matching HeroText badge style */}
          <span
            className="inline-flex items-center gap-1.5 label-caps px-3 py-1.5 rounded-full relative overflow-hidden"
            style={{
              color: community.tagColor,
              background: community.tagBg,
              border: `1px solid ${community.borderColor}`,
            }}
          >
            {/* Tiny shimmer on tag */}
            <span
              aria-hidden
              className="absolute top-0 bottom-0 w-8 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                animation: "shimmerSweep 3.5s ease-in-out infinite",
                animationDelay: `${index * 0.4}s`,
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: community.accentColor,
                animation: "pulseDot 2s ease infinite",
              }}
            />
            {community.tag}
          </span>
          {/* Icon bubble */}
          <motion.span
            animate={
              hovered ? { scale: 1.12, rotate: 6 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-lg"
            style={{
              background: community.tagBg,
              border: `1.5px solid ${community.borderColor}`,
            }}
          >
            {community.icon}
          </motion.span>
        </div>

        {/* Title — Playfair matching CommunitiesPage abbr style */}
        <div className="mb-3">
          <h3
            className="font-playfair text-3xl font-black tracking-tight leading-none"
            style={{
              background: `linear-gradient(135deg, ${community.accentColor} 0%, ${community.accentColor}cc 60%, ${community.accentColor} 100%)`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: hovered ? "gradShift 2s ease-in-out infinite" : "none",
            }}
          >
            {community.abbr}
          </h3>
          {/* Animated underline — matching HeroText highlight underline */}
          <motion.div
            className="h-[2px] rounded-full mt-1"
            style={{
              background: `linear-gradient(90deg, ${community.accentColor}, ${community.accentColor}55, transparent)`,
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.09 + 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <p className="text-xs font-medium text-stone-500 mt-1.5">
            {community.name}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-stone-600 mb-5 font-normal">
          {community.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-2 mb-5">
          {community.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.09 + 0.25 + i * 0.06,
              }}
              className="flex items-center gap-2.5 text-xs text-stone-700 font-medium"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: community.accentColor }}
              />
              {h}
            </motion.li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex flex-col gap-2.5">
          {/* Meta badges — matching HeroText stat style */}
          <div className="flex gap-1.5 flex-wrap">
            {[`Est. ${community.since}`, community.members].map((label) => (
              <span
                key={label}
                className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide"
                style={{
                  color: community.accentColor,
                  border: `1px solid ${community.borderColor}`,
                  background: community.tagBg,
                }}
              >
                {label}
              </span>
            ))}
          </div>
          {/* Link buttons */}
          <div className="flex gap-2 flex-wrap">
            {community.links.website && (
              <motion.a
                href={community.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden text-xs font-bold px-4 py-1.5 rounded-full text-white tracking-wide"
                style={{
                  background: community.accentColor,
                  boxShadow: `0 4px 14px ${community.accentColor}30`,
                }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                Website ↗
              </motion.a>
            )}
            {community.links.facebook && (
              <motion.a
                href={community.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-4 py-1.5 rounded-full"
                style={{
                  color: community.accentColor,
                  border: `1.5px solid ${community.borderColor}`,
                  background: "transparent",
                }}
                whileHover={{ scale: 1.04, y: -1, background: community.tagBg }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                Facebook ↗
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CommunitiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);
  }, []);

  const filtered = communities.filter(
    (c) => activeFilter === "All" || c.tag === activeFilter,
  );

  return (
    <div
      className={`communities-root min-h-screen bg-orange-50/60 text-stone-900 overflow-x-hidden relative transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        /* ── Base font: Plus Jakarta Sans — body/UI, matching HeroText ── */
        .communities-root {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
          letter-spacing: 0em;
        }

        /* ── Display font: Playfair — headlines, abbr, stats ── */
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }

        /* ── Typography scale matching HeroText ── */
        .communities-root h1 { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; }
        .communities-root h2 { font-family: 'Playfair Display', Georgia, serif; font-weight: 800; }
        .communities-root h3 { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; }

        /* body / label text — Plus Jakarta Sans weights */
        .text-jakarta-300 { font-weight: 300; }
        .text-jakarta-400 { font-weight: 400; }
        .text-jakarta-500 { font-weight: 500; }
        .text-jakarta-600 { font-weight: 600; }
        .text-jakarta-700 { font-weight: 700; }
        .text-jakarta-800 { font-weight: 800; }

        /* ── Label caps — matches HeroText badge text style ── */
        .label-caps {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        /* ── Keyframes matching HeroText exactly ── */
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
          0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
          50%      { box-shadow: 0 0 18px 4px rgba(249,115,22,0.22); }
        }
        @keyframes blobDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(18px,14px) scale(1.08); }
        }
        @keyframes pulseDot {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.6); opacity: 0.5; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Warm ambient background */
        .page-bg::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 5% 10%, rgba(249,115,22,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 95% 85%, rgba(22,163,74,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 40% 60% at 50% 50%, rgba(217,119,6,0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Warm ambient bg — matching HeroText blob */}
      <div className="page-bg" />

      {/* Ambient glow blob top-left — identical to HeroText */}
      <div
        aria-hidden
        className="pointer-events-none fixed -left-32 -top-32 w-[500px] h-[500px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,153,51,0.09) 0%, rgba(255,120,30,0.04) 45%, transparent 70%)",
          filter: "blur(48px)",
          animation: "blobDrift 9s ease-in-out infinite alternate",
        }}
      />

      {/* Decorative rangoli corners */}
      <div className="fixed pointer-events-none z-0 top-12 right-0 transform rotate-45 opacity-[0.055]">
        <RangoliDecor size={160} opacity={1} />
      </div>
      <div className="fixed pointer-events-none z-0 bottom-16 left-0 transform -rotate-45 opacity-[0.045]">
        <RangoliDecor size={140} opacity={1} />
      </div>

      {/* ── HERO SECTION — mirrors HeroText badge + headline structure ── */}
      <div
        ref={heroRef}
        className="relative z-10 pt-28 pb-14 px-6 text-center max-w-3xl mx-auto"
      >
        {/* Badge — identical treatment to HeroText badge */}
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.88 }}
          animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex mb-7"
          style={{
            animation: heroInView
              ? "badgeFloat 3.5s ease-in-out infinite"
              : "none",
            animationDelay: "0.8s",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full relative overflow-hidden cursor-default select-none"
            style={{
              background:
                "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)",
              border: "1px solid rgba(249,115,22,0.22)",
              animation: heroInView
                ? "glowPulse 3s ease-in-out infinite"
                : "none",
              animationDelay: "1s",
            }}
          >
            {/* Shimmer sweep — same as HeroText badge */}
            <span
              aria-hidden
              className="absolute top-0 bottom-0 w-12 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                animation: "shimmerSweep 2.8s ease-in-out infinite",
                animationDelay: "1.2s",
              }}
            />
            {/* Pulsing icon — same as HeroText ⊙ */}
            <span
              className="text-base text-orange-500 relative z-10"
              style={{
                animation: heroInView
                  ? "iconPulse 2.6s ease-in-out infinite"
                  : "none",
                animationDelay: "0.9s",
                display: "inline-block",
              }}
            >
              ⊙
            </span>
            <span className="label-caps text-orange-700 relative z-10">
              Regional Showcase · Indians in Korea
            </span>
          </div>
        </motion.div>

        {/* Tricolor bar — matching CommunitiesPage */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-12 h-[3px] rounded-full mx-auto mb-6 overflow-hidden"
        >
          <div className="flex-1 bg-orange-600" />
          <div className="flex-1 bg-stone-300" />
          <div className="flex-1 bg-green-600" />
        </motion.div>

        {/* Headline — word-by-word reveal matching HeroText exactly */}
        <div className="mb-5" style={{ perspective: "900px" }}>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] text-stone-900">
            {["Indian", "Communities", "in", "Korea"].map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block ${i < 3 ? "mr-[0.22em]" : ""}`}
                initial={{
                  opacity: 0,
                  y: 32,
                  rotateX: -40,
                  filter: "blur(5px)",
                  scale: 0.94,
                }}
                animate={
                  heroInView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.68,
                  delay: 0.22 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  display: "inline-block",
                  transformOrigin: "bottom center",
                  ...(word === "Communities" || word === "Korea"
                    ? {
                        background:
                          word === "Communities"
                            ? "linear-gradient(90deg, #f97316 0%, #fb923c 35%, #fdba74 60%, #ea580c 100%)"
                            : "linear-gradient(90deg, #15803d 0%, #16a34a 50%, #15803d 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "gradShift 3.5s ease-in-out infinite",
                      }
                    : {}),
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Animated underline on "Communities" — matching HeroText highlight underline */}
          <motion.div
            className="w-40 h-[2.5px] rounded-full mx-auto mt-2"
            style={{
              background: "linear-gradient(90deg, #f97316, #fb923c, #f97316)",
              backgroundSize: "200% auto",
              animation: "gradShift 2.5s ease-in-out infinite",
              transformOrigin: "center",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={heroInView ? { scaleX: 1, opacity: 0.7 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>

        {/* Description — matching HeroText description animation */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base leading-relaxed text-stone-600 max-w-md mx-auto mb-9 font-normal"
        >
          Showcasing the diverse Indian regional communities in Korea that bring
          people together through culture, language, shared experiences, and
          mutual support.
        </motion.p>
      </div>

      {/* ── FILTER BAR — matching secondary CTA button style from HeroText ── */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
        animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.65, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-2 justify-center mb-10 px-6 relative z-10"
      >
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setActiveFilter(f)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative overflow-hidden px-4 py-2 rounded-full text-xs font-bold transition-colors duration-200"
            style={{
              background: activeFilter === f ? "#ea580c" : "white",
              border:
                activeFilter === f
                  ? "1.5px solid #ea580c"
                  : "1.5px solid rgba(0,0,0,0.10)",
              color: activeFilter === f ? "#fff" : "#57534e",
              boxShadow:
                activeFilter === f
                  ? "0 4px 18px rgba(234,88,12,0.32)"
                  : "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            {/* Shine on active — matching primary CTA */}
            {activeFilter === f && (
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                  animation: "shimmerSweep 2.5s ease-in-out infinite",
                }}
              />
            )}
            <span className="relative z-10 tracking-wide">{f}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Section label */}
      <div className="relative z-10 flex items-center gap-3 px-6 mx-auto mb-7 max-w-6xl">
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(234,88,12,0.2), rgba(203,213,225,0.4), transparent)",
          }}
        />
        <span className="label-caps text-stone-500">
          {filtered.length}{" "}
          {filtered.length === 1 ? "community" : "communities"} found
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(203,213,225,0.4), rgba(234,88,12,0.2), transparent)",
          }}
        />
      </div>

      {/* ── CARDS GRID ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 pb-20 max-w-7xl mx-auto">
        {filtered.map((community, i) => (
          <CommunityCard
            key={community.id}
            community={community}
            index={i}
            isLarge={
              community.size === "large" && activeFilter === "All" && i === 0
            }
          />
        ))}
      </div>

      {/* ── BOTTOM CTA — matching HeroText primary+secondary button pattern ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center pb-24 px-6"
      >
        <div
          className="h-px max-w-sm mx-auto mb-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(249,115,22,0.28), rgba(203,213,225,0.5), transparent)",
          }}
        />
        <p className="text-sm text-stone-500 mb-6 font-medium tracking-wide">
          Part of the IIK ecosystem — 12k+ Indians across South Korea
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary — matching HeroText primary CTA */}
          <motion.a
            href="https://indiansinkorea.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-8 py-3 rounded-full text-sm font-bold text-white"
            style={{
              background: "#ea580c",
              boxShadow: "0 4px 18px rgba(234,88,12,0.28)",
            }}
            whileHover={{
              scale: 1.04,
              y: -2,
              boxShadow: "0 10px 32px rgba(234,88,12,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
                animation: "shimmerSweep 3s ease-in-out infinite",
              }}
            />
            <span className="relative z-10">Explore IIK →</span>
          </motion.a>
          {/* Secondary — matching HeroText secondary CTA */}
          <motion.a
            href="#"
            className="px-8 py-3 rounded-full text-sm font-bold text-stone-700"
            style={{
              border: "1.5px solid rgba(0,0,0,0.12)",
              background: "white",
            }}
            whileHover={{
              scale: 1.03,
              y: -1,
              boxShadow:
                "0 0 0 1.5px rgba(249,115,22,0.28), 0 8px 24px rgba(0,0,0,0.06)",
              borderColor: "rgba(249,115,22,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            Join a Community
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
