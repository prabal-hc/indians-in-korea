"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  FaBuildingColumns,
  FaSchool,
  FaEarthAsia,
  FaCircleQuestion,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { HigherEducationModal } from "./HigherEducationModal";
import { InternationalSchoolsModal } from "./InternationalSchoolsModal";
import { AboutKoreaModal } from "./AboutKoreaModal";
import { FAQModal } from "./FAQModal";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_PREMIUM },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

type FeatureCardId =
  | "higherEducation"
  | "internationalSchools"
  | "aboutKorea"
  | "faq";

type FeatureCard = {
  id: FeatureCardId;
  title: string;
  label: string;
  icon: IconType; // ← changed from string
  description: string;
  image: string;
  accent: {
    bg: string;
    border: string;
    label: string;
    link: string;
  };
};

const featureCards: FeatureCard[] = [
  {
    id: "higherEducation",
    title: "Higher Education",
    label: "Education",
    icon: FaBuildingColumns, // ← react-icon
    description: "Guidance for Indian students studying in Korea.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop",
    accent: {
      bg: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      label: "text-[#FF9933]",
      link: "text-[#FF9933]",
    },
  },
  {
    id: "internationalSchools",
    title: "International Schools",
    label: "Schools",
    icon: FaSchool, // ← react-icon
    description: "Support for families navigating global schooling.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80&auto=format&fit=crop",
    accent: {
      bg: "from-green-50 to-green-100",
      border: "border-green-200",
      label: "text-[#138808]",
      link: "text-[#138808]",
    },
  },
  {
    id: "aboutKorea",
    title: "About Korea",
    label: "Living",
    icon: FaEarthAsia, // ← react-icon
    description: "Local insights on culture, living and visas.",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80&auto=format&fit=crop",
    accent: {
      bg: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      label: "text-blue-600",
      link: "text-blue-600",
    },
  },
  {
    id: "faq",
    title: "FAQ",
    label: "Help",
    icon: FaCircleQuestion, // ← react-icon
    description: "Answers for newcomers joining the IIK family.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop",
    accent: {
      bg: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      label: "text-purple-600",
      link: "text-purple-600",
    },
  },
];

// ─── Card with background image ───────────────────────────────────────────────
const FeatCard = ({
  card,
  onOpen,
}: {
  card: FeatureCard;
  onOpen: () => void;
}) => (
  <motion.div
    variants={fadeUp}
    role="button"
    tabIndex={0}
    onClick={onOpen}
    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpen();
      }
    }}
    className="group relative overflow-hidden rounded-[22px] border-[1.5px] border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.13)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
    style={{ minHeight: 260 }}
  >
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url(${card.image})` }}
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-black/10" />

    {/* Tricolor stripe on hover */}
    <div
      className="absolute bottom-0 left-0 top-0 flex w-[3px] scale-y-0 origin-top flex-col overflow-hidden rounded-l-[22px] transition-transform duration-[380ms] group-hover:scale-y-100"
      style={{
        transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
        zIndex: 10,
      }}
    >
      <div className="flex-1 bg-[#FF9933]" />
      <div className="flex-1 bg-white/40" />
      <div className="flex-1 bg-[#138808]" />
    </div>

    {/* Content */}
    <div
      className="relative z-10 flex flex-col justify-end h-full p-5"
      style={{ minHeight: 260 }}
    >
      {/* Icon badge — now renders react-icon component */}
      <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/15 backdrop-blur-sm border border-white/20">
        <card.icon size={20} className="text-white/90" />
      </div>

      {/* Bottom text */}
      <div className="mt-auto">
        <p className="mb-1 text-[9px] font-[800] uppercase tracking-[0.18em] text-white/60">
          {card.label}
        </p>
        <h3 className="font-playfair text-[16px] font-bold text-white leading-tight">
          {card.title}
        </h3>
        <p className="mt-1.5 text-[11px] leading-[1.6] text-white/65">
          {card.description}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-[700] text-white/80 group-hover:text-white transition-colors duration-200">
          Learn more
          <svg
            className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  </motion.div>
);

export const AboutSection = () => {
  // ── Parallax: track scroll relative to this section ──────────────────────
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background blobs move upward as section scrolls into view
  const blobY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Hero-to-About transition: content rises as you scroll in
  const contentY = useTransform(scrollYProgress, [0, 0.4], [48, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  // Cards grid parallax: slight upward drift on scroll
  const cardsY = useTransform(scrollYProgress, [0, 0.6], [32, -12]);

  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [openHigherEducation, setOpenHigherEducation] = useState(false);
  const [openInternationalSchools, setOpenInternationalSchools] =
    useState(false);
  const [openAboutKorea, setOpenAboutKorea] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(false);

  const closeAllModals = () => {
    setOpenHigherEducation(false);
    setOpenInternationalSchools(false);
    setOpenAboutKorea(false);
    setOpenFAQ(false);
  };

  const openModal = (id: FeatureCardId) => {
    closeAllModals();
    if (id === "higherEducation") setOpenHigherEducation(true);
    else if (id === "internationalSchools") setOpenInternationalSchools(true);
    else if (id === "aboutKorea") setOpenAboutKorea(true);
    else if (id === "faq") setOpenFAQ(true);
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50/60 via-white to-green-50/40 py-15 px-4 sm:px-8 lg:px-16"
      style={{
        position: "relative",
        zIndex: 10, // ← sits above sticky hero
        // borderRadius: "28px 28px 0 0",
        boxShadow: "0 -12px 60px rgba(0,0,0,0.35)", // ← shadow cast on hero below
        marginTop: "-28px", // ← slight overlap to hide the gap
        backgroundColor: "#fff", // ← solid bg so hero doesn't bleed through
      }}
    >
      {/* Parallax ambient blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#FF9933]/8 blur-3xl"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-[#138808]/6 blur-3xl"
      />

      <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10">
        <div className="grid items-start gap-10">
          {/* ── LEFT / header ── */}
          <motion.div
            variants={fadeLeft}
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <h2 className="font-playfair text-[36px] font-bold leading-[1.15] text-slate-900 sm:text-[40px]">
              We provide our{" "}
              <em
                className="italic"
                style={{
                  background: "linear-gradient(135deg,#FF9933,#ea580c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Experts
              </em>
              <br />
              to Indians in Korea
            </h2>

            <p className="mt-4 text-[13px] leading-[1.85] text-slate-500 max-w-[480px]">
              This group primarily includes engineering professionals, business
              persons, research fellows, students and housewives. IIK upholds
              India's umbrella of{" "}
              <strong className="font-[700] text-slate-800">
                Unity in Diversity
              </strong>{" "}
              — doors of IIK are open for every Indian.
            </p>

            {/* Feature cards grid — with their own parallax layer */}
            <motion.div
              variants={stagger}
              style={{ y: cardsY }}
              className="mt-7 grid grid-cols-1 gap-[14px] sm:grid-cols-2 xl:grid-cols-4"
            >
              {featureCards.map((card) => (
                <FeatCard
                  key={card.id}
                  card={card}
                  onOpen={() => openModal(card.id)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <HigherEducationModal
        open={openHigherEducation}
        onClose={closeAllModals}
      />
      <InternationalSchoolsModal
        open={openInternationalSchools}
        onClose={closeAllModals}
      />
      <AboutKoreaModal open={openAboutKorea} onClose={closeAllModals} />
      <FAQModal open={openFAQ} onClose={closeAllModals} />

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>
    </motion.section>
  );
};

export default AboutSection;
