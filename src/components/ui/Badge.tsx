import { cn } from "@/lib/utils";

type Tone = "signal" | "ink" | "ok" | "neutral";

const tones: Record<Tone, string> = {
  signal: "bg-signal-50 text-signal-700 ring-signal-100",
  ink: "bg-ink-100 text-ink-800 ring-ink-200",
  ok: "bg-status-okSoft text-status-ok ring-status-ok/20",
  neutral: "bg-paper-200 text-steel ring-paper-400",
};

/** Compact label chip; mono option for codes/spec tags. */
export function Badge({
  children,
  tone = "neutral",
  mono = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  mono?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        mono && "font-mono uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
