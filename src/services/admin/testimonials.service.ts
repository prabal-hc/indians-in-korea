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
  const response = await fetch("/api/admin/testimonials/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create testimonial");
  }

  return mapItem(await response.json());
}

export async function update(
  id: string,
  data: Partial<TestimonialItem>,
): Promise<TestimonialItem> {
  const response = await fetch(`/api/admin/testimonials/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update testimonial");
  }

  return mapItem(await response.json());
}

export async function remove(id: string): Promise<boolean> {
  const response = await fetch(`/api/admin/testimonials/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete testimonial");
  }

  return true;
}
