"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface AboutKoreaModalProps {
  open: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    id: "flag",
    emoji: "🇰🇷",
    label: "National Symbol",
    title: "The National Flag of Korea",
    subtitle: "태극기 · Taegeukgi",
    content: [
      {
        type: "paragraph",
        text: 'The Korean flag (태극기) is called "Taegeukgi" in Korean. Its design symbolizes the principles of the yin and yang in Oriental philosophy.',
      },
      {
        type: "paragraph",
        text: "The circle in the center of the Korean flag is divided into two equal parts. The upper red section represents the proactive cosmic forces of the yang. Conversely, the lower blue section represents the responsive cosmic forces of the yin. The two forces together embody the concepts of continual movement, balance and harmony that characterize the sphere of infinity.",
      },
      {
        type: "paragraph",
        text: "The circle is surrounded by four trigrams, one in each corner. Each trigram symbolizes one of the four universal elements: heaven, earth, fire, and water.",
      },
      {
        type: "facts",
        items: [
          { label: "Korean Name", value: "태극기 (Taegeukgi)" },
          { label: "Center Symbol", value: "Yin & Yang (태극)" },
          {
            label: "Upper Circle",
            value: "Red — Yang (proactive cosmic force)",
          },
          {
            label: "Lower Circle",
            value: "Blue — Yin (responsive cosmic force)",
          },
          {
            label: "Corner Symbols",
            value: "4 Trigrams — Heaven, Earth, Fire, Water",
          },
          {
            label: "Philosophy",
            value: "Continual movement, balance & harmony",
          },
        ],
      },
    ],
  },
  {
    id: "flower",
    emoji: "🌸",
    label: "National Symbol",
    title: "The National Flower of Korea",
    subtitle: "무궁화 · Mugunghwa",
    content: [
      {
        type: "paragraph",
        text: "The national flower of Korea is the mugunghwa (무궁화), rose of sharon. Every year from July to October, a profusion of mugunghwa blossoms graces the entire country.",
      },
      {
        type: "paragraph",
        text: "Unlike most flowers, the mugunghwa is remarkably tenacious and able to withstand both blight and insects. The flower's symbolic significance stems from the Korean word mugung, meaning immortality. This word accurately reflects the enduring nature of Korean culture, and the determination and perseverance of the Korean people.",
      },
      {
        type: "facts",
        items: [
          { label: "Korean Name", value: "무궁화 (Mugunghwa)" },
          { label: "Common Name", value: "Rose of Sharon" },
          { label: "Blooming Season", value: "July to October" },
          { label: "Meaning", value: "Mugung — Immortality" },
          {
            label: "Symbolizes",
            value: "Endurance, perseverance of Korean people",
          },
          { label: "Trait", value: "Resistant to blight and insects" },
        ],
      },
    ],
  },
  {
    id: "anthem",
    emoji: "🎵",
    label: "National Symbol",
    title: "The National Anthem of Korea",
    subtitle: "애국가 · Aegukga",
    content: [
      {
        type: "paragraph",
        text: 'Korea\'s national anthem is "Aegukga," which means "Love the Country." In 1896, the Dongnip Sinmun (Independence News) published various versions of lyrics for this song. It is not known exactly what music they were sung to in the early days.',
      },
      {
        type: "paragraph",
        text: 'Records show that a Western-style military band was formed during the time of the Dae-han Empire (1897–1910) and that the "Dae-han Empire Aegukga" was composed in 1902 and played at important national functions.',
      },
      {
        type: "paragraph",
        text: "The original words of Aegukga appeared in written form around 1907 to inculcate allegiance to the nation and foster the spirit of independence as the country faced threats of foreign annexation. Over the years, the lyrics went through several versions until they were adopted as the national anthem in the present form in 1948.",
      },
      {
        type: "paragraph",
        text: "Before the birth of the Republic in 1948, the words were often sung to the tune of the Scottish folk song, Auld Lang Syne. Maestro Ahn Eak-tay (1905–1965), then living in Spain, felt that it was inappropriate to sing this patriotic song to the tune of another country's folk song. So, he composed new music to go with the lyrics in 1935, and the Korean Provisional Government in exile adopted it as the national anthem.",
      },
      {
        type: "paragraph",
        text: "While Koreans outside the country sang the anthem to the new tune, those at home continued to use Auld Lang Syne until Korea was liberated in 1945. In 1948 the government of the Republic of Korea officially adopted the new version as the national anthem and began to use it at all schools and official functions.",
      },
      {
        type: "facts",
        items: [
          { label: "Korean Name", value: "애국가 (Aegukga)" },
          { label: "Meaning", value: '"Love the Country"' },
          {
            label: "Lyrics First Published",
            value: "1896 — Dongnip Sinmun (Independence News)",
          },
          {
            label: "Original Anthem Composed",
            value: "1902 — Dae-han Empire Aegukga",
          },
          { label: "Written Lyrics Appeared", value: "Around 1907" },
          {
            label: "Music Composed By",
            value: "Maestro Ahn Eak-tay (1905–1965)",
          },
          { label: "New Music Composed", value: "1935 in Spain" },
          {
            label: "Previously Sung To",
            value: "Auld Lang Syne (Scottish folk song)",
          },
          {
            label: "Officially Adopted",
            value: "1948 by the Republic of Korea",
          },
        ],
      },
    ],
  },
];

