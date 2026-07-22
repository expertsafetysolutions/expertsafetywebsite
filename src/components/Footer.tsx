import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";
import { footerNav, site, telLink, whatsappLink } from "@/lib/site";

/**
 * Site footer. Carries the canonical NAP block (must stay identical to the
 * contact page and LocalBusiness JSON-LD for local SEO), certification marks,
 * grouped navigation, and the brochure download.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-paper-300">
      {/* Thin hazard band — the one structural nod to safety striping. */}
      <div aria-hidden="true" className="hazard-stripe h-1.5" />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + NAP */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Fire safety and ESH solutions for factories, warehouses and
              industrial sites — supplied, installed, tested and certified.
            </p>

            <address className="mt-6 not-italic">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
                Registered office
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white">
                {site.contact.address.full}
              </p>
              <p className="mt-3 flex flex-col gap-1 text-sm">
                <a href={telLink()} className="font-mono transition-colors hover:text-hiviz">
                  {site.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-hiviz"
                >
                  {site.contact.email}
                </a>
              </p>
              <p className="mt-3 text-sm text-ink-300">{site.contact.hours}</p>
              <p className="mt-3 font-mono text-xs text-ink-300">
                GSTIN: {site.contact.gstin}
              </p>
            </address>
          </div>

          {/* Grouped nav */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
                  {group.heading}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-hiviz"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Conversion column */}
          <div className="lg:col-span-2">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
              Get started
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/contact" className="transition-colors hover:text-hiviz">
                  Request a quote
                </Link>
              </li>
              <li>
                <a
                  href={whatsappLink("Hi, I'd like to enquire about fire safety products/services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-hiviz"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a href={site.brochureUrl} className="transition-colors hover:text-hiviz" download>
                  Download catalogue (PDF)
                </a>
              </li>
            </ul>

            <h2 className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
              Approvals
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {["ISO", "BIS", "NFPA", "FIRE DEPT"].map((mark) => (
                <li
                  key={mark}
                  className="rounded-sm border border-ink-600 px-2 py-1 font-mono text-[10px] tracking-wider text-paper-300"
                >
                  {mark}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-700 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-ink-300">
            Vadodara · Gujarat · Outstation project work across India
          </p>
        </div>
      </Container>
    </footer>
  );
}
