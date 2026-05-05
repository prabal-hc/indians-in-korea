import { Heading, Paragraph } from "@/components/atoms";

interface TextSectionProps {
  title: string;
  description: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const TextSection: React.FC<TextSectionProps> = ({
  title,
  description,
  centered = false,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <Heading level={1}>{title}</Heading>
      <Paragraph className="max-w-md">{description}</Paragraph>
    </div>
  );
};
