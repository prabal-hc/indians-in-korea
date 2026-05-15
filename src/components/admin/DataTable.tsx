import { Edit3, Trash2 } from "lucide-react";

interface Column<T> {
  header: string;
  accessor?: keyof T | string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found.",
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-separate border-spacing-0 text-sm text-slate-700">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className={`border-b border-slate-200 px-6 py-4 text-left font-semibold uppercase tracking-[0.15em] text-slate-500 ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="border-b border-slate-200 px-6 py-4 text-right font-semibold uppercase tracking-[0.15em] text-slate-500">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="animate-pulse odd:bg-white even:bg-slate-50"
              >
                {columns.map((column, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b border-slate-200 px-6 py-5"
                  >
                    <div className="h-4 w-full rounded-full bg-slate-200" />
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="border-b border-slate-200 px-6 py-5 text-right">
                    <div className="mx-auto inline-flex h-10 w-24 items-center justify-center rounded-full bg-slate-200" />
                  </td>
                )}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-6 py-12 text-center text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                className="odd:bg-white even:bg-slate-50"
              >
                {columns.map((column, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b border-slate-200 px-6 py-5 align-top"
                  >
                    {column.render
                      ? column.render(row)
                      : column.accessor
                        ? String(
                            (row as Record<string, unknown>)[column.accessor],
                          )
                        : null}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="border-b border-slate-200 px-6 py-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="inline-flex h-10 items-center justify-center rounded-2xl bg-slate-100 px-3 text-slate-700 transition hover:bg-slate-200"
                        >
                          <Edit3 size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="inline-flex h-10 items-center justify-center rounded-2xl bg-orange-50 px-3 text-orange-600 transition hover:bg-orange-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
