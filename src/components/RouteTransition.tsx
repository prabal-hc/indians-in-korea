"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis } from "@/lib/scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RouteTransitionProps {
  children: React.ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Jump to top on every route change — Lenis owns scroll position
    // independently of the browser, and persists across navigations since
    // it isn't remounted per page, so it needs to be reset explicitly.
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });

    // Refresh scroll calculations on route change
    const timer = setTimeout(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
