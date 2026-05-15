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
import * as communitiesService from "@/services/admin/communities.service";

const statusOptions = ["All", "Published", "Draft"];

export default function AdminCommunitiesPage() {
  const [items, setItems] = useState<communitiesService.CommunityItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await communitiesService.getAll();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = [item.name, item.category, item.contact].some(
        (value) =>
          value.toString().toLowerCase().includes(search.toLowerCase()),
      );
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setConfirming(true);
    await communitiesService.remove(deleteTarget);
    setItems((current) => current.filter((item) => item.id !== deleteTarget));
    setDeleteTarget(null);
    setConfirming(false);
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Communities"
        subtitle="Manage the community groups, membership details, and contact information."
      />

      <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search community names, categories, contacts..."
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
          Showing {filtered.length} community
          {filtered.length === 1 ? "" : "ies"}.
        </p>
        <Link
          href="/admin/communities/create"
          className="inline-flex items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          New community
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No communities found"
          description="Add a new community or refine your search to locate existing groups."
          actionLabel="Create a community"
          onAction={() => window.location.assign("/admin/communities/create")}
        />
      ) : (
        <DataTable
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Category", accessor: "category" },
            { header: "Members", render: (item) => item.members },
            { header: "Contact", accessor: "contact" },
            {
              header: "Status",
              render: (item) => <StatusBadge status={item.status} />,
            },
          ]}
          data={filtered}
          onEdit={(item) =>
            window.location.assign(`/admin/communities/edit/${item.id}`)
          }
          onDelete={(item) => setDeleteTarget(item.id)}
        />
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete community"
        message="This community will be removed from the admin directory. Confirm deletion to continue."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={confirming}
      />
    </div>
  );
}
