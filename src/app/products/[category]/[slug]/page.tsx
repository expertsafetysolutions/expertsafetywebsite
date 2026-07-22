import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getCategory } from "@content/categories";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/content";
import { client } from "../../../../../.tina/__generated__/client";
import { ProductPageClient } from "./ProductPageClient";

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

/**
 * Server component: resolves params, loads static context (category, related
 * products) off disk exactly like every other page, then fetches the single
 * product through Tina's generated GraphQL client. That query + its result
 * are handed to the client component below, which is where `useTina` takes
 * over to enable live visual editing.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const product = getProduct(params.category, params.slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = getRelatedProducts(product, 3);

  const tinaProps = await client.queries.product({
    relativePath: `${product.slug}.mdx`,
  });

  return <ProductPageClient tinaProps={tinaProps} category={category} related={related} />;
}
