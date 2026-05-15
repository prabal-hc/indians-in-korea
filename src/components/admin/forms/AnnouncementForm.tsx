"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface AnnouncementFormValues {
  title: string;
  category: string;
  publishedAt: string;
  content: string;
  imageUrl: string;
}

interface AnnouncementFormProps {
  initialData?: AnnouncementFormValues;
  onSubmit: (values: AnnouncementFormValues) => void;
  submitLabel?: string;
}

export function AnnouncementForm({
  initialData,
  onSubmit,
  submitLabel = "Save Announcement",
}: AnnouncementFormProps) {
  const [values, setValues] = useState<AnnouncementFormValues>(
    initialData ?? {
      title: "",
      category: "",
      publishedAt: "",
      content: "",
      imageUrl: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof AnnouncementFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.title.trim()) nextErrors.title = "Title is required.";
    if (!values.category.trim()) nextErrors.category = "Category is required.";
    if (!values.publishedAt.trim())
      nextErrors.publishedAt = "Publish date is required.";
    if (!values.content.trim()) nextErrors.content = "Content cannot be empty.";

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
            Announcement title
          </span>
          <input
            value={values.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Community Health Camp"
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
            <option value="Health">Health</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Alert">Alert</option>
            <option value="News">News</option>
          </select>
          {errors.category ? (
            <p className="text-xs text-rose-600">{errors.category}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">
            Publish date
          </span>
          <input
            type="date"
            value={values.publishedAt}
            onChange={(event) =>
              handleChange("publishedAt", event.target.value)
            }
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          />
          {errors.publishedAt ? (
            <p className="text-xs text-rose-600">{errors.publishedAt}</p>
          ) : null}
        </label>
      </div>

      <label className="space-y-3">
        <span className="text-sm font-semibold text-slate-900">Content</span>
        <textarea
          value={values.content}
          onChange={(event) => handleChange("content", event.target.value)}
          className="min-h-[140px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          placeholder="Describe the announcement details and the expected community action."
        />
        {errors.content ? (
          <p className="text-xs text-rose-600">{errors.content}</p>
        ) : null}
      </label>

      <ImageUploader
        label="Announcement image"
        value={values.imageUrl}
        onChange={(url) => handleChange("imageUrl", url)}
        note="Attach a visual that reinforces the announcement."
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
