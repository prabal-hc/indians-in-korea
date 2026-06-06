"use client";

import { useState } from "react";

export interface TestimonialFormValues {
  name: string;
  initials: string;
  role: string;
  location: string;
  color: "saffron" | "green";
  quote: string;
  rating: number;
  isActive: boolean;
  isVerified: boolean;
  displayOrder: number;
}

interface TestimonialFormProps {
  initialData?: TestimonialFormValues;
  onSubmit: (values: TestimonialFormValues) => void;
  submitLabel?: string;
}

const LOCATIONS = [
  "Seoul",
  "Busan",
  "Daejeon",
  "Incheon",
  "Suwon",
  "Pangyo",
  "Daegu",
  "Gwangju",
  "Ulsan",
  "Other",
];

const field =
  "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

// Auto-generate initials
const toInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function TestimonialForm({
  initialData,
  onSubmit,
  submitLabel = "Save Testimonial",
}: TestimonialFormProps) {
  const [values, setValues] = useState<TestimonialFormValues>(
    initialData ?? {
      name: "",
      initials: "",
      role: "",
      location: "Seoul",
      color: "saffron",
      quote: "",
      rating: 5,
      isActive: true,
      isVerified: true,
      displayOrder: 0,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof TestimonialFormValues, value: any) =>
    setValues((v) => {
      const next = { ...v, [key]: value };
      // Auto-fill initials when name changes (only if user hasn't manually set it)
      if (key === "name" && !initialData?.initials) {
        next.initials = toInitials(value);
      }
      return next;
    });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.role.trim()) e.role = "Role is required.";
    if (!values.location.trim()) e.location = "Location is required.";
    if (!values.quote.trim()) e.quote = "Quote is required.";
    if (values.quote.trim().length < 30)
      e.quote = "Quote should be at least 30 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Star rating UI
  const StarPicker = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => set("rating", star)}
          className="transition-transform hover:scale-110"
        >
          <svg
            viewBox="0 0 20 20"
            className={`h-6 w-6 ${star <= values.rating ? "fill-[#FF9933]" : "fill-slate-200"} transition-colors`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      <span className="ml-2 text-sm text-slate-500 self-center">
        {values.rating}/5
      </span>
    </div>
  );

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
          Member Identity
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Full name
            </span>
            <input
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
              placeholder="Arjun Sharma"
            />
            {errors.name && (
              <p className="text-xs text-rose-600">{errors.name}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Initials{" "}
              <span className="text-slate-400 font-normal">(auto-filled)</span>
            </span>
            <input
              value={values.initials}
              onChange={(e) =>
                set("initials", e.target.value.toUpperCase().slice(0, 2))
              }
              className={field}
              placeholder="AS"
              maxLength={2}
            />
            <p className="text-xs text-slate-400">
              2 letters shown in the avatar circle.
            </p>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Role / Occupation
            </span>
            <input
              value={values.role}
              onChange={(e) => set("role", e.target.value)}
              className={field}
              placeholder="Lead Developer at Naver"
            />
            {errors.role && (
              <p className="text-xs text-rose-600">{errors.role}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Location in Korea
            </span>
            <select
              value={values.location}
              onChange={(e) => set("location", e.target.value)}
              className={field}
            >
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            {errors.location && (
              <p className="text-xs text-rose-600">{errors.location}</p>
            )}
          </label>
        </div>
      </div>

      {/* ── Card color ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Card accent color
        </h3>
        <div className="flex gap-3">
          {(["saffron", "green"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => set("color", c)}
              className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-3xl border-2 text-sm font-bold transition-all ${
                values.color === c
                  ? c === "saffron"
                    ? "bg-orange-50 border-orange-400 text-orange-700"
                    : "bg-green-50 border-green-500 text-green-700"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full ${c === "saffron" ? "bg-[#FF9933]" : "bg-[#138808]"}`}
              />
              {c === "saffron" ? "🟠 Saffron" : "🟢 Green"}
            </button>
          ))}
        </div>

        {/* Live preview of avatar */}
        <div className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] text-[13px] font-semibold ${
              values.color === "saffron"
                ? "bg-orange-50 text-orange-700"
                : "bg-green-50 text-green-800"
            }`}
          >
            {values.initials || "??"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {values.name || "Member name"}
            </p>
            <p className="text-xs text-slate-400">{values.role || "Role"}</p>
          </div>
          <span
            className={`ml-auto rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${
              values.color === "saffron"
                ? "bg-orange-50 text-orange-700"
                : "bg-green-50 text-green-800"
            }`}
          >
            {values.location}
          </span>
        </div>
      </div>

      {/* ── Quote ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Testimonial quote
        </h3>
        <label className="space-y-2">
          <textarea
            value={values.quote}
            onChange={(e) => set("quote", e.target.value)}
            className="min-h-[140px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Write the member's testimonial in their own words..."
          />
          <div className="flex items-center justify-between">
            {errors.quote ? (
              <p className="text-xs text-rose-600">{errors.quote}</p>
            ) : (
              <p className="text-xs text-slate-400">
                Minimum 30 characters. Be authentic.
              </p>
            )}
            <span
              className={`text-xs font-medium ${values.quote.length < 30 ? "text-rose-400" : "text-green-600"}`}
            >
              {values.quote.length} chars
            </span>
          </div>
        </label>
      </div>

      {/* ── Rating ── */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Star rating
        </h3>
        <StarPicker />
      </div>

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
        <p className="text-xs text-slate-400">
          Lower number = appears first in marquee.
        </p>
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
            Publish — visible in marquee
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.isVerified}
            onChange={(e) => set("isVerified", e.target.checked)}
            className="w-4 h-4 accent-green-600"
          />
          <span className="text-sm font-semibold text-slate-900">
            Show "Verified member" badge
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
