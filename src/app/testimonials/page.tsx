import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TestimonialCard } from "@/components/TestimonialCard";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { getAggregateRating, getAllTestimonials } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Client Testimonials",
  description:
    "What facility managers and EHS teams say about working with Expert Safety Solutions for fire safety equipment, testing, maintenance and training.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();
  const aggregate = getAggregateRating();

  return (
    <>
      {aggregate && (
        <JsonLd
          data={{
            ...localBusinessSchema({ aggregateRating: aggregate }),
            review: testimonials.map((t) => ({
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: t.rating },
              author: { "@type": "Person", name: t.author },
              reviewBody: t.quote,
            })),
          }}
        />
      )}
      <Breadcrumbs items={[{ name: "Testimonials", href: "/testimonials" }]} />
      <Section className="pt-10 sm:pt-14" pattern="dots" edge>
        <SectionHeading
          eyebrow={aggregate ? `${aggregate.ratingValue} / 5 · ${aggregate.reviewCount} reviews` : "Testimonials"}
          title="What our clients say"
          lead="Feedback from facility managers and EHS teams we've worked with across Vadodara and Gujarat."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.slug} testimonial={t} />
          ))}
        </div>
      </Section>
    </>
  );
}
