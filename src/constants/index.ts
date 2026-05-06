// API Endpoints
export const API_ENDPOINTS = {
  // Add API endpoints here
};

// External Links
export const EXTERNAL_LINKS = {
  deployVercel:
    "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
  documentation:
    "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
  templates:
    "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
  learning:
    "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app",
  exploreEvents: "/events",
  ourMission: "/mission",
};

// App Constants
export const APP_CONSTANTS = {
  maxWidth: "max-w-7xl",
  defaultPadding: "px-4 md:px-8 lg:px-16",
};

// Hero Section Constants
export const HERO_CONSTANTS = {
  badge: "KOREA'S LARGEST INDIAN NETWORK",
  headline: "Connecting Indians Across Korea",
  highlightWord: "Indians",
  description:
    "Indians in Korea (IIK) community started since 2002, is a non-profit organization with over 12,000 members which mainly includes Indians living in Korea and Koreans who are interested in India or Indian community.",
  primaryCta: {
    label: "Explore Events",
    href: EXTERNAL_LINKS.exploreEvents,
    icon: "→",
  },
  secondaryCta: {
    label: "Our Mission",
    href: EXTERNAL_LINKS.ourMission,
  },
  stats: [
    { value: "5k+", label: "Members" },
    { value: "120+", label: "Events" },
    { value: "15+", label: "Organizations" },
  ],
  floatingCards: [
    {
      id: "live-connections",
      title: "Live Connections",
      subtitle: "842 online now",
      icon: "🌐",
      position: "top-right",
    },
    {
      id: "bengali-assoc",
      title: "Bengali Association",
      subtitle: "Cultural",
      icon: "🎭",
      position: "middle-right",
    },
    {
      id: "tamil-nanbargal",
      title: "Tamil Nanbargal",
      subtitle: "Social",
      icon: "👥",
      position: "bottom-center",
    },
  ],
};
