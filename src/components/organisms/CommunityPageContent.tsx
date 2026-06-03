"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { MapPin, Users, ExternalLink } from "lucide-react";
import { getAll, type CommunityItem } from "@/services/community.service";

// ─── Static accent map (maps DB accent_color to full card theme) ──────────────
const buildTheme = (accentColor: string) => {
  const map: Record<
    string,
    { tagColor: string; tagBg: string; borderColor: string; cardBg: string }
  > = {
    "#ea580c": {
      tagColor: "#c2410c",
      tagBg: "rgba(234,88,12,0.09)",
      borderColor: "rgba(234,88,12,0.22)",
      cardBg: "linear-gradient(135deg,#fff8f4 0%,#ffffff 65%)",
    },
    "#2563eb": {
      tagColor: "#1d4ed8",
      tagBg: "rgba(37,99,235,0.08)",
      borderColor: "rgba(37,99,235,0.22)",
      cardBg: "linear-gradient(135deg,#f4f8ff 0%,#ffffff 65%)",
    },
    "#9333ea": {
      tagColor: "#7e22ce",
      tagBg: "rgba(126,34,206,0.08)",
      borderColor: "rgba(147,51,234,0.22)",
      cardBg: "linear-gradient(135deg,#faf4ff 0%,#ffffff 65%)",
    },
    "#16a34a": {
      tagColor: "#15803d",
      tagBg: "rgba(21,128,61,0.08)",
      borderColor: "rgba(22,163,74,0.22)",
      cardBg: "linear-gradient(135deg,#f2fdf5 0%,#ffffff 65%)",
    },
    "#d97706": {
      tagColor: "#b45309",
      tagBg: "rgba(180,83,9,0.08)",
      borderColor: "rgba(217,119,6,0.22)",
      cardBg: "linear-gradient(135deg,#fffbf0 0%,#ffffff 65%)",
    },
    "#db2777": {
      tagColor: "#be185d",
      tagBg: "rgba(190,24,93,0.08)",
      borderColor: "rgba(219,39,119,0.22)",
      cardBg: "linear-gradient(135deg,#fff4f9 0%,#ffffff 65%)",
    },
    "#dc2626": {
      tagColor: "#b91c1c",
      tagBg: "rgba(220,38,38,0.08)",
      borderColor: "rgba(220,38,38,0.22)",
      cardBg: "linear-gradient(135deg,#fff4f4 0%,#ffffff 65%)",
    },
    "#0d9488": {
      tagColor: "#0f766e",
      tagBg: "rgba(13,148,136,0.08)",
      borderColor: "rgba(13,148,136,0.22)",
      cardBg: "linear-gradient(135deg,#f0fdfa 0%,#ffffff 65%)",
    },
  };
  return map[accentColor] ?? map["#ea580c"];
};

// ─── Static cricket club data (unchanged) ────────────────────────────────────
const cricketClub = {
  link: "https://bit.ly/3jCERv5",
  contacts: [
    { name: "Saikrishna", phone: "010-6594-2627" },
    { name: "Prathamesh", phone: "010-2529-4411" },
  ],
  details: [
    "Each year, the Korean Cricket Association (KCA), in affiliation with the ICC, organizes a leather-ball T20 league in South Korea.",
    "Competition includes teams representing India, Pakistan, Bangladesh, Sri Lanka, Australia, and New Zealand.",
    "IIKCC competes internationally with cricket clubs from almost all cricketing nations.",
    "In 2014, IIKCC secured 3rd place in the KCA League and has bagged numerous awards since.",
  ],
};

