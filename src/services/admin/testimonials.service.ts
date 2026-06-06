import { createSupabaseClient } from "@/lib/supabase/client";

export interface TestimonialItem {
  id: string;
  name: string;
  initials: string;
  role: string;
  location: string;
  color: "saffron" | "green";
  quote: string;
  rating: number;
  status: string;
  isVerified: boolean;
  displayOrder: number;
}

const getSupabase = () => {
  const supabase = createSupabaseClient();
  if (!supabase) {
    throw new Error(
      "Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
};

// Auto-generate initials from name if not provided
const toInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const mapItem = (item: any): TestimonialItem => ({
  id: item.id,
  name: item.name,
  initials: item.initials ?? toInitials(item.name),
  role: item.role,
  location: item.location,
  color: (item.color === "green" ? "green" : "saffron") as "saffron" | "green",
  quote: item.quote,
  rating: item.rating ?? 5,
  status: item.is_active ? "Published" : "Draft",
  isVerified: item.is_verified ?? true,
  displayOrder: item.display_order ?? 0,
});

// ── Public ─────────────────────────────────────────────────────────────────────

export async function getAll(): Promise<TestimonialItem[]> {
  const { data, error } = await getSupabase()
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapItem);
}

export async function getById(id: string): Promise<TestimonialItem | null> {
  const { data, error } = await getSupabase()
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return mapItem(data);
}

// ── Admin (authenticated) ──────────────────────────────────────────────────────

export async function getAllAdmin(): Promise<TestimonialItem[]> {
  const { data, error } = await getSupabase()
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapItem);
}

export async function create(
  data: Omit<TestimonialItem, "id">,
): Promise<TestimonialItem> {
  const { data: created, error } = await getSupabase()
    .from("testimonials")
    .insert([
      {
        name: data.name,
        initials: data.initials || toInitials(data.name),
        role: data.role,
        location: data.location,
        color: data.color,
        quote: data.quote,
        rating: data.rating ?? 5,
        is_active: data.status === "Published",
        is_verified: data.isVerified ?? true,
        display_order: data.displayOrder ?? 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return mapItem(created);
}

export async function update(
  id: string,
  data: Partial<TestimonialItem>,
): Promise<TestimonialItem> {
  const payload: Record<string, any> = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.initials !== undefined)
    payload.initials = data.initials || toInitials(data.name ?? "");
  if (data.role !== undefined) payload.role = data.role;
  if (data.location !== undefined) payload.location = data.location;
  if (data.color !== undefined) payload.color = data.color;
  if (data.quote !== undefined) payload.quote = data.quote;
  if (data.rating !== undefined) payload.rating = data.rating;
  if (data.isVerified !== undefined) payload.is_verified = data.isVerified;
  if (data.displayOrder !== undefined)
    payload.display_order = data.displayOrder;
  if (data.status !== undefined)
    payload.is_active = data.status === "Published";

  const { data: updated, error } = await getSupabase()
    .from("testimonials")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapItem(updated);
}

export async function remove(id: string): Promise<boolean> {
  const { error } = await getSupabase()
    .from("testimonials")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}
