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
  const { data: created, error } = await getSupabase()
    .from("gallery")
    .insert([
      {
        title: data.title,
        caption: data.caption || null,
        tag: data.tag,
        tag_color: data.tagColor,
        year: data.year || new Date().getFullYear().toString(),
        likes: data.likes || 0,
        image_url: data.imageUrl || null,
        is_active: data.status === "Published",
        display_order: data.displayOrder || 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return mapItem(created);
}

export async function update(
  id: string,
  data: Partial<GalleryItem>,
): Promise<GalleryItem> {
  const payload: Record<string, any> = {};
  if (data.title !== undefined) payload.title = data.title;
  if (data.caption !== undefined) payload.caption = data.caption || null;
  if (data.tag !== undefined) payload.tag = data.tag;
  if (data.tagColor !== undefined) payload.tag_color = data.tagColor;
  if (data.year !== undefined) payload.year = data.year;
  if (data.likes !== undefined) payload.likes = data.likes;
  if (data.imageUrl !== undefined) payload.image_url = data.imageUrl || null;
  if (data.displayOrder !== undefined)
    payload.display_order = data.displayOrder;
  if (data.status !== undefined)
    payload.is_active = data.status === "Published";

  const { data: updated, error } = await getSupabase()
    .from("gallery")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapItem(updated);
}

export async function remove(id: string): Promise<boolean> {
  const { error } = await getSupabase().from("gallery").delete().eq("id", id);
  if (error) throw error;
  return true;
}
