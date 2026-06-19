import { createSupabaseClient } from "@/lib/supabase/client";

const getSupabase = () => {
  const supabase = createSupabaseClient();
  if (!supabase) {
    throw new Error(
      "Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
};

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  tag: string;
  tagColor: "saffron" | "green";
  year: string;
  likes: number;
  imageUrl: string;
  status: string;
  displayOrder: number;
}

const mapItem = (item: any): GalleryItem => ({
  id: item.id,
  title: item.title,
  caption: item.caption ?? "",
  tag: item.tag ?? "Culture",
  tagColor: (item.tag_color === "green" ? "green" : "saffron") as
    | "saffron"
    | "green",
  year: item.year ?? new Date().getFullYear().toString(),
  likes: item.likes ?? 0,
  imageUrl: item.image_url ?? "",
  status: item.is_active ? "Published" : "Draft",
  displayOrder: item.display_order ?? 0,
});

// ── Public queries ─────────────────────────────────────────────────────────────

export async function getAll(): Promise<GalleryItem[]> {
  const { data, error } = await getSupabase()
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapItem);
}

export async function getPreview(limit = 3): Promise<GalleryItem[]> {
  const { data, error } = await getSupabase()
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapItem);
}

export async function getById(id: string): Promise<GalleryItem | null> {
  const { data, error } = await getSupabase()
    .from("gallery")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return mapItem(data);
}

// ── Admin mutations ────────────────────────────────────────────────────────────

export async function create(
  data: Omit<GalleryItem, "id">,
): Promise<GalleryItem> {
  const response = await fetch("/api/admin/gallery/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create gallery item");
  }

  return mapItem(await response.json());
}

export async function update(
  id: string,
  data: Partial<GalleryItem>,
): Promise<GalleryItem> {
  const response = await fetch(`/api/admin/gallery/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update gallery item");
  }

  return mapItem(await response.json());
}

export async function remove(id: string): Promise<boolean> {
  const response = await fetch(`/api/admin/gallery/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete gallery item");
  }

  return true;
}
