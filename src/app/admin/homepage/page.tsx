"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  HomepageForm,
  HomepageFormValues,
} from "@/components/admin/forms/HomepageForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as homepageService from "@/services/admin/homepage.service";

export default function AdminHomepagePage() {
  const [values, setValues] = useState<HomepageFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await homepageService.getById("home-1");
      setValues(
        data
          ? {
              headline: data.headline,
              highlight: data.highlight,
              description: data.description,
              ctaLabel: data.ctaLabel,
              ctaUrl: data.ctaUrl,
              backgroundImage: data.backgroundImage,
            }
          : null,
      );
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Homepage"
        subtitle="Manage hero copy, highlight text, and call-to-action content."
      />

      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <div className="space-y-6">
          {success ? (
            <p className="rounded-3xl bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              {success}
            </p>
          ) : null}
          <HomepageForm
            initialData={values}
            onSubmit={async (updated) => {
              await homepageService.update("home-1", updated);
              setValues(updated);
              setSuccess("Homepage content saved successfully.");
            }}
          />
        </div>
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          <p className="text-sm">
            Homepage content could not be loaded. Please add a new homepage
            layout item later.
          </p>
        </div>
      )}
    </div>
  );
}
