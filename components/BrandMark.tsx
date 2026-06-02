import Image from "next/image";

/**
 * Brand mark served directly from official assets.
 */
export function BrandMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <Image
      src="/brand/kismet-icon.svg"
      alt={title ?? "Kismet brand mark"}
      width={1500}
      height={1500}
      className={className}
    />
  );
}
