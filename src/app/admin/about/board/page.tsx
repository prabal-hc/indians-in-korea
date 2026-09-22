"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageTitle } from "@/components/admin/PageTitle";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import * as aboutService from "@/services/admin/about.service";

const TYPE_FILTERS: { value: string; label: string }[] = [
  { value: "All", label: "All" },
  { value: "board", label: "Board" },
  { value: "advisor", label: "Advisors" },
  { value: "core", label: "Core" },
];

export default function AdminBoardMembersPage() {
  const [items, setItems] = useState<aboutService.BoardMember[]>([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await aboutService.getAllBoardMembers();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) => typeFilter === "All" || item.type === typeFilter,
      ),
    [items, typeFilter],
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setConfirming(true);
    try {
      await aboutService.deleteBoardMember(deleteTarget);
      setItems((current) => current.filter((item) => item.id !== deleteTarget));
      setDeleteTarget(null);
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Board & Team"
          subtitle="Manage board members, advisors, and core team — photos, bios, and leadership messages."
        />
        <Link
          href="/admin/about"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          ← Back to About Us
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 p-1 rounded-full bg-slate-100 w-fit">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTypeFilter(t.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                typeFilter === t.value
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Link
          href="/admin/about/board/create"
          className="inline-flex items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          New member
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Add a board member, advisor, or core team member."
          actionLabel="Add a member"
          onAction={() => window.location.assign("/admin/about/board/create")}
        />
      ) : (
        <DataTable
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Role", accessor: "role" },
            {
              header: "Type",
              render: (item) => (
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {item.type}
                </span>
              ),
            },
            {
              header: "Status",
              render: (item) => (
                <StatusBadge status={item.isActive ? "Published" : "Draft"} />
              ),
            },
          ]}
          data={filtered}
          onEdit={(item) =>
            window.location.assign(`/admin/about/board/edit/${item.id}`)
          }
          onDelete={(item) => setDeleteTarget(item.id)}
        />
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete member"
        message="This member will be permanently removed from the About page. Confirm deletion to continue."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={confirming}
      />
    </div>
  );
}
