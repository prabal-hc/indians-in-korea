"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import {
  GalleryForm,
  GalleryFormValues,
} from "@/components/admin/forms/GalleryForm";
import * as galleryService from "@/services/admin/gallery.service";

export default function AdminCreateGalleryPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create Gallery Item"
        subtitle="Add a new gallery asset with caption and imagery."
      />
      <GalleryForm
        onSubmit={async (values: GalleryFormValues) => {
          await galleryService.create({
            title: values.title,
            tag: values.tag,
            tagColor: values.tagColor,
            year: values.year,
            caption: values.caption,
            imageUrl: values.imageUrl,
            displayOrder: values.displayOrder,
            status: values.isActive ? "Published" : "Draft",
            likes: 0,
          });
          router.push("/admin/gallery");
        }}
      />
    </div>
  );
}
