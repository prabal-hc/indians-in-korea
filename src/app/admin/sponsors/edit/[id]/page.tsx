"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  SponsorForm,
  SponsorFormValues,
} from "@/components/admin/forms/SponsorForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as sponsorsService from "@/services/admin/sponsors.service";

export default function AdminEditSponsorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [values, setValues] = useState<SponsorFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const item = await sponsorsService.getById(id);
      if (item) {
        setValues({
          name: item.name,
          logoUrl: item.logoUrl ?? "",
          websiteUrl: item.websiteUrl ?? "",
          displayOrder: item.displayOrder,
          isActive: item.isActive,
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Edit Sponsor"
        subtitle="Update sponsor details and homepage visibility."
      />
      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <SponsorForm
          initialData={values}
          onSubmit={async (updated) => {
            await sponsorsService.update(id, updated);
            router.push("/admin/sponsors");
          }}
          submitLabel="Update sponsor"
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          Sponsor not found.
        </div>
      )}
    </div>
  );
}
