const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface EventItem {
  id: string;
  title: string;
  category: string;
  status: string;
  date: string;
  location: string;
  description: string;
}

const mockEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "Summer Cultural Exchange",
    category: "Culture",
    status: "Published",
    date: "2026-06-12",
    location: "Seoul Central Hall",
    description: "A celebration of community, language, and Korean heritage.",
  },
  {
    id: "evt-2",
    title: "Career Networking Evening",
    category: "Networking",
    status: "Draft",
    date: "2026-07-02",
    location: "Busan Workspace",
    description: "Meet professionals across technology and business services.",
  },
];

export async function getAll() {
  await delay(250);
  return [...mockEvents];
}

export async function getById(id: string) {
  await delay(180);
  return mockEvents.find((item) => item.id === id) ?? null;
}

export async function create(data: Omit<EventItem, "id">) {
  await delay(280);
  return { id: `evt-${Date.now()}`, ...data };
}

export async function update(id: string, data: Partial<EventItem>) {
  await delay(260);
  return { id, ...data } as EventItem;
}

export async function remove(id: string) {
  await delay(220);
  return Boolean(id);
}
