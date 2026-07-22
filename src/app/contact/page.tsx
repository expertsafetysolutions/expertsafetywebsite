import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BankDetailsCard } from "@/components/BankDetailsCard";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Expert Safety Solutions for a fire safety quote, product enquiry or service booking. Phone, WhatsApp, email and our Vadodara office address.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

      <Section className="pt-10 sm:pt-14" pattern="grid" edge>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to our fire safety team"
          lead="Request a quote, ask about a product, or book a service visit. We typically respond within one business day."
        />

        {/* Full-width enquiry form. */}
        <div className="mt-12">
          <EnquiryForm />
        </div>

        {/* Direct contact and location, 50/50. */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-paper-300 bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-ink-900">
              Direct contact
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <p className="font-mono text-xs uppercase tracking-wide text-steel">Contact person</p>
                <p className="mt-0.5 font-medium text-ink-900">{site.contact.contactPerson}</p>
              </li>
              <li>
                <p className="font-mono text-xs uppercase tracking-wide text-steel">Phone</p>
                <a href={telLink()} className="mt-0.5 block font-medium text-ink-900 hover:text-signal">
                  {site.contact.phoneDisplay}
                </a>
                <a
                  href={`tel:${site.contact.altPhoneHref}`}
                  className="mt-0.5 block font-medium text-ink-900 hover:text-signal"
                >
                  {site.contact.altPhoneDisplay}
                </a>
              </li>
              <li>
                <p className="font-mono text-xs uppercase tracking-wide text-steel">WhatsApp</p>
                <a
                  href={whatsappLink("Hi, I'd like to enquire about fire safety products/services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block font-medium text-ink-900 hover:text-signal"
                >
                  Chat with us
                </a>
              </li>
              <li>
                <p className="font-mono text-xs uppercase tracking-wide text-steel">Email</p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-0.5 block font-medium text-ink-900 hover:text-signal"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <p className="font-mono text-xs uppercase tracking-wide text-steel">Address</p>
                <address className="mt-0.5 not-italic font-medium leading-relaxed text-ink-900">
                  {site.contact.address.full}
                </address>
              </li>
              <li>
                <p className="font-mono text-xs uppercase tracking-wide text-steel">Hours</p>
                <p className="mt-0.5 font-medium text-ink-900">{site.contact.hours}</p>
              </li>
              <li>
                <p className="font-mono text-xs uppercase tracking-wide text-steel">GSTIN</p>
                <p className="mt-0.5 font-mono text-sm font-medium text-ink-900">{site.contact.gstin}</p>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-lg border border-paper-300">
            <iframe
              title={`${site.name} location map`}
              src={site.contact.mapEmbedSrc}
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={site.contact.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-t border-paper-300 bg-white px-4 py-3 text-center text-sm font-semibold text-signal hover:text-signal-700"
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Full-width bank details (cheque/QR split 70/30 inside). */}
        <div className="mt-8">
          <BankDetailsCard />
        </div>

        <div className="mt-8">
          <GoogleReviewCard />
        </div>
      </Section>
    </>
  );
}
