const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface AnnouncementItem {
  id: string;
  title: string;
  category: string;
  status: string;
  publishedAt: string;
  content: string;
}

const mockAnnouncements: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Community Health Camp",
    category: "Health",
    status: "Published",
    publishedAt: "2026-05-05",
    content: "Free consultations and wellness sessions for IIK members.",
  },
  {
    id: "ann-2",
    title: "Festival Volunteer Call",
    category: "Volunteer",
    status: "Draft",
    publishedAt: "2026-05-28",
    content: "Join the cultural festival team as an event volunteer.",
  },
];

export async function getAll() {
  await delay(250);
  return [...mockAnnouncements];
}

export async function getById(id: string) {
  await delay(180);
  return mockAnnouncements.find((item) => item.id === id) ?? null;
}

export async function create(data: Omit<AnnouncementItem, "id">) {
  await delay(280);
  return { id: `ann-${Date.now()}`, ...data };
}

export async function update(id: string, data: Partial<AnnouncementItem>) {
  await delay(260);
  return { id, ...data } as AnnouncementItem;
}

export async function remove(id: string) {
  await delay(220);
  return Boolean(id);
}
