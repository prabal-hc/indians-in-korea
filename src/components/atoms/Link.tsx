interface LinkProps {
  href: string;
  children: React.ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  target,
  rel,
  className = "",
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`font-medium text-zinc-950 dark:text-zinc-50 ${className}`}
    >
      {children}
    </a>
  );
};
