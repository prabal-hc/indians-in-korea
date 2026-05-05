"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About IIK", href: "/" },
  { name: "Community", href: "#" },
  { name: "Events", href: "#" },
  { name: "Resources", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Magazines", href: "#" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className=" mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* LEFT: LOGO */}
        <h1 className="text-lg font-semibold text-gray-900">
          <Image
            src="https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/logo.png"
            alt="Indians in Korea"
            width={220}
            height={100}
            className="object-contain"
            priority
          />
        </h1>
        {/* CENTER: NAV LINKS */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`relative transition ${
                  index === 0
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}

                {/* ACTIVE UNDERLINE */}
                {index === 0 && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-orange-500 rounded" />
                )}
              </Link>
            </li>
          ))}
        </ul>
        {/* RIGHT: SEARCH + BUTTON */}
        <div className="hidden lg:flex items-center gap-4">
          {/* SEARCH */}
          <div className="relative w-[240px] lg:w-[280px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search community..."
              className="
      w-full
      h-[44px]
      pl-12 pr-4
      rounded-full
      bg-gray-100/80
      border border-gray-200
      text-sm text-gray-700
      placeholder:text-gray-400
      outline-none
      focus:bg-white
      focus:border-orange-400
      focus:ring-2 focus:ring-orange-100
      transition-all duration-200
    "
            />
          </div>

          {/* BUTTON */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full shadow-sm transition">
            Join Us
          </button>
        </div>
        {/* MOBILE MENU BUTTON */}
        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden px-6 pb-4 bg-white border-t">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>

          {/* MOBILE SEARCH */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search community..."
              className="w-full rounded-full bg-gray-100 px-4 py-2 text-sm outline-none"
            />
          </div>

          {/* MOBILE BUTTON */}
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full">
            Join Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
