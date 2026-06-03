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

export interface CommunityItem {
  id: string;
  name: string;
  abbr: string;
  category: string;
  tag: string;
  icon: string;
  members: string;
  since: string;
  description: string;
  highlights: string[];
  websiteUrl: string;
  facebookUrl: string;
  email: string;
  contact: string;
  imageUrl: string;
  accentColor: string;
  status: string;
  isFeatured: boolean;
  displayOrder: number;
}

const mapCommunity = (item: any): CommunityItem => ({
  id: item.id,
  name: item.name,
  abbr:
    item.abbr ??
    item.name
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 4),
  category: item.category ?? "Cultural",
  tag: item.tag ?? item.category ?? "Cultural",
  icon: item.icon ?? "🎉",
  members: item.members ?? "0",
  since: item.since ?? "",
  description: item.description ?? "",
  highlights: item.highlights ?? [],
  websiteUrl: item.website_url ?? "",
  facebookUrl: item.facebook_url ?? "",
  email: item.email ?? "",
  contact: item.contact ?? "",
  imageUrl: item.image_url ?? "",
  accentColor: item.accent_color ?? "#ea580c",
  status: item.is_active ? "Published" : "Draft",
  isFeatured: item.is_featured ?? false,
  displayOrder: item.display_order ?? 0,
});

// ── Public queries ─────────────────────────────────────────────────────────────

export async function getAll(): Promise<CommunityItem[]> {
  const { data, error } = await getSupabase()
    .from("communities")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapCommunity);
}

export async function getById(id: string): Promise<CommunityItem | null> {
  const { data, error } = await getSupabase()
    .from("communities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return mapCommunity(data);
}

export async function getFeatured(limit = 4): Promise<CommunityItem[]> {
  const { data, error } = await getSupabase()
    .from("communities")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapCommunity);
}

// ── Admin mutations ────────────────────────────────────────────────────────────

export async function create(
  data: Omit<CommunityItem, "id">,
): Promise<CommunityItem> {
  const { data: created, error } = await getSupabase()
    .from("communities")
    .insert([
      {
        name: data.name,
        abbr: data.abbr,
        category: data.category,
        tag: data.tag || data.category,
        icon: data.icon || "🎉",
        members: data.members || "0",
        since: data.since || null,
        description: data.description,
        highlights: data.highlights || [],
        website_url: data.websiteUrl || null,
        facebook_url: data.facebookUrl || null,
        email: data.email || null,
        contact: data.contact || null,
        image_url: data.imageUrl || null,
        accent_color: data.accentColor || "#ea580c",
        is_active: data.status === "Published",
        is_featured: data.isFeatured || false,
        display_order: data.displayOrder || 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return mapCommunity(created);
}

export async function update(
  id: string,
  data: Partial<CommunityItem>,
): Promise<CommunityItem> {
  const payload: Record<string, any> = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.abbr !== undefined) payload.abbr = data.abbr;
  if (data.category !== undefined) payload.category = data.category;
  if (data.tag !== undefined) payload.tag = data.tag;
  if (data.icon !== undefined) payload.icon = data.icon;
  if (data.members !== undefined) payload.members = data.members;
  if (data.since !== undefined) payload.since = data.since;
  if (data.description !== undefined) payload.description = data.description;
  if (data.highlights !== undefined) payload.highlights = data.highlights;
  if (data.websiteUrl !== undefined)
    payload.website_url = data.websiteUrl || null;
  if (data.facebookUrl !== undefined)
    payload.facebook_url = data.facebookUrl || null;
  if (data.email !== undefined) payload.email = data.email || null;
  if (data.contact !== undefined) payload.contact = data.contact || null;
  if (data.imageUrl !== undefined) payload.image_url = data.imageUrl || null;
  if (data.accentColor !== undefined) payload.accent_color = data.accentColor;
  if (data.isFeatured !== undefined) payload.is_featured = data.isFeatured;
  if (data.displayOrder !== undefined)
    payload.display_order = data.displayOrder;
  if (data.status !== undefined)
    payload.is_active = data.status === "Published";

  const { data: updated, error } = await getSupabase()
    .from("communities")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapCommunity(updated);
}

export async function remove(id: string): Promise<boolean> {
  const { error } = await getSupabase()
    .from("communities")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}
