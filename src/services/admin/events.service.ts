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

// Matches exactly the columns in the `events` table:
// id, title, category, event_date, time, location, description,
// image_url, attendees, is_active, created_at, updated_at
export interface EventItem {
  id: string;
  title: string;
  category: string;
  status: string; // derived from is_active
  date: string; // maps to event_date
  time?: string; // free-text, e.g. "6:00 PM – 11:30 PM"
  location: string;
  description: string;
  imageUrl?: string; // maps to image_url
  attendees?: string;
}

const mapEvent = (item: any): EventItem => ({
  id: item.id,
  title: item.title,
  category: item.category ?? "General",
  status: item.is_active ? "Published" : "Draft",
  date: item.event_date,
  time: item.time ?? "",
  location: item.location,
  description: item.description ?? "",
  imageUrl: item.image_url || null,
  attendees: item.attendees ?? "0",
});

// ── Public queries ─────────────────────────────────────────────────────────────

export async function getAll(): Promise<EventItem[]> {
  const { data, error } = await getSupabase()
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapEvent);
}

export async function getFeatured(): Promise<EventItem | null> {
  // No is_featured column — return the next upcoming active event instead
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await getSupabase()
    .from("events")
    .select("*")
    .eq("is_active", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }
  return data ? mapEvent(data) : null;
}

export async function getUpcoming(limit = 6): Promise<EventItem[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await getSupabase()
    .from("events")
    .select("*")
    .eq("is_active", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapEvent);
}

export async function getById(id: string): Promise<EventItem | null> {
  const { data, error } = await getSupabase()
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return mapEvent(data);
}

// ── Admin mutations ────────────────────────────────────────────────────────────

export async function create(
  data: Omit<EventItem, "id"> & { isActive?: boolean },
): Promise<EventItem> {
  const response = await fetch("/api/admin/events/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create event");
  }

  return mapEvent(await response.json());
}

export async function update(
  id: string,
  data: Partial<EventItem> & { isActive?: boolean },
): Promise<EventItem> {
  const response = await fetch(`/api/admin/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update event");
  }

  return mapEvent(await response.json());
}

export async function remove(id: string): Promise<boolean> {
  const response = await fetch(`/api/admin/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete event");
  }

  return true;
}
