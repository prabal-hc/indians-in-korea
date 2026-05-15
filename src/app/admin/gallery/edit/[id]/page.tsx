"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  GalleryForm,
  GalleryFormValues,
} from "@/components/admin/forms/GalleryForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as galleryService from "@/services/admin/gallery.service";

export default function AdminEditGalleryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [values, setValues] = useState<GalleryFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const item = await galleryService.getById(id);
      if (item) {
        setValues({
          title: item.title,
          category: item.category,
          caption: item.caption,
          imageUrl: item.imageUrl,
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Edit Gallery Item"
        subtitle="Update the gallery title, category, caption, and image."
      />
      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <GalleryForm
          initialData={values}
          onSubmit={async (updated) => {
            await galleryService.update(id, updated);
            router.push("/admin/gallery");
          }}
          submitLabel="Update gallery item"
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          Gallery item not found.
        </div>
      )}
    </div>
  );
}
