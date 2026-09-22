"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  SponsorForm,
  SponsorFormValues,
} from "@/components/admin/forms/SponsorForm";
import * as sponsorsService from "@/services/admin/sponsors.service";

export default function AdminCreateSponsorPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create Sponsor"
        subtitle="Add a new sponsor logo and website link."
      />
      <SponsorForm
        onSubmit={async (values: SponsorFormValues) => {
          await sponsorsService.create({
            name: values.name,
            logoUrl: values.logoUrl,
            websiteUrl: values.websiteUrl,
            displayOrder: values.displayOrder,
            isActive: values.isActive,
          });
          router.push("/admin/sponsors");
        }}
      />
    </div>
  );
}
