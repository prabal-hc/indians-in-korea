import { createSupabaseClient } from "@/lib/supabase/client";

const getSupabase = () => createSupabaseClient();

export interface SponsorItem {
  id: string;
  name: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
}

const mapSponsor = (item: any): SponsorItem => ({
  id: item.id,
  name: item.name,
  logoUrl: item.logo_url ?? null,
  websiteUrl: item.website_url ?? null,
  displayOrder: item.display_order ?? 0,
  isActive: item.is_active ?? true,
});

// ── Public queries ─────────────────────────────────────────────────────────────

export async function getAll(): Promise<SponsorItem[]> {
  const { data, error } = await getSupabase()
    .from("sponsors")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Sponsors getAll Supabase error:", error);
    return [];
  }
  return (data ?? []).map(mapSponsor);
}

export async function getActive(): Promise<SponsorItem[]> {
  const { data, error } = await getSupabase()
    .from("sponsors")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Sponsors getActive Supabase error:", error);
    return [];
  }
  return (data ?? []).map(mapSponsor);
}

export async function getById(id: string): Promise<SponsorItem | null> {
  const { data, error } = await getSupabase()
    .from("sponsors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Sponsors getById Supabase error:", error);
    return null;
  }
  return mapSponsor(data);
}

// ── Admin mutations ────────────────────────────────────────────────────────────

export async function create(
  data: Omit<SponsorItem, "id">,
): Promise<SponsorItem> {
  const response = await fetch("/api/admin/sponsors/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create sponsor");
  }

  return mapSponsor(await response.json());
}

export async function update(
  id: string,
  data: Partial<SponsorItem>,
): Promise<SponsorItem> {
  const response = await fetch(`/api/admin/sponsors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update sponsor");
  }

  return mapSponsor(await response.json());
}

export async function remove(id: string): Promise<boolean> {
  const response = await fetch(`/api/admin/sponsors/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete sponsor");
  }

  return true;
}
