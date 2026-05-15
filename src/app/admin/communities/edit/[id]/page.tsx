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
          category: item.category,
          members: String(item.members),
          contact: item.contact,
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
              members: Number(updated.members),
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
