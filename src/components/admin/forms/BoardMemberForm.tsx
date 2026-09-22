"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { BoardMember } from "@/services/admin/about.service";

export interface BoardMemberFormValues {
  name: string;
  initials: string;
  role: string;
  profession: string;
  koreanTitle: string;
  type: BoardMember["type"];
  imageUrl: string;
  bio: string;
  message: string;
  displayOrder: number;
  isActive: boolean;
}

interface BoardMemberFormProps {
  initialData?: BoardMemberFormValues;
  onSubmit: (values: BoardMemberFormValues) => void;
  submitLabel?: string;
}

const TYPE_OPTIONS: { value: BoardMember["type"]; label: string }[] = [
  { value: "board", label: "Board member" },
  { value: "advisor", label: "Advisor" },
  { value: "core", label: "Core member" },
];

const field =
  "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";
const textarea =
  "w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

const autoInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function BoardMemberForm({
  initialData,
  onSubmit,
  submitLabel = "Save member",
}: BoardMemberFormProps) {
  const [values, setValues] = useState<BoardMemberFormValues>(
    initialData ?? {
      name: "",
      initials: "",
      role: "",
      profession: "",
      koreanTitle: "",
      type: "board",
      imageUrl: "",
      bio: "",
      message: "",
      displayOrder: 0,
      isActive: true,
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof BoardMemberFormValues, value: any) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Full name is required.";
    if (!values.role.trim()) e.role = "Role / title is required.";
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
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          Identity
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-900">
              Full name
            </span>
            <input
              value={values.name}
              onChange={(e) => {
                set("name", e.target.value);
                if (!values.initials)
                  set("initials", autoInitials(e.target.value));
              }}
              className={field}
              placeholder="Prof. Nagendra Kaushik"
            />
            {errors.name && (
              <p className="text-xs text-rose-600">{errors.name}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Initials (2 chars)
            </span>
            <input
              value={values.initials}
              onChange={(e) =>
                set("initials", e.target.value.toUpperCase().slice(0, 2))
              }
              className={field}
              placeholder="NK"
              maxLength={2}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">Type</span>
            <select
              value={values.type}
              onChange={(e) =>
                set("type", e.target.value as BoardMember["type"])
              }
              className={field}
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Role / Title
            </span>
            <input
              value={values.role}
              onChange={(e) => set("role", e.target.value)}
              className={field}
              placeholder="President"
            />
            {errors.role && (
              <p className="text-xs text-rose-600">{errors.role}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Profession / Organisation
            </span>
            <input
              value={values.profession}
              onChange={(e) => set("profession", e.target.value)}
              className={field}
              placeholder="Professor, Kwangwoon University"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Korean title (optional)
            </span>
            <input
              value={values.koreanTitle}
              onChange={(e) => set("koreanTitle", e.target.value)}
              className={field}
              placeholder="이사"
            />
          </label>
        </div>
      </div>

      <ImageUploader
        label="Member photo (optional)"
        value={values.imageUrl}
        onChange={(url) => set("imageUrl", url)}
        note="Used on the About page — most visible for Core Members and leadership messages."
      />

      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
          About this member
        </h3>
        <div className="space-y-5">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">
              Short bio (optional)
            </span>
            <textarea
              value={values.bio}
              onChange={(e) => set("bio", e.target.value)}
              className={textarea}
              rows={2}
              placeholder="One or two sentences introducing this member."
            />
          </label>

          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">
              Leadership message (optional)
            </span>
            <textarea
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              className={textarea}
              rows={3}
              placeholder="A short welcome message, shown in the About page's leadership section."
            />
          </label>
        </div>
      </div>

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
          Active (visible on page)
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
