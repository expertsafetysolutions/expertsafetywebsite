import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductFilter } from "@/components/ProductFilter";
import { categories } from "@content/categories";
import { getAllProducts } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Fire Safety & ESH Products",
  description:
    "Browse Expert Safety Solutions' full catalogue of fire extinguishers, safety signage, gloves, hydrant systems, alarms and PPE — enquire for pricing and availability.",
  path: "/products",
});

export default function ProductsIndexPage() {
  const products = getAllProducts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Products", href: "/products" }]} />
      <Section className="pt-10 sm:pt-14" pattern="grid" edge>
        <SectionHeading
          eyebrow={`${products.length}+ SKUs`}
          title="Fire safety & ESH product catalogue"
          lead={`Certified equipment for factories, warehouses and industrial sites across ${site.contact.address.locality} and ${site.contact.address.region}. Every listing ends in a direct enquiry — no cart, no checkout.`}
        />
        <div className="mt-10">
          <ProductFilter products={products} categories={categories} />
        </div>
      </Section>
    </>
  );
}
