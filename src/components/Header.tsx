"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { primaryNav, site, telLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sticky site header. Products and Services stay distinct primary nav items
 * (never merged). A phone CTA is always visible for lead-gen — as an icon
 * button on mobile, full number on desktop.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-900/95 backdrop-blur supports-[backdrop-filter]:bg-ink-900/85">
      {/* Utility strip — compliance-forward, reinforces credibility immediately. */}
      <div className="hidden border-b border-ink-700/50 lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper-300">
            ISO · BIS · NFPA aligned · Fire Dept. approved
            <span className="mx-2 text-ink-400">|</span>
            Serving Vadodara &amp; Gujarat
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="font-mono text-[11px] text-paper-300 transition-colors hover:text-hiviz"
          >
            {site.contact.email}
          </a>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-white"
                      : "text-paper-300 hover:text-white",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-signal"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink()}
            className="hidden items-center gap-2 rounded px-3 py-2 font-mono text-sm font-medium text-white transition-colors hover:text-hiviz md:inline-flex"
          >
            <PhoneIcon />
            {site.contact.phoneDisplay}
          </a>
          <a
            href={telLink()}
            aria-label={`Call ${site.name} on ${site.contact.phoneDisplay}`}
            className="grid h-10 w-10 place-items-center rounded text-white transition-colors hover:bg-ink-700 md:hidden"
          >
            <PhoneIcon />
          </a>

          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            Get a Quote
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded text-white transition-colors hover:bg-ink-700 lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink-700 bg-ink-900 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded px-3 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-ink-700 text-white"
                      : "text-paper-300 hover:bg-ink-800 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-ink-700 pt-4">
            <Button href="/contact" size="md">
              Get a Quote
            </Button>
            <Button href={telLink()} variant="outline" size="md">
              Call {site.contact.phoneDisplay}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 2h3l1.5 4-2 1.4a13 13 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.6 4.2 2 2 0 0 1 6.6 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
