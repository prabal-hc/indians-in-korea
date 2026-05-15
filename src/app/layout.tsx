import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import RootLayoutShell from "@/components/RootLayoutShell";
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
  title: "Indians in Korea",
  description: "Connecting Indians across Korea",
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
      <body>
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}
