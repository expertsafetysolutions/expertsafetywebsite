import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/PostCard";
import { getAllResources } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Resources & Guides",
  description:
    "Compliance guides, how-tos and case studies on fire safety, equipment selection and regulatory requirements for industrial sites in Gujarat.",
  path: "/resources",
});

export default function ResourcesIndexPage() {
  const posts = getAllResources();

  return (
    <>
      <Breadcrumbs items={[{ name: "Resources", href: "/resources" }]} />
      <Section className="pt-10 sm:pt-14" pattern="diagonal" edge>
        <SectionHeading
          eyebrow="Resources"
          title="Compliance guides & case studies"
          lead="In-depth guides on fire safety equipment, standards and site compliance for facility and EHS teams."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} hrefBase="/resources" />
          ))}
        </div>
      </Section>
    </>
  );
}
