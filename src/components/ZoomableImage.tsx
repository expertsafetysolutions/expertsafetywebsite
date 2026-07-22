"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Tap-to-zoom image (used for QR codes). Opens a full-screen lightbox on
 * click; closes on Escape, backdrop click, the close button, or the
 * browser/device back gesture — a history entry is pushed while open so
 * "back" dismisses the lightbox instead of navigating away from the page.
 */
export function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    window.history.pushState({ zoomedImage: true }, "");

    const close = () => window.history.back();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPopState = () => setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom in on ${alt}`}
        className={cn("block cursor-zoom-in", containerClassName)}
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => window.history.back()}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/95 p-6"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.history.back();
            }}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className="max-h-[85vh] max-w-[90vw] rounded-lg bg-white p-4 shadow-card-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
