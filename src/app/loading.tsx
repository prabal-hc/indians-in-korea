"use client";

import { useState } from "react";
import IIKLoader from "@/components/Iikloader";

export default function Loading() {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem("iik-loader-seen");
  });

  if (!showLoader) return null;

  return (
    <IIKLoader
      onComplete={() => {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("iik-loader-seen", "true");
        }
        setShowLoader(false);
      }}
    />
  );
}
