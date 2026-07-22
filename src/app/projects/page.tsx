import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/PostCard";
import { getAllUpdates } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Projects & Updates",
  description:
    "The latest product updates and company news from Expert Safety Solutions — new catalogue additions, milestones and announcements.",
  path: "/projects",
});

/**
 * ISR: this feed is the site's deliberate freshness signal, so new entries
 * should appear without a full redeploy. Revalidating hourly keeps the page
 * static (fast, cheap to serve) while a new /content/updates/*.mdx file
 * shows up automatically on the next request after the window elapses.
 */
export const revalidate = 3600;

export default function ProjectsIndexPage() {
  const posts = getAllUpdates();

  return (
    <>
      <Breadcrumbs items={[{ name: "Projects", href: "/projects" }]} />
      <Section className="pt-10 sm:pt-14" pattern="grid" edge>
        <SectionHeading
          eyebrow="Projects & Updates"
          title="What's new at Expert Safety Solutions"
          lead="Product additions, milestones and company news — updated regularly."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} hrefBase="/projects" />
          ))}
        </div>
      </Section>
    </>
  );
}
