interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

export function LoadingSkeleton({
  rows = 4,
  columns = 5,
}: LoadingSkeletonProps) {
  return (
    <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-10 flex-1 rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
