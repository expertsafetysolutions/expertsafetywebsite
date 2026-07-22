import type { Category } from "@content/categories";
import { cn } from "@/lib/utils";

type IconKey = Category["icon"];

const paths: Record<IconKey, React.ReactNode> = {
  extinguisher: (
    <>
      <rect x="8" y="9" width="8" height="12" rx="2" />
      <path d="M10 9V6h4v3" />
      <path d="M12 3v2" />
      <path d="M14 4c2 .5 3 2 3.3 3.6" />
      <path d="M8 15H3M3 15l2-1.4M3 15l2 1.4" />
    </>
  ),
  sign: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="1.5" />
      <path d="M9 12h6M12 9l3 3-3 3" />
    </>
  ),
  glove: (
    <>
      <path d="M6 20V9a2 2 0 1 1 4 0v3" />
      <path d="M10 12V7a2 2 0 1 1 4 0v5" />
      <path d="M14 12V8a2 2 0 1 1 4 0v9a6 6 0 0 1-6 6H9a5 5 0 0 1-5-5v-1" />
    </>
  ),
  hydrant: (
    <>
      <rect x="9" y="7" width="6" height="11" rx="1.5" />
      <path d="M9 11H5M15 11h4M9 11 6 8M15 11l3-3" />
      <circle cx="12" cy="5" r="2" />
    </>
  ),
  alarm: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 4.5V2M12 22v-2.5M4.5 12H2M22 12h-2.5" />
    </>
  ),
  ppe: (
    <>
      <path d="M4 12a8 8 0 0 1 16 0Z" />
      <path d="M3 12h18" />
      <path d="M9 12v2.5a3 3 0 0 0 6 0V12" />
    </>
  ),
  harness: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M8 8l4-1 4 1" />
      <path d="M9 8v6a3 3 0 0 0 3 3 3 3 0 0 0 3-3V8" />
      <path d="M9 14l-3 6M15 14l3 6" />
    </>
  ),
  boot: (
    <>
      <path d="M8 3v9.5c0 .8-.4 1.5-1 2L5 16.5a2 2 0 0 0-1 1.7V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1a3 3 0 0 0-2-2.8L12 14V3" />
      <path d="M8 3h4" />
    </>
  ),
  tool: (
    <>
      <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z" />
    </>
  ),
  cone: (
    <>
      <path d="M12 3l5 15H7l5-15Z" />
      <path d="M8.5 12h7M7.6 15h8.8" />
      <rect x="4" y="18" width="16" height="3" rx="1" />
    </>
  ),
  firstaid: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M12 11v6M9 14h6" />
    </>
  ),
  suppression: (
    <>
      <path d="M12 2v3" />
      <rect x="8" y="5" width="8" height="6" rx="3" />
      <path d="M12 11v3" />
      <path d="M7 14h10l-1.6 5.2a2 2 0 0 1-1.9 1.8h-3a2 2 0 0 1-1.9-1.8L7 14Z" />
    </>
  ),
  lockout: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="15" r="1.4" />
      <path d="M12 16.4V18" />
    </>
  ),
};

export function CategoryIcon({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  );
}
