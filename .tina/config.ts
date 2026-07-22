import { defineConfig } from "tinacms";
import { categories } from "../content/categories";

/**
 * TinaCMS configuration.
 *
 * Only the "product" collection is Tina-managed — every other content type
 * (services, resources, updates, certifications, testimonials, categories)
 * still lives on the plain JSON/MDX + Zod loader in src/lib/content.ts.
 *
 * Local editing works out of the box with `npm run tina-dev` — no Tina Cloud
 * account required. To enable hosted collaborative editing later, set
 * NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN (from app.tina.io) and this same
 * config switches over automatically.
 */

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "product",
        label: "Products",
        path: "content/products",
        format: "mdx",
        ui: {
          // "Open the live page" link in the top-right of the Tina editor.
          router: ({ document }) =>
            `/products/${document._values.category}/${document._values.slug}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
            description:
              "URL slug — must stay unique within the product's category. Changing this changes the live URL, so treat it as a one-time value once the page is published and indexed.",
          },
          {
            type: "string",
            name: "metaTitle",
            label: "Meta Title",
            required: true,
            description: "Search-engine title tag. Keep to 60 characters or fewer.",
            ui: {
              validate: (value) =>
                value && value.length > 60
                  ? `Meta title is ${value.length} characters — keep it to 60 or fewer so Google doesn't truncate it.`
                  : undefined,
            },
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description",
            required: true,
            ui: {
              component: "textarea",
              validate: (value) =>
                value && value.length > 160
                  ? `Meta description is ${value.length} characters — keep it to 160 or fewer so Google doesn't truncate it.`
                  : undefined,
            },
            description:
              "Search-engine snippet text. Also used as the short blurb on product cards and listing pages. Keep to 160 characters or fewer.",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: categories.map((c) => ({ value: c.slug, label: c.name })),
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            isBody: true,
            required: true,
            description: "Full product description shown on the product page.",
          },
          {
            type: "object",
            name: "gallery",
            label: "Gallery",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.alt || "Image" }),
              defaultItem: { alt: "" },
            },
            fields: [
              {
                type: "image",
                name: "image",
                label: "Image",
                required: true,
              },
              {
                type: "string",
                name: "alt",
                label: "Alt text",
                required: true,
                description: "Describes the image for accessibility and image SEO — never leave this blank.",
              },
            ],
          },

          // --- Fields below aren't in the minimal brief but back real,
          // already-live product-page features (spec table, SKU badge,
          // featured-products rail, search tags). Dropping them would
          // regress the catalog, so they're carried over from the
          // pre-Tina schema rather than the description body.
          {
            type: "string",
            name: "sku",
            label: "SKU / Model Code",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured on homepage",
          },
          {
            type: "string",
            name: "tags",
            label: "Search Tags",
            list: true,
          },
          {
            type: "object",
            name: "specs",
            label: "Specifications",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "Spec" }),
            },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "value", label: "Value", required: true },
            ],
          },
        ],
      },
    ],
  },
});
