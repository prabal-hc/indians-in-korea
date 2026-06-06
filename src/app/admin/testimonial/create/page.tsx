"use client";

import { useRouter } from "next/navigation";
import {
  TestimonialForm,
  type TestimonialFormValues,
} from "@/components/admin/TestimonialForm";
import { create } from "@/services/testimonials.service";

export default function NewTestimonialPage() {
  const router = useRouter();

  const handleSubmit = async (values: TestimonialFormValues) => {
    try {
      await create({
        ...values,
        status: values.isActive ? "Published" : "Draft",
      });
      router.push("/admin/testimonial");
    } catch {
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add Testimonial</h1>
        <p className="mt-1 text-sm text-slate-500">
          Add a new voice to the community marquee.
        </p>
      </div>
      <TestimonialForm onSubmit={handleSubmit} submitLabel="Add Testimonial" />
    </div>
  );
}
