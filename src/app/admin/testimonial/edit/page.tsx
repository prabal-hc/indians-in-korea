"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyTestimonialEditRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/testimonial");
  }, [router]);

  return null;
}
