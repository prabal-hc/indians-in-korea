"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "@/components/admin/PageTitle";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import {
  AboutForm,
  type AboutFormValues,
} from "@/components/admin/forms/AboutForm";
import { getAboutPageData, saveAbout } from "@/services/admin/about.service";

export default function AdminAboutPage() {
  const [values, setValues] = useState<AboutFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAboutPageData().then(({ content, vision }) => {
      if (content) {
        setValues({
          headline: content.headline,
          subheadline: content.subheadline,
          description: content.description,
          mission: content.mission,
          established: content.established,
          members: content.members,
          events: content.events,
          ctaLabel: content.ctaLabel,
          ctaUrl: content.ctaUrl,
          heroImage: content.heroImage,
          visionItems:
            vision.length > 0
              ? vision.map((v) => v.content)
              : Array(8).fill(""),
        });
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (updated: AboutFormValues) => {
    setSaving(true);
    try {
      await saveAbout(updated);
      setValues(updated);
      setSuccess("Saved successfully.");
      setTimeout(() => setSuccess(""), 3500);
    } catch {
      alert("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="About Us"
        subtitle="Manage hero copy, stats, mission, vision, and CTA."
      />

      {success && (
        <p className="rounded-3xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-sm font-semibold text-emerald-700">
          ✓ {success}
        </p>
      )}

      {loading ? (
        <LoadingSkeleton rows={6} columns={1} />
      ) : values ? (
        <AboutForm
          initialData={values}
          onSubmit={handleSubmit}
          submitLabel={saving ? "Saving…" : "Save About Us"}
        />
      ) : (
        <AboutForm
          onSubmit={handleSubmit}
          submitLabel={saving ? "Saving…" : "Create About Us"}
        />
      )}
    </div>
  );
}
