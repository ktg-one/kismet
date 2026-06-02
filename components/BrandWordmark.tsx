import Image from "next/image";

/**
 * Full brand lockup served from official assets.
 */
export function BrandWordmark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <Image
      src="/brand/kismet-wordmark.svg"
      alt={title ?? "Kismet Finance Group"}
      width={940}
      height={165}
      className={className}
    />
  );
}
