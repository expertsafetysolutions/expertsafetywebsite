import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories } from "@content/categories";
import {
  getAllProducts,
  getAllServices,
  getAllResources,
  getAllUpdates,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/certifications`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${site.url}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${site.url}/products/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${site.url}/products/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = getAllServices().map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = getAllResources().map((p) => ({
    url: `${site.url}/resources/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const updateRoutes: MetadataRoute.Sitemap = getAllUpdates().map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...serviceRoutes,
    ...resourceRoutes,
    ...updateRoutes,
  ];
}
