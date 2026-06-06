"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminEditAboutPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/about");
  }, [router]);
  return null;
}
