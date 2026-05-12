"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, X, Menu } from "lucide-react";
import { motion, AnimatePresence, useScroll, LayoutGroup } from "framer-motion";

// ─── Nav Items ────────────────────────────────────────────────────────────────
const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Community", href: "/community" },
  { name: "Events", href: "/events" },
  { name: "Resources", href: "/resources" },
  // { name: "Blog", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Magazines", href: "#" },
];

// ─── Animation Configs ────────────────────────────────────────────────────────
const easings = {
  spring: { type: "spring", stiffness: 380, damping: 32 },
};

const navbarVariants = {
  hidden: { y: -80, opacity: 0, filter: "blur(12px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scaleY: 0.97,
    filter: "blur(8px)",
    transformOrigin: "top",
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    filter: "blur(0px)",
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    scaleY: 0.97,
    filter: "blur(6px)",
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

const mobileLinkVariants = {
  hidden: { x: -14, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05 + 0.05,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 origin-left z-10"
      style={{ scaleX: scrollYProgress, width: "100%" }}
    />
  );
};

// ─── NavLink ─────────────────────────────────────────────────────────────────
const NavLink = ({
  item,
  isActive,
}: {
  item: { name: string; href: string };
  isActive: boolean;
}) => (
  <motion.li variants={fadeUp} className="relative">
    <Link
      href={item.href}
      className={`relative flex flex-col items-center gap-0.5 text-sm font-medium transition-colors duration-200 py-1 px-0.5 group ${
        isActive ? "text-orange-500" : "text-gray-600 hover:text-gray-900"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative transition-all duration-200 group-hover:tracking-wide">
        {item.name}
      </span>
      {isActive && (
        <motion.span
          layoutId="active-nav-indicator"
          className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-orange-500"
          transition={easings.spring}
        />
      )}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gray-300 group-hover:w-full transition-all duration-300 ease-out" />
      )}
    </Link>
  </motion.li>
);

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const lastScrollY = useRef(0);

  const isActive = (href: string) => href !== "#" && pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="w-full fixed top-0 left-0 right-0 z-50"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* ── Fixed Full-Width Bar ──────────────────────────────────────────── */}
      <div
        className={`
          relative w-full overflow-hidden border-b
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "bg-white/92 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
              : "bg-white/78 backdrop-blur-md border-gray-100/50 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
          }
        `}
      >
        {/* Top-to-bottom sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />

        {/* Warm atmospheric tint — right edge */}
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-orange-50/25 to-transparent pointer-events-none" />

        {/* ── Nav Row ──────────────────────────────────────────────────── */}
        <div
          className={`
            relative mx-auto  flex items-center justify-between
            px-6 lg:px-10
            transition-all duration-400
            ${scrolled ? "py-2.5" : "py-3.5"}
          `}
        >
          {/* LEFT: LOGO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link href="/" aria-label="Indians in Korea Home">
              <Image
                src="https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/logo.png"
                alt="Indians in Korea"
                width={scrolled ? 180 : 210}
                height={100}
                className="object-contain transition-all duration-400"
                priority
              />
            </Link>
          </motion.div>

          {/* CENTER: NAV LINKS */}
          <LayoutGroup>
            <motion.ul
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center gap-7 text-sm font-medium"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isActive={isActive(item.href)}
                />
              ))}
            </motion.ul>
          </LayoutGroup>

          {/* RIGHT: SEARCH + CTA */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-3"
          >
            {/* SEARCH */}
            <motion.div variants={fadeUp} className="relative">
              <Search
                size={15}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  searchFocused ? "text-orange-400" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search community..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`
                  h-9 pl-10 pr-4 rounded-full text-sm
                  bg-gray-100/70 border text-gray-700 placeholder:text-gray-400
                  outline-none transition-all duration-300
                  ${
                    searchFocused
                      ? "w-64 xl:w-72 bg-white border-orange-300 ring-2 ring-orange-100 shadow-[0_0_16px_rgba(249,115,22,0.1)]"
                      : "w-52 xl:w-60 border-gray-200/80 hover:bg-gray-100 hover:border-gray-300"
                  }
                `}
              />
            </motion.div>

            {/* JOIN US CTA */}
            <motion.div variants={fadeUp}>
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="
                  relative overflow-hidden
                  bg-gradient-to-br from-orange-500 to-orange-600
                  hover:from-orange-500 hover:to-orange-700
                  text-white text-sm font-semibold
                  px-5 py-2 rounded-full
                  shadow-[0_4px_14px_rgba(234,88,12,0.35)]
                  hover:shadow-[0_6px_22px_rgba(234,88,12,0.45)]
                  transition-shadow duration-300 group
                "
              >
                <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
                Join Us
              </motion.button>
            </motion.div>
          </motion.div>

          {/* MOBILE HAMBURGER */}
          <motion.button
            className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.92 }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={17} className="text-gray-700" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={17} className="text-gray-700" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Scroll progress bar */}
        <ScrollProgressBar />
      </div>

      {/* ── Mobile Menu (full-width dropdown) ────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden w-full overflow-hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/70 shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/15 to-transparent pointer-events-none" />

            <div className="relative px-6 py-5 max-w-screen-xl mx-auto">
              {/* NAV LINKS */}
              <ul className="flex flex-col gap-0.5 mb-5">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-150
                        ${
                          isActive(item.href)
                            ? "bg-orange-50 text-orange-600 font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      {isActive(item.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      )}
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* DIVIDER */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

              {/* MOBILE SEARCH */}
              <div className="relative mb-3">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search community..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100/80 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                />
              </div>

              {/* MOBILE CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold text-sm py-2.5 rounded-xl shadow-[0_4px_14px_rgba(234,88,12,0.3)] transition-shadow duration-200 group"
              >
                <span className="absolute inset-0 translate-x-[-110%] group-active:translate-x-[110%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                Join Us
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
