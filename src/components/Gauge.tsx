import { cn } from "@/lib/utils";

/**
 * Signature element — the pressure-gauge dial.
 *
 * A precise line-art gauge modelled on the pressure indicator found on every
 * stored-pressure fire extinguisher. The needle rests in the green
 * "COMPLIANT / IN RANGE" zone — the site's visual shorthand for "certified and
 * in-date". Rendered as inline SVG (no image request, crisp at any size).
 *
 * Motion: on mount the needle sweeps up into the green zone via a CSS keyframe.
 * Under `prefers-reduced-motion` the keyframe is neutralised globally (see
 * globals.css) so the needle simply renders at its resting angle.
 *
 * The dial is decorative, so it is hidden from assistive tech (aria-hidden);
 * any meaning it conveys is always duplicated in nearby text.
 */
export function Gauge({
  className,
  size = 240,
  animate = true,
  label = "COMPLIANT",
  sublabel = "PRESSURE · IN RANGE",
}: {
  className?: string;
  size?: number;
  animate?: boolean;
  label?: string;
  sublabel?: string;
}) {
  // Geometry
  const cx = 100;
  const cy = 100;
  const r = 78;

  // Tick marks spread across the 240° dial arc (from -120° to +120°).
  const ticks = Array.from({ length: 21 }, (_, i) => {
    const angle = -120 + (i * 240) / 20;
    const rad = (angle - 90) * (Math.PI / 180);
    const major = i % 5 === 0;
    const inner = major ? r - 14 : r - 8;
    return {
      x1: cx + inner * Math.cos(rad),
      y1: cy + inner * Math.sin(rad),
      x2: cx + r * Math.cos(rad),
      y2: cy + r * Math.sin(rad),
      major,
    };
  });

  // Coloured zone arcs: red (recharge) → green (operational) → red (overcharge).
  const arc = (startDeg: number, endDeg: number) => {
    const rr = r - 3;
    const s = (startDeg - 90) * (Math.PI / 180);
    const e = (endDeg - 90) * (Math.PI / 180);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx + rr * Math.cos(s)} ${cy + rr * Math.sin(s)} A ${rr} ${rr} 0 ${large} 1 ${cx + rr * Math.cos(e)} ${cy + rr * Math.sin(e)}`;
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        role="presentation"
        className="overflow-visible"
      >
        {/* Bezel */}
        <circle cx={cx} cy={cy} r={r + 12} className="fill-white" />
        <circle
          cx={cx}
          cy={cy}
          r={r + 12}
          className="fill-none stroke-ink-900"
          strokeWidth={3}
        />
        <circle cx={cx} cy={cy} r={r + 6} className="fill-paper-100" />

        {/* Zone arcs */}
        <path d={arc(-120, -60)} className="stroke-signal fill-none" strokeWidth={5} strokeLinecap="butt" />
        <path d={arc(-60, 60)} className="stroke-status-ok fill-none" strokeWidth={5} strokeLinecap="butt" />
        <path d={arc(60, 120)} className="stroke-signal fill-none" strokeWidth={5} strokeLinecap="butt" />

        {/* Ticks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            className={t.major ? "stroke-ink-800" : "stroke-ink-300"}
            strokeWidth={t.major ? 2 : 1}
          />
        ))}

        {/* Labels */}
        <text x={cx} y={cy - 26} textAnchor="middle" className="fill-ink-400 font-mono" fontSize={9} letterSpacing={1}>
          BAR / PSI
        </text>
        <text x={cx} y={cy + 40} textAnchor="middle" className="fill-status-ok font-mono" fontSize={11} fontWeight={600} letterSpacing={1.5}>
          {label}
        </text>

        {/* Needle — rotates into the green zone (resting angle 30°). */}
        <g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          className={animate ? "motion-safe:animate-gauge-sweep" : ""}
          transform={animate ? undefined : "rotate(30 100 100)"}
        >
          <line x1={cx} y1={cy} x2={cx} y2={cy - (r - 20)} className="stroke-signal" strokeWidth={3} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={cx} y2={cy + 16} className="stroke-ink-800" strokeWidth={3} strokeLinecap="round" />
        </g>

        {/* Hub */}
        <circle cx={cx} cy={cy} r={7} className="fill-ink-900" />
        <circle cx={cx} cy={cy} r={3} className="fill-white" />
      </svg>

      {sublabel && (
        <span className="sr-only">
          {label} — {sublabel}
        </span>
      )}
    </div>
  );
}
