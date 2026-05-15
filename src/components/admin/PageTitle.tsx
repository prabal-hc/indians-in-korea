interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-6 rounded-[2rem] border border-slate-200/80 bg-white/90 px-6 py-5 shadow-sm shadow-slate-900/5">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-500">
        Admin section
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
