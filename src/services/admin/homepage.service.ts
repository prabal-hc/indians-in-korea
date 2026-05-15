const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface HomepageContent {
  id: string;
  headline: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  backgroundImage: string;
}

const mockHomepage: HomepageContent = {
  id: "home-1",
  headline: "Connecting Indians across Korea with culture and community.",
  highlight: "Live events, expert support, and meaningful connections.",
  description:
    "Manage the hero experience, homepage highlights, and curated calls to action for a premium community presence.",
  ctaLabel: "Explore events",
  ctaUrl: "/events",
  backgroundImage: "/images/hero-admin.jpg",
};

export async function getAll() {
  await delay(240);
  return [mockHomepage];
}

export async function getById(id: string) {
  await delay(180);
  return mockHomepage.id === id ? mockHomepage : null;
}

export async function create(data: Omit<HomepageContent, "id">) {
  await delay(280);
  return { id: `home-${Date.now()}`, ...data };
}

export async function update(id: string, data: Partial<HomepageContent>) {
  await delay(260);
  return { id, ...data } as HomepageContent;
}

export async function remove(id: string) {
  await delay(220);
  return Boolean(id);
}
