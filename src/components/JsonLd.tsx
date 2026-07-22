/**
 * Renders a schema.org JSON-LD block. Next.js allows this via a script tag with
 * type="application/ld+json"; content is serialised server-side.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
