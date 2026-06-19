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
  const response = await fetch("/api/admin/about/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operation: "saveAbout",
      data: {
        headline: values.headline,
        subheadline: values.subheadline,
        description: values.description,
        mission: values.mission,
        established: values.established,
        members: values.members,
        events: values.events,
        ctaLabel: values.ctaLabel,
        ctaUrl: values.ctaUrl,
        heroImage: values.heroImage,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to save about content");
  }
}

// ─── Board members ────────────────────────────────────────────────────────────
// Strategy:
//   • Members with a real UUID id  → upsert (update existing row)
//   • Members with a temp _key id  → insert as new rows
//   • Rows in DB whose id is NOT in the submitted list → delete by id
export async function saveBoardMembers(members: BoardMember[]): Promise<void> {
  const response = await fetch("/api/admin/about/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operation: "saveBoardMembers",
      data: members,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to save board members");
  }
}

export async function addBoardMembers(
  members: Omit<BoardMember, "id">[],
): Promise<void> {
  const response = await fetch("/api/admin/about/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operation: "addBoardMembers",
      data: members,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add board members");
  }
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
// Same strategy as board members above.
export async function saveContacts(contacts: ContactItem[]): Promise<void> {
  const response = await fetch("/api/admin/about/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operation: "saveContacts",
      data: contacts,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to save contacts");
  }
}
