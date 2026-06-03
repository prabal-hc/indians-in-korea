"use client";

import { useEffect, useState } from "react";
import { useHeroAnimations } from "@/hooks";
import { HeroText } from "./HeroText";
import { HeroVisual } from "./HeroVisual";
import { HERO_CONSTANTS } from "@/constants";
import * as announcementsService from "@/services/admin/announcements.service";

export const Hero = () => {
  const { containerRef, textRef, visualRef } = useHeroAnimations();
  const [flashNews, setFlashNews] = useState<{
    headline: string;
    tag: string;
  } | null>(null);
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const [breakingText, setBreakingText] = useState<string>("");

  useEffect(() => {
    const loadHeroData = async () => {
      const announcements = await announcementsService.getAll();
      const sortedAnnouncements = [...announcements].sort(
        (a, b) => a.display_order - b.display_order,
      );

      if (sortedAnnouncements.length > 0) {
        const [first] = sortedAnnouncements;

        setFlashNews({
          headline: first.description || first.title || "Untitled announcement",
          tag: first.publishedAt
            ? new Date(first.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "Latest",
        });

        setTickerItems(
          sortedAnnouncements
            .slice(1, 5)
            .map(
              (item) =>
                item.description || item.title || "Untitled announcement",
            ),
        );

        setBreakingText(
          sortedAnnouncements[2]?.description ||
            sortedAnnouncements[2]?.title ||
            sortedAnnouncements[1]?.description ||
            sortedAnnouncements[1]?.title ||
            first.description ||
            first.title ||
            "",
        );
      }
    };

    loadHeroData();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-linear-to-br from-orange-50 to-blue-50 overflow-hidden"
    >
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 px-4 md:px-8 lg:px-12 pt-30 sm:pt-20 pb-25 md:pb-30 lg:pb-32">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-10 md:gap-12 lg:gap-16 items-center min-h-[80vh]">
          {" "}
          {/* Text Section */}
          <div ref={textRef} className="order-2 lg:order-1">
            <HeroText
              badge={HERO_CONSTANTS.badge}
              headline={HERO_CONSTANTS.headline}
              highlightWord={HERO_CONSTANTS.highlightWord}
              description={HERO_CONSTANTS.description}
              primaryCta={HERO_CONSTANTS.primaryCta}
              secondaryCta={HERO_CONSTANTS.secondaryCta}
            />
          </div>
          {/* Visual Section */}
          <div
            ref={visualRef}
            className="flex items-center justify-center order-1 lg:order-2"
          >
            <HeroVisual
              floatingCards={HERO_CONSTANTS.floatingCards}
              flashNews={flashNews ?? undefined}
              tickerItems={tickerItems.length > 0 ? tickerItems : undefined}
              breakingText={breakingText || undefined}
            />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="hero-blob-1 absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="hero-blob-2 absolute bottom-0 left-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20 -z-10" />
      </div>
    </section>
  );
};
