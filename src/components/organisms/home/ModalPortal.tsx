"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface ModalPortalProps {
  children: React.ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.paused(true);
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (smoother) {
        smoother.paused(false);
      } else {
        document.body.style.overflow = "";
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
