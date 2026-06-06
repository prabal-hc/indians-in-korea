"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface AboutFormValues {
  headline: string;
  subheadline: string;
  description: string;
  mission: string;
  established: string;
  members: string;
  events: string;
  ctaLabel: string;
  ctaUrl: string;
  heroImage: string;
  visionItems: string[];
}

interface AboutFormProps {
  initialData?: AboutFormValues;
  onSubmit: (values: AboutFormValues) => void;
  submitLabel?: string;
}

const field =
  "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";
const textarea =
  "w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-5">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
      {title}
    </h3>
    {children}
  </div>
);

export function AboutForm({
  initialData,
  onSubmit,
  submitLabel = "Save About Us",
}: AboutFormProps) {
  const [values, setValues] = useState<AboutFormValues>(
    initialData ?? {
      headline: "",
      subheadline: "",
      description: "",
      mission: "",
      established: "March 25, 2002",
      members: "12,000+",
      events: "120+",
      ctaLabel: "Join on Facebook",
      ctaUrl: "https://www.facebook.com/groups/IIK2002/",
      heroImage: "",
      visionItems: Array(8).fill(""),
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof AboutFormValues, value: any) =>
    setValues((v) => ({ ...v, [key]: value }));

  const setVision = (i: number, value: string) => {
    const next = [...values.visionItems];
    next[i] = value;
    set("visionItems", next);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.headline.trim()) e.headline = "Required.";
    if (!values.subheadline.trim()) e.subheadline = "Required.";
    if (!values.description.trim()) e.description = "Required.";
    if (!values.mission.trim()) e.mission = "Required.";
    if (!values.ctaLabel.trim()) e.ctaLabel = "Required.";
    if (!values.ctaUrl.trim()) e.ctaUrl = "Required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) onSubmit(values);
      }}
      className="space-y-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
    >
      {/* ── Hero ── */}
      <Section title="Hero">
        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">Headline</span>
          <input
            value={values.headline}
            onChange={(e) => set("headline", e.target.value)}
            className={field}
            placeholder="One of Korea's Oldest & Largest Indian Communities"
          />
          {errors.headline && (
            <p className="text-xs text-rose-500">{errors.headline}</p>
          )}
        </label>

        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">
            Subheadline
          </span>
          <input
            value={values.subheadline}
            onChange={(e) => set("subheadline", e.target.value)}
            className={field}
            placeholder="IIK has been the heart of the Indian diaspora…"
          />
          {errors.subheadline && (
            <p className="text-xs text-rose-500">{errors.subheadline}</p>
          )}
        </label>

        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">
            Description
          </span>
          <textarea
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={`${textarea} min-h-[110px]`}
            placeholder="Describe what IIK stands for and why the community matters."
          />
          {errors.description && (
            <p className="text-xs text-rose-500">{errors.description}</p>
          )}
        </label>

        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">
            Mission statement
          </span>
          <textarea
            value={values.mission}
            onChange={(e) => set("mission", e.target.value)}
            className={`${textarea} min-h-[90px]`}
            placeholder="Highlight the community mission, values, and purpose."
          />
          {errors.mission && (
            <p className="text-xs text-rose-500">{errors.mission}</p>
          )}
        </label>
      </Section>

      {/* ── Stats ── */}
      <Section title="Stats">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">
              Members
            </span>
            <input
              value={values.members}
              onChange={(e) => set("members", e.target.value)}
              className={field}
              placeholder="12,000+"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">Events</span>
            <input
              value={values.events}
              onChange={(e) => set("events", e.target.value)}
              className={field}
              placeholder="120+"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">
              Established
            </span>
            <input
              value={values.established}
              onChange={(e) => set("established", e.target.value)}
              className={field}
              placeholder="March 25, 2002"
            />
          </label>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section title="Call to Action Button">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">Label</span>
            <input
              value={values.ctaLabel}
              onChange={(e) => set("ctaLabel", e.target.value)}
              className={field}
              placeholder="Join on Facebook"
            />
            {errors.ctaLabel && (
              <p className="text-xs text-rose-500">{errors.ctaLabel}</p>
            )}
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">URL</span>
            <input
              value={values.ctaUrl}
              onChange={(e) => set("ctaUrl", e.target.value)}
              className={field}
              placeholder="https://facebook.com/groups/IIK2002/"
            />
            {errors.ctaUrl && (
              <p className="text-xs text-rose-500">{errors.ctaUrl}</p>
            )}
          </label>
        </div>
      </Section>

      {/* ── Vision ── */}
      <Section title="Vision Items">
        <p className="text-xs text-slate-400 -mt-2">
          Numbered cards in the "Our Vision" section.
        </p>
        <div className="space-y-2.5">
          {values.visionItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white bg-orange-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <input
                value={item}
                onChange={(e) => setVision(i, e.target.value)}
                className={`${field} flex-1`}
                placeholder={`Vision point ${i + 1}`}
              />
              <button
                type="button"
                onClick={() =>
                  set(
                    "visionItems",
                    values.visionItems.filter((_, j) => j !== i),
                  )
                }
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-100 transition text-xs"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("visionItems", [...values.visionItems, ""])}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-orange-300 px-4 py-1.5 text-xs font-semibold text-orange-500 hover:bg-orange-50 transition"
          >
            + Add point
          </button>
        </div>
      </Section>

      {/* ── Hero image ── */}
      <Section title="Hero Image">
        <ImageUploader
          label=""
          value={values.heroImage}
          onChange={(url) => set("heroImage", url)}
          note="Displayed in the hero collage on the About page."
        />
      </Section>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-3xl bg-orange-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
