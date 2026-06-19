"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, X, Menu } from "lucide-react";
import { motion, AnimatePresence, useScroll, LayoutGroup } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ─── Nav Items ────────────────────────────────────────────────────────────────
const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Community", href: "/community" },
  { name: "Events", href: "/events" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
  { name: "Magazines", href: "/magazines" },
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
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
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
// framer-motion's useScroll reads from the window, which ScrollSmoother keeps
// at 0. We drive the bar manually from ScrollSmoother's scroll position instead.
const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait one tick for ScrollSmoother to be created by SmoothScrollProvider
    const raf = requestAnimationFrame(() => {
      const smoother = ScrollSmoother.get();
      if (!smoother || !barRef.current) return;

      // ScrollTrigger fires on every smoother tick
      ScrollTrigger.create({
        onUpdate: (self) => {
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={barRef}
      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 origin-left z-10"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

// ─── NavLink ──────────────────────────────────────────────────────────────────
const NavLink = ({
  item,
  isActive,
  heroMode,
}: {
  item: { name: string; href: string };
  isActive: boolean;
  heroMode: boolean;
}) => (
  <motion.li variants={fadeUp} className="relative">
    <Link
      href={item.href}
      className={`
        relative flex flex-col items-center gap-0.5 text-sm font-medium
        transition-colors duration-300 py-1 px-0.5 group
        ${
          heroMode
            ? isActive
              ? "text-orange-400"
              : "text-white/75 hover:text-white"
            : isActive
              ? "text-orange-500"
              : "text-gray-600 hover:text-gray-900"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative transition-all duration-200 group-hover:tracking-wide">
        {item.name}
      </span>

      {isActive && (
        <motion.span
          layoutId="active-nav-indicator"
          className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full ${
            heroMode ? "bg-orange-400" : "bg-orange-500"
          }`}
          transition={easings.spring}
        />
      )}
      {!isActive && (
        <span
          className={`absolute -bottom-1 left-0 h-0.5 w-0 rounded-full group-hover:w-full
            transition-all duration-300 ease-out
            ${heroMode ? "bg-white/40" : "bg-gray-300"}
          `}
        />
      )}
    </Link>
  </motion.li>
);

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Transparent "hero" treatment is only ever true on the homepage hero.
  const [heroMode, setHeroMode] = useState(isHome);
  const lastScrollY = useRef(0);

  const isActive = (href: string) => href !== "#" && pathname === href;

  // ── Scroll listener — reads ScrollSmoother, falls back to window ──────
  // Runs on every page so the bar's "scrolled" / "hidden" behavior is always
  // live. Only `heroMode` (the transparent navbar) is gated to the homepage
  // hero section — every other page (and the rest of the homepage) just gets
  // the normal white bar with its usual scroll-based opacity/shadow/hide.
  useEffect(() => {
    lastScrollY.current = 0;

    const handleScroll = (currentY: number) => {
      const vh = window.innerHeight;

      setHeroMode(isHome ? currentY < vh * 0.72 : false);
      setScrolled(currentY > 80);

      if (currentY > lastScrollY.current && currentY > 140) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    // Try ScrollSmoother first (available after SmoothScrollProvider mounts)
    let st: ScrollTrigger | undefined;

    const init = () => {
      const smoother = ScrollSmoother.get();

      if (smoother) {
        // Use ScrollTrigger's onUpdate which fires on the smoother's virtual scroll
        st = ScrollTrigger.create({
          onUpdate: () => {
            handleScroll(smoother.scrollTop());
          },
        });
        // Set initial state
        handleScroll(smoother.scrollTop());
      } else {
        // Fallback: native scroll
        const onNativeScroll = () => handleScroll(window.scrollY);
        window.addEventListener("scroll", onNativeScroll, { passive: true });
        handleScroll(window.scrollY);
        return () => window.removeEventListener("scroll", onNativeScroll);
      }
    };

    // Small delay to ensure SmoothScrollProvider has mounted first
    const timer = setTimeout(init, 100);

    return () => {
      clearTimeout(timer);
      st?.kill();
    };
  }, [isHome]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    // Use ScrollSmoother.get()?.paused() instead of body overflow
    // so it integrates cleanly with the smooth scroll system
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.paused(open);
    } else {
      document.body.style.overflow = open ? "hidden" : "";
    }
    return () => {
      const s = ScrollSmoother.get();
      if (s) s.paused(false);
      else document.body.style.overflow = "";
    };
  }, [open]);

  // ── Bar background style ───────────────────────────────────────────────
  const barCls = heroMode
    ? "bg-transparent border-transparent shadow-none"
    : scrolled
      ? "bg-white/92 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
      : "bg-white/78 backdrop-blur-md border-gray-100/50 shadow-[0_2px_12px_rgba(0,0,0,0.05)]";

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
      {/* ── Bar ─────────────────────────────────────────────────────────── */}
      <div
        className={`
          relative w-full overflow-hidden border-b
          transition-all duration-500 ease-out
          ${barCls}
        `}
      >
        {!heroMode && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-orange-50/25 to-transparent pointer-events-none" />
          </>
        )}

        {/* ── Nav Row ──────────────────────────────────────────────────── */}
        <div
          className={`
            relative mx-auto flex items-center justify-between
            px-6 lg:px-10
            transition-all duration-400
            ${scrolled && !heroMode ? "py-2.5" : "py-3.5"}
          `}
        >
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              aria-label="Indians in Korea Home"
              className="flex items-center"
            >
              <Image
                src="/images/iik.png"
                alt="Indians in Korea"
                width={scrolled && !heroMode ? 35 : 40}
                height={60}
                className="object-contain transition-all duration-400"
                priority
              />
              <span
                className={`hidden lg:inline ml-3 font-semibold text-lg transition-colors duration-500 ${
                  heroMode ? "text-white/90" : "text-gray-700"
                }`}
              >
                <span
                  className={heroMode ? "text-orange-400" : "text-orange-600"}
                >
                  INDIANS
                </span>{" "}
                IN{" "}
                <span
                  className={heroMode ? "text-green-400" : "text-[#138808]"}
                >
                  KOREA
                </span>
              </span>
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
                  heroMode={heroMode}
                />
              ))}
            </motion.ul>
          </LayoutGroup>

          {/* RIGHT: JOIN US CTA */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-3"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/join"
                className={`
                  relative overflow-hidden inline-flex items-center
                  text-sm font-semibold px-5 py-2 rounded-full
                  transition-all duration-300 group
                  ${
                    heroMode
                      ? "bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-400/30 hover:border-orange-400/60 backdrop-blur-sm"
                      : "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white shadow-[0_4px_14px_rgba(234,88,12,0.35)] hover:shadow-[0_6px_22px_rgba(234,88,12,0.45)]"
                  }
                `}
              >
                <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
                Join Us
              </Link>
            </motion.div>
          </motion.div>

          {/* MOBILE HAMBURGER */}
          <motion.button
            className={`
              lg:hidden relative w-9 h-9 flex items-center justify-center rounded-full
              transition-colors duration-300
              ${
                heroMode
                  ? "bg-white/10 hover:bg-white/20 border border-white/20"
                  : "bg-gray-100/80 hover:bg-gray-200/80"
              }
            `}
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
                  <X
                    size={17}
                    className={heroMode ? "text-white" : "text-gray-700"}
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu
                    size={17}
                    className={heroMode ? "text-white" : "text-gray-700"}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Scroll progress — only in white mode */}
        {!heroMode && <ScrollProgressBar />}
      </div>

      {/* ── Mobile Menu ───────────────────────────────────────────────────── */}
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

              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

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

              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="relative overflow-hidden flex items-center justify-center w-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold text-sm py-2.5 rounded-xl shadow-[0_4px_14px_rgba(234,88,12,0.3)] transition-shadow duration-200 group"
                >
                  <span className="absolute inset-0 translate-x-[-110%] group-active:translate-x-[110%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  Join Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
