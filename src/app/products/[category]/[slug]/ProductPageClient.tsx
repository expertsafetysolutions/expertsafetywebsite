"use client";

import Link from "next/link";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { ProductQuery } from "../../../../../.tina/__generated__/types";
import { productSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { telLink, whatsappLink } from "@/lib/site";
import type { Category } from "@content/categories";
import type { Product } from "@/lib/content";

type TinaProps = {
  data: ProductQuery;
  query: string;
  variables: Record<string, unknown>;
};

/**
 * Client component — this is where TinaCMS live visual editing is wired up.
 *
 * `useTina` re-hydrates `tinaProps.data` with live, unsaved edits whenever
 * this page is rendered inside the Tina admin's editing iframe (outside the
 * iframe — i.e. for every real site visitor — it's a no-op and just returns
 * the statically-fetched data, so there's no runtime cost to regular
 * visitors).
 *
 * `tinaField(source, fieldName)` stamps a `data-tina-field` attribute onto
 * the element so the Tina sidebar can highlight it and jump straight to that
 * field when an editor clicks it on the live preview — that's the
 * "click an element, edit it in the sidebar" behaviour.
 */
export function ProductPageClient({
  tinaProps,
  category,
  related,
}: {
  tinaProps: TinaProps;
  category: Category;
  related: Product[];
}) {
  const { data } = useTina(tinaProps);
  const product = data.product;

  const gallery = product.gallery ?? [];
  const specs = product.specs ?? [];
  const path = `/products/${product.category}/${product.slug}`;

  return (
    <>
      <JsonLd
        data={productSchema({
          name: product.title,
          description: product.metaDescription,
          image: gallery[0]?.image ?? "",
          path,
          category: category.name,
          sku: product.sku ?? undefined,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
          { name: product.title, href: path },
        ]}
      />

      <Section className="pt-10 sm:pt-14" edge>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductGallery gallery={gallery} fallbackAlt={product.title} />

          {/* Details */}
          <div>
            <Link href={`/products/${category.slug}`} className="eyebrow inline-block">
              {category.name}
            </Link>
            <h1
              data-tina-field={tinaField(product, "title")}
              className="mt-3 text-balance font-display text-3xl font-extrabold text-ink-900 sm:text-4xl"
            >
              {product.title}
            </h1>
            {product.sku && (
              <Badge tone="ink" mono className="mt-3" data-tina-field={tinaField(product, "sku")}>
                {product.sku}
              </Badge>
            )}
            <div
              data-tina-field={tinaField(product, "description")}
              className="prose-product mt-5 text-base leading-relaxed text-steel"
            >
              <TinaMarkdown
                content={product.description}
                components={{
                  p: (props: { children: JSX.Element } | undefined) => (
                    <p className="mb-4 last:mb-0">{props?.children}</p>
                  ),
                }}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#enquire"
                className="inline-flex items-center justify-center gap-2 rounded bg-signal px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-signal-600"
              >
                Request a Quote
              </a>
              <a
                href={whatsappLink(`Hi, I'd like to enquire about: ${product.title} (${product.sku ?? ""})`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-ink-200 bg-white px-6 py-3.5 text-base font-semibold text-ink-900 transition-colors hover:border-ink-400"
              >
                WhatsApp Enquiry
              </a>
              <a
                href={telLink()}
                className="inline-flex items-center justify-center gap-2 rounded border border-ink-200 bg-white px-6 py-3.5 text-base font-semibold text-ink-900 transition-colors hover:border-ink-400"
              >
                Call to Enquire
              </a>
            </div>

            {specs.length > 0 && (
              <div className="mt-10" data-tina-field={tinaField(product, "specs")}>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-steel">
                  Specifications
                </h2>
                <dl className="mt-3 divide-y divide-paper-300 rounded-lg border border-paper-300 bg-white">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between gap-4 px-4 py-3 text-sm">
                      <dt className="text-steel">{spec?.label}</dt>
                      <dd className="text-right font-medium text-ink-900">{spec?.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Enquiry form */}
      <Section id="enquire" className="bg-paper-100" pattern="dots">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Request a quote for {product.title}
          </h2>
          <p className="mt-2 text-sm text-steel">
            Share your quantity and site details — we&apos;ll respond with pricing
            and lead time.
          </p>
          <EnquiryForm context={`${product.title} (${product.sku ?? "no SKU"})`} className="mt-8" />
        </div>
      </Section>

      {/* Related products */}
      {related.length > 0 && (
        <Section pattern="diagonal">
          <h2 className="font-display text-2xl font-bold text-ink-900">Related products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
