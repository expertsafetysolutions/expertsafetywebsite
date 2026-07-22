import type { Metadata } from "next";
import { site } from "./site";

type PageSeoInput = {
  title: string;
  description: string;
  /** Absolute or root-relative path, e.g. "/products/fire-extinguishers". */
  path: string;
  /** Only pass when a real photo exists for this page; otherwise the
   *  site-wide generated opengraph-image.tsx card is used automatically. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/**
 * Build per-page metadata with a unique title/description, canonical URL, and
 * Open Graph + Twitter cards. Every page should call this so no two pages share
 * a title and every URL is canonicalised (important during catalog migration).
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex,
}: PageSeoInput): Metadata {
  const canonical = path === "/" ? "/" : path;
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
