import Image from "next/image";

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  src,
  alt,
  width = 100,
  height = 20,
  priority = false,
  className = "",
}) => {
  return (
    <Image
      className={`dark:invert ${className}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  );
};
