"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface SponsorFormValues {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface SponsorFormProps {
  initialData?: SponsorFormValues;
  onSubmit: (values: SponsorFormValues) => void;
  submitLabel?: string;
}

const field =
  "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

export function SponsorForm({
  initialData,
  onSubmit,
  submitLabel = "Save Sponsor",
}: SponsorFormProps) {
  const [values, setValues] = useState<SponsorFormValues>(
    initialData ?? {
      name: "",
      logoUrl: "",
      websiteUrl: "",
      displayOrder: 0,
      isActive: true,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof SponsorFormValues, value: any) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Sponsor name is required.";
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
      <label className="space-y-2 block">
        <span className="text-sm font-semibold text-slate-900">
          Sponsor name
        </span>
        <input
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={field}
          placeholder="Acme Corp"
        />
        {errors.name && <p className="text-xs text-rose-600">{errors.name}</p>}
      </label>

      <label className="space-y-2 block">
        <span className="text-sm font-semibold text-slate-900">
          Website URL
        </span>
        <input
          value={values.websiteUrl}
          onChange={(e) => set("websiteUrl", e.target.value)}
          className={field}
          placeholder="https://example.com"
        />
      </label>

      <ImageUploader
        label="Sponsor logo"
        value={values.logoUrl}
        onChange={(url) => set("logoUrl", url)}
        note="A square or wide transparent logo works best."
      />

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

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => set("isActive", e.target.checked)}
          className="w-4 h-4 accent-orange-500"
        />
        <span className="text-sm font-semibold text-slate-900">
          Show on homepage
        </span>
      </label>

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
