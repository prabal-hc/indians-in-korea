"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface SportsFormValues {
  title: string;
  type: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
}

interface SportsFormProps {
  initialData?: SportsFormValues;
  onSubmit: (values: SportsFormValues) => void;
  submitLabel?: string;
}

export function SportsForm({
  initialData,
  onSubmit,
  submitLabel = "Save Sport",
}: SportsFormProps) {
  const [values, setValues] = useState<SportsFormValues>(
    initialData ?? {
      title: "",
      type: "",
      date: "",
      venue: "",
      description: "",
      imageUrl: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof SportsFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.title.trim()) nextErrors.title = "Title is required.";
    if (!values.type.trim()) nextErrors.type = "Sport type is required.";
    if (!values.date.trim()) nextErrors.date = "Date is required.";
    if (!values.venue.trim()) nextErrors.venue = "Venue is required.";
    if (!values.description.trim())
      nextErrors.description = "Description cannot be empty.";

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
          <span className="text-sm font-semibold text-slate-900">
            Sport title
          </span>
          <input
            value={values.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Cricket Practice Session"
          />
          {errors.title ? (
            <p className="text-xs text-rose-600">{errors.title}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">
            Sport type
          </span>
          <select
            value={values.type}
            onChange={(event) => handleChange("type", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          >
            <option value="">Select sport</option>
            <option value="Cricket">Cricket</option>
            <option value="Badminton">Badminton</option>
            <option value="Football">Football</option>
            <option value="Yoga">Yoga</option>
          </select>
          {errors.type ? (
            <p className="text-xs text-rose-600">{errors.type}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">Date</span>
          <input
            type="date"
            value={values.date}
            onChange={(event) => handleChange("date", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          />
          {errors.date ? (
            <p className="text-xs text-rose-600">{errors.date}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">Venue</span>
          <input
            value={values.venue}
            onChange={(event) => handleChange("venue", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Yongsan Stadium"
          />
          {errors.venue ? (
            <p className="text-xs text-rose-600">{errors.venue}</p>
          ) : null}
        </label>
      </div>

      <label className="space-y-3">
        <span className="text-sm font-semibold text-slate-900">
          Description
        </span>
        <textarea
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          className="min-h-[140px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          placeholder="Describe the match, training focus, and participation details."
        />
        {errors.description ? (
          <p className="text-xs text-rose-600">{errors.description}</p>
        ) : null}
      </label>

      <ImageUploader
        label="Feature image"
        value={values.imageUrl}
        onChange={(url) => handleChange("imageUrl", url)}
        note="Upload a strong action shot for the event card."
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
