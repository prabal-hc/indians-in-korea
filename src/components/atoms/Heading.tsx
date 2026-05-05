interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  className = "",
}) => {
  const baseStyles =
    "text-black dark:text-zinc-50 font-semibold leading-10 tracking-tight";

  const sizeStyles: Record<number, string> = {
    1: "text-3xl max-w-xs",
    2: "text-2xl max-w-sm",
    3: "text-xl max-w-md",
    4: "text-lg max-w-lg",
    5: "text-base max-w-xl",
    6: "text-sm max-w-2xl",
  };

  const Component = `h${level}` as const;

  return (
    <Component className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
      {children}
    </Component>
  );
};
