import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  alt?: string;
};

/** Sized wrapper avoids Next.js width/height aspect-ratio warnings. */
export function BrandLogo({
  className,
  priority = false,
  alt = "Ethical Certifications",
}: BrandLogoProps) {
  return (
    <span className={cn("relative inline-block h-9 w-[148px] md:h-10", className)}>
      <Image
        src="/assets/logo/etcert-logo-official.png"
        alt={alt}
        fill
        sizes="(max-width: 768px) 148px, 160px"
        className="object-contain object-left"
        priority={priority}
      />
    </span>
  );
}
