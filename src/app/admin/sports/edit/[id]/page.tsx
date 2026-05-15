"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  SportsForm,
  SportsFormValues,
} from "@/components/admin/forms/SportsForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as sportsService from "@/services/admin/sports.service";

export default function AdminEditSportsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [values, setValues] = useState<SportsFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const item = await sportsService.getById(id);
      if (item) {
        setValues({
          title: item.title,
          type: item.type,
          date: item.date,
          venue: item.venue,
          description: item.description,
          imageUrl: "",
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Edit Sport"
        subtitle="Update the sports program details and schedule."
      />
      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <SportsForm
          initialData={values}
          onSubmit={async (updated) => {
            await sportsService.update(id, updated);
            router.push("/admin/sports");
          }}
          submitLabel="Update sport"
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          Sport item not found.
        </div>
      )}
    </div>
  );
}
