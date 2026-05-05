interface SecondaryButtonProps {
  href: string;
  label: string;
  target?: "_blank" | "_self";
  rel?: string;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  href,
  label,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
}) => {
  return (
    <a
      className={`flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px] ${className}`}
      href={href}
      target={target}
      rel={rel}
    >
      {label}
    </a>
  );
};
