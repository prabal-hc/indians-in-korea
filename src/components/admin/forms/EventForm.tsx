"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface EventFormValues {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  attendees: string;
  tag: string;
  isActive: boolean;
  isFeatured: boolean;
}

interface EventFormProps {
  initialData?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  submitLabel?: string;
}

const CATEGORIES = [
  "Festival",
  "Sports",
  "Adventure",
  // "Cuisine",
  "Arts",
  "Networking",
  "Cultural",
  "General",
];
const TAGS = [
  "🪔",
  "🎨",
  "🌊",
  "🏏",
  "🍛",
  "🎭",
  "🤝",
  "🎉",
  "🇮🇳",
  "🎶",
  "🏸",
  "⚽",
];

export function EventForm({
  initialData,
  onSubmit,
  submitLabel = "Save Event",
}: EventFormProps) {
  const [values, setValues] = useState<EventFormValues>(
    initialData ?? {
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
      imageUrl: "",
      attendees: "0",
      tag: "🎉",
      isActive: true,
      isFeatured: false,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof EventFormValues, value: string | boolean) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.title.trim()) e.title = "Title is required.";
    if (!values.category.trim()) e.category = "Category is required.";
    if (!values.date.trim()) e.date = "Date is required.";
    if (!values.location.trim()) e.location = "Location is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const field =
    "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) onSubmit(values);
      }}
      className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-slate-900">
            Event title
          </span>
          <input
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            className={field}
            placeholder="IIK Diwali Dhamaka 2026"
          />
          {errors.title && (
            <p className="text-xs text-rose-600">{errors.title}</p>
          )}
        </label>

        {/* Category */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Category</span>
          <select
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            className={field}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-rose-600">{errors.category}</p>
          )}
        </label>

        {/* Tag emoji */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">
            Tag emoji
          </span>
          <select
            value={values.tag}
            onChange={(e) => set("tag", e.target.value)}
            className={field}
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {/* Date */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Date</span>
          <input
            type="date"
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            className={field}
          />
          {errors.date && (
            <p className="text-xs text-rose-600">{errors.date}</p>
          )}
        </label>

        {/* Time */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Time</span>
          <input
            value={values.time}
            onChange={(e) => set("time", e.target.value)}
            className={field}
            placeholder="6:00 PM – 11:30 PM"
          />
        </label>

        {/* Location */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Location</span>
          <input
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            className={field}
            placeholder="Seoul Grand Ballroom, Gangnam"
          />
          {errors.location && (
            <p className="text-xs text-rose-600">{errors.location}</p>
          )}
        </label>

        {/* Expected attendees */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">
            Expected attendees
          </span>
          <input
            value={values.attendees}
            onChange={(e) => set("attendees", e.target.value)}
            className={field}
            placeholder="3,000+"
          />
        </label>
      </div>

      {/* Description */}
      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-900">
          Description
        </span>
        <textarea
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className="min-h-[120px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          placeholder="What to expect, who should attend..."
        />
      </label>

      {/* Image */}
      <ImageUploader
        label="Event image"
        value={values.imageUrl}
        onChange={(url) => set("imageUrl", url)}
        note="Landscape image works best (1200×630)."
      />

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(e) => set("isActive", e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          <span className="text-sm font-semibold text-slate-900">
            Publish event
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.isFeatured}
            onChange={(e) => set("isFeatured", e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          <span className="text-sm font-semibold text-slate-900">
            Feature on homepage
          </span>
        </label>
      </div>

      <div className="flex justify-end">
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
