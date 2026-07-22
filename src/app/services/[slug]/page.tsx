import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ServiceCard } from "@/components/ServiceCard";
import { telLink, whatsappLink } from "@/lib/site";
import { getAllServices, getService } from "@/lib/content";

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const otherServices = getAllServices().filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceSchema({ name: service.title, description: service.description, path })}
      />
      <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: service.title, href: path }]} />

      <Section className="pt-10 sm:pt-14" edge>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-balance font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-steel">{service.summary}</p>

            <div className="prose-ess mt-8">
              <MDXRemote source={service.body} />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-lg border border-paper-300 bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-ink-900">
                What&apos;s included
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-800">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2.5 border-t border-paper-300 pt-6">
                <a
                  href="#enquire"
                  className="inline-flex items-center justify-center rounded bg-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-600"
                >
                  Request a Quote
                </a>
                <a
                  href={whatsappLink(`Hi, I'd like to enquire about: ${service.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-400"
                >
                  WhatsApp Enquiry
                </a>
                <a
                  href={telLink()}
                  className="inline-flex items-center justify-center rounded border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-400"
                >
                  Call to Enquire
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="enquire" className="bg-paper-100" pattern="dots">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-ink-900">
            Request a quote for {service.title}
          </h2>
          <p className="mt-2 text-sm text-steel">
            Tell us about your site and we&apos;ll respond with a scope and quote.
          </p>
          <EnquiryForm context={service.title} className="mt-8" />
        </div>
      </Section>

      {otherServices.length > 0 && (
        <Section pattern="diagonal">
          <h2 className="font-display text-2xl font-bold text-ink-900">Other services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} className="mt-0.5 shrink-0 text-status-ok" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
      <path d="M6 10.2l2.4 2.4L14 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
