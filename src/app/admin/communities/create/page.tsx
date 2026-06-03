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
            abbr: values.abbr,
            category: values.category,
            tag: values.tag,
            icon: values.icon,
            members: values.members,
            since: values.since,
            description: values.description,
            highlights: values.highlights,
            websiteUrl: values.websiteUrl,
            facebookUrl: values.facebookUrl,
            email: values.email,
            contact: values.contact,
            imageUrl: values.imageUrl,
            accentColor: values.accentColor,
            status: values.isActive ? "Published" : "Draft",
            isFeatured: values.isFeatured,
            displayOrder: values.displayOrder,
          });
          router.push("/admin/communities");
        }}
      />
    </div>
  );
}
