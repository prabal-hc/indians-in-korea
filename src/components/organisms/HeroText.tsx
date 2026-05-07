import React from "react";
import { Button } from "@/components/atoms";

interface HeroTextProps {
  badge: string;
  headline: string;
  highlightWord: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
    icon?: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export const HeroText: React.FC<HeroTextProps> = ({
  badge,
  headline,
  highlightWord,
  description,
  primaryCta,
  secondaryCta,
}) => {
  // Split headline to highlight specific word
  const headlineParts = headline.split(highlightWord);

  return (
    <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-2 rounded-full w-fit">
        <span className="text-base sm:text-lg">⊙</span>
        <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase">
          {badge}
        </span>
      </div>

      {/* Headline with highlight */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          {headlineParts[0]}
          <span className="text-orange-500">{highlightWord}</span>
          {headlineParts[1]}
        </h1>
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-lg md:max-w-xl leading-relaxed">
        {description}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <Button
          variant="primary"
          href={primaryCta.href}
          icon={primaryCta.icon}
          className="text-base"
        >
          {primaryCta.label}
        </Button>
        <Button
          variant="secondary"
          href={secondaryCta.href}
          className="text-base"
        >
          {secondaryCta.label}
        </Button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 md:gap-8 pt-6 border-t border-gray-200">
        <div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500">
            5k+
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Members</p>
        </div>
        <div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500">
            120+
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Events</p>
        </div>
        <div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500">
            15+
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Organizations</p>
        </div>
      </div>
    </div>
  );
};
