import Image from "next/image";

interface IconButtonProps {
  href: string;
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  label: string;
  target?: "_blank" | "_self";
  rel?: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  href,
  icon,
  label,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
}) => {
  return (
    <a
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px] ${className}`}
      href={href}
      target={target}
      rel={rel}
    >
      <Image
        className="dark:invert"
        src={icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
      />
      {label}
    </a>
  );
};
