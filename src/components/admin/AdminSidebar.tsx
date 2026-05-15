"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Goal,
  Home,
  Image,
  LogOut,
  Megaphone,
  Menu,
  Sparkles,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Sports", href: "/admin/sports", icon: Goal },
  { label: "Communities", href: "/admin/communities", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Homepage", href: "/admin/homepage", icon: Sparkles },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const sidebarVisible = open || isDesktop;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: sidebarVisible ? 0 : -360 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed left-0 top-0 z-50 h-full w-80 max-w-full overflow-y-auto border-r border-slate-200/80 bg-white/95 shadow-[10px_0_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl lg:static lg:translate-x-0 lg:w-72 lg:shadow-none"
      >
        <div className="flex h-full flex-col px-6 py-8">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-500">
                Admin Panel
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                IIK Control
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-orange-50 text-orange-600 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                    <Icon size={18} />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 shadow-sm">
            <p className="font-semibold text-slate-900">Need help?</p>
            <p className="mt-2 leading-6">
              Manage IIK content with confidence. Use the homepage section for
              featured highlights and announcements.
            </p>
          </div>

          <Link
            href="/admin/login"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
