import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeaturedEvent {
  city: string;
  title: string;
  date: string;
  venue: string;
  imageSrc: string;
  href?: string;
}

interface SideEvent {
  city: string;
  title: string;
  day: string;
  month: string;
  attendees: number;
  avatars?: string[];
  href?: string;
}

interface CategoryCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  members?: string;
  bgDecor?: React.ReactNode;
  href?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────
const defaultFeatured: FeaturedEvent = {
  city: "Seoul",
  title: "IIK Diwali Dhamaka",
  date: "Nov 19",
  venue: "Kwangwoon University",
  imageSrc: "/images/diwali.jpg", // keep your existing valid image path if different
  href: "/events",
};

const defaultSideEvent: SideEvent = {
  city: "Seoul",
  title: "IIK Holi Hungama",
  day: "24",
  month: "MAR",
  attendees: 300,
  href: "/events",
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
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

// ─── Avatar Stack ─────────────────────────────────────────────────────────────
const AvatarStack = ({ count }: { count: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex -space-x-2">
      {["bg-orange-200", "bg-blue-200", "bg-purple-200"].map((color, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full ${color} border-2 border-white ring-1 ring-white/60`}
        />
      ))}
    </div>
    <span className="text-[13px] text-slate-500 font-medium">
      {count} Attending
    </span>
  </div>
);

// ─── City Badge ───────────────────────────────────────────────────────────────
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

// ─── Featured Event Card ──────────────────────────────────────────────────────
const FeaturedCard = ({ event }: { event: FeaturedEvent }) => (
  <div className="relative overflow-hidden rounded-2xl bg-slate-900 flex-1 min-h-[300px] group">
    {/* Background image */}
    <div className="absolute inset-0">
      <Image
        src={event.imageSrc}
        alt={event.title}
        fill
        className="object-cover opacity-70 group-hover:opacity-75 transition-opacity duration-500 group-hover:scale-[1.02] transition-transform"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
    </div>

    {/* Content */}
    <div className="relative h-full flex flex-col justify-between p-6 min-h-[300px]">
      {/* Top */}
      <CityBadge city={event.city} dark />

      {/* Bottom */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {event.title}
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-white/70 text-sm">
            <CalendarIcon />
            <span>
              {event.date} • {event.venue}
            </span>
          </div>
        </div>

        {/* Arrow button */}
        <Link
          href={event.href ?? "#"}
          className="shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-200"
        >
          <ArrowIcon />
        </Link>
      </div>
    </div>
  </div>
);

// ─── Side Event Card ──────────────────────────────────────────────────────────
const SideCard = ({ event }: { event: SideEvent }) => (
  <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm p-5 w-full lg:w-[300px] xl:w-[320px] shrink-0 shadow-sm hover:shadow-md transition-shadow duration-200">
    {/* Top row */}
    <div className="flex items-start justify-between gap-3">
      <CityBadge city={event.city} />
      <div className="text-right shrink-0">
        <p className="text-2xl font-bold text-slate-900 leading-none">
          {event.day}
        </p>
        <p className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mt-0.5">
          {event.month}
        </p>
      </div>
    </div>

    {/* Title */}
    <div className="mt-4 flex-1">
      <h3 className="text-[17px] font-semibold text-slate-800 leading-snug">
        {event.title}
      </h3>
    </div>

    {/* Divider + attendees */}
    <div className="mt-5 pt-4 border-t border-slate-100">
      <AvatarStack count={event.attendees} />
    </div>
  </div>
);

// ─── Category Card ────────────────────────────────────────────────────────────
interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  members?: string;
  accent?: string;
  wide?: boolean;
}

const CategoryCard = ({
  icon,
  title,
  subtitle,
  members,
  accent = "bg-orange-50",
  wide = false,
}: CategoryCardProps) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${
      wide ? "col-span-2 sm:col-span-1 lg:col-span-2" : ""
    }`}
    style={{ minHeight: 180 }}
  >
    {/* Icon */}
    <div
      className={`w-11 h-11 rounded-xl ${accent} flex items-center justify-center`}
    >
      {icon}
    </div>

    {/* Text */}
    <div className="mt-4">
      <h4 className="text-[15px] font-semibold text-slate-800">{title}</h4>
      <p className="mt-1 text-[13px] text-slate-500">{subtitle}</p>
    </div>

    {/* Members badge */}
    {members && (
      <div className="mt-4 flex items-center gap-1.5">
        <span className="text-[13px] font-bold text-slate-800">{members}</span>
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
      </div>
    )}

    {/* Decorative watermark for wide card */}
    {wide && (
      <div className="absolute bottom-0 right-0 w-28 h-28 opacity-[0.06]">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="70" cy="70" r="40" stroke="#f97316" strokeWidth="2" />
          <path d="M50 80L70 50 90 80" stroke="#f97316" strokeWidth="2" />
        </svg>
      </div>
    )}
  </div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────
interface UpcomingEventProps {
  featured?: FeaturedEvent;
  sideEvent?: SideEvent;
}

export const UpcomingEvent = ({
  featured = defaultFeatured,
  sideEvent = defaultSideEvent,
}: UpcomingEventProps) => {
  return (
    <section className="w-full bg-slate-50/80">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 px-4 py-12 sm:px-6 md:px-8 lg:px-10">
        {/* ── Header ── */}
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
            View Events
            <ArrowIcon />
          </Link>
        </div>

        {/* ── Top row: featured + side ── */}
        <div className="flex flex-col lg:flex-row gap-4">
          <FeaturedCard event={featured} />
          <SideCard event={sideEvent} />
        </div>

        {/* ── Bottom row: category cards ── */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Wide card */}
          <CategoryCard
            icon={<CricketIcon />}
            title="IIK Sports Club"
            subtitle="Cricket, football & community sports events."
            members="12k+ Members"
            accent="bg-orange-50"
            wide
          />

          <CategoryCard
            icon={<TerminalIcon />}
            title="Professional Network"
            subtitle="Engineers, researchers, startups & tech community."
            accent="bg-blue-50"
          />

          <CategoryCard
            icon={<TheaterIcon />}
            title="Cultural Events"
            subtitle="Diwali, Holi, music, dance & Indian celebrations."
            accent="bg-green-50"
          />
        </div>
      </div>
    </section>
  );
};
