"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  AnnouncementForm,
  AnnouncementFormValues,
} from "@/components/admin/forms/AnnouncementForm";
import * as announcementsService from "@/services/admin/announcements.service";

export default function AdminCreateAnnouncementPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create Announcement"
        subtitle="Publish a new announcement or site update."
      />
      <AnnouncementForm
        onSubmit={async (values: AnnouncementFormValues) => {
          await announcementsService.create(values);
          router.push("/admin/announcements");
        }}
      />
    </div>
  );
}
