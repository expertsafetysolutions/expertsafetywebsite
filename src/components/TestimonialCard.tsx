import type { Testimonial } from "@/lib/content";
import { Card } from "./ui/Card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < testimonial.rating} />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-800">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <footer className="mt-5 border-t border-paper-300 pt-4">
        <p className="text-sm font-semibold text-ink-900">{testimonial.author}</p>
        <p className="text-xs text-steel">
          {testimonial.role ? `${testimonial.role}, ` : ""}
          {testimonial.company}
          {testimonial.location ? ` · ${testimonial.location}` : ""}
        </p>
      </footer>
    </Card>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={16}
      height={16}
      aria-hidden="true"
      className={filled ? "fill-hiviz" : "fill-paper-300"}
    >
      <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.9l-5.3 2.7 1.1-5.9L1.5 7.6l5.9-.7L10 1.5Z" />
    </svg>
  );
}
