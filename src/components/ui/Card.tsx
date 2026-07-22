import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-paper-300 bg-white shadow-card",
        hover && "transition-shadow duration-200 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
