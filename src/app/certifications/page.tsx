import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertMark } from "@/components/CertMark";
import { Gauge } from "@/components/Gauge";
import { getAllCertifications } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Certifications & Approvals",
  description:
    "ISO, BIS, NFPA-aligned practice and fire department approvals held by Expert Safety Solutions — verifying our fire safety equipment and services meet regulatory standards.",
  path: "/certifications",
});

export default function CertificationsPage() {
  const certifications = getAllCertifications();

  return (
    <>
      <Breadcrumbs items={[{ name: "Certifications", href: "/certifications" }]} />
      <Section className="pt-10 sm:pt-14" pattern="grid" edge>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="Certifications & Approvals"
              title="Compliance you can verify, not just claim"
              lead="Every certification and approval we hold is listed here with its reference and scope — the same standard we hold our testing and installation work to on your site."
            />
          </div>
          <div className="flex justify-center lg:col-span-4 lg:justify-end">
            <Gauge size={160} />
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {certifications.map((cert) => (
            <CertMark key={cert.slug} certification={cert} />
          ))}
        </div>

        <p className="mt-10 rounded-lg border border-dashed border-paper-400 bg-paper-100 p-5 text-sm text-steel">
          Reference numbers marked <span className="font-mono text-signal">(placeholder)</span> are
          sample values pending the real certificate documents and logos —
          they will be replaced with verified numbers before launch.
        </p>
      </Section>
    </>
  );
}
