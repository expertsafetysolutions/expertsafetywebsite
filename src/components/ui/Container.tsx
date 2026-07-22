import { cn } from "@/lib/utils";

/** Constrained, horizontally-padded content column. */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}) {
  return <Tag className={cn("container-x", className)}>{children}</Tag>;
}
