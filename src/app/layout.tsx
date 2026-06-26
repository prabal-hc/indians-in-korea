import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import RootLayoutShell from "@/components/RootLayoutShell";
import RouteTransition from "@/components/RouteTransition";
import { SmoothScrollProvider } from "@/components/organisms/home/Smoothscrollprovider";
import NavbarGate from "@/components/organisms/NavbarGate";
import SupabaseAuthProvider from "@/components/SupabaseAuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://indiansinkorea.com"),
  title: {
    default: "Indians in Korea",
    template: "%s | Indians in Korea",
  },
  description:
    "Connecting Indians in Korea through community events, news, resources, and cultural support.",
  keywords: [
    "Indians in Korea",
    "Indian community Korea",
    "Korean events",
    "Indian cultural events",
    "community networking",
  ],
  openGraph: {
    title: "Indians in Korea",
    description:
      "Connecting Indians in Korea through community events, news, resources, and cultural support.",
    url: "https://indiansinkorea.com",
    siteName: "Indians in Korea",
    type: "website",
    images: [
      {
        url: "/images/iik.png",
        width: 1200,
        height: 630,
        alt: "Indians in Korea community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indians in Korea",
    description:
      "Connecting Indians in Korea through community events, news, resources, and cultural support.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        style={{ overscrollBehavior: "none", margin: 0 }}
        suppressHydrationWarning
      >
        {/*
          Navbar is position:fixed so it lives OUTSIDE the smoother.
          It floats above everything via z-50 regardless of the scroll wrapper.
        */}
        <NavbarGate />

        <SupabaseAuthProvider>
          <SmoothScrollProvider>
            <RouteTransition>
              {/*
                RootLayoutShell should no longer render the Navbar internally.
                It should only wrap page content (footer, etc.).
              */}
              <RootLayoutShell>{children}</RootLayoutShell>
            </RouteTransition>
          </SmoothScrollProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
