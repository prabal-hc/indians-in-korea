"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageTitle } from "@/components/admin/PageTitle";
import { SearchBar } from "@/components/admin/SearchBar";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import * as galleryService from "@/services/admin/gallery.service";

const statusOptions = ["All", "Published", "Draft"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<galleryService.GalleryItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await galleryService.getAll();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = [item.title, item.category, item.caption].some(
        (value) => value.toLowerCase().includes(search.toLowerCase()),
      );
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setConfirming(true);
    await galleryService.remove(deleteTarget);
    setItems((current) => current.filter((item) => item.id !== deleteTarget));
    setDeleteTarget(null);
    setConfirming(false);
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Gallery"
        subtitle="Manage visual highlights, captions, and gallery assets."
      />

      <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search gallery items, categories, captions..."
        />
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5">
          <label className="block text-sm font-medium text-slate-700">
            Filter by status
          </label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-sm text-slate-600">
          Showing {filtered.length} gallery item
          {filtered.length === 1 ? "" : "s"}.
        </p>
        <Link
          href="/admin/gallery/create"
          className="inline-flex items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          New gallery item
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No gallery items"
          description="Create a fresh gallery card or revise your filters to find items."
          actionLabel="Create gallery item"
          onAction={() => window.location.assign("/admin/gallery/create")}
        />
      ) : (
        <DataTable
          columns={[
            { header: "Title", accessor: "title" },
            { header: "Category", accessor: "category" },
            { header: "Caption", accessor: "caption" },
            {
              header: "Status",
              render: (item) => <StatusBadge status={item.status} />,
            },
          ]}
          data={filtered}
          onEdit={(item) =>
            window.location.assign(`/admin/gallery/edit/${item.id}`)
          }
          onDelete={(item) => setDeleteTarget(item.id)}
        />
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete gallery item"
        message="This gallery asset will be removed from the visual library. Proceed with deletion?"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={confirming}
      />
    </div>
  );
}
