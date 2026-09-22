"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageTitle } from "@/components/admin/PageTitle";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import * as sponsorsService from "@/services/admin/sponsors.service";

export default function AdminSponsorsPage() {
  const [items, setItems] = useState<sponsorsService.SponsorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await sponsorsService.getAll();
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setConfirming(true);
    await sponsorsService.remove(deleteTarget);
    setItems((current) => current.filter((item) => item.id !== deleteTarget));
    setDeleteTarget(null);
    setConfirming(false);
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Sponsors"
        subtitle="Manage sponsor logos and website links shown on the homepage."
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-sm text-slate-600">
          Showing {items.length} sponsor{items.length === 1 ? "" : "s"}.
        </p>
        <Link
          href="/admin/sponsors/create"
          className="inline-flex items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          New sponsor
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : items.length === 0 ? (
        <EmptyState
          title="No sponsors yet"
          description="Add a sponsor to show their logo on the homepage."
          actionLabel="Add a sponsor"
          onAction={() => window.location.assign("/admin/sponsors/create")}
        />
      ) : (
        <DataTable
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Website", accessor: "websiteUrl" },
            { header: "Display order", accessor: "displayOrder" },
            {
              header: "Status",
              render: (item) => (
                <StatusBadge
                  status={item.isActive ? "Published" : "Draft"}
                />
              ),
            },
          ]}
          data={items}
          onEdit={(item) =>
            window.location.assign(`/admin/sponsors/edit/${item.id}`)
          }
          onDelete={(item) => setDeleteTarget(item.id)}
        />
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete sponsor"
        message="This sponsor will be removed from the homepage. Confirm deletion to continue."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={confirming}
      />
    </div>
  );
}
