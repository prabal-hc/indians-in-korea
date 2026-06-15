"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  note?: string;
  bucket?: string;
  folder?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  note,
  bucket = "iik-images", // 👈 replace with your actual bucket name
  folder = "uploads",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const supabase = createSupabaseClient();
      if (!supabase) throw new Error("Supabase not configured");

      const ext = file.name.split(".").pop();
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filename, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filename);

      onChange(data.publicUrl); // ✅ real Supabase URL
    } catch (err: any) {
      setError(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const isValidUrl = value && !value.startsWith("blob:");

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {note && <p className="mt-1 text-sm text-slate-500">{note}</p>}
        </div>
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-orange-50 text-orange-600">
          <ImagePlus size={20} />
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        {isValidUrl ? (
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
            {uploading ? (
              <p className="text-sm text-orange-500 font-medium animate-pulse">
                Uploading…
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                Upload an image placeholder
              </p>
            )}
          </div>
        )}

        {error && <p className="mb-3 text-xs text-rose-600">{error}</p>}

        <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          {uploading
            ? "Uploading…"
            : isValidUrl
              ? "Replace image"
              : "Select image"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}
