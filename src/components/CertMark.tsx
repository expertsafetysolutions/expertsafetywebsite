import type { Certification } from "@/lib/content";
import { Badge } from "./ui/Badge";

/**
 * A certification rendered like an inspection-tag record — mono reference
 * code, issuer, and scope — echoing the site's gauge/tag data language
 * without duplicating the hero signature element.
 */
export function CertMark({ certification }: { certification: Certification }) {
  const isSample = certification.reference.startsWith("SAMPLE");

  return (
    <div className="rounded-lg border border-paper-300 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-snug text-ink-900">
          {certification.name}
        </h3>
        <Badge tone="ok" className="shrink-0">
          Certified
        </Badge>
      </div>
      <dl className="mt-4 space-y-2 font-mono text-xs">
        <div className="flex justify-between gap-4">
          <dt className="text-steel">Issuer</dt>
          <dd className="text-right text-ink-800">{certification.issuer}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-steel">Reference</dt>
          <dd className="text-right text-ink-800">
            {certification.reference}
            {isSample && (
              <span className="ml-1.5 text-signal">(placeholder)</span>
            )}
          </dd>
        </div>
        {certification.validUntil && (
          <div className="flex justify-between gap-4">
            <dt className="text-steel">Valid until</dt>
            <dd className="text-right text-ink-800">{certification.validUntil}</dd>
          </div>
        )}
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-steel">{certification.scope}</p>
    </div>
  );
}