const filters = [
  "All",
  "Cultural & Regional",
  "Educational",
  "Cultural",
  "Regional",
  "Spiritual",
  "Sports",
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Sk = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-orange-100/60 rounded-2xl ${className}`} />
);

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
const CommunityCard = ({
  community,
  index,
  isLarge,
}: {
  community: CommunityItem;
  index: number;
  isLarge: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const [shineActive, setShineActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const theme = buildTheme(community.accentColor);

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
        background: theme.cardBg,
        border: `1.5px solid ${hovered ? community.accentColor : theme.borderColor}`,
        boxShadow: hovered
          ? `0 16px 48px ${community.accentColor}22, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
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
      {shineActive && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.45) 50%,transparent 70%)",
            animation: "shimmerSweep 0.7s ease-out forwards",
          }}
        />
      )}

      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          background: `linear-gradient(90deg,${community.accentColor},${community.accentColor}88,${community.accentColor})`,
        }}
      />

      <div
        aria-hidden
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle,${community.accentColor}18 0%,transparent 70%)`,
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
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full relative overflow-hidden"
            style={{
              color: theme.tagColor,
              background: theme.tagBg,
              border: `1px solid ${theme.borderColor}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: community.accentColor,
                animation: "pulseDot 2s ease infinite",
              }}
            />
            {community.tag}
          </span>
          <motion.span
            animate={
              hovered ? { scale: 1.12, rotate: 6 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-lg"
            style={{
              background: theme.tagBg,
              border: `1.5px solid ${theme.borderColor}`,
            }}
          >
            {community.icon}
          </motion.span>
        </div>

        {/* Title */}
        <div className="mb-3">
          <h3
            className="font-playfair text-3xl font-black tracking-tight leading-none"
            style={{
              background: `linear-gradient(135deg,${community.accentColor} 0%,${community.accentColor}cc 60%,${community.accentColor} 100%)`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: hovered ? "gradShift 2s ease-in-out infinite" : "none",
            }}
          >
            {community.abbr}
          </h3>
          <motion.div
            className="h-[2px] rounded-full mt-1"
            style={{
              background: `linear-gradient(90deg,${community.accentColor},${community.accentColor}55,transparent)`,
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

        <p className="text-sm leading-relaxed text-stone-600 mb-5">
          {community.description}
        </p>

        {/* Highlights */}
        {community.highlights.filter(Boolean).length > 0 && (
          <ul className="flex flex-col gap-2 mb-5">
            {community.highlights.filter(Boolean).map((h, i) => (
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
        )}

        {/* Footer */}
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-1.5 flex-wrap">
            {[`Est. ${community.since}`, community.members]
              .filter((s) => s && s !== "Est. ")
              .map((label) => (
                <span
                  key={label}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    color: community.accentColor,
                    border: `1px solid ${theme.borderColor}`,
                    background: theme.tagBg,
                  }}
                >
                  {label}
                </span>
              ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {community.websiteUrl && (
              <motion.a
                href={community.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden text-xs font-bold px-4 py-1.5 rounded-full text-white"
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
            {community.facebookUrl && (
              <motion.a
                href={community.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-4 py-1.5 rounded-full"
                style={{
                  color: community.accentColor,
                  border: `1.5px solid ${theme.borderColor}`,
                  background: "transparent",
                }}
                whileHover={{ scale: 1.04, y: -1, background: theme.tagBg }}
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
  const [communities, setCommunities] = useState<CommunityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);
    getAll().then((data) => {
      setCommunities(data);
      setLoading(false);
    });
  }, []);

  const showSportsSection = activeFilter === "All" || activeFilter === "Sports";
  const filtered = communities.filter(
    (c) => activeFilter === "All" || c.tag === activeFilter,
  );

  return (
    <div
      className={`communities-root min-h-screen bg-orange-50/60 text-stone-900 overflow-x-hidden relative transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .communities-root { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .communities-root h1,.communities-root h2,.communities-root h3 { font-family: 'Playfair Display', Georgia, serif; }
        .label-caps { font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-weight:700; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; }
        @keyframes shimmerSweep { 0%{left:-100%} 100%{left:160%} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} 50%{box-shadow:0 0 18px 4px rgba(249,115,22,0.22)} }
        @keyframes blobDrift { from{transform:translate(0,0) scale(1)} to{transform:translate(18px,14px) scale(1.08)} }
        @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.5} }
        .page-bg::before { content:''; position:fixed; inset:0; background:radial-gradient(ellipse 70% 50% at 5% 10%,rgba(249,115,22,0.07) 0%,transparent 55%),radial-gradient(ellipse 50% 40% at 95% 85%,rgba(22,163,74,0.05) 0%,transparent 50%); pointer-events:none; z-index:0; }
      `}</style>

      <div className="page-bg" />
      <div
        aria-hidden
        className="pointer-events-none fixed -left-32 -top-32 w-[500px] h-[500px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle,rgba(255,153,51,0.09) 0%,rgba(255,120,30,0.04) 45%,transparent 70%)",
          filter: "blur(48px)",
          animation: "blobDrift 9s ease-in-out infinite alternate",
        }}
      />
      <div className="fixed pointer-events-none z-0 top-12 right-0 transform rotate-45 opacity-[0.055]">
        <RangoliDecor size={160} opacity={1} />
      </div>
      <div className="fixed pointer-events-none z-0 bottom-16 left-0 transform -rotate-45 opacity-[0.045]">
        <RangoliDecor size={140} opacity={1} />
      </div>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative z-10 pt-28 pb-14 px-6 text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.9 }}
          animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full w-fit cursor-default select-none relative overflow-hidden mb-4"
          style={{
            background: "linear-gradient(135deg,#fff7ed,#ffedd5,#fed7aa)",
            border: "1px solid rgba(249,115,22,0.22)",
          }}
        >
          <span className="text-orange-500 text-lg">⊙</span>
          <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-orange-600">
            Regional Showcase · Indians in Korea
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex w-12 h-[3px] rounded-full mx-auto mb-6 overflow-hidden"
        >
          <div className="flex-1 bg-orange-600" />
          <div className="flex-1 bg-stone-300" />
          <div className="flex-1 bg-green-600" />
        </motion.div>

        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] text-stone-900 mb-4">
          {["Indian", "Communities", "in", "Korea"].map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block ${i < 3 ? "mr-[0.22em]" : ""}`}
              initial={{ opacity: 0, y: 32, filter: "blur(5px)" }}
              animate={
                heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.68,
                delay: 0.22 + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={
                word === "Communities" || word === "Korea"
                  ? {
                      background:
                        word === "Communities"
                          ? "linear-gradient(90deg,#f97316,#fb923c,#ea580c)"
                          : "linear-gradient(90deg,#15803d,#16a34a)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : {}
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="text-sm sm:text-base leading-relaxed text-stone-600 max-w-md mx-auto mb-9"
        >
          Showcasing the diverse Indian regional communities in Korea that bring
          people together through culture, language, shared experiences, and
          mutual support.
        </motion.p>
      </div>

      {/* ── Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 1.05 }}
        className="flex flex-wrap gap-2 justify-center mb-10 px-6 relative z-10"
      >
        {filters.map((f) => (
          <motion.button
            key={f}
            onClick={() => setActiveFilter(f)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative overflow-hidden px-4 py-2 rounded-full text-xs font-bold"
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
            <span className="relative z-10 tracking-wide">{f}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* ── Loading skeletons ── */}
      {loading && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 pb-20 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <Sk key={i} className="h-72" />
          ))}
        </div>
      )}

      {/* ── Cards grid ── */}
      {!loading && activeFilter !== "Sports" && (
        <>
          <div className="relative z-10 flex items-center gap-3 px-6 mx-auto mb-7 max-w-6xl">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(234,88,12,0.2),rgba(203,213,225,0.4),transparent)",
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
                  "linear-gradient(90deg,transparent,rgba(203,213,225,0.4),rgba(234,88,12,0.2),transparent)",
              }}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 px-6">
              <p className="text-4xl mb-3">🏳️</p>
              <p className="text-stone-500 font-medium">
                No communities in this category yet.
              </p>
            </div>
          ) : (
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 pb-20 max-w-7xl mx-auto">
              {filtered.map((community, i) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  index={i}
                  isLarge={
                    community.isFeatured && activeFilter === "All" && i === 0
                  }
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Sports section (static) ── */}
      {showSportsSection && (
        <section className="relative z-10 px-6 pb-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] items-start"
          >
            <div className="space-y-6">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-orange-600">
                Sports
              </p>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
                  Indians In Korea{" "}
                  <span className="text-orange-600">Cricket Club</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-600 max-w-2xl">
                  Established in 2013, IIKCC is one of the oldest and most
                  competitive cricket clubs which prides itself on providing a
                  healthy sporting habit among sportsmen, instilling discipline,
                  coordination and teamwork.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {cricketClub.details.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-orange-100 bg-orange-50/70 p-5 shadow-sm"
                  >
                    <p className="text-sm text-stone-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-lg">
                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-stone-500">
                  Practice & Contact
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 rounded-3xl bg-stone-50 p-4">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                        Training ground
                      </p>
                      <p className="text-sm font-semibold text-stone-900">
                        Sungkyunkwan University, Suwon
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-3xl bg-stone-50 p-4">
                    <Users className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                        Weekend practice
                      </p>
                      <p className="text-sm font-semibold text-stone-900">
                        Every weekend — tennis & leather ball
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {cricketClub.contacts.map((c) => (
                    <div
                      key={c.name}
                      className="rounded-3xl bg-stone-50 p-4 text-sm text-stone-700"
                    >
                      <p className="font-semibold text-stone-900">{c.name}</p>
                      <p>{c.phone}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={cricketClub.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  <ExternalLink className="h-4 w-4" />
                  View IIKCC Facebook Page
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 shadow-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent_30%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-orange-600 font-semibold">
                        IIKCC
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-stone-900">
                        Cricket Club
                      </h3>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
                      🏏
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">
                    A community-first club with leather-ball ambition and
                    tennis-ball energy across Korea.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Founded", value: "2013" },
                    { label: "Affiliation", value: "KCA / ICC" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-3xl bg-white/85 p-5 shadow-sm border border-orange-100"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                        {s.label}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-stone-900">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[2rem] bg-white/90 p-5 border border-stone-200">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-semibold text-stone-900">
                      Sungkyunkwan University
                    </div>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase text-orange-600">
                      Suwon
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    Most cricket activity is hosted here for easy access and
                    premium community reach.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
