"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/lib/scroll";

interface ModalPortalProps {
  children: React.ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
  if (typeof window === "undefined") return null;

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";

    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(children, document.body);
}
