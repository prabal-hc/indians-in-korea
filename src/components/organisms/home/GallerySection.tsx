"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { getAll, type GalleryItem } from "@/services/gallery.service";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Layer = "a" | "b";

// ─────────────────────────────────────────────────────────────────────────────
// GallerySection
// ─────────────────────────────────────────────────────────────────────────────
export const GallerySection = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  // ── Refs ────────────────────────────────────────────────────────────────────
  const animating = useRef(false);
  const activeLayer = useRef<Layer>("a");
  const currentRef = useRef(0);

  // Image layers
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);

  // Text refs
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const counterNumRef = useRef<HTMLDivElement>(null);
  const capLocRef = useRef<HTMLDivElement>(null);

  // Progress
  const progressRef = useRef<HTMLDivElement>(null);

  // Cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // ── Load data ───────────────────────────────────────────────────────────────
  useEffect(() => {
    getAll().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const pad = (n: number) => String(n + 1).padStart(2, "0");

  const getLayer = (which: Layer) =>
    which === "a"
      ? { layer: layerARef.current, img: imgARef.current }
      : { layer: layerBRef.current, img: imgBRef.current };

  const updateProgress = useCallback((idx: number, total: number) => {
    const wrap = progressRef.current;
    if (!wrap) return;
    wrap.querySelectorAll<HTMLButtonElement>(".prog-dot").forEach((dot, i) => {
      const active = i === idx;
      dot.style.height = active ? "32px" : "14px";
      dot.style.background = active
        ? "linear-gradient(180deg, #FF9933 0%, #ea580c 100%)"
        : "#cbd5e1";
    });
  }, []);

  const buildProgress = useCallback(
    (total: number) => {
      const wrap = progressRef.current;
      if (!wrap) return;
      wrap.innerHTML = "";
      Array.from({ length: total }).forEach((_, i) => {
        const btn = document.createElement("button");
        btn.className = "prog-dot";
        btn.setAttribute("aria-label", `Go to ${i + 1}`);
        Object.assign(btn.style, {
          width: "2px",
          height: i === 0 ? "32px" : "14px",
          background:
            i === 0
              ? "linear-gradient(180deg, #FF9933 0%, #ea580c 100%)"
              : "#cbd5e1",
          borderRadius: "2px",
          border: "none",
          cursor: "pointer",
          transition: "height 0.35s ease, background 0.35s ease",
          padding: 0,
        });
        btn.addEventListener("click", () => go(i));
        wrap.appendChild(btn);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // ── Set text content ────────────────────────────────────────────────────────
  const applyContent = useCallback(
    (item: GalleryItem, idx: number, total: number) => {
      if (eyebrowRef.current)
        eyebrowRef.current.textContent =
          `${item.tag ?? "Community"} · ${item.year ?? ""}`
            .trim()
            .replace(/·\s*$/, "");
      if (titleRef.current) titleRef.current.innerHTML = item.title;
      if (subtitleRef.current) subtitleRef.current.textContent = item.tag ?? "";
      if (descRef.current)
        descRef.current.textContent =
          (item as any).description ??
          "A moment captured by the Indians in Korea community.";
      if (capLocRef.current)
        capLocRef.current.textContent = (item as any).location ?? "";
      if (counterNumRef.current) counterNumRef.current.textContent = pad(idx);
      updateProgress(idx, total);
    },
    [updateProgress],
  );

  // ── Main transition ─────────────────────────────────────────────────────────
  const go = useCallback(
    (next: number) => {
      if (animating.current || !items.length) return;
      const total = items.length;
      const clamped = ((next % total) + total) % total;
      if (clamped === currentRef.current) return;

      animating.current = true;
      const direction = next > currentRef.current ? 1 : -1;
      currentRef.current = clamped;

      const incoming = activeLayer.current === "a" ? "b" : "a";
      const outgoing = activeLayer.current;

      const { layer: inLayer, img: inImg } = getLayer(incoming);
      const { layer: outLayer } = getLayer(outgoing);

      const item = items[clamped];

      // Pre-load incoming image
      if (inImg) inImg.src = (item as any).imageUrl ?? "";

      // Set clip-path start
      gsap.set(inLayer, {
        clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
      });
      if (inImg) gsap.set(inImg, { scale: 1.08 });

      const textTargets = [
        eyebrowRef.current,
        titleRef.current,
        subtitleRef.current,
        ruleRef.current,
        descRef.current,
      ].filter(Boolean);

      const tl = gsap.timeline({
        onComplete: () => {
          activeLayer.current = incoming;
          gsap.set(outLayer, { clipPath: "inset(0 100% 0 0)" });
          setCurrent(clamped);
          animating.current = false;
        },
      });

      // Image wipe in
      tl.to(
        inLayer,
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" },
        0,
      );
      tl.to(inImg, { scale: 1, duration: 1.1, ease: "power3.inOut" }, 0);

      // Text exit
      tl.to(
        textTargets,
        {
          y: direction > 0 ? -16 : 16,
          opacity: 0,
          duration: 0.38,
          ease: "power2.in",
          stagger: 0.04,
        },
        0,
      );

      // Swap content mid-animation
      tl.add(() => {
        applyContent(item, clamped, total);
        gsap.set(textTargets, {
          y: direction > 0 ? 20 : -20,
          opacity: 0,
        });
      }, 0.44);

      // Text enter
      tl.to(
        textTargets,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.055,
        },
        0.5,
      );

      // Rule wipe
      tl.to(
        ruleRef.current,
        {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.in",
          transformOrigin: "left",
        },
        0,
      );
      tl.to(
        ruleRef.current,
        {
          scaleX: 1,
          duration: 0.55,
          ease: "power2.out",
          transformOrigin: "left",
        },
        0.54,
      );

      // Counter flip
      gsap.to(counterNumRef.current, {
        y: -18,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          if (counterNumRef.current)
            counterNumRef.current.textContent = pad(clamped);
          gsap.fromTo(
            counterNumRef.current,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          );
        },
      });
    },
    [items, applyContent],
  );

  const goPrev = useCallback(() => go(currentRef.current - 1), [go]);
  const goNext = useCallback(() => go(currentRef.current + 1), [go]);

  // ── Init after data loaded ───────────────────────────────────────────────────
  useEffect(() => {
    if (!items.length) return;
    const first = items[0];
    if (imgARef.current) imgARef.current.src = (first as any).imageUrl ?? "";
    gsap.set(layerBRef.current, { clipPath: "inset(0 100% 0 0)" });
    applyContent(first, 0, items.length);
    buildProgress(items.length);

    // Entrance animation
    const els = [
      eyebrowRef.current,
      titleRef.current,
      subtitleRef.current,
      ruleRef.current,
      descRef.current,
    ].filter(Boolean);
    gsap.fromTo(
      els,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.2,
      },
    );
    gsap.fromTo(
      layerARef.current,
      { scale: 1.06 },
      { scale: 1, duration: 1.4, ease: "power3.out" },
    );
  }, [items, applyContent, buildProgress]);

  // ── Keyboard navigation ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  // ── Touch swipe ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) dx < 0 ? goNext() : goPrev();
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goPrev, goNext]);

  // ── Custom cursor ────────────────────────────────────────────────────────────
  useEffect(() => {
    const hideCursor = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const applyCursor = (isRightSide: boolean) => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
        cursorRef.current.style.background = isRightSide ? "#FF9933" : "#fff";
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = "1";
        ringRef.current.style.borderColor = isRightSide
          ? "rgba(255, 153, 51, 0.5)"
          : "rgba(255,255,255,0.35)";
      }
    };

    const isMouseOverSection = (e: MouseEvent) => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      const insideRect =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      const containsTarget = sectionRef.current.contains(e.target as Node);
      return insideRect || containsTarget;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (!sectionRef.current) {
        hideCursor();
        return;
      }

      if (isMouseOverSection(e)) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isRightSide = e.clientX > rect.left + rect.width / 2;
        applyCursor(isRightSide);
      } else {
        hideCursor();
      }
    };

    const onLeave = () => hideCursor();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouse.current.x}px`;
        cursorRef.current.style.top = `${mouse.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onBtnEnter = () => {
    if (!ringRef.current || !cursorRef.current) return;
    const isRightSide = mouse.current.x > window.innerWidth / 2;
    ringRef.current.style.width = "52px";
    ringRef.current.style.height = "52px";
    ringRef.current.style.borderColor = isRightSide
      ? "rgba(255, 153, 51, 0.7)"
      : "rgba(255,255,255,0.7)";
  };
  const onBtnLeave = () => {
    if (!ringRef.current) return;
    const isRightSide = mouse.current.x > window.innerWidth / 2;
    ringRef.current.style.width = "34px";
    ringRef.current.style.height = "34px";
    ringRef.current.style.borderColor = isRightSide
      ? "rgba(255, 153, 51, 0.35)"
      : "rgba(255,255,255,0.35)";
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Custom cursor ── */}
      <div
        ref={cursorRef}
        className="fixed z-[9999] pointer-events-none"
        style={{
          width: 7,
          height: 7,
          background: "#fff",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          opacity: 0,
          transition: "opacity 0.2s ease",
          top: 0,
          left: 0,
        }}
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none"
        style={{
          width: 34,
          height: 34,
          border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          opacity: 0,
          transition:
            "width 0.3s, height 0.3s, border-color 0.3s, opacity 0.2s ease",
          top: 0,
          left: 0,
        }}
      />

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{
          height: "100svh",
          minHeight: 600,
          background: "#0c0c0a",
          cursor: "none",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* ════════════════════════════════════════════
            LEFT PANEL — Image
        ════════════════════════════════════════════ */}
        <div className="relative overflow-hidden">
          {/* Layer A */}
          <div
            ref={layerARef}
            className="absolute inset-0"
            style={{ willChange: "clip-path, transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgARef}
              src="/images/gallery_pic1.jpg"
              alt="Featured gallery image"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
          </div>

          {/* Layer B */}
          <div
            ref={layerBRef}
            className="absolute inset-0"
            style={{
              clipPath: "inset(0 100% 0 0)",
              willChange: "clip-path, transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgBRef}
              src="/images/gallery_pic1.jpg"
              alt="Next gallery image"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
          </div>

          {/* Edge gradient toward right panel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(12,12,10,0) 70%, rgba(12,12,10,0.5) 100%)",
              zIndex: 4,
            }}
          />

          {/* Loading shimmer */}
          {loading && (
            <div
              className="absolute inset-0 bg-white/5 animate-pulse"
              style={{ zIndex: 5 }}
            />
          )}

          {/* Image caption — bottom left */}
          <div className="absolute bottom-10 left-10 z-10">
            <div
              ref={capLocRef}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.05em",
              }}
            />
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "50%",
            width: 1,
            background: "rgba(0,0,0,0.08)",
            zIndex: 20,
          }}
        />

        {/* ════════════════════════════════════════════
            RIGHT PANEL — Info
        ════════════════════════════════════════════ */}
        <div
          className="relative flex flex-col justify-between"
          style={{
            padding: "48px 56px",
            background: "#fafafa",
            zIndex: 10,
          }}
        >
          {/* Top-left label */}
          <div>
            <h2 className="font-playfair text-[36px] font-bold leading-[1.15] text-slate-900 sm:text-[40px]">
              Glimpses into our <br></br>
              <em
                className="italic"
                style={{
                  background: "linear-gradient(135deg,#FF9933,#ea580c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                vibrant life
              </em>
              <br></br>
              across the peninsula
            </h2>
          </div>

          {/* Large counter — top right */}
          {!loading && (
            <div
              className="absolute flex items-start gap-1"
              style={{ top: 40, right: 56 }}
            >
              <div
                ref={counterNumRef}
                style={{
                  fontSize: "clamp(80px, 7vw, 110px)",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "#e2e8f0",
                  letterSpacing: "-0.02em",
                }}
              >
                01
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                  marginTop: 16,
                }}
              >
                / {pad(items.length - 1)}
              </div>
            </div>
          )}

          {/* ── Center content ── */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: 56,
              right: 56,
              transform: "translateY(-50%)",
            }}
          >
            {/* Eyebrow */}
            <div style={{ overflow: "hidden", marginBottom: 22 }}>
              <div
                ref={eyebrowRef}
                style={{
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#FF9933",
                  fontWeight: 700,
                }}
              />
            </div>

            {/* Title */}
            <div style={{ overflow: "hidden", marginBottom: 14 }}>
              <div
                ref={titleRef}
                style={{
                  fontSize: "clamp(32px, 3.2vw, 52px)",
                  fontWeight: 500,
                  lineHeight: 1.07,
                  letterSpacing: "0.02em",
                  color: "#1e293b",
                }}
              />
            </div>

            {/* Subtitle / tag */}
            <div style={{ overflow: "hidden", marginBottom: 36 }}>
              <div
                ref={subtitleRef}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#64748b",
                }}
              />
            </div>

            {/* Rule */}
            <div
              ref={ruleRef}
              style={{
                width: 40,
                height: 1,
                background: "linear-gradient(90deg, #FF9933 0%, #138808 100%)",
                marginBottom: 32,
                transformOrigin: "left",
              }}
            />

            {/* Description */}
            <div style={{ overflow: "hidden" }}>
              <div
                ref={descRef}
                style={{
                  fontSize: 11,
                  lineHeight: 1.9,
                  color: "#475569",
                  maxWidth: 280,
                  letterSpacing: "0.04em",
                }}
              />
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-10">
              <button
                onClick={goPrev}
                onMouseEnter={onBtnEnter}
                onMouseLeave={onBtnLeave}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  opacity: loading ? 0.3 : 0.6,
                  transition: "opacity 0.3s",
                }}
                className="group hover:!opacity-100"
              >
                <div
                  className="group-hover:w-12 transition-all duration-300"
                  style={{
                    width: 24,
                    height: 1,
                    background:
                      "linear-gradient(90deg, #FF9933 0%, #138808 100%)",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#1e293b",
                  }}
                >
                  Prev
                </span>
              </button>

              <button
                onClick={goNext}
                onMouseEnter={onBtnEnter}
                onMouseLeave={onBtnLeave}
                disabled={loading}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  opacity: loading ? 0.3 : 0.6,
                  transition: "opacity 0.3s",
                }}
                className="group hover:!opacity-100"
              >
                <div
                  className="group-hover:w-12 transition-all duration-300"
                  style={{
                    width: 24,
                    height: 1,
                    background:
                      "linear-gradient(90deg, #FF9933 0%, #138808 100%)",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#1e293b",
                  }}
                >
                  Next
                </span>
              </button>
            </div>

            {/* Vertical progress bars */}
            {!loading && (
              <div
                ref={progressRef}
                className="flex flex-col items-end gap-[5px]"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GallerySection;
