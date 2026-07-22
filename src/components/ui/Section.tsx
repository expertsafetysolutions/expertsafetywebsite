import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionPattern = "grid" | "diagonal" | "dots";

type SectionProps = {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
  /** Constrain content to the standard column. Set false for full-bleed. */
  contained?: boolean;
  as?: "section" | "div" | "article" | "aside";
  /**
   * Faint background texture reused across the site as a safety/technical
   * motif — a blueprint grid, diagonal hairlines, or a dot grid. Tone
   * (light/dark lines) is picked automatically from the section's own
   * background so callers never need to match it manually.
   */
  pattern?: SectionPattern;
  /** Adds the thin hazard-tape divider along the section's top edge. */
  edge?: boolean;
};

/** Vertical rhythm wrapper for a page section. */
export function Section({
  className,
  containerClassName,
  children,
  id,
  contained = true,
  as: Tag = "section",
  pattern,
  edge = false,
}: SectionProps) {
  const dark = className?.includes("bg-ink-900") ?? false;
  const patternClass =
    pattern &&
    {
      grid: dark ? "bg-pattern-grid-dark" : "bg-pattern-grid-light",
      diagonal: dark ? "bg-pattern-diagonal-dark" : "bg-pattern-diagonal-light",
      dots: "bg-pattern-dots-light",
    }[pattern];

  return (
    <Tag
      id={id}
      className={cn("relative py-14 sm:py-20", pattern && "overflow-hidden", className)}
    >
      {edge && <div aria-hidden="true" className="section-edge absolute inset-x-0 top-0" />}
      {patternClass && (
        <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", patternClass)} />
      )}
      <div className="relative">
        {contained ? (
          <Container className={containerClassName}>{children}</Container>
        ) : (
          children
        )}
      </div>
    </Tag>
  );
}

/** Standard section heading block: mono eyebrow + display title + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  as: TitleTag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <TitleTag className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {title}
      </TitleTag>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
