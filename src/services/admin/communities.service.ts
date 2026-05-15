const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CommunityItem {
  id: string;
  name: string;
  category: string;
  status: string;
  members: number;
  contact: string;
  description: string;
}

const mockCommunities: CommunityItem[] = [
  {
    id: "com-1",
    name: "Indian Students Circle",
    category: "Student",
    status: "Published",
    members: 142,
    contact: "students@iik.org",
    description:
      "A safe hub for Indian students to connect and plan study sessions.",
  },
  {
    id: "com-2",
    name: "Business & Startup Group",
    category: "Entrepreneurship",
    status: "Draft",
    members: 68,
    contact: "business@iik.org",
    description:
      "Networking for founders, professionals, and investors in Korea.",
  },
];

export async function getAll() {
  await delay(250);
  return [...mockCommunities];
}

export async function getById(id: string) {
  await delay(180);
  return mockCommunities.find((item) => item.id === id) ?? null;
}

export async function create(data: Omit<CommunityItem, "id">) {
  await delay(280);
  return { id: `com-${Date.now()}`, ...data };
}

export async function update(id: string, data: Partial<CommunityItem>) {
  await delay(260);
  return { id, ...data } as CommunityItem;
}

export async function remove(id: string) {
  await delay(220);
  return Boolean(id);
}
