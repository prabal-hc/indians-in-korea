"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface HigherEducationModalProps {
  open: boolean;
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSITIES = [
  {
    id: "snu",
    name: "Seoul National University",
    shortName: "SNU",
    korean: "서울대학교",
    founded: "1946",
    tagline: "Korea's flagship national research university",
    accent: "#4f46e5",
    accentLight: "rgba(79,70,229,0.08)",
    accentBorder: "rgba(79,70,229,0.2)",
    emoji: "🏛️",
    stats: [
      { label: "QS Asia Rank", value: "#7" },
      { label: "Students", value: "30K+" },
      { label: "Colleges", value: "16" },
      { label: "Grad Schools", value: "6" },
    ],
    highlights: [
      "First national university in South Korea (1946)",
      "Ranked 5th globally for Fortune 500 CEO alumni",
      "Alumni include Ban Ki-moon (UN Sec-General), Samsung & LG CEOs",
      "42nd globally by QS World University Rankings",
    ],
    website: "http://en.snu.ac.kr/",
    studyLink: null as string | null,
    description:
      "A national research university in Seoul ranked 7th in Asia. SNU comprises sixteen colleges and six professional schools, serving over 30,000 students and setting the benchmark for Korean higher education since 1946.",
  },
  {
    id: "korea",
    name: "Korea University",
    shortName: "KU",
    korean: "고려대학교",
    founded: "1905",
    tagline: "Korea's oldest private research university",
    accent: "#dc2626",
    accentLight: "rgba(220,38,38,0.08)",
    accentBorder: "rgba(220,38,38,0.2)",
    emoji: "📜",
    stats: [
      { label: "Founded", value: "1905" },
      { label: "Undergrads", value: "20K+" },
      { label: "Departments", value: "81" },
      { label: "Alumni", value: "280K+" },
    ],
    highlights: [
      "First to offer Law, Economics & Journalism in Korea",
      "19 colleges and 18 graduate schools",
      "115 research institutes including Battelle@KU Lab",
      "Over 95% of faculty hold PhDs in their field",
    ],
    website: "http://www.korea.edu/",
    studyLink:
      "https://www.studyinkorea.go.kr/en/sub/college_info/college_info.do?ei_code=530180",
    description:
      "Established in 1905, Korea University was the first to offer law, economics, and journalism in Korea. Renowned for its prestigious College of Law and 280,000+ alumni worldwide.",
  },
  {
    id: "yonsei",
    name: "Yonsei University",
    shortName: "Yonsei",
    korean: "연세대학교",
    founded: "1885",
    tagline: "Pioneer of modern higher education in Korea",
    accent: "#0891b2",
    accentLight: "rgba(8,145,178,0.08)",
    accentBorder: "rgba(8,145,178,0.2)",
    emoji: "🔬",
    stats: [
      { label: "Founded", value: "1885" },
      { label: "Colleges", value: "21" },
      { label: "Students", value: "40K+" },
      { label: "Global Rank", value: "Top 100" },
    ],
    highlights: [
      "One of Korea's oldest and most prestigious universities",
      "Part of the elite 'SKY' universities (SNU · Korea · Yonsei)",
      "Strong global exchange programs for Indian students",
      "World-class research facilities across all sciences",
    ],
    website: "https://www.yonsei.ac.kr/en_sc/",
    studyLink: null as string | null,
    description:
      "Founded in 1885, Yonsei is a member of the elite SKY universities. It offers 21 colleges with strong global exchange and scholarship programs ideally suited for international students.",
  },
  {
    id: "skku",
    name: "Sungkyunkwan University",
    shortName: "SKKU",
    korean: "성균관대학교",
    founded: "1398",
    tagline: "Asia's oldest institution of higher learning",
    accent: "#059669",
    accentLight: "rgba(5,150,105,0.08)",
    accentBorder: "rgba(5,150,105,0.2)",
    emoji: "⚡",
    stats: [
      { label: "Founded", value: "1398" },
      { label: "Campuses", value: "2" },
      { label: "IIK Cricket", value: "Venue" },
      { label: "QS Rank", value: "Top 300" },
    ],
    highlights: [
      "Founded in 1398 — over 600 years of academic heritage",
      "Samsung Group is the university's main corporate patron",
      "IIK Cricket Club holds weekend practice at SKKU Suwon",
      "Strong engineering, business & natural science faculties",
    ],
    website: "https://www.skku.edu/eng/",
    studyLink: null as string | null,
    description:
      "Asia's oldest institution, founded in 1398 during the Joseon Dynasty. Backed by Samsung Group, SKKU's Suwon campus also serves as home ground for IIK Cricket Club's weekend practice sessions.",
  },
];

