"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/lib/scroll";

interface ModalPortalProps {
  children: React.ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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

  if (!mounted) return null;

  return createPortal(children, document.body);
}
