import Link from "next/link";
import type { Certification } from "@/lib/content";

/**
 * Compact certifications strip for the homepage / trust band — mono marks in
 * a dense row, linking through to the full certifications page.
 */
export function CertStrip({ certifications }: { certifications: Certification[] }) {
  return (
    <div className="border-y border-ink-700 bg-ink-900">
      <div className="container-x flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {certifications.map((c) => (
            <li key={c.slug} className="flex items-center gap-2.5">
              <CheckBadge />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-200">
                {c.name.split("—")[0].trim()}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/certifications"
          className="whitespace-nowrap text-sm font-semibold text-hiviz hover:text-hiviz-soft"
        >
          View all approvals →
        </Link>
      </div>
    </div>
  );
}

function CheckBadge() {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden="true" className="text-status-ok">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.18" />
      <path
        d="M6 10.2l2.4 2.4L14 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