const SUPPORT_SERVICES = [
  {
    emoji: "🎓",
    title: "Admission Guidance",
    desc: "Step-by-step help navigating Korean university applications, document prep, and timelines.",
    color: "#FF9933",
    colorLight: "rgba(255,153,51,0.1)",
  },
  {
    emoji: "🏆",
    title: "Scholarship Advice",
    desc: "Information on GKS, university-specific scholarships, and grant opportunities for Indians.",
    color: "#4f46e5",
    colorLight: "rgba(79,70,229,0.08)",
  },
  {
    emoji: "🌐",
    title: "Visa & ARC Support",
    desc: "D-2 student visa guidance, ARC registration, and immigration compliance help.",
    color: "#0891b2",
    colorLight: "rgba(8,145,178,0.08)",
  },
  {
    emoji: "🤝",
    title: "Community Connect",
    desc: "Connect with IIK student groups, peer mentors, and Indian student communities on campus.",
    color: "#059669",
    colorLight: "rgba(5,150,105,0.08)",
  },
];

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "contact@indiansinkorea.com",
    href: "mailto:contact@indiansinkorea.com",
  },
  {
    label: "Facebook Group",
    value: "IIK Community (12,000+ members)",
    href: "https://www.facebook.com/groups/IIK2002/",
  },
  {
    label: "Telegram",
    value: "Join IIK Telegram Channel",
    href: "https://t.me/joinchat/NNK0sEgfkwLvKzaWwQCIrw",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSITY CARD
// ─────────────────────────────────────────────────────────────────────────────

function UniversityCard({ uni }: { uni: (typeof UNIVERSITIES)[0] }) {
  const [expanded, setExpanded] = useState(false);

  const initials = uni.shortName;

  return (
    <div
      className="group relative flex flex-col rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        borderColor: expanded ? uni.accentBorder : "rgb(241 245 249)",
        boxShadow: expanded
          ? `0 6px 24px ${uni.accent}14, 0 2px 8px rgba(0,0,0,0.04)`
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Top accent stripe */}
      <div
        className="h-0.5 w-full shrink-0"
        style={{ background: uni.accent }}
      />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
              style={{
                background: uni.accentLight,
                border: `1.5px solid ${uni.accentBorder}`,
              }}
            >
              {uni.emoji}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <h4 className="text-xs font-bold leading-snug text-slate-900">
                  {uni.name}
                </h4>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-extrabold"
                  style={{ color: uni.accent, background: uni.accentLight }}
                >
                  {initials}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                {uni.korean} · Est. {uni.founded}
              </p>
            </div>
          </div>
          {/* Chevron */}
          <svg
            className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform duration-200"
            style={{
              color: expanded ? uni.accent : "#94a3b8",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
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
        </div>

        {/* Tagline */}
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          {uni.tagline}
        </p>

        {/* Stat pills */}
        <div className="mt-3 grid grid-cols-4 gap-1">
          {uni.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg px-1.5 py-1.5 text-center"
              style={{ background: uni.accentLight }}
            >
              <div
                className="text-[11px] font-extrabold leading-tight"
                style={{ color: uni.accent }}
              >
                {s.value}
              </div>
              <div className="mt-0.5 text-[9px] leading-tight text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Expanded section */}
        {expanded && (
          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-[11px] leading-relaxed text-slate-600">
              {uni.description}
            </p>

            <ul className="mt-2.5 space-y-1.5">
              {uni.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[11px] text-slate-700"
                >
                  <span
                    className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: uni.accent }}
                  />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-3.5 flex flex-wrap gap-2">
              <a
                href={uni.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold text-white transition-all hover:opacity-90"
                style={{ background: uni.accent }}
              >
                <svg
                  className="h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Official Website
              </a>
              {uni.studyLink && (
                <a
                  href={uni.studyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all hover:opacity-90"
                  style={{
                    color: uni.accent,
                    borderColor: uni.accentBorder,
                    background: uni.accentLight,
                  }}
                >
                  <svg
                    className="h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Study in Korea Portal
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN MODAL
// ─────────────────────────────────────────────────────────────────────────────

export function HigherEducationModal({
  open,
  onClose,
}: HigherEducationModalProps) {
  const [activeTab, setActiveTab] = useState<"universities" | "support">(
    "universities",
  );

  useEffect(() => {
    if (open) setActiveTab("universities");
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-end justify-center bg-slate-950/60 px-0 pb-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Higher Education in Korea"
    >
      <div
        className="flex w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-slate-50 shadow-2xl shadow-slate-900/20 sm:max-h-[90vh] sm:rounded-3xl"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER ── */}
        <div className="relative shrink-0 overflow-hidden bg-white px-6 pb-0 pt-6 sm:px-8 sm:pt-8">
          {/* Tricolor stripe */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 text-2xl shadow-sm">
                🎓
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-orange-500">
                  IIK Education
                </p>
                <h2 className="mt-0.5 text-xl font-bold text-slate-900 sm:text-2xl">
                  Higher Education in Korea
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {UNIVERSITIES.length} top universities · scholarships · IIK
                  student support
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 transition hover:bg-slate-200"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-1 border-b border-slate-100">
            {(["universities", "support"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 pr-5 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <span className="mr-1.5">
                  {tab === "universities" ? "🏫" : "🤝"}
                </span>
                {tab === "universities" ? "Universities" : "IIK Support"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-5 h-0.5 rounded-full bg-orange-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 sm:px-8">
          {/* UNIVERSITIES TAB */}
          {activeTab === "universities" && (
            <div className="space-y-3">
              <p className="text-[10px] font-medium text-slate-400">
                ✦ Tap any card to see full details, highlights & links
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {UNIVERSITIES.map((uni) => (
                  <UniversityCard key={uni.id} uni={uni} />
                ))}
              </div>

              {/* Government portal banner */}
              <a
                href="https://www.studyinkorea.go.kr/en/main.do"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full rounded-2xl border border-orange-200 bg-white p-4 shadow-sm transition-all hover:border-orange-300 hover:shadow-md hover:shadow-orange-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇰🇷</span>
                  <div>
                    <p className="text-xs font-bold text-orange-700">
                      Official Government Portal
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      studyinkorea.go.kr — Scholarships, programs & admissions
                    </p>
                  </div>
                </div>
                <svg
                  className="h-4 w-4 shrink-0 text-orange-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}

          {/* SUPPORT TAB */}
          {activeTab === "support" && (
            <div className="space-y-5">
              {/* Intro */}
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-orange-500 mb-2">
                  About IIK Support
                </p>
                <p className="text-sm leading-7 text-slate-600">
                  Indians in Korea (IIK) has been supporting the Indian
                  community since 2002. For students, we provide guidance, peer
                  mentorship, and connections that make the transition to Korean
                  academic life smoother and more confident.
                </p>
              </div>

              {/* Service cards */}
              <div>
                <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">
                  How We Help
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SUPPORT_SERVICES.map((svc) => (
                    <div
                      key={svc.title}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-orange-100 hover:shadow-md"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
                        style={{ background: svc.colorLight }}
                      >
                        {svc.emoji}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {svc.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                          {svc.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact block */}
              <div className="rounded-2xl border border-orange-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Talk to the IIK Team
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                      Reach out for personalised guidance on admissions,
                      scholarships, and campus life from Indians who've been
                      through it.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {CONTACT_LINKS.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={
                        c.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 transition-all hover:border-orange-200 hover:bg-orange-50"
                    >
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-orange-400">
                          {c.label}
                        </span>
                        <p className="mt-0.5 text-[11px] font-semibold text-slate-700">
                          {c.value}
                        </p>
                      </div>
                      <svg
                        className="h-3.5 w-3.5 shrink-0 text-orange-400 transition-transform group-hover:translate-x-0.5"
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
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-400">
              Data sourced from{" "}
              <a
                href="https://indiansinkorea.com/inspire/higher-education/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-600 underline underline-offset-2 hover:text-orange-600"
              >
                Indians in Korea (IIK)
              </a>{" "}
              · Est. 2002 · 12,000+ members
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-md shadow-orange-200/40 transition hover:bg-orange-600 active:scale-95"
              >
                Contact IIK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HigherEducationModal;
