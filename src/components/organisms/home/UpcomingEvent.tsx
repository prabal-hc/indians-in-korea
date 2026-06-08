"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getUpcoming,
  getFeatured,
  type EventItem,
} from "@/services/events.service";

// ─── Icons ────────────────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    className="shrink-0"
  >
    <rect
      x="1"
      y="3"
      width="14"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path
      d="M5 1v4M11 1v4M1 7h14"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10h12M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const AvatarStack = ({ count }: { count: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex -space-x-2">
      {["bg-orange-200", "bg-blue-200", "bg-purple-200"].map((c, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full ${c} border-2 border-white`}
        />
      ))}
    </div>
    <span className="text-[13px] text-slate-500 font-medium">
      {count} Attending
    </span>
  </div>
);

const CityBadge = ({
  city,
  dark = false,
}: {
  city: string;
  dark?: boolean;
}) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${
      dark
        ? "bg-black/40 text-white backdrop-blur-sm border border-white/10"
        : "bg-orange-100 text-orange-700 border border-orange-200"
    }`}
  >
    {city}
  </span>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);

// ─── Featured card ────────────────────────────────────────────────────────────
const FeaturedCard = ({ event }: { event: EventItem }) => {
  const city = event.location.split(",").pop()?.trim() ?? event.location;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 flex-1 min-h-[300px] group">
      <div className="absolute inset-0">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover opacity-70 group-hover:opacity-80 transition-all duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>
      <div className="relative h-full flex flex-col justify-between p-6 min-h-[300px]">
        <CityBadge city={city} dark />
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {event.title}
            </h3>
            <div className="mt-2 flex items-center gap-1.5 text-white/70 text-sm">
              <CalendarIcon />
              <span>
                {formatDate(event.date)}
                {event.time ? ` • ${event.time}` : ""}
              </span>
            </div>
            <div className="mt-1 text-white/60 text-xs">{event.location}</div>
          </div>
          <Link
            href="/events"
            className="shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-200"
          >
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Side card ────────────────────────────────────────────────────────────────
const SideCard = ({ event }: { event: EventItem }) => {
  const d = new Date(event.date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const city = event.location.split(",")[0];
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm p-5 w-full lg:w-[300px] xl:w-[320px] shrink-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <CityBadge city={city} />
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-slate-900 leading-none">
            {day}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mt-0.5">
            {month}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <h3 className="text-[17px] font-semibold text-slate-800 leading-snug">
          {event.title}
        </h3>
      </div>
      <p className="mt-2 text-sm text-slate-500 line-clamp-2">
        {event.description}
      </p>
      <div className="mt-5 pt-4 border-t border-slate-100">
        <AvatarStack count={event.attendees ?? "0"} />
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const UpcomingEvent = () => {
  const [featured, setFeatured] = useState<EventItem | null>(null);
  const [upcoming, setUpcoming] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [feat, events] = await Promise.all([getFeatured(), getUpcoming(2)]);
      setFeatured(feat);
      setUpcoming(events);
      setLoading(false);
    };
    load();
  }, []);

  if (loading)
    return (
      <section className="w-full bg-slate-50/80">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 px-4 py-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="flex flex-col lg:flex-row gap-4">
            <Skeleton className="flex-1 h-72 rounded-2xl" />
            <Skeleton className="lg:w-[300px] h-72 rounded-2xl" />
          </div>
        </div>
      </section>
    );

  const displayFeatured = featured ?? upcoming[0] ?? null;
  const sideEvent = featured
    ? (upcoming.find((e) => e.id !== featured.id) ?? null)
    : (upcoming[1] ?? null);

  if (!displayFeatured && !sideEvent) return null;

  return (
    <section className="w-full bg-slate-50/80">
      <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 py-15 px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-playfair text-[36px] font-bold leading-[1.15] text-slate-900 sm:text-[40px]">
              Upcoming{" "}
              <em
                className="italic"
                style={{
                  background: "linear-gradient(135deg,#FF9933,#ea580c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Events
              </em>
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Join the next gathering in your city.
            </p>
          </div>
          <Link
            href="/events"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            View Events <ArrowIcon />
          </Link>
        </div>

        {/* Featured + side — the only two cards */}
        <div className="flex flex-col lg:flex-row gap-4">
          {displayFeatured && <FeaturedCard event={displayFeatured} />}
          {sideEvent && <SideCard event={sideEvent} />}
        </div>
      </div>
    </section>
  );
};
