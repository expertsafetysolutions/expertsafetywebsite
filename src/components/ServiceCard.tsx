import Link from "next/link";
import type { Service } from "@/lib/content";
import { Card } from "./ui/Card";

const iconGlyph: Record<Service["icon"], React.ReactNode> = {
  testing: (
    <path d="M9 3h6M10 3v5.2L5.5 16a2 2 0 0 0 1.7 3h9.6a2 2 0 0 0 1.7-3L14 8.2V3" />
  ),
  maintenance: (
    <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z" />
  ),
  training: (
    <path d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Zm0 0v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M8 11v5.5c0 1 1.8 2 4 2s4-1 4-2V11" />
  ),
  assessment: (
    <path d="M9 11l2 2 4-4M5 5h14v14H5V5Z" />
  ),
};

export function ServiceCard({ service }: { service: Service }) {
  const href = `/services/${service.slug}`;

  return (
    <Card className="group flex h-full flex-col p-6">
      <span className="grid h-11 w-11 place-items-center rounded bg-signal-50 text-signal">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {iconGlyph[service.icon]}
        </svg>
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
        <Link href={href} className="hover:text-signal">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">
        {service.summary}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:text-signal-700"
      >
        Learn more
        <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}
