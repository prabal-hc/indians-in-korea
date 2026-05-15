const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface SportItem {
  id: string;
  title: string;
  type: string;
  status: string;
  date: string;
  venue: string;
  description: string;
}

const mockSports: SportItem[] = [
  {
    id: "spr-1",
    title: "Cricket Practice Session",
    type: "Cricket",
    status: "Published",
    date: "2026-06-21",
    venue: "Yongsan Stadium",
    description: "Weekly skills and training for the community team.",
  },
  {
    id: "spr-2",
    title: "Badminton Club Meet",
    type: "Badminton",
    status: "Draft",
    date: "2026-07-10",
    venue: "Gangnam Gym",
    description: "Friendly doubles matches and coaching workshop.",
  },
];

export async function getAll() {
  await delay(250);
  return [...mockSports];
}

export async function getById(id: string) {
  await delay(180);
  return mockSports.find((item) => item.id === id) ?? null;
}

export async function create(data: Omit<SportItem, "id">) {
  await delay(280);
  return { id: `spr-${Date.now()}`, ...data };
}

export async function update(id: string, data: Partial<SportItem>) {
  await delay(260);
  return { id, ...data } as SportItem;
}

export async function remove(id: string) {
  await delay(220);
  return Boolean(id);
}
