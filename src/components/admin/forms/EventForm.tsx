"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface EventFormValues {
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface EventFormProps {
  initialData?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  submitLabel?: string;
}

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
      location: "",
      description: "",
      imageUrl: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof EventFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.title.trim()) nextErrors.title = "Title is required.";
    if (!values.category.trim()) nextErrors.category = "Category is required.";
    if (!values.date.trim()) nextErrors.date = "Date is required.";
    if (!values.location.trim()) nextErrors.location = "Location is required.";
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
            Event title
          </span>
          <input
            value={values.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Summer Cultural Exchange"
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
            <option value="">Select a category</option>
            <option value="Culture">Culture</option>
            <option value="Networking">Networking</option>
            <option value="Education">Education</option>
            <option value="Wellness">Wellness</option>
          </select>
          {errors.category ? (
            <p className="text-xs text-rose-600">{errors.category}</p>
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
          <span className="text-sm font-semibold text-slate-900">Location</span>
          <input
            value={values.location}
            onChange={(event) => handleChange("location", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Seoul Central Hall"
          />
          {errors.location ? (
            <p className="text-xs text-rose-600">{errors.location}</p>
          ) : null}
        </label>
      </div>

      <label className="space-y-3">
        <span className="text-sm font-semibold text-slate-900">
          Event description
        </span>
        <textarea
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          className="min-h-[140px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          placeholder="Write a short summary of the event, what to expect, and who should attend."
        />
        {errors.description ? (
          <p className="text-xs text-rose-600">{errors.description}</p>
        ) : null}
      </label>

      <ImageUploader
        label="Event visual"
        value={values.imageUrl}
        onChange={(url) => handleChange("imageUrl", url)}
        note="Add a vibrant image that matches the event tone."
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
