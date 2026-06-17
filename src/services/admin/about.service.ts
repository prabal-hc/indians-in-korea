import { createSupabaseClient } from "@/lib/supabase/client";

export const VISION_ITEMS: VisionItem[] = [
  {
    id: "1",
    content:
      "Help Indians make life easy in Korea by providing useful information in one place.",
  },
  {
    id: "2",
    content:
      "Strive to create a positive image for India through transformational thinking and creative contribution.",
  },
  {
    id: "3",
    content:
      "Recognize achievements of the Indian community and their impact on Korean society and economy.",
  },
  {
    id: "4",
    content:
      "Provide an outlet for spreading group & personal creative expressions and experiences.",
  },
  {
    id: "5",
    content:
      "Promote ideas to create a sense of mutual openness and trust between Koreans and Indians.",
  },
  {
    id: "6",
    content:
      "Create a platform for NRI awareness by sharing how Indians in other countries are organizing to help transform India.",
  },
  {
    id: "7",
    content:
      "Raise common social, professional, and other issues of IIK members and help solve them as one community voice.",
  },
  {
    id: "8",
    content: "Provide a transformational platform to members.",
  },
];

export type BoardMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  profession?: string | null;
  koreanTitle?: string | null; // ← new
  type: "board" | "advisor" | "core";
  imageUrl?: string | null;
  displayOrder?: number;
  isActive?: boolean;
};

export type ContactItem = {
  id: string;
  label: string;
  value: string;
  type: "info" | "social";
  emoji?: string | null;
  href?: string | null;
  bgClass?: string;
  displayOrder?: number;
  isActive?: boolean;
};

export type AboutContent = {
  headline: string;
  subheadline?: string;
  description?: string;
  mission?: string;
  established?: string;
  members?: string;
  events?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  heroImage?: string;
};

export type VisionItem = { id: string; content: string };

export type AboutPageData = {
  content: AboutContent | null;
  vision: VisionItem[];
  board: BoardMember[];
  advisors: BoardMember[];
  core: BoardMember[];
  contacts: ContactItem[];
  socials: ContactItem[];
};

