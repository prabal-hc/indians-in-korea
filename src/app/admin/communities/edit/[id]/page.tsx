"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  CommunityForm,
  CommunityFormValues,
} from "@/components/admin/forms/CommunityForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as communitiesService from "@/services/admin/communities.service";

export default function AdminEditCommunitiesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [values, setValues] = useState<CommunityFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const item = await communitiesService.getById(id);
      if (item) {
        setValues({
          name: item.name,
          abbr: item.abbr,
          category: item.category,
          tag: item.tag,
          icon: item.icon,
          members: String(item.members),
          since: item.since,
          description: item.description,
          highlights: item.highlights ?? ["", "", "", ""],
          websiteUrl: item.websiteUrl,
          facebookUrl: item.facebookUrl,
          email: item.email,
          contact: item.contact,
          imageUrl: item.imageUrl,
          accentColor: item.accentColor,
          isActive: item.status === "Published",
          isFeatured: item.isFeatured,
          displayOrder: item.displayOrder,
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Edit Community"
        subtitle="Update community details and member information."
      />
      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <CommunityForm
          initialData={values}
          onSubmit={async (updated) => {
            await communitiesService.update(id, {
              ...updated,
              members: updated.members,
            });
            router.push("/admin/communities");
          }}
          submitLabel="Update community"
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          Community not found.
        </div>
      )}
    </div>
  );
}
