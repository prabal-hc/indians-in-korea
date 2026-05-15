import Link from "next/link";

export default function AdminIndexPage() {
  return (
    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-20 text-center">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/10">
        <p className="text-sm uppercase tracking-[0.32em] text-orange-500">
          Admin area
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Welcome to IIK Admin
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Manage events, sports, communities, gallery, announcements, and
          homepage content from a central dashboard.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/admin/login"
            className="inline-flex justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Go to login
          </Link>
          <Link
            href="/admin/dashboard"
            className="inline-flex justify-center rounded-3xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
