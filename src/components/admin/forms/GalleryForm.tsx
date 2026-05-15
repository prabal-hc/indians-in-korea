"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface GalleryFormValues {
  title: string;
  category: string;
  caption: string;
  imageUrl: string;
}

interface GalleryFormProps {
  initialData?: GalleryFormValues;
  onSubmit: (values: GalleryFormValues) => void;
  submitLabel?: string;
}

export function GalleryForm({
  initialData,
  onSubmit,
  submitLabel = "Save Gallery Item",
}: GalleryFormProps) {
  const [values, setValues] = useState<GalleryFormValues>(
    initialData ?? {
      title: "",
      category: "",
      caption: "",
      imageUrl: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof GalleryFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.title.trim()) nextErrors.title = "Title is required.";
    if (!values.category.trim()) nextErrors.category = "Category is required.";
    if (!values.caption.trim()) nextErrors.caption = "Caption is required.";

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
            Image title
          </span>
          <input
            value={values.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="K-Pop Dance Night"
          />
          {errors.title ? (
            <p className="text-xs text-rose-600">{errors.title}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">Category</span>
          <select
            value={values.category}
            onChange={(event) => handleChange("category", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          >
            <option value="">Select category</option>
            <option value="Events">Events</option>
            <option value="Student Life">Student Life</option>
            <option value="Culture">Culture</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          {errors.category ? (
            <p className="text-xs text-rose-600">{errors.category}</p>
          ) : null}
        </label>
      </div>

      <label className="space-y-3">
        <span className="text-sm font-semibold text-slate-900">
          Image caption
        </span>
        <textarea
          value={values.caption}
          onChange={(event) => handleChange("caption", event.target.value)}
          className="min-h-[140px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          placeholder="Community members dancing together in Seoul."
        />
        {errors.caption ? (
          <p className="text-xs text-rose-600">{errors.caption}</p>
        ) : null}
      </label>

      <ImageUploader
        label="Gallery image"
        value={values.imageUrl}
        onChange={(url) => handleChange("imageUrl", url)}
        note="Upload a strong visual that supports the gallery highlight."
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
