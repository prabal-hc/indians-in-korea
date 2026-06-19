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
  const response = await fetch("/api/admin/communities/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create community");
  }

  return mapCommunity(await response.json());
}

export async function update(
  id: string,
  data: Partial<CommunityItem>,
): Promise<CommunityItem> {
  const response = await fetch(`/api/admin/communities/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update community");
  }

  return mapCommunity(await response.json());
}

export async function remove(id: string): Promise<boolean> {
  const response = await fetch(`/api/admin/communities/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete community");
  }

  return true;
}
