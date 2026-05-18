"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Download,
  Share2,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const galleryItems = [
  {
    id: 1,
    title: "Summer Picnic 2024",
    caption: "Han River Park gatherings under the stars.",
    image: "/images/city_lights.jpg",
    tag: "Outdoor",
    tagColor: "saffron" as const,
    year: "2024",
    likes: 284,
  },
  {
    id: 2,
    title: "Festive Feast",
    caption: "Community dinners and Diwali celebrations.",
    image: "/images/diwali.jpg",
    tag: "Festival",
    tagColor: "green" as const,
    year: "2024",
    likes: 512,
  },
  {
    id: 3,
    title: "Rangoli Moments",
    caption: "Creative art shared by our members.",
    image: "/images/gallery_pic5.jpg",
    tag: "Culture",
    tagColor: "saffron" as const,
    year: "2024",
    likes: 341,
  },
  {
    id: 4,
    title: "Holi Colours",
    caption: "Colours, laughter and pure joy at Han River.",
    image: "/images/gallery_pic1.jpg",
    tag: "Festival",
    tagColor: "saffron" as const,
    year: "2024",
    likes: 628,
  },
  {
    id: 5,
    title: "Independence Day",
    caption: "Tricolour pride celebrated across Seoul.",
    image: "/images/gallery_pic8.jpg",
    tag: "Patriotic",
    tagColor: "green" as const,
    year: "2024",
    likes: 445,
  },
  {
    id: 6,
    title: "Cultural Night",
    caption: "Classical dance performances at IIK gala.",
    image: "/images/city_lights.jpg",
    tag: "Arts",
    tagColor: "green" as const,
    year: "2023",
    likes: 389,
  },
  {
    id: 7,
    title: "Cricket League",
    caption: "IIK cricket tournament finals at Seoul Sports Complex.",
    image: "/images/gallery_pic5.jpg",
    tag: "Sports",
    tagColor: "saffron" as const,
    year: "2023",
    likes: 267,
  },
  {
    id: 8,
    title: "New Year Meetup",
    caption: "Community kickoff with warm conversations.",
    image: "/images/diwali.jpg",
    tag: "Meetup",
    tagColor: "green" as const,
    year: "2023",
    likes: 198,
  },
  {
    id: 9,
    title: "Food Festival",
    caption: "A sensory journey through regional Indian cuisine.",
    image: "/images/gallery_pic1.jpg",
    tag: "Food",
    tagColor: "saffron" as const,
    year: "2023",
    likes: 721,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

// ─── Tag style helper ─────────────────────────────────────────────────────────

const tagStyle = (tagColor: "saffron" | "green") =>
  tagColor === "saffron"
    ? { bg: "bg-orange-100", text: "text-[#FF9933]", dot: "#FF9933" }
    : { bg: "bg-green-100", text: "text-[#138808]", dot: "#138808" };

// ─── Tilt Card (homepage preview) ────────────────────────────────────────────

const TiltCard = ({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[number];
  index: number;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ts = tagStyle(item.tagColor);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const delays = ["0.08s", "0.18s", "0.28s"];

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
      }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateY(-6px)" : "translateY(0)"}`,
        transition: hovered
          ? "transform 0.08s ease-out"
          : "transform 0.5s ease-out",
        animation: `cardReveal 0.6s ease ${delays[index]} forwards`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
      className="gallery-card group relative cursor-pointer overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-md shadow-slate-200/60"
    >
      <div className="relative h-64 overflow-hidden sm:h-72">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
          }}
        />
        {/* Zoom hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm border border-white/20">
            <ZoomIn className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] font-semibold text-white">
              View photo
            </span>
          </div>
        </div>
        <span
          className={`absolute top-4 left-4 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${ts.bg} ${ts.text}`}
        >
          {item.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-slate-900">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
          {item.caption}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-[3px] overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-slate-200" />
        <div className="flex-1 bg-[#138808]" />
      </div>
    </div>
  );
};

// ─── Gallery Popup ────────────────────────────────────────────────────────────

const FILTERS = [
  "All",
  "Festival",
  "Culture",
  "Outdoor",
  "Sports",
  "Food",
  "Meetup",
  "Patriotic",
  "Arts",
];

const GalleryPopup = ({
  open,
  onClose,
  initialIndex,
  onOpenLightbox,
}: {
  open: boolean;
  onClose: () => void;
  initialIndex: number | null;
  onOpenLightbox: (index: number) => void;
}) => {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = galleryItems.filter(
    (item) => filter === "All" || item.tag === filter,
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="relative flex flex-col w-full h-full sm:h-[94dvh] sm:my-auto sm:max-w-6xl sm:mx-auto sm:rounded-3xl overflow-hidden bg-white shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.38, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex-shrink-0 bg-gradient-to-r from-orange-500 to-amber-500 px-5 sm:px-8 py-5 overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-6 left-8 w-28 h-28 rounded-full bg-amber-300/20 blur-xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-orange-100">
                    Indians in Korea
                  </p>
                  <h2 className="mt-0.5 text-xl sm:text-2xl font-bold text-white">
                    Community Gallery
                  </h2>
                  <p className="mt-0.5 text-xs text-orange-100/80">
                    {galleryItems.length} moments · 2023–2024
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/35 transition-colors"
                  aria-label="Close gallery"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Filter tabs */}
              <div className="relative mt-4 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="relative flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all duration-200"
                    style={{
                      background:
                        filter === f ? "white" : "rgba(255,255,255,0.18)",
                      color: filter === f ? "#ea580c" : "rgba(255,255,255,0.9)",
                      boxShadow:
                        filter === f ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                    }}
                  >
                    {f}
                    {filter === f && (
                      <motion.div
                        layoutId="gallery-filter"
                        className="absolute inset-0 bg-white rounded-full"
                        style={{ zIndex: -1 }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3"
                >
                  {filtered.map((item, i) => {
                    const globalIndex = galleryItems.findIndex(
                      (g) => g.id === item.id,
                    );
                    const ts = tagStyle(item.tagColor);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          scale: 0.94,
                          filter: "blur(4px)",
                        }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.04,
                          ease: EASE,
                        }}
                        onClick={() => onOpenLightbox(globalIndex)}
                        className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-100"
                        style={{ aspectRatio: i % 5 === 0 ? "1/1.3" : "1/1" }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Hover info */}
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <p className="text-[11px] font-bold text-white leading-tight">
                            {item.title}
                          </p>
                          <span
                            className={`inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${ts.bg} ${ts.text}`}
                          >
                            {item.tag}
                          </span>
                        </div>

                        {/* Zoom icon */}
                        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                          <ZoomIn className="w-3 h-3 text-white" />
                        </div>

                        {/* Year badge */}
                        <div className="absolute top-2 left-2 text-[9px] font-bold text-white/90 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                          {item.year}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <span className="text-4xl mb-3">🖼️</span>
                  <p className="text-sm font-medium">
                    No photos in this category yet
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-slate-100 bg-slate-50 px-5 py-3 flex items-center justify-between">
              <p className="text-[10px] text-slate-400 font-medium">
                {filtered.length} of {galleryItems.length} photos shown
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-1.5 w-24 rounded-full overflow-hidden bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300"
                    style={{
                      width: `${(filtered.length / galleryItems.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  {Math.round((filtered.length / galleryItems.length) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const Lightbox = ({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const item = index !== null ? galleryItems[index] : null;
  const total = galleryItems.length;
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, onClose, onPrev, onNext]);

  // Reset zoom on image change
  useEffect(() => {
    setZoomed(false);
  }, [index]);

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Cinematic backdrop */}
          <motion.div
            className="absolute inset-0 bg-slate-950/96"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Ambient blur from image color */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${item.tagColor === "saffron" ? "rgba(255,153,51,0.3)" : "rgba(19,136,8,0.3)"} 0%, transparent 60%)`,
                filter: "blur(40px)",
              }}
            />
          </motion.div>

          {/* Top bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-black/60 to-transparent"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                {index + 1} / {total}
              </p>
              <h3 className="text-sm font-bold text-white mt-0.5">
                {item.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Zoom toggle */}
              <button
                onClick={() => setZoomed((z) => !z)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${zoomed ? "bg-orange-500 border-orange-400" : "bg-white/10 border-white/20 hover:bg-white/20"}`}
                aria-label="Toggle zoom"
              >
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Main image */}
          <motion.div
            key={index}
            className="relative z-0 flex items-center justify-center w-full h-full px-16"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div
              className={`relative overflow-hidden rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.8)] transition-transform duration-500 ${
                zoomed ? "scale-[1.6] cursor-zoom-out" : "cursor-zoom-in"
              }`}
              style={{
                width: "min(90vw, 900px)",
                height: "min(75vh, 700px)",
              }}
              onClick={() => setZoomed((z) => !z)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 90vw, 900px"
              />
              {/* Cinematic vignette */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.25)]" />
            </div>
          </motion.div>

          {/* Prev button */}
          <motion.button
            onClick={onPrev}
            className="absolute left-3 sm:left-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/25 hover:scale-105 transition-all backdrop-blur-sm"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          {/* Next button */}
          <motion.button
            onClick={onNext}
            className="absolute right-3 sm:right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/25 hover:scale-105 transition-all backdrop-blur-sm"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>

          {/* Bottom caption bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-5 pb-6 pt-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.4, ease: EASE }}
          >
            <div className="flex items-end justify-between max-w-3xl mx-auto">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${tagStyle(item.tagColor).bg} ${tagStyle(item.tagColor).text}`}
                  >
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-white/50 font-medium">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed max-w-sm">
                  {item.caption}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[#FF9933] text-xs">❤</span>
                  <span className="text-[11px] font-semibold text-white/70">
                    {item.likes} likes
                  </span>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="hidden sm:flex items-center gap-1.5">
                {galleryItems
                  .slice(Math.max(0, index - 2), index + 3)
                  .map((thumb, ti) => {
                    const globalIdx = galleryItems.findIndex(
                      (g) => g.id === thumb.id,
                    );
                    return (
                      <button
                        key={thumb.id}
                        onClick={() => {
                          // handled via onNext/onPrev chain externally
                          // We need direct jump — passed from parent
                        }}
                        className={`relative rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${globalIdx === index ? "ring-2 ring-orange-400 scale-110" : "opacity-50 hover:opacity-80"}`}
                        style={{ width: 44, height: 36 }}
                      >
                        <Image
                          src={thumb.image}
                          alt={thumb.title}
                          fill
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
              </div>
            </div>
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-1">
            {galleryItems.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 16 : 5,
                  height: 5,
                  background: i === index ? "#FF9933" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export const GallerySection = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length,
    );
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % galleryItems.length,
    );
  }, []);

  const openGalleryWithPreview = (index: number) => {
    setGalleryOpen(true);
    // Slight delay so gallery mounts before lightbox opens
    setTimeout(() => openLightbox(index), 120);
  };

  return (
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50/60 via-white to-green-50/40 py-20 px-4 sm:px-8 lg:px-16">
        {/* Background blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#FF9933]/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#138808]/5 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex h-[3px] w-12 overflow-hidden rounded-full">
                <div className="flex-1 bg-[#FF9933]" />
                <div className="flex-1 border-y border-slate-200 bg-white" />
                <div className="flex-1 bg-[#138808]" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#138808]">
                Moments of IIK
              </p>
              <h2 className="mt-3 font-playfair text-[36px] font-bold leading-[1.15] text-slate-900 sm:text-[42px]">
                Glimpses into our{" "}
                <span className="text-[#FF9933]">vibrant life</span>
                <br />
                across the peninsula.
              </h2>
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-slate-500">
                Real memories from our members — picnics, festivals, art, and
                everyday joy shared across Korea.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm text-center">
                <p className="font-playfair text-2xl font-bold text-[#FF9933]">
                  200+
                </p>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                  Stories this year
                </p>
              </div>

              {/* View Gallery button */}
              <motion.button
                onClick={() => setGalleryOpen(true)}
                className="group inline-flex items-center gap-2 pointer rounded-full bg-slate-900 px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shine on hover */}
                <span className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Visit Gallery</span>
                <svg
                  className="h-4 w-4 relative transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* 3-card preview grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.slice(0, 3).map((item, i) => (
              <TiltCard
                key={item.title}
                item={item}
                index={i}
                onClick={() => openGalleryWithPreview(i)}
              />
            ))}
          </div>

          {/* "See all" nudge */}
          {/* <motion.div
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-200" />
            <button
              onClick={() => setGalleryOpen(true)}
              className="text-[11px] font-semibold text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1.5"
            >
              <span>+{galleryItems.length - 3} more photos in the gallery</span>
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-200" />
          </motion.div> */}
        </div>

        <style>{`
          .gallery-card { opacity: 0; }
          @keyframes cardReveal {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          .scrollbar-none { scrollbar-width: none; }
          .scrollbar-none::-webkit-scrollbar { display: none; }
        `}</style>
      </section>

      {/* Gallery popup */}
      <GalleryPopup
        open={galleryOpen}
        onClose={() => {
          setGalleryOpen(false);
          setLightboxIndex(null);
        }}
        initialIndex={null}
        onOpenLightbox={openLightbox}
      />

      {/* Cinematic lightbox */}
      <Lightbox
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </>
  );
};

export default GallerySection;
