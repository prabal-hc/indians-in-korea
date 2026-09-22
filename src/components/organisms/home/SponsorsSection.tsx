"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getActive, type SponsorItem } from "@/services/admin/sponsors.service";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const toHref = (url?: string | null) => {
  if (!url) return undefined;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const Sk = () => (
  <div className="h-28 animate-pulse rounded-2xl bg-orange-100/50" />
);

export const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActive().then((data) => {
      setSponsors(data);
      setLoading(false);
    });
  }, []);

  if (!loading && sponsors.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50/70 via-white to-green-50/50 px-4 py-20 sm:px-8 lg:px-16"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#FF9933]/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#138808]/6 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold uppercase tracking-widest text-orange-500"
          >
            Our Partners
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[32px] font-bold leading-[1.15] text-slate-900 sm:text-[40px]"
          >
            Proudly supported by our{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(135deg,#FF9933,#ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              sponsors
            </em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-md text-[13px] leading-[1.85] text-slate-500"
          >
            Thank you to the organisations that help us bring the Indian
            community in Korea together.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Sk key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-4"
          >
            {sponsors.map((sponsor) => {
              const href = toHref(sponsor.websiteUrl);
              return (
                <motion.a
                  key={sponsor.id}
                  variants={fadeUp}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name}
                  className="group relative flex h-28 w-[calc(50%-0.5rem)] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9933]/40 hover:shadow-md sm:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)]"
                >
                  <div className="absolute inset-x-0 top-0 flex h-[3px]">
                    <span className="flex-1 bg-[#FF9933]" />
                    <span className="flex-1 bg-slate-100" />
                    <span className="flex-1 bg-[#138808]" />
                  </div>

                  {sponsor.logoUrl ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        fill
                        className="object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  ) : (
                    <span className="text-center text-sm font-semibold leading-snug text-slate-700 transition-colors duration-300 group-hover:text-[#ea580c]">
                      {sponsor.name}
                    </span>
                  )}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
