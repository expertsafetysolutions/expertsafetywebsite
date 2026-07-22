import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/ServiceCard";
import { getAllServices } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Fire Safety Services",
  description:
    "Fire extinguisher testing & refilling, annual maintenance contracts, staff training and fire risk assessment for industrial sites across Vadodara and Gujarat.",
  path: "/services",
});

export default function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <>
      <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
      <Section className="pt-10 sm:pt-14" pattern="grid" edge>
        <SectionHeading
          eyebrow="Services"
          title="Compliance-ready testing, maintenance & training"
          lead="Scheduled programmes that keep your fire safety systems certified and your team prepared — not a one-time visit."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
    </>
  );
}
