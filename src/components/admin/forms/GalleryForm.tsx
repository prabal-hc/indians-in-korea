"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface GalleryFormValues {
  title: string;
  tag: string;
  tagColor: "saffron" | "green";
  year: string;
  caption: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface GalleryFormProps {
  initialData?: GalleryFormValues;
  onSubmit: (values: GalleryFormValues) => void;
  submitLabel?: string;
}

const TAGS = [
  "Festival",
  "Culture",
  "Outdoor",
  "Sports",
  "Food",
  "Meetup",
  "Patriotic",
  "Arts",
  "Other",
];

const YEARS = Array.from({ length: 5 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

const field =
  "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

export function GalleryForm({
  initialData,
  onSubmit,
  submitLabel = "Save Gallery Item",
}: GalleryFormProps) {
  const [values, setValues] = useState<GalleryFormValues>(
    initialData ?? {
      title: "",
      tag: "Culture",
      tagColor: "saffron",
      year: String(new Date().getFullYear()),
      caption: "",
      imageUrl: "",
      displayOrder: 0,
      isActive: true,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof GalleryFormValues, value: any) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.title.trim()) e.title = "Title is required.";
    if (!values.tag.trim()) e.tag = "Tag is required.";
    if (!values.imageUrl.trim()) e.imageUrl = "Please upload an image.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

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
            Image title
          </span>
          <input
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            className={field}
            placeholder="Diwali Night 2024"
          />
          {errors.title && (
            <p className="text-xs text-rose-600">{errors.title}</p>
          )}
        </label>

        {/* Tag */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">
            Tag / Category
          </span>
          <select
            value={values.tag}
            onChange={(e) => set("tag", e.target.value)}
            className={field}
          >
            {TAGS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {errors.tag && <p className="text-xs text-rose-600">{errors.tag}</p>}
        </label>

        {/* Tag color */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">
            Tag color
          </span>
          <div className="flex gap-3">
            {(["saffron", "green"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => set("tagColor", c)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-3xl border text-sm font-bold transition-all ${
                  values.tagColor === c
                    ? c === "saffron"
                      ? "bg-orange-100 border-orange-400 text-orange-600"
                      : "bg-green-100 border-green-500 text-green-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${c === "saffron" ? "bg-orange-400" : "bg-green-600"}`}
                />
                {c === "saffron" ? "Saffron" : "Green"}
              </button>
            ))}
          </div>
        </label>

        {/* Year */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">Year</span>
          <select
            value={values.year}
            onChange={(e) => set("year", e.target.value)}
            className={field}
          >
            {YEARS.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>

        {/* Display order */}
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-900">
            Display order
          </span>
          <input
            type="number"
            min="0"
            value={values.displayOrder}
            onChange={(e) => set("displayOrder", Number(e.target.value))}
            className={field}
            placeholder="1"
          />
          <p className="text-xs text-slate-400">Lower = appears first.</p>
        </label>
      </div>

      {/* Caption */}
      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-900">Caption</span>
        <textarea
          value={values.caption}
          onChange={(e) => set("caption", e.target.value)}
          className="min-h-[100px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          placeholder="A short description of this moment..."
        />
      </label>

      {/* Image */}
      <div>
        <ImageUploader
          label="Gallery image"
          value={values.imageUrl}
          onChange={(url) => set("imageUrl", url)}
          note="Upload a high-quality photo (landscape works best)."
        />
        {errors.imageUrl && (
          <p className="text-xs text-rose-600 mt-2">{errors.imageUrl}</p>
        )}
      </div>

      {/* Publish toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => set("isActive", e.target.checked)}
          className="w-4 h-4 accent-orange-500"
        />
        <span className="text-sm font-semibold text-slate-900">
          Publish — visible on the website
        </span>
      </label>

      {/* Preview pill */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <span className="text-sm text-slate-500 font-medium">Tag preview:</span>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
            values.tagColor === "saffron"
              ? "bg-orange-100 text-[#FF9933]"
              : "bg-green-100 text-[#138808]"
          }`}
        >
          {values.tag || "Tag"}
        </span>
        <span className="text-xs text-slate-400">{values.year}</span>
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
