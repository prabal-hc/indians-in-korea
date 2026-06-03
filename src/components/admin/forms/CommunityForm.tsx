"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface CommunityFormValues {
  name: string;
  abbr: string;
  category: string;
  tag: string;
  icon: string;
  members: string;
  since: string;
  description: string;
  highlights: string[];
  websiteUrl: string;
  facebookUrl: string;
  email: string;
  contact: string;
  imageUrl: string;
  accentColor: string;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
}

interface CommunityFormProps {
  initialData?: CommunityFormValues;
  onSubmit: (values: CommunityFormValues) => void;
  submitLabel?: string;
}

const CATEGORIES = [
  "Cultural & Regional",
  "Educational",
  "Cultural",
  "Regional",
  "Spiritual",
  "Sports",
  "Professional",
  "Student",
];

const ICONS = [
  "🎶",
  "📚",
  "🏛️",
  "🌄",
  "🪔",
  "🙏",
  "🎉",
  "🏏",
  "🤝",
  "🌿",
  "🎨",
  "⭐",
];

const ACCENT_COLORS = [
  { label: "Orange", value: "#ea580c" },
  { label: "Blue", value: "#2563eb" },
  { label: "Purple", value: "#9333ea" },
  { label: "Green", value: "#16a34a" },
  { label: "Amber", value: "#d97706" },
  { label: "Pink", value: "#db2777" },
  { label: "Red", value: "#dc2626" },
  { label: "Teal", value: "#0d9488" },
];

const field =
  "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

export function CommunityForm({
  initialData,
  onSubmit,
  submitLabel = "Save Community",
}: CommunityFormProps) {
  const initialValues: CommunityFormValues = {
    name: initialData?.name ?? "",
    abbr: initialData?.abbr ?? "",
    category: initialData?.category ?? "",
    tag: initialData?.tag ?? "",
    icon: initialData?.icon ?? "🎉",
    members: initialData?.members ?? "0",
    since: initialData?.since ?? "",
    description: initialData?.description ?? "",
    highlights: initialData?.highlights ?? ["", "", "", ""],
    websiteUrl: initialData?.websiteUrl ?? "",
    facebookUrl: initialData?.facebookUrl ?? "",
    email: initialData?.email ?? "",
    contact: initialData?.contact ?? "",
    imageUrl: initialData?.imageUrl ?? "",
    accentColor: initialData?.accentColor ?? "#ea580c",
    isActive: initialData?.isActive ?? true,
    isFeatured: initialData?.isFeatured ?? false,
    displayOrder: initialData?.displayOrder ?? 0,
  };

  const [values, setValues] = useState<CommunityFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof CommunityFormValues, value: any) =>
    setValues((v) => ({ ...v, [key]: value }));

  const setHighlight = (i: number, value: string) => {
    const next = [...(values.highlights ?? ["", "", "", ""])];
    next[i] = value;
    set("highlights", next);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.category.trim()) e.category = "Category is required.";
    if (!values.description.trim()) e.description = "Description is required.";
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
      {/* ── Identity ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Identity
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Community name
            </span>
            <input
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
              placeholder="Korea Tamil Nanbargal"
            />
            {errors.name && (
              <p className="text-xs text-rose-600">{errors.name}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Short name / Abbreviation
            </span>
            <input
              value={values.abbr}
              onChange={(e) => set("abbr", e.target.value)}
              className={field}
              placeholder="KTN"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Category
            </span>
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

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Icon emoji
            </span>
            <select
              value={values.icon}
              onChange={(e) => set("icon", e.target.value)}
              className={field}
            >
              {ICONS.map((ic) => (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Accent color
            </span>
            <div className="flex items-center gap-3">
              <select
                value={values.accentColor}
                onChange={(e) => set("accentColor", e.target.value)}
                className={field}
              >
                {ACCENT_COLORS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <div
                className="w-9 h-9 rounded-full border border-slate-200 flex-shrink-0"
                style={{ background: values.accentColor }}
              />
            </div>
          </label>
        </div>
      </div>

      {/* ── Details ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Details
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Members
            </span>
            <input
              value={values.members}
              onChange={(e) => set("members", e.target.value)}
              className={field}
              placeholder="2,000+"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Established year
            </span>
            <input
              value={values.since}
              onChange={(e) => set("since", e.target.value)}
              className={field}
              placeholder="2003"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Description
            </span>
            <textarea
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              className="min-h-[120px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              placeholder="What is this community about?"
            />
            {errors.description && (
              <p className="text-xs text-rose-600">{errors.description}</p>
            )}
          </label>
        </div>
      </div>

      {/* ── Highlights ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Highlights{" "}
          <span className="text-slate-400 normal-case font-normal">
            (up to 4 bullet points)
          </span>
        </h3>
        <div className="grid gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                style={{ background: values.accentColor }}
              >
                {i + 1}
              </span>
              <input
                value={values.highlights?.[i] ?? ""}
                onChange={(e) => setHighlight(i, e.target.value)}
                className={field}
                placeholder={`Highlight ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Links ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Links & Contact
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Website URL
            </span>
            <input
              value={values.websiteUrl}
              onChange={(e) => set("websiteUrl", e.target.value)}
              className={field}
              placeholder="https://koreatamilnanbargal.com"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Facebook URL
            </span>
            <input
              value={values.facebookUrl}
              onChange={(e) => set("facebookUrl", e.target.value)}
              className={field}
              placeholder="https://facebook.com/groups/..."
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">Email</span>
            <input
              type="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              className={field}
              placeholder="community@example.com"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Contact (phone / other)
            </span>
            <input
              value={values.contact}
              onChange={(e) => set("contact", e.target.value)}
              className={field}
              placeholder="010-0000-0000"
            />
          </label>
        </div>
      </div>

      {/* ── Image ── */}
      <ImageUploader
        label="Community image"
        value={values.imageUrl}
        onChange={(url) => set("imageUrl", url)}
        note="Optional — used in community cards and detail pages."
      />

      {/* ── Display order ── */}
      <label className="space-y-2 block">
        <span className="text-sm font-semibold text-slate-900">
          Display order
        </span>
        <input
          type="number"
          min="0"
          value={values.displayOrder}
          onChange={(e) => set("displayOrder", Number(e.target.value))}
          className="w-32 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
        />
        <p className="text-xs text-slate-400">Lower number = appears first.</p>
      </label>

      {/* ── Toggles ── */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(e) => set("isActive", e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          <span className="text-sm font-semibold text-slate-900">
            Publish community
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
