import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { getAllUpdates, getUpdate } from "@/lib/content";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllUpdates().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getUpdate(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/projects/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default function UpdateDetailPage({ params }: { params: { slug: string } }) {
  const post = getUpdate(params.slug);
  if (!post) notFound();

  const path = `/projects/${post.slug}`;

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path,
          datePublished: post.date,
          dateModified: post.updated,
        })}
      />
      <Breadcrumbs items={[{ name: "Projects", href: "/projects" }, { name: post.title, href: path }]} />
      <Section className="pt-10 sm:pt-14" edge>
        <article className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <Badge tone="signal">{post.category}</Badge>
            <time dateTime={post.date} className="font-mono text-xs text-steel">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="mt-4 text-balance font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="prose-ess mt-8">
            <MDXRemote source={post.body} />
          </div>
        </article>
      </Section>
    </>
  );
}
