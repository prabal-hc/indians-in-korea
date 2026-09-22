"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { ContactItem } from "@/services/admin/about.service";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AboutFormValues {
  headline: string;
  subheadline: string;
  description: string;
  mission: string;
  established: string;
  members: string;
  events: string;
  ctaLabel: string;
  ctaUrl: string;
  heroImage: string;
  visionItems: string[];
}

export interface ContactFormValues {
  contacts: ContactItem[];
}

interface AboutFormProps {
  initialContent?: AboutFormValues;
  onSubmitContent: (values: AboutFormValues) => Promise<void>;
  initialContacts?: ContactItem[];
  onSubmitContacts: (contacts: ContactItem[]) => Promise<void>;
  saving?: boolean;
}

// ─── Shared field classes ─────────────────────────────────────────────────────

const field =
  "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";
const textarea =
  "w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-5">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
      {title}
    </h3>
    {children}
  </div>
);

// ─── Save button ──────────────────────────────────────────────────────────────

const SaveBtn = ({ label, saving }: { label: string; saving?: boolean }) => (
  <div className="flex justify-end pt-2">
    <button
      type="submit"
      disabled={saving}
      className="inline-flex items-center gap-2 rounded-3xl bg-orange-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 disabled:opacity-60"
    >
      {saving ? "Saving…" : label}
    </button>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 1 — Content + Vision
// ═══════════════════════════════════════════════════════════════════════════════

function ContentForm({
  initial,
  onSubmit,
  saving,
}: {
  initial?: AboutFormValues;
  onSubmit: (v: AboutFormValues) => Promise<void>;
  saving?: boolean;
}) {
  const [values, setValues] = useState<AboutFormValues>(
    initial ?? {
      headline: "",
      subheadline: "",
      description: "",
      mission: "",
      established: "March 25, 2002",
      members: "12,000+",
      events: "120+",
      ctaLabel: "Join on Facebook",
      ctaUrl: "https://www.facebook.com/groups/IIK2002/",
      heroImage: "",
      visionItems: Array(8).fill(""),
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Sync when parent re-fetches and passes fresh initial
  useEffect(() => {
    if (initial) setValues(initial);
  }, [initial]);

  const set = (key: keyof AboutFormValues, value: any) =>
    setValues((v) => ({ ...v, [key]: value }));

  const setVision = (i: number, value: string) => {
    const next = [...values.visionItems];
    next[i] = value;
    set("visionItems", next);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.headline.trim()) e.headline = "Required.";
    if (!values.subheadline.trim()) e.subheadline = "Required.";
    if (!values.description.trim()) e.description = "Required.";
    if (!values.mission.trim()) e.mission = "Required.";
    if (!values.ctaLabel.trim()) e.ctaLabel = "Required.";
    if (!values.ctaUrl.trim()) e.ctaUrl = "Required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) onSubmit(values);
      }}
      className="space-y-10"
    >
      <Section title="Hero">
        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">Headline</span>
          <input
            value={values.headline}
            onChange={(e) => set("headline", e.target.value)}
            className={field}
            placeholder="One of Korea's Oldest & Largest Indian Communities"
          />
          {errors.headline && (
            <p className="text-xs text-rose-500">{errors.headline}</p>
          )}
        </label>

        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">
            Subheadline
          </span>
          <input
            value={values.subheadline}
            onChange={(e) => set("subheadline", e.target.value)}
            className={field}
            placeholder="IIK has been the heart of the Indian diaspora…"
          />
          {errors.subheadline && (
            <p className="text-xs text-rose-500">{errors.subheadline}</p>
          )}
        </label>

        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">
            Description
          </span>
          <textarea
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={`${textarea} min-h-[110px]`}
            placeholder="Describe what IIK stands for and why the community matters."
          />
          {errors.description && (
            <p className="text-xs text-rose-500">{errors.description}</p>
          )}
        </label>

        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-slate-900">
            Mission statement
          </span>
          <textarea
            value={values.mission}
            onChange={(e) => set("mission", e.target.value)}
            className={`${textarea} min-h-[90px]`}
            placeholder="Highlight the community mission, values, and purpose."
          />
          {errors.mission && (
            <p className="text-xs text-rose-500">{errors.mission}</p>
          )}
        </label>
      </Section>

      <Section title="Stats">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">
              Members
            </span>
            <input
              value={values.members}
              onChange={(e) => set("members", e.target.value)}
              className={field}
              placeholder="12,000+"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">Events</span>
            <input
              value={values.events}
              onChange={(e) => set("events", e.target.value)}
              className={field}
              placeholder="120+"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">
              Established
            </span>
            <input
              value={values.established}
              onChange={(e) => set("established", e.target.value)}
              className={field}
              placeholder="March 25, 2002"
            />
          </label>
        </div>
      </Section>

      <Section title="Call to Action Button">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">Label</span>
            <input
              value={values.ctaLabel}
              onChange={(e) => set("ctaLabel", e.target.value)}
              className={field}
              placeholder="Join on Facebook"
            />
            {errors.ctaLabel && (
              <p className="text-xs text-rose-500">{errors.ctaLabel}</p>
            )}
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-slate-900">URL</span>
            <input
              value={values.ctaUrl}
              onChange={(e) => set("ctaUrl", e.target.value)}
              className={field}
              placeholder="https://facebook.com/groups/IIK2002/"
            />
            {errors.ctaUrl && (
              <p className="text-xs text-rose-500">{errors.ctaUrl}</p>
            )}
          </label>
        </div>
      </Section>

      <Section title="Vision Items">
        <p className="text-xs text-slate-400 -mt-2">
          Numbered cards in the &quot;Our Vision&quot; section.
        </p>
        <div className="space-y-2.5">
          {values.visionItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white bg-orange-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <input
                value={item}
                onChange={(e) => setVision(i, e.target.value)}
                className={`${field} flex-1`}
                placeholder={`Vision point ${i + 1}`}
              />
              <button
                type="button"
                onClick={() =>
                  set(
                    "visionItems",
                    values.visionItems.filter((_, j) => j !== i),
                  )
                }
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-100 transition text-xs"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("visionItems", [...values.visionItems, ""])}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-orange-300 px-4 py-1.5 text-xs font-semibold text-orange-500 hover:bg-orange-50 transition"
          >
            + Add point
          </button>
        </div>
      </Section>

      <Section title="Hero Image">
        <ImageUploader
          label=""
          value={values.heroImage}
          onChange={(url) => set("heroImage", url)}
          note="Displayed in the hero collage on the About page."
        />
      </Section>

      <SaveBtn label="Save Content" saving={saving} />
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 3 — Contacts (about_contacts)
// ═══════════════════════════════════════════════════════════════════════════════

const BG_OPTIONS = [
  { label: "Orange", value: "bg-orange-50 border-orange-200" },
  { label: "Blue", value: "bg-blue-50 border-blue-200" },
  { label: "Green", value: "bg-green-50 border-green-200" },
  { label: "Yellow", value: "bg-yellow-50 border-yellow-200" },
  { label: "Purple", value: "bg-purple-50 border-purple-200" },
];

const emptyContact = (
  type: "info" | "social",
): ContactItem & { _key: string } => ({
  id: `new_${Date.now()}_${Math.random()}`,
  _key: `new_${Date.now()}_${Math.random()}`,
  label: "",
  value: "",
  type,
  emoji: "",
  href: "",
  bgClass: "bg-orange-50 border-orange-200",
  displayOrder: 0,
  isActive: true,
});

function ContactsForm({
  initial,
  onSubmit,
  saving,
}: {
  initial?: ContactItem[];
  onSubmit: (contacts: ContactItem[]) => Promise<void>;
  saving?: boolean;
}) {
  const [contacts, setContacts] = useState<(ContactItem & { _key?: string })[]>(
    () => initial?.map((c) => ({ ...c, _key: c.id })) ?? [],
  );
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // ✅ Re-sync local state whenever parent passes fresh data (after save + re-fetch)
  useEffect(() => {
    if (initial) {
      setContacts(initial.map((c) => ({ ...c, _key: c.id })));
      setOpenIdx(null);
    }
  }, [initial]);

  const update = (i: number, key: keyof ContactItem, value: any) =>
    setContacts((prev) =>
      prev.map((c, j) => (j === i ? { ...c, [key]: value } : c)),
    );

  const remove = (i: number) => {
    setContacts((prev) => prev.filter((_, j) => j !== i));
    setOpenIdx(null);
  };

  // ✅ Fixed stale closure: derive next length inside setter
  const add = (type: "info" | "social") => {
    setContacts((prev) => {
      const next = [...prev, emptyContact(type)];
      setOpenIdx(next.length - 1);
      return next;
    });
  };

  const infoContacts = contacts.filter((c) => c.type === "info");
  const socialContacts = contacts.filter((c) => c.type === "social");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(contacts.filter((c) => c.label.trim()) as ContactItem[]);
      }}
      className="space-y-8"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
          <p className="text-lg font-bold text-slate-800">
            {infoContacts.length}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mt-0.5">
            Info cards
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
          <p className="text-lg font-bold text-slate-800">
            {socialContacts.length}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mt-0.5">
            Social links
          </p>
        </div>
      </div>

      <Section title="Info cards (Address, Email, etc.)">
        <div className="space-y-2">
          {contacts.map((contact, i) => {
            if (contact.type !== "info") return null;
            return (
              <div
                key={contact._key ?? i}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-left"
                >
                  <div
                    className={`w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-sm border ${contact.bgClass}`}
                  >
                    {contact.emoji || "📌"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {contact.label || (
                        <span className="text-slate-400 font-normal">
                          Untitled
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {contact.value || "No value"}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${openIdx === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openIdx === i && (
                  <div className="border-t border-slate-100 p-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Label *
                        </span>
                        <input
                          value={contact.label}
                          onChange={(e) => update(i, "label", e.target.value)}
                          className={field}
                          placeholder="Address"
                        />
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Value *
                        </span>
                        <input
                          value={contact.value}
                          onChange={(e) => update(i, "value", e.target.value)}
                          className={field}
                          placeholder="Seoul, South Korea"
                        />
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Link / href (optional)
                        </span>
                        <input
                          value={contact.href ?? ""}
                          onChange={(e) => update(i, "href", e.target.value)}
                          className={field}
                          placeholder="mailto:..."
                        />
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Card background
                        </span>
                        <select
                          value={contact.bgClass}
                          onChange={(e) => update(i, "bgClass", e.target.value)}
                          className={field}
                        >
                          {BG_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Display order
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={contact.displayOrder}
                          onChange={(e) =>
                            update(i, "displayOrder", Number(e.target.value))
                          }
                          className={field}
                        />
                      </label>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={contact.isActive}
                          onChange={(e) =>
                            update(i, "isActive", e.target.checked)
                          }
                          className="w-4 h-4 accent-orange-500"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          Active
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 border border-rose-200 bg-rose-50 px-3 py-1.5 rounded-full hover:bg-rose-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => add("info")}
          className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 px-5 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition"
        >
          + Add info card
        </button>
      </Section>

      <Section title="Social links (Facebook, Telegram, etc.)">
        <div className="space-y-2">
          {contacts.map((contact, i) => {
            if (contact.type !== "social") return null;
            return (
              <div
                key={contact._key ?? i}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-left"
                >
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-sm border border-slate-200 bg-slate-50">
                    {contact.emoji || "🔗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {contact.label || (
                        <span className="text-slate-400 font-normal">
                          Untitled link
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {contact.href || "No URL set"}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${openIdx === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openIdx === i && (
                  <div className="border-t border-slate-100 p-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Label *
                        </span>
                        <input
                          value={contact.label}
                          onChange={(e) => update(i, "label", e.target.value)}
                          className={field}
                          placeholder="Facebook Group"
                        />
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Emoji icon
                        </span>
                        <input
                          value={contact.emoji ?? ""}
                          onChange={(e) => update(i, "emoji", e.target.value)}
                          className={field}
                          placeholder="📘"
                          maxLength={4}
                        />
                      </label>
                      <label className="space-y-1.5 block sm:col-span-2">
                        <span className="text-xs font-semibold text-slate-700">
                          URL *
                        </span>
                        <input
                          value={contact.href ?? ""}
                          onChange={(e) => update(i, "href", e.target.value)}
                          className={field}
                          placeholder="https://facebook.com/groups/IIK2002/"
                        />
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-semibold text-slate-700">
                          Display order
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={contact.displayOrder}
                          onChange={(e) =>
                            update(i, "displayOrder", Number(e.target.value))
                          }
                          className={field}
                        />
                      </label>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={contact.isActive}
                          onChange={(e) =>
                            update(i, "isActive", e.target.checked)
                          }
                          className="w-4 h-4 accent-orange-500"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          Active
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 border border-rose-200 bg-rose-50 px-3 py-1.5 rounded-full hover:bg-rose-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => add("social")}
          className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-orange-300 px-5 py-2 text-xs font-semibold text-orange-500 hover:bg-orange-50 transition"
        >
          + Add social link
        </button>
      </Section>

      <SaveBtn label="Save Contacts" saving={saving} />
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT — Tab shell
// ═══════════════════════════════════════════════════════════════════════════════

export function AboutForm({
  initialContent,
  onSubmitContent,
  initialContacts,
  onSubmitContacts,
  saving,
}: AboutFormProps) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex border-b border-slate-200 bg-slate-50">
        <Link
          href="/admin/about/board"
          className="flex-1 px-4 py-4 text-center text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700 hover:bg-white/60"
        >
          Board & Team →
        </Link>
        <span className="flex-1 relative px-4 py-4 text-center text-sm font-semibold text-orange-600 bg-white">
          Contacts & Links
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 rounded-t-full" />
        </span>
      </div>

      <div className="p-8">
        <ContactsForm
          initial={initialContacts}
          onSubmit={onSubmitContacts}
          saving={saving}
        />
      </div>
    </div>
  );
}
