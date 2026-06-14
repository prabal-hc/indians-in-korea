"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  AboutForm,
  type AboutFormValues,
} from "@/components/admin/forms/AboutForm";
import {
  saveAbout,
  saveBoardMembers,
  saveContacts,
  type BoardMember,
  type ContactItem,
} from "@/services/admin/about.service";

export default function AdminCreateAboutPage() {
  const router = useRouter();

  const handleSaveContent = async (values: AboutFormValues) => {
    try {
      await saveAbout(values);
      router.push("/admin/about");
    } catch {
      alert("Failed to save. Please try again.");
    }
  };

  const handleSaveBoard = async (members: BoardMember[]) => {
    try {
      await saveBoardMembers(members);
    } catch {
      alert("Failed to save board. Please try again.");
    }
  };

  const handleSaveContacts = async (contacts: ContactItem[]) => {
    try {
      await saveContacts(contacts);
    } catch {
      alert("Failed to save contacts. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create About Us"
        subtitle="Set up the About page content."
      />
      <AboutForm
        onSubmitContent={handleSaveContent}
        onSubmitBoard={handleSaveBoard}
        onSubmitContacts={handleSaveContacts}
      />
    </div>
  );
}
