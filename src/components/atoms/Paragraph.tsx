interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className = "",
}) => {
  const baseStyles = "text-zinc-600 dark:text-zinc-400 text-lg leading-8";

  return <p className={`${baseStyles} ${className}`}>{children}</p>;
};
