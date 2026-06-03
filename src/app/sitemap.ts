import { MetadataRoute } from "next";

const SITE_URL = "https://indiansinkorea.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/community`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/magazines`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
    },
  ];
}
