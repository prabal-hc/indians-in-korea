"use client";

import Link from "next/link";

const featureCards = [
  {
    title: "Higher Education",
    label: "Education",
    icon: "📚",
    description: "Guidance for Indian students studying in Korea.",
    accent: {
      bg: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      label: "text-[#FF9933]",
      link: "text-[#FF9933]",
    },
  },
  {
    title: "International Schools",
    label: "Schools",
    icon: "🏫",
    description: "Support for families navigating global schooling.",
    accent: {
      bg: "from-green-50 to-green-100",
      border: "border-green-200",
      label: "text-[#138808]",
      link: "text-[#138808]",
    },
  },
  {
    title: "About Korea",
    label: "Living",
    icon: "🌏",
    description: "Local insights on culture, living and visas.",
    accent: {
      bg: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      label: "text-blue-600",
      link: "text-blue-600",
    },
  },
  {
    title: "FAQ",
    label: "Help",
    icon: "❓",
    description: "Answers for newcomers joining the IIK family.",
    accent: {
      bg: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      label: "text-purple-600",
      link: "text-purple-600",
    },
  },
];

const missionStats = [
  { num: "20+", label: "Years active", color: "orange" },
  { num: "98%", label: "Satisfaction", color: "green" },
  { num: "12k+", label: "Members", color: "blue" },
  { num: "120+", label: "Events/yr", color: "purple" },
];

const FeatCard = ({
  card,
  index,
}: {
  card: (typeof featureCards)[0];
  index: number;
}) => (
  <div
    className="group relative overflow-hidden rounded-[22px] border-[1.5px] border-slate-100 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)]"
    style={{
      animation: `fadeUp 0.6s ${0.18 + index * 0.08}s ease both`,
      opacity: 0,
    }}
  >
    {/* Tricolor stripe on hover */}
    <div
      className="absolute bottom-0 left-0 top-0 flex w-[3px] scale-y-0 origin-top flex-col overflow-hidden rounded-l-[22px] transition-transform duration-[380ms] group-hover:scale-y-100"
      style={{ transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }}
    >
      <div className="flex-1 bg-[#FF9933]" />
      <div className="flex-1 bg-slate-100" />
      <div className="flex-1 bg-[#138808]" />
    </div>

    <div
      className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br text-[22px] border-[1.5px] ${card.accent.bg} ${card.accent.border} mb-[14px]`}
    >
      {card.icon}
    </div>

    <p
      className={`mb-1.5 text-[9px] font-[800] uppercase tracking-[0.18em] ${card.accent.label}`}
    >
      {card.label}
    </p>
    <h3 className="font-playfair text-[16px] font-bold text-slate-900">
      {card.title}
    </h3>
    <p className="mt-2 text-[12px] leading-[1.7] text-slate-500">
      {card.description}
    </p>

    <div
      className={`mt-[14px] flex items-center gap-1.5 text-[11px] font-[700] ${card.accent.link}`}
    >
      Learn more
      <svg
        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

export const AboutSection = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50/60 via-white to-green-50/40 py-20 px-4 sm:px-8 lg:px-16">
    {/* Ambient blobs */}
    <div
      className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#FF9933]/8 blur-3xl"
      style={{ animation: "float 7s ease-in-out infinite" }}
    />
    <div
      className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-[#138808]/6 blur-3xl"
      style={{ animation: "float 9s ease-in-out infinite" }}
    />

    <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10">
      <div className="grid items-start gap-10">
        {/* ── LEFT ── */}
        <div style={{ animation: "fadeUp 0.6s 0.1s ease both", opacity: 0 }}>
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2">
            <span className="flex gap-[3px]">
              {["#FF9933", "#e2e8f0", "#138808"].map((c) => (
                <span
                  key={c}
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </span>
            <span className="text-[10px] font-[800] uppercase tracking-[0.22em] text-[#FF9933]">
              About Us
            </span>
          </div>

          {/* Tricolor rule */}
          <div className="mb-4 flex h-[3.5px] w-14 overflow-hidden rounded-full">
            <div className="flex-1 bg-[#FF9933]" />
            <div className="flex-1 bg-slate-200" />
            <div className="flex-1 bg-[#138808]" />
          </div>

          <h2 className="font-playfair text-[36px] font-bold leading-[1.15] text-slate-900 sm:text-[40px]">
            We provide our{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(135deg,#FF9933,#ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Experts
            </em>
            <br />
            to Indians in Korea
          </h2>

          <p className="mt-4 text-[13px] leading-[1.85] text-slate-500 max-w-[480px]">
            This group primarily includes engineering professionals, business
            persons, research fellows, students and housewives. IIK upholds
            India's umbrella of{" "}
            <strong className="font-[700] text-slate-800">
              Unity in Diversity
            </strong>{" "}
            — doors of IIK are open for every Indian.
          </p>

          {/* Feature cards grid */}
          <div className="mt-7 grid grid-cols-1 gap-[14px] sm:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((card, i) => (
              <FeatCard key={card.title} card={card} index={i} />
            ))}
          </div>

          <Link
            href="#"
            className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[13px] font-[700] text-white shadow-[0_4px_18px_rgba(255,153,51,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,153,51,0.48)]"
            style={{ background: "linear-gradient(135deg,#FF9933,#ea580c)" }}
          >
            Explore everything
            <svg
              className="h-4 w-4"
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
    </div>

    <style>{`
      @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.88)} }
    `}</style>
  </section>
);

export default AboutSection;