const getSupabase = () => {
  const supabase = createSupabaseClient();
  if (!supabase) {
    throw new Error(
      "Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return supabase;
};

const toInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

const mapContent = (row: any): AboutContent => ({
  headline: row.headline ?? "",
  subheadline: row.subheadline ?? "",
  description: row.description ?? "",
  mission: row.mission ?? "",
  established: row.established ?? "",
  members: row.members ?? "",
  events: row.events ?? "",
  ctaLabel: row.cta_label ?? "",
  ctaUrl: row.cta_url ?? "",
  heroImage: row.hero_image ?? "",
});

const mapVision = (row: any): VisionItem => ({
  id: row.id,
  content: row.content ?? "",
});

const mapBoard = (row: any): BoardMember => ({
  id: row.id,
  name: row.name,
  initials: row.initials ?? toInitials(row.name),
  role: row.role,
  profession: row.profession ?? null,
  koreanTitle: row.korean_title ?? null, // ← new
  type: row.type,
  imageUrl: row.image_url ?? null,
  displayOrder: row.display_order ?? 0,
  isActive: row.is_active ?? true,
});

const mapContact = (row: any): ContactItem => ({
  id: row.id,
  label: row.label,
  value: row.value,
  type: row.type === "social" ? "social" : "info",
  emoji: row.emoji ?? null,
  href: row.href ?? null,
  bgClass: row.bg_class ?? "bg-orange-50 border-orange-200",
  displayOrder: row.display_order ?? 0,
  isActive: row.is_active ?? true,
});

export async function getAboutPageData(): Promise<AboutPageData> {
  const db = getSupabase();

  const [contentRes, boardRes, contactsRes] = await Promise.all([
    db.from("about_content").select("*").limit(1).maybeSingle(),
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
    vision: VISION_ITEMS,
    board: allBoard.filter((member) => member.type === "board"),
    advisors: allBoard.filter((member) => member.type === "advisor"),
    core: allBoard.filter((member) => member.type === "core"),
    contacts: allContacts.filter((contact) => contact.type === "info"),
    socials: allContacts.filter((contact) => contact.type === "social"),
  };
}

export async function saveAbout(values: AboutContent): Promise<void> {
  const db = getSupabase();
  const { data: existing, error: existingError } = await db
    .from("about_content")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (existingError) throw existingError;

  const payload = {
    headline: values.headline,
    subheadline: values.subheadline ?? null,
    description: values.description ?? null,
    mission: values.mission ?? null,
    established: values.established ?? null,
    members: values.members ?? null,
    events: values.events ?? null,
    cta_label: values.ctaLabel ?? null,
    cta_url: values.ctaUrl ?? null,
    hero_image: values.heroImage ?? null,
    updated_at: new Date().toISOString(),
  };

  if (existing?.id) {
    const { error } = await db
      .from("about_content")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await db.from("about_content").insert([payload]);
    if (error) throw error;
  }
}

// ─── Board members ────────────────────────────────────────────────────────────
// Strategy:
//   • Members with a real UUID id  → upsert (update existing row)
//   • Members with a temp _key id  → insert as new rows
//   • Rows in DB whose id is NOT in the submitted list → delete by id
export async function saveBoardMembers(members: BoardMember[]): Promise<void> {
  const db = getSupabase();

  // Fetch all current IDs so we know what to delete
  const { data: existing, error: fetchErr } = await db
    .from("about_board")
    .select("id");
  if (fetchErr) throw fetchErr;

  const existingIds = new Set((existing ?? []).map((r: any) => r.id));

  // Partition into persisted (have a real DB id) vs brand-new
  const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const persisted = members.filter((m) => UUID_RE.test(m.id));
  const brandNew = members.filter((m) => !UUID_RE.test(m.id));

  // IDs to delete = rows in DB that are no longer in the submitted list
  const keptIds = new Set(persisted.map((m) => m.id));
  const toDelete = [...existingIds].filter((id) => !keptIds.has(id));

  // 1️⃣ Delete removed rows (each with a real WHERE clause)
  if (toDelete.length > 0) {
    const { error } = await db.from("about_board").delete().in("id", toDelete); // ✅ WHERE id IN (...)
    if (error) throw error;
  }

  // 2️⃣ Upsert rows that already exist in the DB
  if (persisted.length > 0) {
    const rows = persisted.map((m, i) => ({
      id: m.id,
      name: m.name,
      initials: m.initials || toInitials(m.name),
      role: m.role,
      profession: m.profession ?? null,
      korean_title: m.koreanTitle ?? null, // ← new
      type: m.type,
      image_url: m.imageUrl ?? null,
      display_order: m.displayOrder ?? i,
      is_active: m.isActive ?? true,
    }));

    const { error } = await db
      .from("about_board")
      .upsert(rows, { onConflict: "id" });
    if (error) throw error;
  }

  // 3️⃣ Insert truly new members (no id yet)
  if (brandNew.length > 0) {
    const rows = brandNew.map((m, i) => ({
      name: m.name,
      initials: m.initials || toInitials(m.name),
      role: m.role,
      profession: m.profession ?? null,
      korean_title: m.koreanTitle ?? null, // ← new
      type: m.type,
      image_url: m.imageUrl ?? null,
      display_order: m.displayOrder ?? persisted.length + i,
      is_active: m.isActive ?? true,
    }));

    const { error } = await db.from("about_board").insert(rows);
    if (error) throw error;
  }
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
// Same strategy as board members above.
export async function saveContacts(contacts: ContactItem[]): Promise<void> {
  const db = getSupabase();

  const { data: existing, error: fetchErr } = await db
    .from("about_contacts")
    .select("id");
  if (fetchErr) throw fetchErr;

  const existingIds = new Set((existing ?? []).map((r: any) => r.id));

  const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const persisted = contacts.filter((c) => UUID_RE.test(c.id));
  const brandNew = contacts.filter((c) => !UUID_RE.test(c.id));

  const keptIds = new Set(persisted.map((c) => c.id));
  const toDelete = [...existingIds].filter((id) => !keptIds.has(id));

  // 1️⃣ Delete removed contacts
  if (toDelete.length > 0) {
    const { error } = await db
      .from("about_contacts")
      .delete()
      .in("id", toDelete); // ✅ WHERE id IN (...)
    if (error) throw error;
  }

  // 2️⃣ Upsert existing contacts
  if (persisted.length > 0) {
    const rows = persisted.map((c, i) => ({
      id: c.id,
      label: c.label,
      value: c.value,
      type: c.type,
      emoji: c.emoji ?? null,
      href: c.href ?? null,
      bg_class: c.bgClass ?? "bg-orange-50 border-orange-200",
      display_order: c.displayOrder ?? i,
      is_active: c.isActive ?? true,
    }));
    const { error } = await db
      .from("about_contacts")
      .upsert(rows, { onConflict: "id" });
    if (error) throw error;
  }

  // 3️⃣ Insert new contacts
  if (brandNew.length > 0) {
    const rows = brandNew.map((c, i) => ({
      label: c.label,
      value: c.value,
      type: c.type,
      emoji: c.emoji ?? null,
      href: c.href ?? null,
      bg_class: c.bgClass ?? "bg-orange-50 border-orange-200",
      display_order: c.displayOrder ?? persisted.length + i,
      is_active: c.isActive ?? true,
    }));
    const { error } = await db.from("about_contacts").insert(rows);
    if (error) throw error;
  }
}
