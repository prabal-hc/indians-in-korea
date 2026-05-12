"use client";

import { useState, useEffect } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const communities = [
  {
    id: "ktn",
    shortName: "KTN",
    name: "Korea Tamil Nanbargal",
    abbr: "KTN",
    tag: "Cultural & Regional",
    tagColor: "#c2410c",
    tagBg: "rgba(234,88,12,0.10)",
    emoji: "🌿",
    accentColor: "#ea580c",
    glowColor: "rgba(234,88,12,0.15)",
    borderColor: "rgba(234,88,12,0.25)",
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
    shortName: "KTN School",
    name: "KTN Digital Online School",
    abbr: "KDS",
    tag: "Educational",
    tagColor: "#1d4ed8",
    tagBg: "rgba(37,99,235,0.08)",
    emoji: "🎓",
    accentColor: "#2563eb",
    glowColor: "rgba(37,99,235,0.12)",
    borderColor: "rgba(37,99,235,0.25)",
    description:
      'Motto: "Education for All and Education for Free." Founded Nov 2019 at the Indian Embassy, KTN Digital Online School offers CBSE curriculum from kindergarten through 8th grade — entirely free, run by 26+ volunteer teachers.',
    highlights: [
      "Free CBSE K–8 online education",
      "26+ volunteer teachers",
      "English, Math, Science, Tamil, Hindi, Telugu, Korean",
      "Annual Day, exams & report cards",
    ],
    links: {
      email: "ktndigitalonlineschool@gmail.com",
    },
    icon: "📚",
    size: "medium",
    members: "300+ students",
    since: "2019",
  },
  {
    id: "bak",
    shortName: "BAK",
    name: "Bengali Association of Korea",
    abbr: "BAK",
    tag: "Cultural",
    tagColor: "#7e22ce",
    tagBg: "rgba(126,34,206,0.08)",
    emoji: "🎶",
    accentColor: "#9333ea",
    glowColor: "rgba(147,51,234,0.12)",
    borderColor: "rgba(147,51,234,0.25)",
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
    shortName: "KKK",
    name: "Korea Kannada Koota",
    abbr: "KKK",
    tag: "Regional",
    tagColor: "#15803d",
    tagBg: "rgba(21,128,61,0.08)",
    emoji: "🏔️",
    accentColor: "#16a34a",
    glowColor: "rgba(22,163,74,0.12)",
    borderColor: "rgba(22,163,74,0.25)",
    description:
      "Korea Kannada Koota (ಕೊರಿಯಾ ಕನ್ನಡ ಕೂಟ) is a regional community for people from Karnataka State. Started in 2011, KKK has been widely useful in connecting Kannadigas living across Korea.",
    highlights: [
      "Connecting Karnataka people in Korea",
      "Est. 2011 — 13+ years of community",
      "Cultural events & get-togethers",
      "Support network for new arrivals",
    ],
    links: {
      facebook: "https://www.facebook.com/groups/KoreaKannadaKoota",
    },
    icon: "🌄",
    size: "medium",
    members: "500+",
    since: "2011",
  },
  {
    id: "mmk",
    shortName: "MMK",
    name: "Marathi Mandal Korea",
    abbr: "MMK",
    tag: "Regional",
    tagColor: "#b45309",
    tagBg: "rgba(180,83,9,0.08)",
    emoji: "🎉",
    accentColor: "#d97706",
    glowColor: "rgba(217,119,6,0.12)",
    borderColor: "rgba(217,119,6,0.25)",
    description:
      "Marathi Mandal Korea unites all Marathi-loving people in South Korea. MMK provides a platform for sharing Marathi culture, celebrating major festivals, and supporting writers, artists, and students in Korea.",
    highlights: [
      "Shri Ganesh Utsav — Biggest annual event",
      "Makar Sankranti & Gudi Padwa",
      "Kojagiri Purnima (full moon celebration)",
      "Support for Marathi students & job seekers",
    ],
    links: {
      facebook: "https://www.facebook.com/MarathiMandalKorea",
    },
    icon: "🪔",
    size: "medium",
    members: "600+",
    since: "2010",
  },
  {
    id: "iskcon",
    shortName: "ISKCON",
    name: "ISKCON Korea",
    abbr: "ISKCON",
    tag: "Spiritual",
    tagColor: "#be185d",
    tagBg: "rgba(190,24,93,0.08)",
    emoji: "🙏",
    accentColor: "#db2777",
    glowColor: "rgba(219,39,119,0.12)",
    borderColor: "rgba(219,39,119,0.25)",
    description:
      "The only ISKCON Temple in Korea, opened in 2003 and situated just outside Seoul near Uijeongbu. The deities have been worshipped for two decades in this newly renovated, spiritually vibrant temple.",
    highlights: [
      "Only ISKCON temple in Korea",
      "Near Uijeongbu, Seoul outskirts",
      "Worshipped for 20+ years",
      "Newly renovated temple",
    ],
    links: {
      website: "https://www.iskcon-korea.com/beginning-of-a-new-temple",
    },
    icon: "🕌",
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

// ─── Decorative Rangoli SVG ───────────────────────────────────────────────────
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
interface Community {
  id: string;
  shortName: string;
  name: string;
  abbr: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  emoji: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  description: string;
  highlights: string[];
  links: Partial<Record<"website" | "facebook" | "email", string>>;
  icon: string;
  size: string;
  members: string;
  since: string;
}

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
  const delayClasses = [
    "delay-08",
    "delay-18",
    "delay-28",
    "delay-38",
    "delay-48",
    "delay-58",
    "delay-68",
    "delay-78",
  ];
  const delayClass = delayClasses[index % delayClasses.length];

  return (
    <div
      className={`relative rounded-2xl border-[1.5px] bg-white overflow-hidden cursor-pointer transition-all duration-280 shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 animate-card-in ${delayClass} ${isLarge ? "md:col-span-2" : ""}`}
      style={{
        borderColor: community.borderColor,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-280"
        style={{
          backgroundColor: community.accentColor,
          opacity: hovered ? 1 : 0,
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
            className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              color: community.tagColor,
              backgroundColor: community.tagBg,
            }}
          >
            {community.tag}
          </span>
          <span
            className="w-9 h-9 flex items-center justify-center rounded-[10px] text-lg"
            style={{
              backgroundColor: community.tagBg,
              borderColor: community.borderColor,
              border: `1.5px solid ${community.borderColor}`,
            }}
          >
            {community.icon}
          </span>
        </div>

        {/* Title */}
        <h3 className="flex flex-col mb-3">
          <span
            className="font-playfair text-2xl md:text-4xl font-black tracking-tighter leading-tight"
            style={{ color: community.accentColor }}
          >
            {community.abbr}
          </span>
          <span className="text-xs font-medium text-stone-500 mt-0.5">
            {community.name}
          </span>
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-stone-700 mb-4.5">
          {community.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.75 mb-5.5">
          {community.highlights.map((h: string, i: number) => (
            <li
              key={i}
              className="flex items-center gap-2 text-xs font-medium text-stone-800"
            >
              <span
                className="w-1.25 h-1.25 rounded-full shrink-0"
                style={{ backgroundColor: community.accentColor }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-1.5 flex-wrap">
            <span
              className="text-xs font-semibold px-2.5 py-0.75 rounded-full border"
              style={{
                color: community.accentColor,
                borderColor: community.borderColor,
                backgroundColor: community.tagBg,
              }}
            >
              Est. {community.since}
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-0.75 rounded-full border"
              style={{
                color: community.accentColor,
                borderColor: community.borderColor,
                backgroundColor: community.tagBg,
              }}
            >
              {community.members}
            </span>
          </div>
          <div className="flex gap-1.75 flex-wrap">
            {community.links.website && (
              <a
                href={community.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-3.75 py-1.75 rounded-full text-white transition-all duration-200 hover:brightness-90 hover:-translate-y-0.5"
                style={{ backgroundColor: community.accentColor }}
              >
                Website ↗
              </a>
            )}
            {community.links.facebook && (
              <a
                href={community.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-3.75 py-1.75 rounded-full border-1.5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: community.accentColor,
                  borderColor: community.borderColor,
                }}
              >
                Facebook ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CommunitiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  const filtered = communities.filter(
    (c) => activeFilter === "All" || c.tag === activeFilter,
  );

  return (
    <div
      className={`min-h-screen bg-orange-50 text-stone-900 overflow-x-hidden relative transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        body, html { font-family: 'Plus Jakarta Sans', sans-serif; }

        .font-playfair { font-family: 'Playfair Display', serif; }

        /* Warm paper texture background */
        .page-texture::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 5% 10%, rgba(234,88,12,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 95% 90%, rgba(22,163,74,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 60% 60% at 50% 50%, rgba(217,119,6,0.03) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle grain overlay */
        .page-texture::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        /* Animations */
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .animate-fade-down {
          animation: fade-down 0.5s ease both;
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease both;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-pulse-dot {
          animation: pulse-dot 2s ease infinite;
        }

        .animate-card-in {
          animation: card-in 0.55s ease both;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-08 { animation-delay: 0.08s; }
        .delay-12 { animation-delay: 0.12s; }
        .delay-18 { animation-delay: 0.18s; }
        .delay-20 { animation-delay: 0.20s; }
        .delay-28 { animation-delay: 0.28s; }
        .delay-32 { animation-delay: 0.32s; }
        .delay-38 { animation-delay: 0.38s; }
        .delay-48 { animation-delay: 0.48s; }
        .delay-58 { animation-delay: 0.58s; }
      `}</style>

      {/* Background texture */}
      <div className="page-texture" />

      {/* Decorative rangoli */}
      <div className="fixed pointer-events-none z-0 top-15 right-0 opacity-5 md:opacity-6 transform rotate-45">
        <RangoliDecor size={160} opacity={0.06} />
      </div>
      <div className="fixed pointer-events-none z-0 bottom-20 left-0 opacity-5 transform -rotate-45">
        <RangoliDecor size={140} opacity={0.05} />
      </div>

      {/* Hero */}
      <div className="relative z-10 pt-30 px-6 pb-13 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-[1.5px] bg-orange-50 border-orange-300 text-orange-800 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-down">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse-dot" />
          Regional Showcase · Indians in Korea
        </div>

        <div className="flex w-12 h-1 rounded mx-auto mb-5.5 overflow-hidden animate-fade-up delay-08">
          <div className="flex-1 bg-orange-600" />
          <div className="flex-1 bg-stone-200" />
          <div className="flex-1 bg-green-600" />
        </div>

        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-stone-900 mb-5 animate-fade-up delay-12">
          Indian <span className="text-orange-600">Communities</span>
          <br />
          in <span className="text-green-600">Korea</span>
        </h1>

        <p className="text-sm leading-relaxed text-stone-600 max-w-md mx-auto mb-9 animate-fade-up delay-20">
          Showcasing the diverse Indian regional communities in Korea that bring
          people together through culture, language, shared experiences, and
          mutual support.
        </p>

        {/* Hero inline stats */}
        <div className="flex flex-wrap gap-0 justify-center border-t-[1.5px] border-stone-200 pt-7 mt-1 animate-fade-up delay-28">
          <div className="px-7 border-r-[1.5px] border-stone-200 text-center sm:px-4">
            <div className="font-playfair text-2xl font-extrabold text-orange-600 leading-tight">
              5k+
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
              Members
            </div>
          </div>
          <div className="px-7 border-r-[1.5px] border-stone-200 text-center sm:px-4">
            <div className="font-playfair text-2xl font-extrabold text-green-600 leading-tight">
              120+
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
              Events
            </div>
          </div>
          <div className="px-7 border-r-[1.5px] border-stone-200 text-center sm:px-4">
            <div className="font-playfair text-2xl font-extrabold text-amber-600 leading-tight">
              15+
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
              Organizations
            </div>
          </div>
          <div className="px-7 text-center sm:px-4">
            <div className="font-playfair text-2xl font-extrabold text-orange-600 leading-tight">
              2002
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
              Est. Year
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 justify-center my-12 px-6 relative z-10 animate-fade-up delay-32">
        {filters.map((f) => (
          <button
            key={f}
            className={`px-4.5 py-1.75 rounded-full border-[1.5px] text-xs font-semibold transition-all duration-200 ${
              activeFilter === f
                ? "bg-orange-600 border-orange-600 text-white font-bold shadow-lg shadow-orange-600/30"
                : "border-stone-200 bg-white text-stone-600 shadow-sm hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50"
            }`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Section divider */}
      <div className="relative z-10 flex items-center gap-3.5 px-6 mx-auto mb-7 max-w-4xl">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-stone-300 to-transparent" />
        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
          {filtered.length} communities found
        </span>
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-stone-300 to-transparent" />
      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 px-6 pb-18 max-w-9xl mx-auto">
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
    </div>
  );
}
