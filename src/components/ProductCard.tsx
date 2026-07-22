import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/content";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.category}/${product.slug}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <Link href={href} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-200">
          <Image
            src={product.gallery[0].image}
            alt={product.gallery[0].alt}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {product.sku && (
          <Badge tone="ink" mono className="w-fit">
            {product.sku}
          </Badge>
        )}
        <h3 className="font-display text-lg font-bold leading-snug text-ink-900">
          <Link href={href} className="hover:text-signal">
            {product.title}
          </Link>
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-steel">
          {product.metaDescription}
        </p>
        <Link
          href={href}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:text-signal-700"
        >
          View &amp; enquire
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Card>
  );
}
