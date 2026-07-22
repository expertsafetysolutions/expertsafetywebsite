import { site } from "@/lib/site";
import { ZoomableImage } from "./ZoomableImage";
import { Button } from "./ui/Button";

/**
 * Prompts happy clients to leave a Google review. Mirrors BankDetailsCard's
 * proportions (QR in a 3/10 column, same 200x200 source size) so both QR
 * codes on the Contact page read at the same visual weight.
 */
export function GoogleReviewCard() {
  return (
    <div className="rounded-lg border border-paper-300 bg-white p-6 shadow-card">
      <div className="grid grid-cols-10 items-center gap-6">
        <div className="col-span-3">
          <ZoomableImage
            src={site.googleReview.qrCodeImage}
            alt={`QR code to leave ${site.name} a Google review`}
            width={200}
            height={200}
            containerClassName="overflow-hidden rounded border border-paper-300"
            className="h-auto w-full"
          />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wide text-steel">
            Scan to review
          </p>
        </div>

        <div className="col-span-7">
          <div className="flex" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <h2 className="mt-2 font-display text-lg font-bold text-ink-900">
            Enjoyed working with us?
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-steel">
            If our team got your site compliant and sorted, a quick 5-star
            review helps other facility and EHS managers find us too — scan
            the code or tap below, it takes less than a minute.
          </p>
          <Button
            href={site.googleReview.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            Write a Google Review
          </Button>
        </div>
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} className="fill-hiviz">
      <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.9l-5.3 2.7 1.1-5.9L1.5 7.6l5.9-.7L10 1.5Z" />
    </svg>
  );
}
