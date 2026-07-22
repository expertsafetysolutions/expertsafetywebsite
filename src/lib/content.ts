import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { categories } from "@content/categories";

/**
 * Typed content layer.
 *
 * All site content lives as plain files under /content — JSON for structured
 * records (products, certifications, testimonials) and MDX for prose (services,
 * updates, resources). Every file is validated against a Zod schema at build
 * time, so a malformed entry fails the build loudly instead of rendering broken
 * markup in production.
 *
 * This is deliberately CMS-shaped: when a headless CMS is added later, only the
 * loader functions below need to change — every page consumes these types.
 *
 * See CONTENT-GUIDE.md for how to add an entry.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

const categorySlugs = categories.map((c) => c.slug) as [string, ...string[]];

// ---------------------------------------------------------------- schemas ---

const imageSchema = z.object({
  src: z.string(),
  /** Descriptive alt text — required for accessibility and image SEO. */
  alt: z.string().min(1),
});

/**
 * Products are Tina-managed MDX (see .tina/config.ts) — this schema mirrors
 * that collection's fields exactly so loadMdxCollection can validate the same
 * frontmatter Tina writes. `gallery` intentionally uses `image` (not `src`)
 * to match Tina's field name; `description` is the MDX body (Tina rich-text).
 */
const galleryImageSchema = z.object({
  image: z.string().min(1),
  alt: z.string().min(1),
});

export const productSchemaZ = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  metaTitle: z.string().min(1).max(60),
  metaDescription: z.string().min(1).max(160),
  category: z.enum(categorySlugs),
  gallery: z.array(galleryImageSchema).min(1),
  specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  /** Optional model/SKU code shown in mono and used in Product schema. */
  sku: z.string().optional(),
  featured: z.boolean().default(false),
  /** Free-text tags powering client-side search. */
  tags: z.array(z.string()).default([]),
});

export const certificationSchemaZ = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  issuer: z.string().min(1),
  /** Certificate/licence reference. Placeholder values are clearly marked. */
  reference: z.string().min(1),
  scope: z.string().min(1),
  validUntil: z.string().optional(),
  logo: z.string().optional(),
});

export const testimonialSchemaZ = z.object({
  slug: z.string().min(1),
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().optional(),
  company: z.string().min(1),
  location: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
});

const baseFrontmatter = {
  title: z.string().min(1),
  description: z.string().min(1),
};

export const serviceFrontmatterZ = z.object({
  ...baseFrontmatter,
  slug: z.string().min(1),
  summary: z.string().min(1),
  icon: z.enum(["testing", "maintenance", "training", "assessment"]),
  /** Bullet list of what the service includes. */
  includes: z.array(z.string()).default([]),
  order: z.number().default(99),
  image: imageSchema.optional(),
});

export const postFrontmatterZ = z.object({
  ...baseFrontmatter,
  slug: z.string().min(1),
  date: z.string(),
  updated: z.string().optional(),
  category: z.string().default("General"),
  image: imageSchema.optional(),
});

export type Product = z.infer<typeof productSchemaZ> & { body: string };
export type Certification = z.infer<typeof certificationSchemaZ>;
export type Testimonial = z.infer<typeof testimonialSchemaZ>;
export type Service = z.infer<typeof serviceFrontmatterZ> & { body: string };
export type Post = z.infer<typeof postFrontmatterZ> & { body: string };

// ---------------------------------------------------------------- helpers ---

function readDir(dir: string, ext: string): string[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(ext))
    .map((f) => path.join(full, f));
}

/** Parse + validate every JSON file in a content folder. */
function loadJsonCollection<S extends z.ZodTypeAny>(
  dir: string,
  schema: S,
): z.output<S>[] {
  return readDir(dir, ".json").map((file) => {
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(
        `Invalid content in ${path.relative(process.cwd(), file)}:\n${parsed.error.toString()}`,
      );
    }
    return parsed.data as z.output<S>;
  });
}

/** Parse + validate every MDX file in a content folder (frontmatter + body). */
function loadMdxCollection<S extends z.ZodTypeAny>(
  dir: string,
  schema: S,
): (z.output<S> & { body: string })[] {
  return readDir(dir, ".mdx").map((file) => {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${path.relative(process.cwd(), file)}:\n${parsed.error.toString()}`,
      );
    }
    return { ...(parsed.data as z.output<S>), body: content };
  });
}

// ---------------------------------------------------------------- products ---
//
// Products live as Tina-managed MDX (content/products/*.mdx). List/filter/
// sitemap views read them the same way services and resources are read —
// synchronously, straight off disk — because they don't need live editing.
// Only the single product detail page additionally fetches through the Tina
// GraphQL client (see src/app/products/[category]/[slug]/) so `useTina` can
// power click-to-edit visual editing there.

export function getAllProducts(): Product[] {
  return loadMdxCollection("products", productSchemaZ).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((p) => p.category === categorySlug);
}

export function getProduct(categorySlug: string, slug: string): Product | undefined {
  return getAllProducts().find(
    (p) => p.slug === slug && p.category === categorySlug,
  );
}

export function getFeaturedProducts(limit = 6): Product[] {
  const featured = getAllProducts().filter((p) => p.featured);
  return featured.slice(0, limit);
}

/**
 * Related products: same category first, excluding the current product.
 * Powers internal linking between catalogue pages.
 */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return getAllProducts()
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

// ---------------------------------------------------------------- services ---

export function getAllServices(): Service[] {
  return loadMdxCollection("services", serviceFrontmatterZ).sort(
    (a, b) => a.order - b.order,
  );
}

export function getService(slug: string): Service | undefined {
  return getAllServices().find((s) => s.slug === slug);
}

// ------------------------------------------------------ posts (2 feeds) ---

/** Long-form SEO content: guides, how-tos, case studies. */
export function getAllResources(): Post[] {
  return loadMdxCollection("resources", postFrontmatterZ).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
}

export function getResource(slug: string): Post | undefined {
  return getAllResources().find((p) => p.slug === slug);
}

/** Short, frequently-posted company/product news — the freshness signal. */
export function getAllUpdates(): Post[] {
  return loadMdxCollection("updates", postFrontmatterZ).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
}

export function getUpdate(slug: string): Post | undefined {
  return getAllUpdates().find((p) => p.slug === slug);
}

// ------------------------------------------- certifications & testimonials ---

export function getAllCertifications(): Certification[] {
  return loadJsonCollection("certifications", certificationSchemaZ);
}

export function getAllTestimonials(): Testimonial[] {
  return loadJsonCollection("testimonials", testimonialSchemaZ);
}

/** Aggregate rating for Review/AggregateRating schema on testimonials. */
export function getAggregateRating(): { ratingValue: number; reviewCount: number } | null {
  const list = getAllTestimonials();
  if (list.length === 0) return null;
  const total = list.reduce((sum, t) => sum + t.rating, 0);
  return {
    ratingValue: Number((total / list.length).toFixed(1)),
    reviewCount: list.length,
  };
}
