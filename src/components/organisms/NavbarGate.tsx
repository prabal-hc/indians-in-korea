"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/organisms/Navbar";

export default function NavbarGate() {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/admin");

  if (!showNavbar) return null;

  return <Navbar />;
}
