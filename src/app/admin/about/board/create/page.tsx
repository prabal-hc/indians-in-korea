"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  BoardMemberForm,
  BoardMemberFormValues,
} from "@/components/admin/forms/BoardMemberForm";
import * as aboutService from "@/services/admin/about.service";

export default function AdminCreateBoardMemberPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Add Member"
        subtitle="Add a new board member, advisor, or core team member."
      />
      <BoardMemberForm
        onSubmit={async (values: BoardMemberFormValues) => {
          await aboutService.createBoardMember({
            name: values.name,
            initials: values.initials,
            role: values.role,
            profession: values.profession || null,
            koreanTitle: values.koreanTitle || null,
            type: values.type,
            imageUrl: values.imageUrl || null,
            bio: values.bio || null,
            message: values.message || null,
            displayOrder: values.displayOrder,
            isActive: values.isActive,
          });
          router.push("/admin/about/board");
        }}
      />
    </div>
  );
}
