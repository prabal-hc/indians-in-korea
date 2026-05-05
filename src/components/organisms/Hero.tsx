"use client";

import { useHeroAnimations } from "@/hooks";
import { HeroText } from "./HeroText";
import { HeroVisual } from "./HeroVisual";
import { HERO_CONSTANTS } from "@/constants";

export const Hero = () => {
  const { containerRef, textRef, visualRef } = useHeroAnimations();

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-orange-50 to-blue-50 overflow-hidden"
    >
      <div className="mx-10 px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-28">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Text Section */}
          <div ref={textRef}>
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
          <div ref={visualRef} className="flex items-center justify-center">
            <HeroVisual floatingCards={HERO_CONSTANTS.floatingCards} />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="hero-blob-1 absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="hero-blob-2 absolute bottom-0 left-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20 -z-10" />
      </div>
    </section>
  );
};
