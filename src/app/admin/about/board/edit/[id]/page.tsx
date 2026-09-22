"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  BoardMemberForm,
  BoardMemberFormValues,
} from "@/components/admin/forms/BoardMemberForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as aboutService from "@/services/admin/about.service";

export default function AdminEditBoardMemberPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [values, setValues] = useState<BoardMemberFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const item = await aboutService.getBoardMemberById(id);
      if (item) {
        setValues({
          name: item.name,
          initials: item.initials,
          role: item.role,
          profession: item.profession ?? "",
          koreanTitle: item.koreanTitle ?? "",
          type: item.type,
          imageUrl: item.imageUrl ?? "",
          bio: item.bio ?? "",
          message: item.message ?? "",
          displayOrder: item.displayOrder ?? 0,
          isActive: item.isActive ?? true,
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Edit Member"
        subtitle="Update this member's details, photo, bio, and message."
      />
      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <BoardMemberForm
          initialData={values}
          onSubmit={async (updated) => {
            await aboutService.updateBoardMember(id, {
              name: updated.name,
              initials: updated.initials,
              role: updated.role,
              profession: updated.profession || null,
              koreanTitle: updated.koreanTitle || null,
              type: updated.type,
              imageUrl: updated.imageUrl || null,
              bio: updated.bio || null,
              message: updated.message || null,
              displayOrder: updated.displayOrder,
              isActive: updated.isActive,
            });
            router.push("/admin/about/board");
          }}
          submitLabel="Update member"
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          Member not found.
        </div>
      )}
    </div>
  );
}
