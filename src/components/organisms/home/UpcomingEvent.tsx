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
const CricketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="11" stroke="#f97316" strokeWidth="1.6" />
    <path
      d="M9 19l6-6M11 10l7 7"
      stroke="#f97316"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="9.5" cy="9.5" r="2" fill="#f97316" />
  </svg>
);
const TerminalIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect
      x="3"
      y="6"
      width="22"
      height="16"
      rx="3"
      stroke="#3b82f6"
      strokeWidth="1.6"
    />
    <path
      d="M8 12l4 3-4 3M15 18h5"
      stroke="#3b82f6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TheaterIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="10" cy="13" r="6" stroke="#22c55e" strokeWidth="1.6" />
    <circle cx="18" cy="13" r="6" stroke="#22c55e" strokeWidth="1.6" />
    <path
      d="M8 13c0 2 1 3 2 3s2-1 2-3"
      stroke="#22c55e"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M16 11c0-2 1-3 2-3s2 1 2 3"
      stroke="#22c55e"
      strokeWidth="1.4"
      strokeLinecap="round"
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
            href={`/events`}
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
        <span className="text-2xl">{event.tag}</span>
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
      const [feat, events] = await Promise.all([getFeatured(), getUpcoming(6)]);
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
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );

  const displayFeatured = featured ?? upcoming[0] ?? null;
  const sideEvent = featured
    ? (upcoming.find((event) => event.id !== featured.id) ?? null)
    : (upcoming[1] ?? null);

  return (
    <section className="w-full bg-slate-50/80">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 px-4 py-12 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-orange-500 tracking-tight">
              Upcoming Events
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

        {/* Featured + side */}
        {(displayFeatured || sideEvent) && (
          <div className="flex flex-col lg:flex-row gap-4">
            {displayFeatured && <FeaturedCard event={displayFeatured} />}
            {sideEvent && <SideCard event={sideEvent} />}
          </div>
        )}

        {/* Bottom category tiles — dynamic based on events */}
        {(() => {
          const categoryMap = new Map<
            string,
            {
              count: number;
              icon: React.ReactNode;
              color: string;
              bgColor: string;
            }
          >();

          const categoryConfig: Record<
            string,
            { icon: React.ReactNode; color: string; bgColor: string }
          > = {
            Sports: {
              icon: <CricketIcon />,
              color: "#f97316",
              bgColor: "bg-orange-50",
            },
            Professional: {
              icon: <TerminalIcon />,
              color: "#3b82f6",
              bgColor: "bg-blue-50",
            },
            Cultural: {
              icon: <TheaterIcon />,
              color: "#22c55e",
              bgColor: "bg-green-50",
            },
          };

          upcoming.forEach((event) => {
            const category = event.category || "General";
            if (!categoryMap.has(category)) {
              categoryMap.set(category, {
                count: 0,
                icon: categoryConfig[category]?.icon || <CricketIcon />,
                color: categoryConfig[category]?.color || "#f97316",
                bgColor: categoryConfig[category]?.bgColor || "bg-orange-50",
              });
            }
            const data = categoryMap.get(category)!;
            data.count += 1;
          });

          const categories = Array.from(categoryMap.entries());

          return (
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(([category, data], idx) => (
                <div
                  key={category}
                  className={`${
                    idx === 0 ? "col-span-2" : ""
                  } relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 min-h-[180px]`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${data.bgColor} flex items-center justify-center`}
                  >
                    {data.icon}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-[15px] font-semibold text-slate-800">
                      {category}
                    </h4>
                    <p className="mt-1 text-[13px] text-slate-500">
                      {data.count} event{data.count !== 1 ? "s" : ""} coming up
                      in this category.
                    </p>
                  </div>
                  {idx === 0 && (
                    <div className="mt-4 flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-slate-800">
                        {data.count}+ Events
                      </span>
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-28 h-28 opacity-[0.06]">
                    <svg viewBox="0 0 100 100" fill="none">
                      <circle
                        cx="70"
                        cy="70"
                        r="40"
                        stroke={data.color}
                        strokeWidth="2"
                      />
                      <path
                        d="M50 80L70 50 90 80"
                        stroke={data.color}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Upcoming event chips */}
        {upcoming.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {upcoming.slice(1, 5).map((ev) => (
              <div
                key={ev.id}
                className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-orange-300 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <span>{ev.tag}</span>
                <span>{ev.title}</span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-slate-400 text-xs">
                  {formatDate(ev.date)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
