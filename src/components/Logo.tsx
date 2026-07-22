import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Brand mark (source: assets/expert related/Expert Watermark Logo.jpg,
 * 1200x635 ≈ 1.89:1). The logo uses black text, which disappears against the
 * site's dark navy header/footer — so it always renders on an explicit white
 * card rather than directly on the page background. Sized via Tailwind height
 * utilities on `imgClassName`; intrinsic width/height below just prevent
 * layout shift before the image paints.
 */
export function Logo({
  className,
  imgClassName = "h-8 lg:h-10",
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "inline-flex items-center rounded bg-white px-2.5 py-1.5 shadow-sm",
        className,
      )}
    >
      <Image
        src="/brand/expert-logo.png"
        alt={site.name}
        width={200}
        height={106}
        priority
        className={cn("w-auto", imgClassName)}
      />
    </Link>
  );
}
