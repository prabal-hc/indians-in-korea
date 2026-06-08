"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageTitle } from "@/components/admin/PageTitle";
import { SearchBar } from "@/components/admin/SearchBar";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as announcementsService from "@/services/admin/announcements.service";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<announcementsService.AnnouncementItem[]>(
    [],
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await announcementsService.getAll();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return items.filter((item) => {
      const matchesSearch = [
        item.title,
        item.description ?? "",
        String(item.display_order),
      ].some((value) => value.toLowerCase().includes(lowerSearch));
      return matchesSearch;
    });
  }, [items, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setConfirming(true);
    await announcementsService.remove(deleteTarget);
    setItems((current) => current.filter((item) => item.id !== deleteTarget));
    setDeleteTarget(null);
    setConfirming(false);
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Announcements"
        subtitle="Manage site announcements and publish dates for community updates."
      />

      <div className="grid gap-4">
        {/* <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search announcements by title, description, or order..."
        /> */}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-sm text-slate-600">
          Showing {filtered.length} announcement
          {filtered.length === 1 ? "" : "s"}.
        </p>
        <Link
          href="/admin/announcements/create"
          className="inline-flex items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          New announcement
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No announcements"
          description="Create a new announcement or modify the search to find existing ones."
          actionLabel="Create announcement"
          onAction={() => window.location.assign("/admin/announcements/create")}
        />
      ) : (
        <DataTable<announcementsService.AnnouncementItem>
          columns={[
            { header: "Title", accessor: "title" },
            { header: "Description", accessor: "description" },
            { header: "Display Order", accessor: "display_order" },
          ]}
          data={filtered}
          onEdit={(item) =>
            window.location.assign(`/admin/announcements/edit/${item.id}`)
          }
          onDelete={(item) => setDeleteTarget(item.id)}
        />
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete announcement"
        message="This announcement will be removed from the public feed. Confirm to continue."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={confirming}
      />
    </div>
  );
}
