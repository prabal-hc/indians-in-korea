"use client";

import { motion } from "framer-motion";

interface StatCard {
  label: string;
  value: string;
  description: string;
  accent: string;
}

interface DashboardStatsProps {
  stats: StatCard[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.article
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 * index }}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5"
        >
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stat.accent}`}
          >
            {stat.label}
          </span>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            {stat.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {stat.description}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
