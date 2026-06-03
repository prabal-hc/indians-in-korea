import { createSupabaseClient } from "@/lib/supabase/client";

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

const supabase = createSupabaseClient();

export async function getAll() {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data: created, error } = await supabase
    .from("announcements")
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return created;
}

export async function update(id: string, data: Partial<AnnouncementItem>) {
  const { data: updated, error } = await supabase
    .from("announcements")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return updated;
}

export async function remove(id: string) {
  const { error } = await supabase.from("announcements").delete().eq("id", id);

  if (error) throw error;

  return true;
}
