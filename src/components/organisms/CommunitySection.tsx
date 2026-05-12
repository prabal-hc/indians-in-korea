import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Community {
  name: string;
  location: string;
  tag: string;
  tagColor: "saffron" | "green";
  emoji: string;
  href: string;
}

const communities: Community[] = [
  {
    name: "Bengali Association of Korea",
    location: "Seoul · Durga Puja, Nababarsho",
    tag: "Bengali",
    tagColor: "saffron",
    emoji: "🎶",
    href: "https://www.facebook.com/groups/BongKorea",
  },
  {
    name: "Korea Tamil Nanbargal",
    location: "Pan-Korea · Est. 2003 · Free digital school",
    tag: "Tamil",
    tagColor: "green",
    emoji: "🌿",
    href: "http://koreatamilnanbargal.com/",
  },
  {
    name: "Korea Kannada Koota",
    location: "Korea-wide · Karnataka community",
    tag: "Kannada",
    tagColor: "saffron",
    emoji: "🏔️",
    href: "https://www.facebook.com/groups/KoreaKannadaKoota",
  },
  {
    name: "Marathi Mandal Korea",
    location: "Korea-wide · Ganesh Utsav & more",
    tag: "Marathi",
    tagColor: "green",
    emoji: "🎉",
    href: "https://www.facebook.com/MarathiMandalKorea",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const TricolorBar = () => (
  <div className="flex h-[3px] w-12 overflow-hidden rounded-full">
    <div className="flex-1 bg-[#FF9933]" />
    <div className="flex-1 border-y border-slate-200 bg-white" />
    <div className="flex-1 bg-[#138808]" />
  </div>
);

const CommunityRow = ({
  community,
  index,
}: {
  community: Community;
  index: number;
}) => {
  const tagStyles =
    community.tagColor === "saffron"
      ? "bg-orange-50 text-[#FF9933]"
      : "bg-green-50 text-[#138808]";

  return (
    <Link
      href={community.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        animationDelay: `${0.3 + index * 0.1}s`,
        animation: 'fade-up 0.6s ease both',
        opacity: 0,
        animationFillMode: 'forwards'
      }}
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF9933]/40 hover:shadow-md"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
        {community.emoji}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-600 text-slate-900 font-semibold">
          {community.name}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-slate-400">
          {community.location}
        </p>
      </div>

      {/* Tag */}
      <span
        className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[9px] font-700 uppercase tracking-widest font-bold ${tagStyles}`}
      >
        {community.tag}
      </span>

      {/* Arrow */}
      <svg
        className="h-4 w-4 flex-shrink-0 text-slate-300 transition-colors duration-200 group-hover:text-[#FF9933]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

// ─── Korea Map SVG ────────────────────────────────────────────────────────────

const KoreaMap = () => (
  <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-orange-50/60 via-white to-green-50/50">
    {/* Ambient glows */}
    <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 animate-pulse-slow rounded-full bg-[#FF9933]/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 animate-pulse-slow-2 rounded-full bg-[#138808]/8 blur-3xl" />

    <svg
      viewBox="0 0 400 420"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* Dot grid */}
      {Array.from({ length: 15 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={20 + col * 27}
            cy={20 + row * 28}
            r="1.2"
            fill="#E2E8F0"
          />
        )),
      )}

      {/* Korea peninsula */}
      <path
        d="M180,40 L190,38 L205,42 L218,48 L228,58 L232,72 L238,88 L242,105 L244,122 L240,140 L236,155 L232,172 L228,188 L222,205 L216,220 L208,235 L200,250 L192,263 L184,275 L176,285 L168,295 L160,305 L155,315 L152,328 L154,340 L158,352 L160,360 L156,368 L148,372 L140,370 L134,362 L130,352 L132,340 L136,328 L138,316 L134,304 L126,295 L118,288 L112,278 L108,266 L106,252 L108,238 L112,224 L116,210 L118,196 L116,182 L112,168 L108,154 L106,140 L108,126 L112,112 L118,98 L126,86 L136,74 L148,62 L160,52 L172,44 Z"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Jeju island */}
      <ellipse
        cx="160"
        cy="395"
        rx="22"
        ry="13"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="1"
      />

      {/* Glow halos */}
      <circle cx="210" cy="148" r="38" fill="#FF9933" fillOpacity="0.08" />
      <circle cx="215" cy="290" r="30" fill="#138808" fillOpacity="0.07" />

      {/* Seoul pin */}
      <g style={{ animation: "popIn 0.4s 0.9s ease both", opacity: 0 }}>
        <circle cx="210" cy="148" r="12" fill="#FF9933" fillOpacity="0.2">
          <animate
            attributeName="r"
            from="8"
            to="20"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.4"
            to="0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="210" cy="148" r="5.5" fill="#FF9933" />
        <circle cx="210" cy="148" r="2.5" fill="white" />
        {/* Seoul tooltip */}
        <g style={{ animation: "popIn 0.4s 1.1s ease both", opacity: 0 }}>
          <rect
            x="220"
            y="130"
            width="118"
            height="42"
            rx="10"
            fill="white"
            stroke="#FFE0B2"
            strokeWidth="1"
          />
          <text
            x="230"
            y="147"
            fontSize="11"
            fontWeight="600"
            fill="#FF9933"
            fontFamily="DM Sans, sans-serif"
          >
            Seoul Metro
          </text>
          <text
            x="230"
            y="162"
            fontSize="10"
            fill="#94A3B8"
            fontFamily="DM Sans, sans-serif"
          >
            Bengali · Marathi · KTN
          </text>
        </g>
      </g>

      {/* Pangyo pin */}
      <g style={{ animation: "popIn 0.4s 1.1s ease both", opacity: 0 }}>
        <circle cx="218" cy="168" r="4" fill="#138808" />
        <circle cx="218" cy="168" r="2" fill="white" />
      </g>

      {/* Busan pin */}
      <g style={{ animation: "popIn 0.4s 1.3s ease both", opacity: 0 }}>
        <circle cx="215" cy="290" r="10" fill="#138808" fillOpacity="0.15">
          <animate
            attributeName="r"
            from="6"
            to="18"
            dur="2.5s"
            begin="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.35"
            to="0"
            dur="2.5s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="215" cy="290" r="5" fill="#138808" />
        <circle cx="215" cy="290" r="2.2" fill="white" />
        {/* Busan tooltip */}
        <g style={{ animation: "popIn 0.4s 1.5s ease both", opacity: 0 }}>
          <rect
            x="224"
            y="275"
            width="94"
            height="38"
            rx="10"
            fill="white"
            stroke="#BBF7D0"
            strokeWidth="1"
          />
          <text
            x="233"
            y="291"
            fontSize="11"
            fontWeight="600"
            fill="#138808"
            fontFamily="DM Sans, sans-serif"
          >
            Busan
          </text>
          <text
            x="233"
            y="305"
            fontSize="10"
            fill="#94A3B8"
            fontFamily="DM Sans, sans-serif"
          >
            Arts &amp; Culture
          </text>
        </g>
      </g>

      {/* Uijeongbu pin */}
      <g style={{ animation: "popIn 0.4s 1.5s ease both", opacity: 0 }}>
        <circle cx="200" cy="120" r="3.5" fill="#FF9933" />
        <circle cx="200" cy="120" r="1.5" fill="white" />
        {/* Uijeongbu tooltip */}
        <rect
          x="76"
          y="105"
          width="116"
          height="38"
          rx="10"
          fill="white"
          stroke="#FFE0B2"
          strokeWidth="1"
        />
        <text
          x="86"
          y="121"
          fontSize="11"
          fontWeight="600"
          fill="#FF9933"
          fontFamily="DM Sans, sans-serif"
        >
          Uijeongbu
        </text>
        <text
          x="86"
          y="135"
          fontSize="10"
          fill="#94A3B8"
          fontFamily="DM Sans, sans-serif"
        >
          ISKCON Korea Temple
        </text>
      </g>

      {/* Watermark */}
      <text
        x="200"
        y="413"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#CBD5E1"
        letterSpacing="6"
        fontFamily="DM Sans, sans-serif"
      >
        SOUTH KOREA
      </text>
    </svg>

    <style>{`
      @keyframes popIn {
        from { opacity: 0; transform: scale(0.5); }
        to   { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const CommunitySection = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50/70 via-white to-green-50/50 px-4 py-16 sm:px-8 lg:px-16">
    {/* Background ambient blobs */}
    <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#FF9933]/6 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#138808]/5 blur-3xl" />

    <div className="relative mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* ── Left column ── */}
        <div className="flex flex-col gap-5">
          <TricolorBar />

          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#138808]">
            Indians in Korea · IIK
          </p>

          <h2 className="font-playfair text-[38px] font-bold leading-[1.15] text-slate-900">
            Find Your <span className="text-[#FF9933]">Tribe</span>
          </h2>

          <p className="max-w-sm text-[13px] leading-relaxed text-slate-500">
            Whether you&apos;re a student at SNU, an engineer in Pangyo, or a
            Tamil in Seoul — there&apos;s an IIK community waiting for you.
          </p>

          {/* Community rows */}
          <div className="flex flex-col gap-3 mt-1">
            {communities.map((c, i) => (
              <CommunityRow key={c.name} community={c} index={i} />
            ))}
          </div>

          {/* Show all button */}
          <Link
            href="#"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[12px] font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#FF9933]/60 hover:bg-orange-50 hover:text-[#FF9933]"
          >
            View all communities
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* ── Right column — Map ── */}
        <div className="h-[440px] lg:h-[500px]">
          <KoreaMap />
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-wrap gap-8">
          {[
            { num: "12k+", label: "IIK Members", color: "#FF9933" },
            { num: "6+", label: "Active Communities", color: "#138808" },
            { num: "2002", label: "Est. Year", color: "#FF9933" },
            { num: "20+", label: "Years of service", color: "#138808" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <span
                className="font-playfair text-2xl font-bold"
                style={{ color: s.color }}
              >
                {s.num}
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-[#FF9933] px-5 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e8821f] hover:shadow-md"
        >
          Explore all groups
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>

    {/* Keyframes */}
    <style>{`
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-up {
        animation: fade-up 0.5s ease both;
      }
      @keyframes pulse-slow {
        0%, 100% { transform: scale(1); opacity: 0.7; }
        50%       { transform: scale(1.15); opacity: 1; }
      }
      @keyframes pulse-slow-2 {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50%       { transform: scale(1.2); opacity: 0.9; }
      }
      .animate-pulse-slow  { animation: pulse-slow  5s ease-in-out infinite; }
      .animate-pulse-slow-2 { animation: pulse-slow-2 6s ease-in-out infinite; }
    `}</style>
  </section>
);

export default CommunitySection;
