"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  SportsForm,
  SportsFormValues,
} from "@/components/admin/forms/SportsForm";
import * as sportsService from "@/services/admin/sports.service";

export default function AdminCreateSportsPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create Sport"
        subtitle="Add a new sports event or program to the dashboard."
      />
      <SportsForm
        onSubmit={async (values: SportsFormValues) => {
          await sportsService.create(values);
          router.push("/admin/sports");
        }}
      />
    </div>
  );
}
