import React from "react";

interface FloatingCardProps {
  title: string;
  subtitle: string;
  icon?: string;
  position?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  ({ title, subtitle, icon, position = "", className = "" }, ref) => {
    const positionStyles: Record<string, string> = {
      "top-right": "absolute top-8 right-8 md:top-24 md:right-0",
      "middle-right": "absolute right-0 top-1/3 md:right-8",
      "bottom-center": "absolute bottom-12 left-1/2 transform -translate-x-1/2",
    };

    return (
      <div
        ref={ref}
        data-floating-card
        className={`${positionStyles[position] || ""} bg-white rounded-2xl shadow-lg p-4 md:p-6 max-w-xs z-10 ${className}`}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <div className="text-2xl md:text-3xl flex-shrink-0">{icon}</div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">
              {title}
            </h4>
            <p className="text-gray-600 text-xs md:text-sm">{subtitle}</p>
          </div>
        </div>
      </div>
    );
  },
);

FloatingCard.displayName = "FloatingCard";
