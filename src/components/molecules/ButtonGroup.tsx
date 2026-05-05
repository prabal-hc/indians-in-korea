import { EXTERNAL_LINKS } from "@/constants";
import { IconButton } from "./IconButton";
import { SecondaryButton } from "./SecondaryButton";

interface ButtonGroupProps {
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-col gap-4 text-base font-medium sm:flex-row ${className}`}
    >
      <IconButton
        href={EXTERNAL_LINKS.deployVercel}
        icon={{
          src: "/vercel.svg",
          alt: "Vercel logomark",
          width: 16,
          height: 16,
        }}
        label="Deploy Now"
      />
      <SecondaryButton
        href={EXTERNAL_LINKS.documentation}
        label="Documentation"
      />
    </div>
  );
};
