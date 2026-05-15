"use client";

import { Bell, Menu, Search, UserCircle } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  onToggleSidebar?: () => void;
}

export function AdminHeader({ title, onToggleSidebar }: AdminHeaderProps) {
  return (
    <div className="sticky top-0 z-20 mb-6 flex items-center justify-between gap-4 rounded-[2rem] border border-slate-200/80 bg-white/90 px-5 py-4 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Admin Dashboard
          </p>
          <h1 className="text-xl font-semibold text-slate-950">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-200/30"
          aria-label="Admin profile"
        >
          <UserCircle size={20} />
        </button>
      </div>
    </div>
  );
}
