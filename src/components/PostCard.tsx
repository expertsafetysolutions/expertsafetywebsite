import Link from "next/link";
import type { Post } from "@/lib/content";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, hrefBase }: { post: Post; hrefBase: string }) {
  const href = `${hrefBase}/${post.slug}`;

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center gap-3">
        <Badge tone="signal">{post.category}</Badge>
        <time dateTime={post.date} className="font-mono text-xs text-steel">
          {formatDate(post.date)}
        </time>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink-900">
        <Link href={href} className="hover:text-signal">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-steel">
        {post.description}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:text-signal-700"
      >
        Read more
        <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}
