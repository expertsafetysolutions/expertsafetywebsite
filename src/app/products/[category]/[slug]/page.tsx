import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { buildMetadata } from "@/lib/seo";
import { productSchema } from "@/lib/schema";
import { getCategory } from "@content/categories";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { telLink, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ category: p.category, slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Metadata {
  const product = getProduct(params.category, params.slug);
  if (!product) return {};
  return buildMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: `/products/${product.category}/${product.slug}`,
  });
}

export default function ProductDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const product = getProduct(params.category, params.slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = getRelatedProducts(product, 3);
  const path = `/products/${product.category}/${product.slug}`;

  return (
    <>
      <JsonLd
        data={productSchema({
          name: product.title,
          description: product.metaDescription,
          image: product.gallery[0]?.image ?? "",
          path,
          category: category.name,
          sku: product.sku,
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
          <ProductGallery gallery={product.gallery} fallbackAlt={product.title} />

          {/* Details */}
          <div>
            <Link href={`/products/${category.slug}`} className="eyebrow inline-block">
              {category.name}
            </Link>
            <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
              {product.title}
            </h1>
            {product.sku && (
              <Badge tone="ink" mono className="mt-3">
                {product.sku}
              </Badge>
            )}
            <div className="prose-ess mt-5 text-base text-steel">
              <MDXRemote source={product.body} />
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

            {product.specs.length > 0 && (
              <div className="mt-10">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-steel">
                  Specifications
                </h2>
                <dl className="mt-3 divide-y divide-paper-300 rounded-lg border border-paper-300 bg-white">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between gap-4 px-4 py-3 text-sm">
                      <dt className="text-steel">{spec.label}</dt>
                      <dd className="text-right font-medium text-ink-900">{spec.value}</dd>
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
