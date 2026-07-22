import { site } from "./site";

const abs = (path: string) => new URL(path, site.url).toString();

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: site.name,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phoneDisplay,
    description: site.description,
    taxID: site.contact.gstin,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": abs("/#organization") },
    inLanguage: "en-IN",
  };
}

/** LocalBusiness — used on the homepage and contact page for local SEO. */
export function localBusinessSchema(opts?: {
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": abs("/#localbusiness"),
    name: site.name,
    image: abs("/opengraph-image"),
    url: site.url,
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    description: site.description,
    taxID: site.contact.gstin,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    areaServed: site.contact.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    openingHoursSpecification: site.contact.hoursSchema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    ...(opts?.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: opts.aggregateRating.ratingValue,
            reviewCount: opts.aggregateRating.reviewCount,
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  path: string;
  category: string;
  sku?: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: abs(product.image),
    url: abs(product.path),
    category: product.category,
    ...(product.sku ? { sku: product.sku } : {}),
    brand: { "@type": "Brand", name: product.brand ?? site.name },
    // Enquiry-only catalogue: no price is published, so the offer signals
    // availability and points buyers at the enquiry flow rather than a checkout.
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: abs(product.path),
      priceCurrency: "INR",
      seller: { "@id": abs("/#organization") },
    },
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: abs(post.path),
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    ...(post.image ? { image: abs(post.image) } : {}),
    author: { "@id": abs("/#organization") },
    publisher: { "@id": abs("/#organization") },
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(post.path) },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: abs(service.path),
    provider: { "@id": abs("/#organization") },
    areaServed: site.contact.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };
}
