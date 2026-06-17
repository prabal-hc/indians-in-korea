// ─────────────────────────────────────────────────────────────────────────────
// GallerySection.tsx  — uses global GSAP utility classes
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState, useRef } from "react";
import { getAll, type GalleryItem } from "@/services/gallery.service";

const getTopOffset = (i: number): string => {
  const pattern = ["0%", "2.5%", "5%", "2.5%"];
  return pattern[i % pattern.length];
};

export const GallerySection = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRaf = useRef<number>(0);
  const mouseXInScroll = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    getAll().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const startAutoScroll = () => {
    const scroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = mouseXInScroll.current;
      const edgeZone = 120;
      const maxSpeed = 12;
      if (x < rect.left + edgeZone) {
        const strength = 1 - (x - rect.left) / edgeZone;
        el.scrollLeft -= maxSpeed * strength;
      } else if (x > rect.right - edgeZone) {
        const strength = 1 - (rect.right - x) / edgeZone;
        el.scrollLeft += maxSpeed * strength;
      }
      autoScrollRaf.current = requestAnimationFrame(scroll);
    };
    autoScrollRaf.current = requestAnimationFrame(scroll);
  };

  const stopAutoScroll = () => cancelAnimationFrame(autoScrollRaf.current);
  const onSectionMouseMove = (e: React.MouseEvent) => {
    mouseXInScroll.current = e.clientX;
  };
  const onSectionMouseLeave = () => {
    stopAutoScroll();
    setHoveredIdx(null);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#fff",
        position: "relative",
        zIndex: 10,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* gsap-reveal-heading + gsap-reveal-para → animated by SmoothScrollProvider */}
      <div className="mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 pt-16 pb-10 px-4 sm:px-8 lg:px-16">
        <h2
          className="gsap-reveal-heading font-playfair text-[36px] font-bold leading-[1.15] text-slate-900 sm:text-[40px]"
          style={{ opacity: 0 }}
        >
          Glimpses into our{" "}
          <em
            className="italic"
            style={{
              background: "linear-gradient(135deg,#FF9933,#ea580c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            vibrant life
          </em>{" "}
          across the peninsula
        </h2>
        <p
          className="gsap-reveal-para mt-2 text-sm text-slate-500"
          style={{ opacity: 0 }}
        >
          Hover a card to expand · Move to edges to scroll
        </p>
      </div>

      <div
        ref={scrollRef}
        onMouseMove={onSectionMouseMove}
        onMouseEnter={startAutoScroll}
        onMouseLeave={onSectionMouseLeave}
        style={
          {
            display: "flex",
            alignItems: "flex-start",
            overflowX: "auto",
            overflowY: "visible",
            paddingBottom: "4rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "1.5rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            minHeight: 580,
            gap: 0,
            width: "100%",
            boxSizing: "border-box",
          } as React.CSSProperties
        }
      >
        <style>{`
          .gallery-scroll-row::-webkit-scrollbar { display: none; }
          @keyframes shimmer { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.28; } }
        `}</style>

        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{ flexShrink: 0, width: 72, marginTop: getTopOffset(i) }}
              >
                <div
                  style={{
                    margin: "0 3px",
                    borderRadius: 10,
                    height: 460,
                    background: "#e2e8f0",
                    animation: "shimmer 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            ))
          : items.map((item, i) => {
              const imageUrl = (item as any).imageUrl ?? "";
              const title = item.title ?? "";
              const tag = item.tag ?? "";
              const isHovered = hoveredIdx === i;
              const isActive = hoveredIdx === null || hoveredIdx === i;

              return (
                <div
                  key={item.id ?? i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    flexShrink: 0,
                    width: isHovered
                      ? 320
                      : `calc((100vw - 4rem) / ${Math.min(items.length, 12)})`,
                    minWidth: isHovered ? 320 : 48,
                    marginTop: getTopOffset(i),
                    opacity: isActive ? 1 : 0.2,
                    transition:
                      "width 600ms cubic-bezier(0.25,1,0.5,1), min-width 600ms cubic-bezier(0.25,1,0.5,1), opacity 250ms ease",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      margin: "0 3px",
                      borderRadius: 10,
                      overflow: "hidden",
                      position: "relative",
                      height: 460,
                      background: "#0c0c0a",
                    }}
                  >
                    {imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt={title}
                        draggable={false}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          transition:
                            "transform 600ms cubic-bezier(0.25,1,0.5,1)",
                          transform: isHovered ? "scale(1.04)" : "scale(1)",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: isHovered
                          ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)",
                        transition: "background 400ms ease",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 3,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px 0 0 10px",
                        overflow: "hidden",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 350ms ease",
                        pointerEvents: "none",
                      }}
                    >
                      <div style={{ flex: 1, background: "#FF9933" }} />
                      <div style={{ flex: 1, background: "#fff" }} />
                      <div style={{ flex: 1, background: "#138808" }} />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "20px 16px",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? "translateY(0)"
                          : "translateY(10px)",
                        transition:
                          "opacity 350ms ease 150ms, transform 350ms ease 150ms",
                        pointerEvents: "none",
                      }}
                    >
                      {tag && (
                        <p
                          style={{
                            fontSize: 8,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#FF9933",
                            fontWeight: 700,
                            marginBottom: 6,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tag}
                        </p>
                      )}
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#fff",
                          lineHeight: 1.3,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default GallerySection;
