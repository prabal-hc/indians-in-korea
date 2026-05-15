"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  note?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  note,
}: ImageUploaderProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {note ? <p className="mt-1 text-sm text-slate-500">{note}</p> : null}
        </div>
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-orange-50 text-orange-600">
          <ImagePlus size={20} />
        </div>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        {value ? (
          <div className="relative mx-auto mb-4 h-44 w-full max-w-sm overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="mx-auto mb-4 flex h-44 w-full max-w-sm items-center justify-center rounded-3xl bg-slate-50">
            <p className="text-sm text-slate-400">
              Upload an image placeholder
            </p>
          </div>
        )}
        <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          Select image
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                onChange(url);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}
