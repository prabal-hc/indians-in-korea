export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-12 shadow-xl shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-600">
          Access denied
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
          You do not have permission to view this page.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Admin access is required. If you believe this is a mistake, please
          contact the site administrator.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="/admin/login"
            className="inline-flex items-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/30 transition hover:bg-orange-600"
          >
            Go to admin login
          </a>
        </div>
      </div>
    </div>
  );
}
