# Content Guide (for non-developers)

This site's content — products, services, certifications, testimonials, and
posts — lives as plain files in the `/content` folder. You don't need to touch
any other part of the codebase to add or edit content.

Every file is checked automatically when the site builds. If something is
missing or misspelled in a way the site doesn't expect, the build will fail
with a clear error message pointing at the exact file — it will never let a
broken entry go live silently.

## Adding a product

1. Go to `/content/products/`.
2. Copy an existing file in the same category (e.g. copy
   `abc-dry-powder-extinguisher-6kg.json` to add another extinguisher).
3. Rename the file to match your new product, using lowercase words separated
   by hyphens, e.g. `co2-extinguisher-2kg.json`.
4. Edit the fields inside — `slug` must match the filename (without `.json`).
   `category` must be one of the slugs listed in `/content/categories.ts`.
5. Replace the `images` path once you have a real product photo (drop the
   image in `/public/products/` and point `src` at it, e.g.
   `/products/co2-extinguisher-2kg.jpg`). Always write a real, descriptive
   `alt` — this is what shows in Google Images and to screen readers.
6. Save. The product page is generated automatically at
   `/products/[category]/[slug]`.

## Adding a new product category

Open `/content/categories.ts` and add a new entry to the list, following the
existing pattern. The category page, navigation filter, and routing pick it up
automatically — you don't need to edit anything else.

## Adding an Update (news/product-update post)

1. Go to `/content/updates/`.
2. Copy an existing `.mdx` file.
3. Rename it to your new post's slug, e.g. `new-product-launch.mdx`.
4. Edit the frontmatter (the `---` block at the top): `title`, `slug` (must
   match filename), `description`, and `date` (format `YYYY-MM-DD`).
5. Write the post body below the second `---` in plain text / Markdown.
6. Save. The post appears on `/projects` automatically, most recent first.

Post updates often — this feed is a deliberate SEO freshness signal, so
regular short posts (even a few sentences) are more valuable than infrequent
long ones.

## Adding a Resource (long-form guide / case study)

Same process as Updates, but in `/content/resources/`. These are meant to be
longer, more in-depth articles — guides, how-tos, case studies — that support
search rankings for specific topics.

## Adding a Service

Go to `/content/services/`, copy an existing `.mdx` file, and follow the same
pattern. Services also have an `order` field controlling their position on the
`/services` page (lower numbers appear first).

## Adding a Certification

Go to `/content/certifications/`, copy an existing `.json` file. Replace the
`SAMPLE` placeholder values with the real certificate name, issuer, reference
number and validity date once available, and add the real logo to
`/public/certifications/`.

## Adding a Testimonial

Go to `/content/testimonials/`, copy an existing `.json` file. Only publish a
client's name and company if they've agreed to it being public — otherwise
use a role/company description without a full name.

## Things to avoid

- Don't remove the `slug` field or change it without also renaming the file —
  they must always match.
- Don't leave a `category` on a product that doesn't exist in
  `categories.ts` — the build will reject it.
- Keep `alt` text on every image descriptive and specific (e.g. "6kg ABC dry
  powder fire extinguisher with mounting bracket") rather than generic
  ("image1" or "product photo").
