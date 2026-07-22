/**
 * Central site configuration — Name / Address / Phone (NAP), navigation, and
 * social/lead-gen links. Everything an editor might need to change lives here so
 * it stays consistent across the header, footer, contact page, and JSON-LD.
 *
 * NOTE: any value still marked "PLACEHOLDER" is a safe stand-in pending real
 * details. Keep NAP identical everywhere for local SEO.
 */

export const site = {
  name: "Expert Safety Solutions",
  legalName: "Expert Safety Solutions",
  tagline: "Fire Safety & ESH Solutions",
  description:
    "Certified fire safety and ESH solutions for factories, warehouses and industrial sites across Vadodara and Gujarat — fire extinguishers, signage, PPE, plus testing, maintenance, training and risk assessment.",

  // Confirmed from the company's own printed footer/business materials
  // ("Website: www.expertsafety.in"). Used as metadataBase and for
  // absolute canonical/OG URLs.
  url: "https://www.expertsafety.in",

  // --- Contact / NAP ---
  contact: {
    contactPerson: "Nilesh Padaya",
    phoneDisplay: "+91 84606 99569",
    phoneHref: "+918460699569",
    // Second line printed on the company's own footer/business materials.
    altPhoneDisplay: "+91 94299 80244",
    altPhoneHref: "+919429980244",
    whatsappNumber: "918460699569", // digits only, country code first
    email: "expertsafetysolution@gmail.com",
    gstin: "24COMPP8380J1Z9",
    address: {
      street:
        "Survey No. 775/2, Sub Plot No. 737/1, NH No. 8, Beside Jeep Compass Showroom, Opp. GSFC Nagar Gate, Dashrath",
      locality: "Vadodara",
      region: "Gujarat",
      postalCode: "391740",
      country: "IN",
      full: "Survey No. 775/2, Sub Plot No. 737/1, NH No. 8, Beside Jeep Compass Showroom, Opp. GSFC Nagar Gate, Dashrath, Vadodara - 391740, Gujarat, India",
    },
    // Precise pin dropped by the owner — used for the "Get Directions" link.
    mapLink: "https://maps.app.goo.gl/sAMoXqtWe96kcbQr7",
    // Embeddable map (geocoded from the address above, since Google's short
    // links aren't directly embeddable in an iframe).
    mapEmbedSrc:
      "https://www.google.com/maps?q=" +
      encodeURIComponent(
        "Survey No. 775/2, Sub Plot No. 737/1, NH No. 8, Beside Jeep Compass Showroom, Opp. GSFC Nagar Gate, Dashrath, Vadodara, Gujarat 391740",
      ) +
      "&output=embed",
    hours: "Mon–Sat, 9:00 AM – 7:00 PM IST",
    hoursSchema: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" },
    ],
    serviceAreas: ["Vadodara", "Gujarat", "Outstation project work across India"],
  },

  // --- Bank transfer details (for the Contact page "Bank Details" card) ---
  bankDetails: {
    bankName: "HDFC Bank",
    accountName: "Expert Safety Solutions",
    accountNumber: "50200097994640",
    ifsc: "HDFC0005028",
    branch: "Link Road, Vadodara - 390024, Gujarat",
    qrCodeImage: "/brand/bank-payment-qr.jpg",
    // Cleaned copy: rotation corrected, "CANCELLED" stamped across it (the
    // source file had no such marking baked in).
    cancelledChequeImage: "/brand/cancelled-cheque.jpg",
  },

  // --- Google reviews (for the Contact page "Leave a Review" card) ---
  googleReview: {
    link: "https://g.page/r/CXEt0CTLvHR8EBE/review",
    qrCodeImage: "/brand/google-review-qr.jpg",
  },

  brochureUrl: "/downloads/expert-safety-solutions-catalogue.pdf",
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(): string {
  return `tel:${site.contact.phoneHref}`;
}

/** Primary navigation — Products and Services are deliberately separate items. */
export const primaryNav: { label: string; href: string }[] = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Certifications", href: "/certifications" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

/** Grouped footer navigation. */
export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Fire Extinguishers", href: "/products/fire-extinguishers" },
      { label: "Fire Safety Signage", href: "/products/fire-safety-signage" },
      { label: "Safety Gloves & PPE", href: "/products/safety-gloves" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Testing & Refilling", href: "/services/testing-refilling" },
      { label: "AMC & Maintenance", href: "/services/maintenance-amc" },
      { label: "Staff Training", href: "/services/staff-training" },
      { label: "Fire Risk Assessment", href: "/services/fire-risk-assessment" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Certifications", href: "/certifications" },
      { label: "Projects & Updates", href: "/projects" },
      { label: "Resources", href: "/resources" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
