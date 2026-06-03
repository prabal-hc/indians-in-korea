"use client";

import { useState } from "react";

export interface AnnouncementFormValues {
  title: string;
  description: string;
  display_order: number;
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
      description: "",
      display_order: 0,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = <K extends keyof AnnouncementFormValues>(
    key: K,
    value: AnnouncementFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.title.trim()) nextErrors.title = "Title is required.";
    if (!values.description.trim())
      nextErrors.description = "Description is required.";
    if (!Number.isFinite(values.display_order) || values.display_order < 0) {
      nextErrors.display_order = "Display order is required.";
    }

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
          <span className="text-sm font-semibold text-slate-900">Title</span>
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
          <span className="text-sm font-semibold text-slate-900">
            Display Order
          </span>
          <input
            type="number"
            value={values.display_order}
            onChange={(event) =>
              handleChange("display_order", Number(event.target.value))
            }
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="0"
          />
          {errors.display_order ? (
            <p className="text-xs text-rose-600">{errors.display_order}</p>
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
          placeholder="Describe the announcement details and the expected community action."
        />
        {errors.description ? (
          <p className="text-xs text-rose-600">{errors.description}</p>
        ) : null}
      </label>

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
