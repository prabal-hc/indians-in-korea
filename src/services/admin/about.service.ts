import { createSupabaseClient } from "@/lib/supabase/client";

const getSupabase = () => {
  const supabase = createSupabaseClient();
  if (!supabase) throw new Error("Supabase client is not configured.");
  return supabase;
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AboutContent {
  id: string;
  headline: string;
  subheadline: string;
  description: string;
  mission: string;
  established: string;
  members: string;
  events: string;
  ctaLabel: string;
  ctaUrl: string;
  heroImage: string;
}

export interface VisionItem {
  id: string;
  content: string;
  displayOrder: number;
  isActive: boolean;
}

export interface BoardMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  profession: string;
  type: "board" | "advisor" | "core";
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  type: "info" | "social";
  emoji: string;
  href: string;
  bgClass: string;
  displayOrder: number;
  isActive: boolean;
}

// Aggregated type returned by the single fetch
export interface AboutPageData {
  content: AboutContent | null;
  vision: VisionItem[];
  board: BoardMember[];
  advisors: BoardMember[];
  core: BoardMember[];
  contacts: ContactItem[];
  socials: ContactItem[];
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

const mapContent = (r: any): AboutContent => ({
  id: r.id,
  headline: r.headline ?? "",
  subheadline: r.subheadline ?? "",
  description: r.description ?? "",
  mission: r.mission ?? "",
  established: r.established ?? "",
  members: r.members ?? "",
  events: r.events ?? "",
  ctaLabel: r.cta_label ?? "",
  ctaUrl: r.cta_url ?? "",
  heroImage: r.hero_image ?? "",
});

const mapVision = (r: any): VisionItem => ({
  id: r.id,
  content: r.content,
  displayOrder: r.display_order ?? 0,
  isActive: r.is_active ?? true,
});

const mapBoard = (r: any): BoardMember => ({
  id: r.id,
  name: r.name,
  initials:
    r.initials ??
    r.name
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  role: r.role,
  profession: r.profession ?? "",
  type: r.type ?? "board",
  imageUrl: r.image_url ?? "",
  displayOrder: r.display_order ?? 0,
  isActive: r.is_active ?? true,
});

const mapContact = (r: any): ContactItem => ({
  id: r.id,
  label: r.label,
  value: r.value,
  type: r.type ?? "info",
  emoji: r.emoji ?? "",
  href: r.href ?? "",
  bgClass: r.bg_class ?? "bg-orange-50 border-orange-200",
  displayOrder: r.display_order ?? 0,
  isActive: r.is_active ?? true,
});

// ─── Single aggregated fetch (ONE round-trip via Promise.all) ─────────────────

export async function getAboutPageData(): Promise<AboutPageData> {
  const db = getSupabase();

  const [contentRes, visionRes, boardRes, contactsRes] = await Promise.all([
    db.from("about_content").select("*").limit(1).maybeSingle(),
    db
      .from("about_vision")
      .select("*")
      .eq("is_active", true)
      .order("display_order"),
    db
      .from("about_board")
      .select("*")
      .eq("is_active", true)
      .order("display_order"),
    db
      .from("about_contacts")
      .select("*")
      .eq("is_active", true)
      .order("display_order"),
  ]);

  const allBoard = (boardRes.data ?? []).map(mapBoard);
  const allContacts = (contactsRes.data ?? []).map(mapContact);

  return {
    content: contentRes.data ? mapContent(contentRes.data) : null,
    vision: (visionRes.data ?? []).map(mapVision),
    board: allBoard.filter((m) => m.type === "board"),
    advisors: allBoard.filter((m) => m.type === "advisor"),
    core: allBoard.filter((m) => m.type === "core"),
    contacts: allContacts.filter((c) => c.type === "info"),
    socials: allContacts.filter((c) => c.type === "social"),
  };
}

// ─── Legacy single-table getters (used by admin pages) ───────────────────────

export async function getContent(): Promise<AboutContent | null> {
  const { data, error } = await getSupabase()
    .from("about_content")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return data ? mapContent(data) : null;
}

export async function getById(_id: string): Promise<AboutContent | null> {
  return getContent();
}

export async function getVision(): Promise<VisionItem[]> {
  const { data, error } = await getSupabase()
    .from("about_vision")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(mapVision);
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function upsertContent(
  values: Omit<AboutContent, "id">,
): Promise<AboutContent | null> {
  const db = getSupabase();
  const existing = await getContent();

  const payload = {
    headline: values.headline,
    subheadline: values.subheadline,
    description: values.description,
    mission: values.mission,
    established: values.established,
    members: values.members,
    events: values.events,
    cta_label: values.ctaLabel,
    cta_url: values.ctaUrl,
    hero_image: values.heroImage || null,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { data, error } = await db
      .from("about_content")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw error;
    return mapContent(data);
  }

  const { data, error } = await db
    .from("about_content")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return mapContent(data);
}

export async function upsertVisionItems(items: string[]): Promise<void> {
  const db = getSupabase();
  const rows = items
    .filter((c) => c.trim())
    .map((content, i) => ({ content, display_order: i + 1, is_active: true }));

  // Delete all then re-insert — safe for a small ordered list
  await db
    .from("about_vision")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (rows.length === 0) return;
  const { error } = await db.from("about_vision").insert(rows);
  if (error) throw error;
}

// Save both content + vision in one admin call
export async function saveAbout(
  values: Omit<AboutContent, "id"> & { visionItems: string[] },
): Promise<void> {
  await Promise.all([
    upsertContent(values),
    upsertVisionItems(values.visionItems),
  ]);
}

// Legacy aliases
export const update = (_id: string, values: Partial<AboutContent>) =>
  upsertContent(values as Omit<AboutContent, "id">);
export const create = (values: Omit<AboutContent, "id">) =>
  upsertContent(values);

// ─── Board mutations (used if admin board UI is added later) ──────────────────

export async function createBoardMember(
  data: Omit<BoardMember, "id">,
): Promise<BoardMember> {
  const { data: created, error } = await getSupabase()
    .from("about_board")
    .insert([
      {
        name: data.name,
        initials: data.initials,
        role: data.role,
        profession: data.profession || null,
        type: data.type,
        image_url: data.imageUrl || null,
        display_order: data.displayOrder ?? 0,
        is_active: data.isActive ?? true,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return mapBoard(created);
}

export async function updateBoardMember(
  id: string,
  data: Partial<BoardMember>,
): Promise<BoardMember> {
  const payload: Record<string, any> = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.initials !== undefined) payload.initials = data.initials;
  if (data.role !== undefined) payload.role = data.role;
  if (data.profession !== undefined) payload.profession = data.profession;
  if (data.type !== undefined) payload.type = data.type;
  if (data.imageUrl !== undefined) payload.image_url = data.imageUrl || null;
  if (data.displayOrder !== undefined)
    payload.display_order = data.displayOrder;
  if (data.isActive !== undefined) payload.is_active = data.isActive;

  const { data: updated, error } = await getSupabase()
    .from("about_board")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapBoard(updated);
}

export async function removeBoardMember(id: string): Promise<boolean> {
  const { error } = await getSupabase()
    .from("about_board")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}