type SectionId = "flag" | "flower" | "anthem";

export function AboutKoreaModal({ open, onClose }: AboutKoreaModalProps) {
  const [activeTab, setActiveTab] = useState<SectionId>("flag");

  useEffect(() => {
    if (open) setActiveTab("flag");
  }, [open]);

  if (!open) return null;

  const section = SECTIONS.find((s) => s.id === activeTab)!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-0 pb-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="About Korea"
    >
      <div
        className="flex w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-slate-50 shadow-2xl shadow-slate-900/20 sm:max-h-[90vh] sm:rounded-3xl"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-white px-6 pb-0 pt-6 sm:px-8 sm:pt-8">
          {/* Decorative stripe — Korean flag colours */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] via-white to-[#003478]" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 text-2xl shadow-sm">
                🌏
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-blue-600">
                  IIK Guide
                </p>
                <h2 className="mt-0.5 text-xl font-bold text-slate-900 sm:text-2xl">
                  About Korea
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  National flag · national flower · national anthem · curated
                  for Indian families
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
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveTab(s.id as SectionId)}
                className={`relative pb-3 pr-5 text-sm font-semibold transition-colors ${
                  activeTab === s.id
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <span className="mr-1.5">{s.emoji}</span>
                {s.id === "flag"
                  ? "Flag"
                  : s.id === "flower"
                    ? "Flower"
                    : "Anthem"}
                {activeTab === s.id && (
                  <span className="absolute bottom-0 left-0 right-5 h-0.5 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 sm:px-8">
          {/* Section hero */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 text-2xl shadow-sm">
              {section.emoji}
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-blue-500">
                {section.label}
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                {section.title}
              </h3>
              <p className="text-xs text-slate-400">{section.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            {/* Text content */}
            <div className="space-y-3 lg:col-span-3">
              {section.content
                .filter((c) => c.type === "paragraph")
                .map((c, i) => (
                  <p key={i} className="text-sm leading-7 text-slate-600">
                    {"text" in c ? c.text : ""}
                  </p>
                ))}
            </div>

            {/* Facts card */}
            <div className="lg:col-span-2">
              {section.content
                .filter((c) => c.type === "facts")
                .map((c, i) =>
                  "items" in c ? (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                    >
                      <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-500">
                        Quick Facts
                      </p>
                      <div className="space-y-2.5">
                        {(
                          c as {
                            items: Array<{ label: string; value: string }>;
                          }
                        ).items.map((item, j) => (
                          <div key={j} className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              {item.label}
                            </span>
                            <span className="text-xs font-medium text-slate-700">
                              {item.value}
                            </span>
                            {j <
                              (
                                c as {
                                  items: Array<{
                                    label: string;
                                    value: string;
                                  }>;
                                }
                              ).items.length -
                                1 && <div className="mt-2 h-px bg-slate-50" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null,
                )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-400">
              Data sourced from{" "}
              <a
                href="https://indiansinkorea.com/inspire/about-korea/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-600 underline underline-offset-2 hover:text-blue-600"
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

export default AboutKoreaModal;
