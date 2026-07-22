import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProductCard } from "@/components/ProductCard";
import { categories, getCategory } from "@content/categories";
import { getProductsByCategory } from "@/lib/content";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: `${category.intro} Enquire online for pricing and availability.`,
    path: `/products/${category.slug}`,
  });
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
        ]}
      />
      <Section className="pt-10 sm:pt-14" pattern="grid" edge>
        <div className="flex items-start gap-4">
          <span className="hidden h-14 w-14 shrink-0 place-items-center rounded bg-ink-900 text-white sm:grid">
            <CategoryIcon icon={category.icon} className="h-7 w-7" />
          </span>
          <SectionHeading
            eyebrow={`${products.length} product${products.length === 1 ? "" : "s"}`}
            title={category.name}
            lead={category.intro}
          />
        </div>

        {products.length === 0 ? (
          <p className="mt-10 rounded-lg border border-dashed border-paper-400 bg-paper-100 p-10 text-center text-sm text-steel">
            Products in this category are being added. In the meantime,{" "}
            <a href="/contact" className="font-semibold text-signal">
              contact us
            </a>{" "}
            directly for availability.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
