import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { PageTitle } from "@/components/admin/PageTitle";

const stats = [
  {
    label: "Total Events",
    value: "24",
    description: "Events scheduled or published in the network.",
    accent: "bg-orange-100 text-orange-700",
  },
  {
    label: "Sports Programs",
    value: "12",
    description: "Active sports and wellness sessions.",
    accent: "bg-amber-100 text-amber-700",
  },
  {
    label: "Communities",
    value: "8",
    description: "Distinct interest groups managed on the platform.",
    accent: "bg-slate-100 text-slate-700",
  },
  {
    label: "Announcements",
    value: "10",
    description: "Published news and alerts awaiting review.",
    accent: "bg-orange-100 text-orange-700",
  },
];

const recentActivity = [
  {
    title: "Approved new event draft",
    detail: "Summer Cultural Exchange is ready for publishing.",
    icon: CalendarCheck,
  },
  {
    title: "Community updated",
    detail: "Indian Students Circle has a refreshed member count.",
    icon: Users,
  },
  {
    title: "Hero content refreshed",
    detail: "Homepage headline and CTA updated for Q3.",
    icon: Sparkles,
  },
  {
    title: "Announcement published",
    detail: "Community Health Camp is live on the homepage.",
    icon: ShieldCheck,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <PageTitle
        title="Dashboard"
        subtitle="Review site health, active content, and quick actions for the IIK admin panel."
      />

      <DashboardStats stats={stats} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-500">
                Quick actions
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                Launch new content
              </h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
              Create new item
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Add event",
                caption: "Quick start a fresh event.",
                color: "bg-orange-50 text-orange-700",
              },
              {
                label: "Add announcement",
                caption: "Publish site updates fast.",
                color: "bg-slate-50 text-slate-700",
              },
              {
                label: "Add gallery item",
                caption: "Refresh the homepage visuals.",
                color: "bg-amber-50 text-amber-700",
              },
              {
                label: "Add community",
                caption: "Open a new group for members.",
                color: "bg-slate-50 text-slate-700",
              },
            ].map((action) => (
              <div
                key={action.label}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
              >
                <p className={`text-sm font-semibold ${action.color}`}>
                  {action.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {action.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/5">
          <p className="text-sm uppercase tracking-[0.28em] text-orange-500">
            Recent activity
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            What’s new
          </h2>
          <div className="mt-6 space-y-4">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-orange-50 text-orange-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
