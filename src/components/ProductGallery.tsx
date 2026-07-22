"use client";

import { useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { cn } from "@/lib/utils";

export type ProductGalleryImage = {
  image?: string | null;
  alt?: string | null;
} | null;

type ProductGalleryProps = {
  gallery: ProductGalleryImage[] | null | undefined;
  /** Used as the alt text fallback for any image missing its own alt. */
  fallbackAlt: string;
  className?: string;
};

const SWIPE_THRESHOLD_PX = 40;

/**
 * Product image gallery: a large featured photo with a thumbnail strip
 * underneath. Thumbnails scroll horizontally as a touch-friendly slider on
 * narrow screens and settle into a fixed grid from `sm:` up. The featured
 * photo also responds to left/right swipes on touch devices and arrow-key
 * presses, so it behaves like a small carousel without pulling in a slider
 * dependency.
 */
export function ProductGallery({ gallery, fallbackAlt, className }: ProductGalleryProps) {
  const images = (gallery ?? []).filter(
    (img): img is NonNullable<ProductGalleryImage> & { image: string } => !!img?.image
  );
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (images.length === 0) return null;

  const current = images[active];
  const hasMultiple = images.length > 1;

  function show(index: number) {
    const next = (index + images.length) % images.length;
    setActive(next);
    thumbRefs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    show(active + (delta < 0 ? 1 : -1));
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Featured photo */}
      <div
        data-tina-field={tinaField(current, "image")}
        className="group relative aspect-[4/3] touch-pan-y overflow-hidden rounded-lg bg-paper-200"
        onTouchStart={hasMultiple ? handleTouchStart : undefined}
        onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
        role={hasMultiple ? "group" : undefined}
        aria-roledescription={hasMultiple ? "carousel" : undefined}
        aria-label={hasMultiple ? `${current.alt || fallbackAlt} — image ${active + 1} of ${images.length}` : undefined}
        tabIndex={hasMultiple ? 0 : undefined}
        onKeyDown={
          hasMultiple
            ? (e) => {
                if (e.key === "ArrowRight") show(active + 1);
                if (e.key === "ArrowLeft") show(active - 1);
              }
            : undefined
        }
      >
        <Image
          key={current.image}
          src={current.image}
          alt={current.alt || fallbackAlt}
          fill
          quality={80}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          {...(active === 0 ? { priority: true } : { loading: "lazy" as const })}
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => show(active - 1)}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 shadow transition-opacity focus-visible:opacity-100 group-hover:opacity-100 sm:h-10 sm:w-10"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => show(active + 1)}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 shadow transition-opacity focus-visible:opacity-100 group-hover:opacity-100 sm:h-10 sm:w-10"
            >
              <ChevronIcon direction="right" />
            </button>
            <div className="absolute bottom-2 right-2 rounded bg-ink-900/70 px-2 py-0.5 font-mono text-xs text-white sm:hidden">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail slider */}
      {hasMultiple && (
        <div
          role="tablist"
          aria-label={`${fallbackAlt} thumbnails`}
          className="mt-3 -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.image}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              data-tina-field={tinaField(img, "image")}
              onClick={() => show(i)}
              className={cn(
                "relative aspect-square w-16 flex-none shrink-0 snap-start overflow-hidden rounded border bg-paper-200 transition sm:w-auto",
                i === active
                  ? "border-ink-900 ring-2 ring-ink-900/20"
                  : "border-paper-300 hover:border-ink-400"
              )}
            >
              <Image
                src={img.image}
                alt={img.alt || fallbackAlt}
                fill
                loading="lazy"
                quality={80}
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-5 w-5", direction === "left" && "rotate-180")}
      aria-hidden="true"
    >
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
