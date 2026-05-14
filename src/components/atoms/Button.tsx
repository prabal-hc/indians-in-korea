import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 ease-in-out",
  secondary:
    "bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-200 font-semibold px-8 py-3 rounded-full transition-colors duration-300 ease-in-out",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  icon,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 min-w-max focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const baseClass = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {children}
        {icon && <span>{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
};
