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

export interface AnnouncementItem {
  id: string;
  title: string;
  description: string;
  display_order: number;
  category?: string;
  content?: string;
  publishedAt?: string;
  status?: string;
}

export async function getAll() {
  const { data, error } = await getSupabase()
    .from("announcements")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function getById(id: string) {
  const { data, error } = await getSupabase()
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function create(data: Omit<AnnouncementItem, "id">) {
  const response = await fetch("/api/admin/announcements/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create announcement");
  }

  return await response.json();
}

export async function update(id: string, data: Partial<AnnouncementItem>) {
  const response = await fetch(`/api/admin/announcements/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update announcement");
  }

  return await response.json();
}

export async function remove(id: string) {
  const response = await fetch(`/api/admin/announcements/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete announcement");
  }

  return true;
}
