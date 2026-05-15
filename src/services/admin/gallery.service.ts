const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  status: string;
  imageUrl: string;
  caption: string;
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "K-Pop Dance Night",
    category: "Events",
    status: "Published",
    imageUrl: "/images/gallery-1.jpg",
    caption: "Community members dancing together in Seoul.",
  },
  {
    id: "gal-2",
    title: "Campus Study Group",
    category: "Student Life",
    status: "Draft",
    imageUrl: "/images/gallery-2.jpg",
    caption: "Study sessions and evening group presentations.",
  },
];

export async function getAll() {
  await delay(250);
  return [...mockGalleryItems];
}

export async function getById(id: string) {
  await delay(180);
  return mockGalleryItems.find((item) => item.id === id) ?? null;
}

export async function create(data: Omit<GalleryItem, "id">) {
  await delay(280);
  return { id: `gal-${Date.now()}`, ...data };
}

export async function update(id: string, data: Partial<GalleryItem>) {
  await delay(260);
  return { id, ...data } as GalleryItem;
}

export async function remove(id: string) {
  await delay(220);
  return Boolean(id);
}
