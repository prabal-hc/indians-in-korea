"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const COMMUNITY_QUOTES = [
  {
    name: "Arjun Sharma",
    initials: "AS",
    role: "Lead Developer at Naver",
    location: "Seoul",
    color: "saffron" as const,
    quote:
      "IIK helped me find a home when I moved to Seoul 5 years ago. The networking events here are unparalleled for anyone looking to build a career in Korea.",
  },
  {
    name: "Priya Patel",
    initials: "PP",
    role: "PhD Candidate, KAIST",
    location: "Daejeon",
    color: "green" as const,
    quote:
      "As a student, having a support system that understands your cultural roots while helping you integrate into Korean society is a blessing. IIK is exactly that.",
  },
  {
    name: "Ravi Kumaran",
    initials: "RK",
    role: "Freelance Photographer",
    location: "Busan",
    color: "saffron" as const,
    quote:
      "The cultural events are the highlight of my year — a perfect blend of tradition and modern community spirit.",
  },
  {
    name: "Meera Nair",
    initials: "MN",
    role: "Software Engineer, Kakao",
    location: "Seoul",
    color: "green" as const,
    quote:
      "The warmth of the Indian community here in Korea is something I never expected to find so far from home. IIK made all the difference.",
  },
  {
    name: "Suresh Pillai",
    initials: "SP",
    role: "Restaurant Owner",
    location: "Incheon",
    color: "saffron" as const,
    quote:
      "Thanks to IIK's business network, I connected with the right people to open my restaurant.",
  },
];

const StarRating = () => (
  <div className="ml-auto flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        className="h-3 w-3 fill-[#FF9933]"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const VoiceCard = ({ quote }: { quote: (typeof COMMUNITY_QUOTES)[number] }) => {
  const isSaffron = quote.color === "saffron";
  return (
    <div className="group relative w-[300px] flex-shrink-0 overflow-hidden rounded-[22px] border border-slate-100 bg-white p-[22px] transition-all duration-250 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      {/* Tricolor stripe */}
      <div className="absolute bottom-0 left-0 top-0 flex w-[3px] flex-col overflow-hidden rounded-l-[22px]">
        <div className="flex-1 scale-y-0 origin-top transition-transform duration-[380ms] [cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-y-100 bg-[#FF9933]" />
        <div className="flex-1 scale-y-0 origin-top transition-transform duration-[380ms] [cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-y-100 bg-slate-100" />
        <div className="flex-1 scale-y-0 origin-top transition-transform duration-[380ms] [cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-y-100 bg-[#138808]" />
      </div>
      <span className="pointer-events-none absolute right-4 top-2 font-serif text-[72px] leading-none text-[#FF9933] opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.14]">
        "
      </span>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] text-[13px] font-semibold ${isSaffron ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-800"}`}
        >
          {quote.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-slate-900">
            {quote.name}
          </p>
          <p className="truncate text-[11px] text-slate-400">{quote.role}</p>
        </div>
        <StarRating />
      </div>
      <p className="relative z-10 mt-4 text-[12.5px] italic leading-[1.75] text-slate-500">
        "{quote.quote}"
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
        <span
          className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${isSaffron ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-800"}`}
        >
          {quote.location}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <svg
            className="h-3.5 w-3.5 text-[#138808]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
          Verified member
        </span>
      </div>
    </div>
  );
};

export const VoiceOfCommunitySection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const CARD_W = 300;
  const GAP = 20;
  const SET_W = COMMUNITY_QUOTES.length * (CARD_W + GAP);
  const SPEED = 60; // px per second — increase to go faster

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const duration = SET_W / SPEED;

    tweenRef.current = gsap.to(track, {
      x: -SET_W,
      duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % SET_W),
      },
    });

    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    return () => {
      tweenRef.current?.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, [SET_W]);

  // 3 sets = seamless at any speed
  const allCards = [
    ...COMMUNITY_QUOTES,
    ...COMMUNITY_QUOTES,
    ...COMMUNITY_QUOTES,
  ];

  return (
    <section className="relative w-full overflow-hidden bg-green-50/40 py-20">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-orange-50/60 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-green-50/40 to-transparent" />

      {/* Header */}
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 mb-12 px-4 sm:px-8 lg:px-16">
        <div className="mb-4 flex h-[3px] w-12 overflow-hidden rounded-full">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-slate-200" />
          <div className="flex-1 bg-[#138808]" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#138808]">
          Voice of Community
        </p>
        <h2 className="mt-3 font-playfair text-[36px] font-bold leading-[1.15] text-slate-900 sm:text-[40px]">
          Real stories from{" "}
          <em className="italic text-[#FF9933]">our members</em>
          <br />
          across Korea.
        </h2>
      </div>

      {/* Infinite marquee */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-5 w-max will-change-transform">
          {allCards.map((q, i) => (
            <VoiceCard key={`${q.name}-${i}`} quote={q} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceOfCommunitySection;
