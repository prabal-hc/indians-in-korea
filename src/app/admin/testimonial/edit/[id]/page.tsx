"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import {
  TestimonialForm,
  type TestimonialFormValues,
} from "@/components/admin/TestimonialForm";
import * as testimonialService from "@/services/admin/testimonials.service";

export default function AdminEditTestimonialPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) ?? "";
  const [initialData, setInitialData] = useState<TestimonialFormValues | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        router.replace("/admin/testimonial");
        return;
      }

      setLoading(true);
      const item = await testimonialService.getById(id);
      if (!item) {
        router.replace("/admin/testimonial");
        return;
      }

      setInitialData({
        name: item.name,
        initials: item.initials,
        role: item.role,
        location: item.location,
        color: item.color,
        quote: item.quote,
        rating: item.rating,
        isActive: item.status === "Published",
        isVerified: item.isVerified,
        displayOrder: item.displayOrder,
      });
      setLoading(false);
    };

    load();
  }, [id, router]);

  if (loading || !initialData) {
    return (
      <div className="space-y-8">
        <PageTitle
          title="Edit Testimonial"
          subtitle="Update the testimonial details shown in the community section."
        />
        <LoadingSkeleton rows={6} columns={1} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageTitle
        title="Edit Testimonial"
        subtitle="Update the testimonial details shown in the community section."
      />

      <TestimonialForm
        initialData={initialData}
        onSubmit={async (values) => {
          await testimonialService.update(id, {
            ...values,
            status: values.isActive ? "Published" : "Draft",
            isVerified: values.isVerified,
          });
          router.push("/admin/testimonial");
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
