"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface HomepageFormValues {
  headline: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  backgroundImage: string;
}

interface HomepageFormProps {
  initialData?: HomepageFormValues;
  onSubmit: (values: HomepageFormValues) => void;
  submitLabel?: string;
}

export function HomepageForm({
  initialData,
  onSubmit,
  submitLabel = "Save Homepage",
}: HomepageFormProps) {
  const [values, setValues] = useState<HomepageFormValues>(
    initialData ?? {
      headline: "",
      highlight: "",
      description: "",
      ctaLabel: "",
      ctaUrl: "",
      backgroundImage: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof HomepageFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.headline.trim()) nextErrors.headline = "Headline is required.";
    if (!values.highlight.trim())
      nextErrors.highlight = "Highlight text is required.";
    if (!values.description.trim())
      nextErrors.description = "Description is required.";
    if (!values.ctaLabel.trim()) nextErrors.ctaLabel = "CTA label is required.";
    if (!values.ctaUrl.trim()) nextErrors.ctaUrl = "CTA URL is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!validate()) return;
        onSubmit(values);
      }}
      className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/5"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">Headline</span>
          <input
            value={values.headline}
            onChange={(event) => handleChange("headline", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Connecting Indians across Korea with culture and community."
          />
          {errors.headline ? (
            <p className="text-xs text-rose-600">{errors.headline}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">
            Highlight
          </span>
          <input
            value={values.highlight}
            onChange={(event) => handleChange("highlight", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Live events, expert support, and meaningful connections."
          />
          {errors.highlight ? (
            <p className="text-xs text-rose-600">{errors.highlight}</p>
          ) : null}
        </label>

        <label className="space-y-3 md:col-span-2">
          <span className="text-sm font-semibold text-slate-900">
            Description
          </span>
          <textarea
            value={values.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            className="min-h-[140px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Use the hero content to tell visitors what makes IIK unique and why they should join."
          />
          {errors.description ? (
            <p className="text-xs text-rose-600">{errors.description}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">
            Call to action label
          </span>
          <input
            value={values.ctaLabel}
            onChange={(event) => handleChange("ctaLabel", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Explore events"
          />
          {errors.ctaLabel ? (
            <p className="text-xs text-rose-600">{errors.ctaLabel}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">CTA URL</span>
          <input
            value={values.ctaUrl}
            onChange={(event) => handleChange("ctaUrl", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="/events"
          />
          {errors.ctaUrl ? (
            <p className="text-xs text-rose-600">{errors.ctaUrl}</p>
          ) : null}
        </label>
      </div>

      <ImageUploader
        label="Background image"
        value={values.backgroundImage}
        onChange={(url) => handleChange("backgroundImage", url)}
        note="Upload a hero background image for the homepage section."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
