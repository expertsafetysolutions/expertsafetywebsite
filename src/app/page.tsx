import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";
import { localBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Gauge } from "@/components/Gauge";
import { CertStrip } from "@/components/CertStrip";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Reveal } from "@/components/Reveal";
import { categories } from "@content/categories";
import {
  getAllCertifications,
  getAllServices,
  getAllTestimonials,
  getFeaturedProducts,
} from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Fire Safety & ESH Solutions in Vadodara, Gujarat`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const certifications = getAllCertifications();
  const services = getAllServices();
  const featuredProducts = getFeaturedProducts(6);
  const testimonials = getAllTestimonials().slice(0, 3);

  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      {/* ---------------------------------------------------------- hero --- */}
      <section className="relative overflow-hidden bg-ink-900">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-pattern-diagonal-dark" />
        <div className="container-x relative grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow text-hiviz">
              ISO · BIS · NFPA aligned · Fire Dept. approved
            </p>
            <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Certified fire safety, built for industrial compliance.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper-200 sm:text-lg">
              Expert Safety Solutions supplies, installs, tests and certifies
              fire safety and ESH equipment for factories, warehouses and
              industrial sites across Vadodara and Gujarat — so your site
              stays inspection-ready, every time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Get a Quote
              </Button>
              <Button href={telLink()} variant="outline" size="lg" className="border-white/25 bg-transparent text-white hover:bg-white/10">
                Call {site.contact.phoneDisplay}
              </Button>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <Stat value="200+" label="Products supplied" />
              <Stat value="500+" label="Staff trained" />
              <Stat value="Vadodara" label="& Gujarat-wide" />
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              <Gauge size={220} />
              <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-paper-300">
                Every site, in the green
              </p>
            </div>
          </div>
        </div>
      </section>

      <CertStrip certifications={certifications} />

      {/* ------------------------------------------------------ categories --- */}
      <Section pattern="grid">
        <SectionHeading
          eyebrow="Product Categories"
          title="Equipment for every point in your fire safety plan"
          lead="From portable extinguishers to full hydrant systems — sourced, stocked and enquiry-ready."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 60}>
              <Link
                href={`/products/${cat.slug}`}
                className="group flex h-full flex-col rounded-lg border border-paper-300 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="grid h-11 w-11 place-items-center rounded bg-ink-900 text-white">
                  <CategoryIcon icon={cat.icon} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900 group-hover:text-signal">
                  {cat.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-steel">
                  {cat.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                  Browse category
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- services --- */}
      <Section className="bg-paper-100" pattern="dots" edge>
        <SectionHeading
          eyebrow="Services"
          title="Testing, maintenance and training that keeps you compliant"
          lead="Scheduled programmes so certification never becomes a scramble before an audit."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------- featured products --- */}
      <Section pattern="diagonal">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured Products"
            title="Popular picks from the catalogue"
          />
          <Link href="/products" className="text-sm font-semibold text-signal hover:text-signal-700">
            View all products →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <Reveal key={product.slug} delay={i * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------- testimonials --- */}
      <Section className="bg-ink-900" pattern="grid" edge>
        <SectionHeading
          eyebrow="Client Feedback"
          title="Trusted by facility and EHS teams"
          className="[&_.eyebrow]:text-hiviz [&_h2]:text-white [&_p]:text-paper-300"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.slug} delay={i * 60}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/testimonials" className="text-sm font-semibold text-hiviz hover:text-hiviz-soft">
            Read all testimonials →
          </Link>
        </div>
      </Section>

      {/* --------------------------------------------------------- cta band --- */}
      <section className="relative overflow-hidden bg-signal">
        <div aria-hidden="true" className="section-edge absolute inset-x-0 top-0" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-pattern-diagonal-dark" />
        <div className="container-x relative flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              Need a fire safety quote for your site?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white sm:text-base">
              Tell us what you need — products, testing, training or a full
              risk assessment — and we&apos;ll respond with a tailored quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="secondary" size="lg">
              Get a Quote
            </Button>
            <a
              href={whatsappLink("Hi, I'd like to enquire about fire safety products/services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-white/40 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-extrabold text-white">{value}</p>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-paper-300">
        {label}
      </p>
    </div>
  );
}
