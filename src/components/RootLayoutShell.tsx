"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/Navbar";

interface RootLayoutShellProps {
  children: React.ReactNode;
}

export default function RootLayoutShell({ children }: RootLayoutShellProps) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/admin");

  return (
    <div className="min-h-full flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
