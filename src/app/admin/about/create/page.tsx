"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  AboutForm,
  type AboutFormValues,
} from "@/components/admin/forms/AboutForm";
import { saveAbout } from "@/services/admin/about.service";

export default function AdminCreateAboutPage() {
  const router = useRouter();

  const handleSubmit = async (values: AboutFormValues) => {
    try {
      await saveAbout(values);
      router.push("/admin/about");
    } catch {
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create About Us"
        subtitle="Set up the About page content."
      />
      <AboutForm onSubmit={handleSubmit} submitLabel="Create About Us" />
    </div>
  );
}
