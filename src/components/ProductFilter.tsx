"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/content";
import type { Category } from "@content/categories";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

/**
 * Client-side category filter + text search across the full catalogue.
 * All products are passed in as static data (generated at build time); this
 * component only filters in-memory — no network requests, no per-keystroke
 * cost beyond a simple array filter, so it stays fast even at 200+ SKUs.
 */
export function ProductFilter({
  products,
  categories,
  initialCategory = "all",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = `${p.title} ${p.metaDescription} ${p.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [products, activeCategory, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-signal"
          />
        </div>
        <p className="text-sm text-steel" aria-live="polite">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <FilterChip
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          All categories
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            active={activeCategory === c.slug}
            onClick={() => setActiveCategory(c.slug)}
          >
            {c.name}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-lg border border-dashed border-paper-400 bg-paper-100 p-10 text-center text-sm text-steel">
          No products match your search. Try a different term or{" "}
          <a href="/contact" className="font-semibold text-signal">
            ask us directly
          </a>
          .
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={`${product.category}-${product.slug}`} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-signal bg-signal text-white"
          : "border-ink-200 bg-white text-ink-800 hover:border-ink-400",
      )}
    >
      {children}
    </button>
  );
}
