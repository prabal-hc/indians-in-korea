"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface CommunityFormValues {
  name: string;
  category: string;
  members: string;
  contact: string;
  description: string;
  imageUrl: string;
}

interface CommunityFormProps {
  initialData?: CommunityFormValues;
  onSubmit: (values: CommunityFormValues) => void;
  submitLabel?: string;
}

export function CommunityForm({
  initialData,
  onSubmit,
  submitLabel = "Save Community",
}: CommunityFormProps) {
  const [values, setValues] = useState<CommunityFormValues>(
    initialData ?? {
      name: "",
      category: "",
      members: "",
      contact: "",
      description: "",
      imageUrl: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof CommunityFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.name.trim()) nextErrors.name = "Community name is required.";
    if (!values.category.trim()) nextErrors.category = "Category is required.";
    if (!values.members.trim())
      nextErrors.members = "Member count is required.";
    if (!values.contact.trim())
      nextErrors.contact = "Contact email or group is required.";
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
            Community name
          </span>
          <input
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Indian Students Circle"
          />
          {errors.name ? (
            <p className="text-xs text-rose-600">{errors.name}</p>
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
            <option value="Student">Student</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
            <option value="Culture">Culture</option>
            <option value="Wellness">Wellness</option>
          </select>
          {errors.category ? (
            <p className="text-xs text-rose-600">{errors.category}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">Members</span>
          <input
            type="number"
            min="0"
            value={values.members}
            onChange={(event) => handleChange("members", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="125"
          />
          {errors.members ? (
            <p className="text-xs text-rose-600">{errors.members}</p>
          ) : null}
        </label>

        <label className="space-y-3">
          <span className="text-sm font-semibold text-slate-900">Contact</span>
          <input
            value={values.contact}
            onChange={(event) => handleChange("contact", event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="students@iik.org"
          />
          {errors.contact ? (
            <p className="text-xs text-rose-600">{errors.contact}</p>
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
          placeholder="Share what the community is for and how members can participate."
        />
        {errors.description ? (
          <p className="text-xs text-rose-600">{errors.description}</p>
        ) : null}
      </label>

      <ImageUploader
        label="Community image"
        value={values.imageUrl}
        onChange={(url) => handleChange("imageUrl", url)}
        note="Add a warm hero image for the community card."
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
