"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";

// Matches the DB columns exactly:
// title, category, event_date (→ date), time, location,
// description, image_url (→ imageUrl), attendees, is_active (→ status)
export interface EventFormValues {
  title: string;
  category: string;
  date: string;
  time: string; // stored as "H:mm AM – H:mm PM" combined string
  location: string;
  description: string;
  imageUrl: string;
  attendees: string;
  status: "Published" | "Draft";
}

interface EventFormProps {
  initialData?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
  submitLabel?: string;
}

const CATEGORIES = [
  "Festival",
  "Sports",
  "Adventure",
  "Arts",
  "Networking",
  "Cultural",
  "Cuisine",
  "General",
];

/** "H:mm AM/PM" from a dayjs object */
function fmt(d: Dayjs | null): string {
  if (!d || !d.isValid()) return "";
  return d.format("h:mm A");
}

/** Parse the combined "6:00 PM – 11:30 PM" string back to start/end dayjs */
function parseTimeRange(combined: string): [Dayjs | null, Dayjs | null] {
  if (!combined) return [null, null];
  const parts = combined.split("–").map((s) => s.trim());
  const parse = (s: string) => {
    const d = dayjs(`2000-01-01 ${s}`, "YYYY-MM-DD h:mm A");
    return d.isValid() ? d : null;
  };
  return [parse(parts[0] ?? ""), parse(parts[1] ?? "")];
}

export function EventForm({
  initialData,
  onSubmit,
  submitLabel = "Save Event",
}: EventFormProps) {
  const [values, setValues] = useState<EventFormValues>(
    initialData ?? {
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
      imageUrl: "",
      attendees: "",
      status: "Published",
    },
  );

  // Local picker state (split start/end) — combined into values.time on change
  const [start, end] = parseTimeRange(values.time);
  const [timeStart, setTimeStart] = useState<Dayjs | null>(start);
  const [timeEnd, setTimeEnd] = useState<Dayjs | null>(end);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof EventFormValues, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  /** Keep picker state and combined values.time in sync */
  const handleTimeChange = (which: "start" | "end", val: Dayjs | null) => {
    const newStart = which === "start" ? val : timeStart;
    const newEnd = which === "end" ? val : timeEnd;
    if (which === "start") setTimeStart(val);
    else setTimeEnd(val);

    const startStr = fmt(newStart);
    const endStr = fmt(newEnd);
    const combined =
      startStr && endStr ? `${startStr} – ${endStr}` : startStr || endStr;
    set("time", combined);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.title.trim()) e.title = "Title is required.";
    if (!values.category.trim()) e.category = "Category is required.";
    if (!values.date.trim()) e.date = "Date is required.";
    if (!values.location.trim()) e.location = "Location is required.";
    if (
      timeStart &&
      timeEnd &&
      timeStart.isValid() &&
      timeEnd.isValid() &&
      !timeEnd.isAfter(timeStart)
    ) {
      e.timeEnd = "End time must be after start time.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const field =
    "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200";

  const timePickerSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "24px",
      backgroundColor: "#f8fafc",
      fontSize: "0.875rem",
      "& fieldset": { borderColor: "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#fb923c" },
      "&.Mui-focused fieldset": {
        borderColor: "#fb923c",
        boxShadow: "0 0 0 2px #fed7aa",
      },
    },
    "& .MuiInputLabel-root": { display: "none" },
    "& .MuiInputBase-input": { padding: "12px 16px" },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) onSubmit(values);
        }}
        className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
      >
        {/* Row 1: Title */}
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-900">
            Event title
          </span>
          <input
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            className={field}
            placeholder="IIK Diwali Dhamaka 2026"
          />
          {errors.title && (
            <p className="text-xs text-rose-600">{errors.title}</p>
          )}
        </label>

        {/* Row 2: Category + Date */}
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Category
            </span>
            <select
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
              className={field}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-rose-600">{errors.category}</p>
            )}
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-900">Date</span>
            <input
              type="date"
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              className={field}
            />
            {errors.date && (
              <p className="text-xs text-rose-600">{errors.date}</p>
            )}
          </label>
        </div>

        {/* Row 3: Start time + End time */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Start time
            </span>
            <TimePicker
              label="Start time"
              value={timeStart}
              onChange={(val) => handleTimeChange("start", val)}
              slotProps={{
                textField: { size: "small", fullWidth: true, sx: timePickerSx },
              }}
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              End time
            </span>
            <TimePicker
              label="End time"
              value={timeEnd}
              onChange={(val) => handleTimeChange("end", val)}
              slotProps={{
                textField: { size: "small", fullWidth: true, sx: timePickerSx },
              }}
            />
            {errors.timeEnd && (
              <p className="text-xs text-rose-600">{errors.timeEnd}</p>
            )}
          </div>
        </div>

        {/* Row 4: Location + Attendees */}
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Location
            </span>
            <input
              value={values.location}
              onChange={(e) => set("location", e.target.value)}
              className={field}
              placeholder="Seoul Grand Ballroom, Gangnam"
            />
            {errors.location && (
              <p className="text-xs text-rose-600">{errors.location}</p>
            )}
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-900">
              Expected attendees
            </span>
            <input
              value={values.attendees}
              onChange={(e) => set("attendees", e.target.value)}
              className={field}
              placeholder="3000"
            />
          </label>
        </div>

        {/* Description */}
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-900">
            Description
          </span>
          <textarea
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className="min-h-[120px] w-full rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="What to expect, who should attend..."
          />
        </label>

        {/* Image */}
        <ImageUploader
          label="Event image"
          value={values.imageUrl}
          onChange={(url) => set("imageUrl", url)}
          note="Landscape image works best (1200×630)."
        />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-3xl bg-orange-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </LocalizationProvider>
  );
}
