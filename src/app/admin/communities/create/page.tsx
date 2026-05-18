"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  CommunityForm,
  CommunityFormValues,
} from "@/components/admin/forms/CommunityForm";
import * as communitiesService from "@/services/admin/communities.service";

export default function AdminCreateCommunitiesPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create Community"
        subtitle="Add a new community group and membership details."
      />
      <CommunityForm
        onSubmit={async (values: CommunityFormValues) => {
          await communitiesService.create({
            name: values.name,
            category: values.category,
            status: "Draft",
            members: values.members,
            contact: values.contact,
            description: values.description,
          });
          router.push("/admin/communities");
        }}
      />
    </div>
  );
}
