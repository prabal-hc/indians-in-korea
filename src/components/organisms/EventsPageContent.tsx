"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  MapPin,
  Users,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  Zap,
} from "lucide-react";
import {
  getUpcoming,
  getFeatured,
  getAll,
  type EventItem,
} from "@/services/events.service";

gsap.registerPlugin(ScrollTrigger);

// ─── Layout tokens ────────────────────────────────────────────────────────────
const S = "px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24";
const SY = "py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32";
const W = "mx-auto w-full max-w-screen-2xl";

// ─── Motion config ────────────────────────────────────────────────────────────
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_PREMIUM },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -36, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: 36, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const getCategoryEmoji = (category: string) => {
  const normalized = category?.toLowerCase() ?? "";
  if (
    normalized.includes("fest") ||
    normalized.includes("diwali") ||
    normalized.includes("cultural")
  )
    return "🪔";
  if (normalized.includes("sport")) return "🏏";
  if (normalized.includes("advent")) return "🌊";
  if (normalized.includes("art")) return "🎨";
  if (normalized.includes("network")) return "🤝";
  if (normalized.includes("food") || normalized.includes("cuisine"))
    return "🍛";
  return "🎉";
};

const getEventImage = (event: EventItem) =>
  event.imageUrl ||
  (event.category?.toLowerCase().includes("fest")
    ? "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=900&q=80"
    : "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80");

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatDateLong = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Sk = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-orange-100/60 rounded-2xl ${className}`} />
);

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [r, setR] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });
  useEffect(() => {
    const iv = setInterval(() => {
      const diff = Math.max(targetDate.getTime() - Date.now(), 0);
      setR({
        days: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
        mins: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
        secs: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [targetDate]);
  return r;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] sm:text-xs xl:text-sm font-bold uppercase tracking-widest text-orange-500 mb-2 sm:mb-3">
    {children}
  </p>
);

function Blob({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={style}
      animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
      }}
    />
  );
}

function CountDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white/10 pb-3 relative overflow-hidden group/digit">
      <div className="absolute inset-0 -translate-x-full group-hover/digit:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE_SOFT }}
          className="text-lg xl:text-xl font-bold text-white tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="text-[9px] xl:text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">
        {label}
      </span>
    </div>
  );
}

function useTilt(strength = 8) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 300,
    damping: 30,
  });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 300,
    damping: 30,
  });
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y],
  );
  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  return { rotX, rotY, onMouseMove, onMouseLeave };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function EventsPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const cardTilt = useTilt(5);

  // ── Supabase state ──────────────────────────────────────────────────────────
  const [featured, setFeatured] = useState<EventItem | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [feat, events, all] = await Promise.all([
          getFeatured(),
          getUpcoming(6),
          getAll(),
        ]);
        setFeatured(feat);
        setUpcomingEvents(events.slice(0, 6));
        setAllEvents(all);
        const pastYears = Array.from(
          new Set(
            all
              .filter((event) => new Date(event.date) < new Date())
              .map((event) => new Date(event.date).getFullYear().toString()),
          ),
        ).sort((a, b) => Number(b) - Number(a));
        if (pastYears.length) {
          setActiveYear(pastYears[0]);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Other state ─────────────────────────────────────────────────────────────
  const [activeYear, setActiveYear] = useState("");

  // Countdown to featured event date (falls back gracefully)
  const countdownTarget = useMemo(() => {
    if (featured?.date) return new Date(`${featured.date}T18:00:00`);
    return new Date("2026-11-14T18:00:00");
  }, [featured]);
  const countdown = useCountdown(countdownTarget);

  const timeline = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return allEvents
      .filter((event) => event.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6)
      .map((event) => ({
        label: new Date(event.date).toLocaleDateString("en-US", {
          month: "short",
        }),
        title: event.title,
        desc: event.description || event.category || "Community event",
        emoji: getCategoryEmoji(event.category),
        image: getEventImage(event),
      }));
  }, [allEvents]);

  const pastEventYears = useMemo(() => {
    return Array.from(
      new Set(
        allEvents
          .filter((event) => new Date(event.date) < new Date())
          .map((event) => new Date(event.date).getFullYear().toString()),
      ),
    ).sort((a, b) => Number(b) - Number(a));
  }, [allEvents]);

  const filteredPast = useMemo(
    () =>
      allEvents
        .filter(
          (event) =>
            event.date &&
            new Date(event.date).getFullYear().toString() === activeYear,
        )
        .sort((a, b) => b.date.localeCompare(a.date)),
    [activeYear, allEvents],
  );

  // ── Scroll / parallax ───────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroCardY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const spotX = useMotionValue(-999);
  const spotY = useMotionValue(-999);
  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      spotX.set(e.clientX - rect.left);
      spotY.set(e.clientY - rect.top);
    },
    [spotX, spotY],
  );

  // ── GSAP ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ev-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
      if (tlRef.current) {
        const pulse = tlRef.current.querySelector(".tl-pulse");
        if (pulse) {
          gsap.to(pulse, {
            top: "100%",
            duration: 4,
            ease: "none",
            repeat: -1,
            scrollTrigger: {
              trigger: tlRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1.5,
            },
          });
        }
      }
      gsap.utils.toArray<HTMLElement>(".moment-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ── Derived featured data ────────────────────────────────────────────────────
  const featuredTitle = featured?.title ?? "IIK Diwali Dhamaka 2026";
  const featuredImage =
    featured?.imageUrl ??
    "https://s7ap1.scene7.com/is/image/incredibleindia/diwali-fes-hero?qlt=82&ts=1726639266846";
  const featuredDate = featured?.date
    ? formatDateLong(featured.date)
    : "November 14, 2026";
  const featuredTime = featured?.time ?? "6:00 PM – 11:30 PM";
  const featuredLocation =
    featured?.location ?? "Seoul Grand Ballroom, Gangnam";
  const featuredVenue = featuredLocation.split(",")[0];

  return (
    <div
      ref={rootRef}
      className="relative overflow-x-hidden bg-white text-gray-900 font-sans antialiased"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className={`relative overflow-hidden bg-orange-50 ${S} pt-20 sm:pt-20 md:pt-28 xl:pt-30 pb-0`}
      >
        <motion.div
          className="pointer-events-none absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: spotX,
            top: spotY,
            background:
              "radial-gradient(circle, rgba(251,146,60,0.10) 0%, transparent 70%)",
          }}
        />
        <Blob
          className="h-80 w-80 bg-orange-200/40"
          style={{ top: "-8%", right: "12%" }}
        />
        <Blob
          className="h-56 w-56 bg-amber-200/30"
          style={{ bottom: "10%", left: "4%" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "256px",
          }}
        />

        <div className={`${W} relative`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid gap-0 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px] 2xl:grid-cols-[1fr_640px] lg:items-end"
          >
            {/* Left: text */}
            <motion.div
              style={{ y: heroTextY }}
              className="pb-12 sm:pb-16 lg:pb-20 xl:pb-24 space-y-6 sm:space-y-7 xl:space-y-9 pr-0 lg:pr-12 xl:pr-16"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2.5 bg-orange-100 text-orange-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full w-fit relative overflow-hidden group/badge"
              >
                <motion.div
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{
                    duration: 1.6,
                    delay: 0.8,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: EASE_SOFT,
                  }}
                />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 relative" />
                <span className="text-[10px] sm:text-xs xl:text-sm font-bold tracking-widest uppercase relative z-10">
                  Premium community events
                </span>
              </motion.div>

              <motion.div variants={staggerFast} className="overflow-hidden">
                {["Celebrating", "India Together", "in Korea"].map(
                  (word, wi) => (
                    <motion.div
                      key={word}
                      variants={{
                        hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.85,
                            ease: EASE_PREMIUM,
                            delay: wi * 0.08,
                          },
                        },
                      }}
                    >
                      <span
                        className={`block text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.05] tracking-tight ${wi === 1 ? "text-orange-500" : "text-gray-900"}`}
                      >
                        {word}
                      </span>
                    </motion.div>
                  ),
                )}
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-md xl:text-lg 2xl:text-xl text-gray-600 max-w-lg xl:max-w-xl leading-relaxed"
              >
                Vibrant festivals, cultural gatherings, sports, music, food, and
                unforgettable community moments across South Korea.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <a
                  href="#featured"
                  className="group/btn relative inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 sm:px-7 sm:py-4 xl:px-8 xl:py-4 text-sm xl:text-base font-bold text-white shadow-lg shadow-orange-200 overflow-hidden transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-300/50"
                >
                  <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  <span className="relative">{featuredTitle}</span>
                  <ArrowRight className="h-4 w-4 relative transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </a>
                <a
                  href="#upcoming"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 sm:px-7 sm:py-4 xl:px-8 xl:py-4 text-sm xl:text-base font-bold text-gray-700 transition-all duration-300 hover:border-orange-300 hover:text-orange-600 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-100"
                >
                  All events
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-5 sm:gap-8 xl:gap-10 pt-4 border-t border-gray-200"
              >
                {[
                  { v: "120+", l: "Events hosted" },
                  { v: "12K+", l: "Community members" },
                  { v: `${upcomingEvents.length}+`, l: "Upcoming in 2026" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-orange-500">
                      {s.v}
                    </div>
                    <p className="text-xs sm:text-sm xl:text-base text-gray-500 mt-0.5">
                      {s.l}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: featured card */}
            <motion.div
              variants={fadeUp}
              id="featured"
              style={{
                y: heroCardY,
                rotateX: cardTilt.rotX,
                rotateY: cardTilt.rotY,
                transformPerspective: 900,
              }}
              onMouseMove={cardTilt.onMouseMove}
              onMouseLeave={cardTilt.onMouseLeave}
              className="relative self-start cursor-pointer"
            >
              <div className="absolute -bottom-8 left-6 right-6 h-16 bg-orange-300/25 blur-3xl rounded-full" />
              <div className="absolute -inset-px rounded-t-3xl bg-gradient-to-br from-orange-200 via-transparent to-orange-100 opacity-60 pointer-events-none" />

              <div className="relative overflow-hidden rounded-t-3xl border border-orange-100/80 shadow-2xl shadow-orange-100/60 bg-white">
                <div className="relative h-64 sm:h-72 xl:h-80 2xl:h-96 overflow-hidden">
                  {loading ? (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 animate-pulse" />
                  ) : (
                    <motion.img
                      src={featuredImage}
                      alt={featuredTitle}
                      style={{ y: heroImgY }}
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "mirror",
                      }}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/15 to-transparent" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: EASE_SOFT }}
                    className="absolute top-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest shadow-md shadow-orange-500/30"
                  >
                    {getCategoryEmoji(featured?.category ?? "")} Featured Event
                  </motion.div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs uppercase tracking-widest text-orange-300 font-semibold">
                      Illuminate the night
                    </p>
                    <h2 className="mt-1.5 text-xl sm:text-2xl xl:text-3xl font-bold text-white leading-tight">
                      {featuredTitle}
                    </h2>
                  </div>
                </div>
                {/* Info bar */}
                <div className="bg-white grid grid-cols-2 divide-x divide-gray-100">
                  <div className="p-4 xl:p-5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Date & Time
                    </p>
                    <p className="mt-1 text-sm xl:text-base font-semibold text-gray-900">
                      {featuredDate}
                    </p>
                    <p className="text-xs text-gray-500">{featuredTime}</p>
                  </div>
                  <div className="p-4 xl:p-5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Venue
                    </p>
                    <p className="mt-1 text-sm xl:text-base font-semibold text-gray-900">
                      {featuredVenue}
                    </p>
                    <p className="text-xs text-gray-500">
                      {featuredLocation.split(",").slice(1).join(",").trim()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          UPCOMING EVENTS — Bento grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="upcoming"
        className={`${S} ${SY} bg-white relative overflow-hidden`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(251,146,60,0.05),transparent)]" />
        <div className={`${W} relative`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12 xl:mb-16"
            >
              <div>
                <Label>Upcoming Highlights</Label>
                <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900">
                  What's happening in{" "}
                  <span className="text-orange-500">2026</span>
                </h2>
              </div>
              {/* <p className="text-sm xl:text-base text-gray-500 max-w-sm leading-relaxed">
                {upcomingEvents.length > 0
                  ? `${upcomingEvents.length} upcoming experiences for the Indian community in Korea.`
                  : "Vibrant experiences designed for the Indian community in Korea."}
              </p> */}
            </motion.div>

            {/* ── Loading skeletons ── */}
            {loading && (
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
                  <Sk className="h-80" />
                  <Sk className="h-80" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Sk className="h-56" />
                  <Sk className="h-56" />
                  <Sk className="h-56" />
                </div>
              </div>
            )}

            {/* ── Populated grid ── */}
            {!loading && upcomingEvents.length > 0 && (
              <div className="grid gap-4 sm:gap-5 xl:gap-6">
                {/* Row 1 */}
                <div className="grid gap-4 sm:gap-5 xl:gap-6 md:grid-cols-[1.6fr_1fr] lg:grid-cols-[1.8fr_1fr]">
                  {/* Big card — index 0 */}
                  <motion.div
                    variants={fadeLeft}
                    whileHover={{
                      y: -6,
                      transition: { duration: 0.4, ease: EASE_SOFT },
                    }}
                    className="group relative overflow-hidden rounded-2xl xl:rounded-3xl border border-gray-100 shadow-md cursor-pointer"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl xl:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow:
                          "inset 0 0 0 1.5px rgba(249,115,22,0.35), 0 20px 60px rgba(249,115,22,0.12)",
                      }}
                    />
                    <div className="relative h-64 sm:h-72 xl:h-80 2xl:h-96 overflow-hidden">
                      <motion.img
                        src={upcomingEvents[0]?.imageUrl ?? ""}
                        alt={upcomingEvents[0]?.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7, ease: EASE_SOFT }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="text-2xl">
                          {getCategoryEmoji(upcomingEvents[0]?.category ?? "")}
                        </span>
                        <motion.span
                          className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-700 uppercase tracking-wide shadow-sm"
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {upcomingEvents[0]?.category}
                        </motion.span>
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center gap-1 text-xs text-white/80">
                            <CalendarDays className="h-3 w-3" />
                            {formatDate(upcomingEvents[0]?.date)}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-white/80">
                            <MapPin className="h-3 w-3" />
                            {upcomingEvents[0]?.location}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-white">
                          {upcomingEvents[0]?.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/70 leading-6">
                          {upcomingEvents[0]?.description}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <motion.span
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Users className="h-3.5 w-3.5 text-orange-400 inline" />
                        </motion.span>
                        &nbsp;{upcomingEvents[0]?.attendees} expected
                      </div>
                    </div>
                  </motion.div>

                  {/* 2 stacked — index 1 & 2 */}
                  <div className="grid gap-4 sm:gap-5 xl:gap-6 grid-rows-2">
                    {upcomingEvents.slice(1, 3).map((ev) => (
                      <motion.div
                        key={ev.id}
                        variants={fadeRight}
                        whileHover={{
                          y: -4,
                          transition: { duration: 0.35, ease: EASE_SOFT },
                        }}
                        className="group relative overflow-hidden rounded-2xl xl:rounded-3xl border border-gray-100 shadow-sm cursor-pointer flex flex-col"
                      >
                        <div
                          className="absolute inset-0 rounded-2xl xl:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            boxShadow:
                              "inset 0 0 0 1.5px rgba(249,115,22,0.3), 0 12px 40px rgba(249,115,22,0.08)",
                          }}
                        />
                        <div className="relative h-32 sm:h-36 xl:h-40 overflow-hidden">
                          <motion.img
                            src={ev.imageUrl ?? ""}
                            alt={ev.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.07 }}
                            transition={{ duration: 0.65, ease: EASE_SOFT }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                          <div className="absolute top-3 left-3 text-xl">
                            {getCategoryEmoji(ev.category)}
                          </div>
                          <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-gray-700 uppercase tracking-wide">
                            {ev.category}
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-base sm:text-lg font-bold text-white">
                              {ev.title}
                            </h3>
                          </div>
                        </div>
                        <div className="bg-white flex items-center justify-between px-4 py-3 flex-1">
                          <div className="space-y-0.5">
                            <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                              <CalendarDays className="h-3 w-3 text-orange-400" />
                              {formatDate(ev.date)}
                            </p>
                            <p className="text-[10px] text-gray-400 flex items-center gap-1.5">
                              <MapPin className="h-2.5 w-2.5" />
                              {ev.location}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Row 2 — index 3–5 */}
                {upcomingEvents.length > 3 && (
                  <div className="grid gap-4 sm:gap-5 xl:gap-6 sm:grid-cols-3">
                    {upcomingEvents.slice(3, 6).map((ev, i) => (
                      <motion.div
                        key={ev.id}
                        variants={fadeUp}
                        custom={i}
                        whileHover={{
                          y: -6,
                          transition: { duration: 0.4, ease: EASE_SOFT },
                        }}
                        className="group overflow-hidden rounded-2xl xl:rounded-3xl border border-gray-100 shadow-sm cursor-pointer relative"
                      >
                        <div className="relative h-44 xl:h-52 overflow-hidden">
                          <motion.img
                            src={ev.imageUrl ?? ""}
                            alt={ev.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.07 }}
                            transition={{ duration: 0.65, ease: EASE_SOFT }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/6 to-transparent pointer-events-none" />
                          <div className="absolute top-3 left-3 text-xl">
                            {getCategoryEmoji(ev.category)}
                          </div>
                          <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-gray-700 uppercase">
                            {ev.category}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-base xl:text-lg font-bold text-white">
                              {ev.title}
                            </h3>
                            <p className="mt-1 text-xs text-white/70 leading-5 line-clamp-2">
                              {ev.description}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white px-4 py-3.5 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-gray-700">
                              {formatDate(ev.date)}
                              {ev.time ? ` · ${ev.time}` : ""}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                              <Users className="h-2.5 w-2.5 text-orange-400" />
                              {ev.attendees} attending
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Empty state ── */}
            {!loading && upcomingEvents.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🎉</p>
                <p className="text-gray-500 text-lg font-medium">
                  No upcoming events yet.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Check back soon — something exciting is coming!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TIMELINE  (static — unchanged)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="timeline"
        className={`bg-gray-50 ${S} ${SY} relative overflow-hidden`}
      >
        <Blob
          className="h-96 w-96 bg-orange-100/60"
          style={{ top: "10%", right: "-8%" }}
        />
        <div className={`${W} relative`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="text-center mb-12 xl:mb-16"
            >
              <Label>Event Rhythm</Label>
              <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900">
                Our annual{" "}
                <span className="text-orange-500">community calendar</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base xl:text-lg text-gray-500 max-w-xl xl:max-w-2xl mx-auto leading-relaxed">
                From New Year to year-end gala — a full year of celebrations
                that bring us closer together.
              </p>
            </motion.div>

            {/* Desktop zig-zag */}
            <div ref={tlRef} className="hidden md:block relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-orange-100" />
              <div
                className="tl-pulse absolute left-1/2 top-0 -translate-x-1/2 w-px h-24"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(249,115,22,0.8), transparent)",
                }}
              />
              <div className="space-y-8 xl:space-y-10">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={i % 2 === 0 ? fadeLeft : fadeRight}
                    className="relative grid grid-cols-2 gap-8 xl:gap-12 items-center"
                  >
                    <div
                      className={
                        i % 2 === 0
                          ? "text-right pr-8 xl:pr-12"
                          : "order-2 pl-8 xl:pl-12"
                      }
                    >
                      <motion.div
                        whileHover={{
                          y: -4,
                          transition: { duration: 0.35, ease: EASE_SOFT },
                        }}
                        className={`inline-flex flex-col ${i % 2 === 0 ? "items-end" : "items-start"} bg-white rounded-2xl xl:rounded-3xl border border-gray-100 p-5 xl:p-7 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-400 cursor-default`}
                      >
                        <span className="text-3xl xl:text-4xl mb-3">
                          {item.emoji}
                        </span>
                        <span className="text-[10px] sm:text-xs xl:text-sm font-bold uppercase tracking-widest text-orange-500">
                          {item.label}
                        </span>
                        <h3 className="mt-1.5 text-lg sm:text-xl xl:text-2xl 2xl:text-3xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm xl:text-base text-gray-500 max-w-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div
                        className="h-5 w-5 xl:h-6 xl:w-6 rounded-full bg-orange-500 ring-4 ring-white shadow-lg"
                        animate={{
                          boxShadow: [
                            "0 0 0 0px rgba(249,115,22,0.3)",
                            "0 0 0 8px rgba(249,115,22,0)",
                            "0 0 0 0px rgba(249,115,22,0)",
                          ],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    </div>
                    <div className={i % 2 === 0 ? "order-2" : "order-1"} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile scroll */}
            <div
              className="md:hidden -mx-4 px-4 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex gap-3 pb-4 w-max">
                {timeline.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="w-52 flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-orange-500">
                      {item.label}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 leading-5">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PAST EVENTS  (static — unchanged)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`${S} ${SY} bg-white relative overflow-hidden`}>
        <div className={`${W} relative`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 sm:mb-10 xl:mb-14"
            >
              <div>
                <Label>Past Showcases</Label>
                <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900">
                  Memories that{" "}
                  <span className="text-orange-500">define us</span>
                </h2>
              </div>
              <div className="flex gap-2 p-1 rounded-full bg-gray-100 w-fit">
                {pastEventYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className="relative rounded-full px-4 py-1.5 text-sm xl:text-base font-bold transition-colors duration-200 z-10"
                    style={{ color: activeYear === year ? "#fff" : "#6b7280" }}
                  >
                    {activeYear === year && (
                      <motion.div
                        layoutId="year-pill"
                        className="absolute inset-0 rounded-full bg-orange-500 shadow-md shadow-orange-200/60"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{year}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: EASE_PREMIUM }}
                className="grid gap-4 sm:gap-5 xl:gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredPast.map((ev, i) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: EASE_PREMIUM,
                      delay: i * 0.07,
                    }}
                    whileHover={{
                      y: -6,
                      transition: { duration: 0.35, ease: EASE_SOFT },
                    }}
                    className={`group relative overflow-hidden rounded-2xl xl:rounded-3xl bg-gray-900 text-white shadow-lg cursor-pointer ${i === 0 ? "sm:row-span-2 sm:col-span-1" : ""}`}
                  >
                    <motion.img
                      src={ev.imageUrl || getEventImage(ev)}
                      alt={ev.title}
                      className={`w-full object-cover ${i === 0 ? "h-64 sm:h-full sm:absolute sm:inset-0" : "h-56 xl:h-64"}`}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease: EASE_SOFT }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/20 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 xl:p-6">
                      <motion.span
                        className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-400"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {ev.date ? new Date(ev.date).getFullYear() : ""}
                      </motion.span>
                      <h3 className="mt-1.5 text-lg sm:text-xl xl:text-2xl font-bold text-white">
                        {ev.title}
                      </h3>
                      <p className="mt-2 text-xs xl:text-sm text-white/70 leading-5">
                        {ev.description || ev.location || "Community event"}
                      </p>
                      <motion.div
                        className="mt-4 flex items-center gap-1.5 text-orange-400 text-xs font-semibold"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.25 }}
                      >
                        View highlights <ChevronRight className="h-3.5 w-3.5" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          COMMUNITY MOMENTS  (static — unchanged)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`bg-gray-900 ${S} ${SY} relative overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_20%,rgba(251,146,60,0.12),transparent),radial-gradient(ellipse_40%_30%_at_85%_80%,rgba(59,130,246,0.08),transparent)]" />
        <div className={`${W} relative`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="text-center mb-10 xl:mb-14"
            >
              <p className="text-[10px] sm:text-xs xl:text-sm font-bold uppercase tracking-widest text-orange-400 mb-2 sm:mb-3">
                Community Moments
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white">
                Stories of{" "}
                <span className="text-orange-400">joy & connection</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base xl:text-lg text-gray-400 max-w-xl xl:max-w-2xl mx-auto leading-relaxed">
                A cinematic flow of moments that define our shared life in
                Korea.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:gap-5 xl:gap-6 md:grid-cols-3">
              {[
                {
                  title: "Dance & Togetherness",
                  sub: "High-energy performances and joyful crowds.",
                  img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
                },
                {
                  title: "Cultural Conversations",
                  sub: "Shared stories between Korean and Indian friends.",
                  img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
                },
                {
                  title: "Flavors of Home",
                  sub: "Family feasts and food festival highlights.",
                  img: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80",
                },
              ].map((m) => (
                <motion.div
                  key={m.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.45, ease: EASE_SOFT },
                  }}
                  className="group relative overflow-hidden rounded-2xl xl:rounded-3xl border border-white/8 shadow-xl cursor-pointer"
                >
                  <div className="h-64 xl:h-72 2xl:h-80 overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.title}
                      className="moment-img w-full h-[115%] object-cover transition duration-700 group-hover:scale-105"
                      style={{ transformOrigin: "center center" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/92 via-gray-950/15 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-orange-500/12 to-transparent pointer-events-none" />
                  <div
                    className="absolute inset-0 rounded-2xl xl:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.3)",
                    }}
                  />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-orange-400">
                      {m.sub}
                    </p>
                    <h3 className="mt-1.5 text-lg xl:text-xl 2xl:text-2xl font-bold text-white">
                      {m.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA  (unchanged)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className={`bg-orange-50 ${S} ${SY}`}>
        <div className={W}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-2xl xl:rounded-3xl bg-orange-500 px-8 py-14 sm:px-12 sm:py-16 xl:px-16 xl:py-20 2xl:px-20 2xl:py-24 text-white text-center shadow-2xl shadow-orange-300/50"
          >
            <motion.div
              className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-orange-400/50 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -16, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-400/40 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.15, 1], x: [0, -16, 0], y: [0, 20, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
                delay: 1,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundRepeat: "repeat",
                backgroundSize: "256px",
              }}
            />
            <div className="relative">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-1.5 text-[10px] sm:text-xs xl:text-sm font-bold uppercase tracking-widest text-white mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              >
                <Zap className="h-3 w-3" /> Join the movement
              </motion.span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
                Be part of India's most vibrant community in Korea
              </h2>
              <p className="mt-5 text-sm sm:text-base xl:text-lg 2xl:text-xl text-white/80 max-w-xl xl:max-w-2xl mx-auto leading-relaxed">
                Festivals, sports, cultural nights, food events, networking —
                there's always something happening. Don't miss out.
              </p>
              <div className="mt-8 xl:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.facebook.com/groups/IIK2002/"
                  target="_blank"
                  className="group/cta1 relative inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 xl:px-9 xl:py-5 text-sm xl:text-base font-bold text-orange-600 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-800/20"
                >
                  <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-orange-50/60 to-transparent -translate-x-full group-hover/cta1:translate-x-full transition-transform duration-700" />
                  <span className="relative">Join IIK on Facebook</span>
                  <ExternalLink className="h-4 w-4 relative transition-transform duration-300 group-hover/cta1:translate-x-0.5 group-hover/cta1:-translate-y-0.5" />
                </a>
                <a
                  href="#upcoming"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 xl:px-9 xl:py-5 text-sm xl:text-base font-bold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/60 hover:-translate-y-0.5"
                >
                  Explore events
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
