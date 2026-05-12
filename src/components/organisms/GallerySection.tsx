"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const galleryItems = [
  {
    title: "Summer Picnic 2024",
    caption: "Han River Park gatherings under the stars.",
    image: "/images/city_lights.jpg",
    tag: "Outdoor",
    tagColor: "saffron" as const,
  },
  {
    title: "Festive Feast",
    caption: "Community dinners and Diwali celebrations.",
    image: "/images/diwali.jpg",
    tag: "Festival",
    tagColor: "green" as const,
  },
  {
    title: "Rangoli Moments",
    caption: "Creative art shared by our members.",
    image: "/images/gallery_pic5.jpg",
    tag: "Culture",
    tagColor: "saffron" as const,
  },
];

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────

const TiltCard = ({
  item,
  index,
}: {
  item: (typeof galleryItems)[number];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const tagStyles =
    item.tagColor === "saffron"
      ? "bg-orange-100 text-[#FF9933]"
      : "bg-green-100 text-[#138808]";

  const delays = ["0.1s", "0.25s", "0.4s"];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "translateY(-6px)" : "translateY(0)"}`,
        transition: isHovered
          ? "transform 0.08s ease-out"
          : "transform 0.5s ease-out",
        animation: `cardReveal 0.6s ease ${delays[index]} forwards`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
      className="gallery-card group relative cursor-pointer overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-md shadow-slate-200/60"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden sm:h-72">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Sheen effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          }}
        />

        {/* Tag */}
        <span
          className={`absolute top-4 left-4 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${tagStyles}`}
        >
          {item.tag}
        </span>
      </div>

      {/* Text */}
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-slate-900">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
          {item.caption}
        </p>
      </div>

      {/* Bottom tricolor line — animates in on hover */}
      <div className="absolute bottom-0 left-0 right-0 flex h-[3px] overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-slate-200" />
        <div className="flex-1 bg-[#138808]" />
      </div>
    </div>
  );
};

// ─── Floating decorative images ───────────────────────────────────────────────

const FloatingPhoto = ({
  src,
  alt,
  className,
  delay,
}: {
  src: string;
  alt: string;
  className: string;
  delay: string;
}) => (
  <div
    className={`pointer-events-none absolute overflow-hidden rounded-2xl border-2 border-white shadow-xl ${className}`}
    style={{ animationDelay: delay }}
  >
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────

export const GallerySection = () => (
  <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50/60 via-white to-green-50/40 py-20 px-4 sm:px-8 lg:px-16">
    {/* Background blobs */}
    <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#FF9933]/6 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#138808]/5 blur-3xl" />

    {/* Subtle grid texture */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    <div className="relative mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
      {/* ── Header row ── */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          {/* Tricolor bar */}
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

        {/* Visit Gallery CTA */}
        <div className="flex items-center gap-4">
          {/* Member count badge */}
          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm text-center">
            <p className="font-playfair text-2xl font-bold text-[#FF9933]">
              200+
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
              Stories this year
            </p>
          </div>

          <Link
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
          >
            Visit Gallery
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
          </Link>
        </div>
      </div>

      {/* ── 3-card grid ── */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, i) => (
          <TiltCard key={item.title} item={item} index={i} />
        ))}
      </div>

      {/* ── Wide feature banner ── */}
      <div className="mt-8 relative overflow-hidden rounded-[28px] border border-slate-100 bg-white px-8 py-8 shadow-sm">
        {/* Tricolor left border accent */}
        <div className="absolute left-0 top-0 bottom-0 flex w-1 flex-col overflow-hidden rounded-l-[28px]">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-slate-100" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {/* Stacked mini images */}
            <div className="relative flex -space-x-3">
              {galleryItems.map((item, i) => (
                <div
                  key={item.title}
                  className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-white shadow-md"
                  style={{ zIndex: galleryItems.length - i }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-slate-100 text-[11px] font-bold text-slate-500 shadow-md">
                +97
              </div>
            </div>

            <div>
              <p className="text-[15px] font-semibold text-slate-900">
                Tag <span className="text-[#FF9933]">#IndiansInKorea</span>
              </p>
              <p className="mt-0.5 text-[12px] text-slate-500">
                Share your moment and get featured in our gallery.
              </p>
            </div>
          </div>

          <Link
            href="#"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#FF9933]/30 bg-orange-50 px-5 py-2.5 text-[12px] font-semibold text-[#FF9933] transition-all duration-200 hover:bg-[#FF9933] hover:text-white hover:border-[#FF9933]"
          >
            Browse all photos
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
          </Link>
        </div>
      </div>
    </div>

    {/* Keyframes */}
    <style>{`
      .gallery-card {
        opacity: 0;
      }
      @keyframes cardReveal {
        from { opacity: 0; transform: translateY(20px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50%       { transform: translateY(-10px) rotate(-2deg); }
      }
    `}</style>
  </section>
);

export default GallerySection;
