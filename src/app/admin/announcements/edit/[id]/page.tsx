"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  AnnouncementForm,
  AnnouncementFormValues,
} from "@/components/admin/forms/AnnouncementForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as announcementsService from "@/services/admin/announcements.service";

export default function AdminEditAnnouncementPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [values, setValues] = useState<AnnouncementFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const item = await announcementsService.getById(id);
      if (item) {
        setValues({
          title: item.title,
          category: item.category,
          publishedAt: item.publishedAt,
          content: item.content,
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
        title="Edit Announcement"
        subtitle="Adjust announcement copy and publish details."
      />
      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <AnnouncementForm
          initialData={values}
          onSubmit={async (updated) => {
            await announcementsService.update(id, updated);
            router.push("/admin/announcements");
          }}
          submitLabel="Update announcement"
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          Announcement not found.
        </div>
      )}
    </div>
  );
}
