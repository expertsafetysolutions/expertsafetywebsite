/**
 * Product categories — the single source of truth for catalogue structure.
 *
 * To add a category: append an entry here, then add product JSON files in
 * /content/products with a matching `category` slug. Routes, filters, nav,
 * and the sitemap all derive from this list automatically.
 */

export type Category = {
  slug: string;
  name: string;
  /** Short line used on cards and category tiles. */
  blurb: string;
  /** Longer intro used as the category page lead + meta description base. */
  intro: string;
  /** Icon key rendered by <CategoryIcon />. */
  icon:
    | "extinguisher"
    | "sign"
    | "glove"
    | "hydrant"
    | "alarm"
    | "ppe"
    | "harness"
    | "boot"
    | "tool"
    | "cone"
    | "firstaid"
    | "suppression"
    | "lockout";
};

export const categories: Category[] = [
  {
    slug: "fire-extinguishers",
    name: "Fire Extinguishers",
    blurb: "ABC, CO₂, foam and water-mist units for every fire class.",
    intro:
      "IS-marked portable and trolley-mounted fire extinguishers for industrial, commercial and warehouse use — supplied, installed, refilled and certified.",
    icon: "extinguisher",
  },
  {
    slug: "fire-safety-signage",
    name: "Fire Safety Signage",
    blurb: "Photoluminescent exit, assembly and hazard signage.",
    intro:
      "Photoluminescent and retro-reflective fire safety signage — exit routes, assembly points, equipment identification and statutory hazard warnings.",
    icon: "sign",
  },
  {
    slug: "safety-gloves",
    name: "Safety Gloves",
    blurb: "Cut, heat and chemical-resistant hand protection.",
    intro:
      "Industrial hand protection across cut, heat, chemical and electrical hazard classes, selected to match your site's risk assessment.",
    icon: "glove",
  },
  {
    slug: "fire-hydrant-systems",
    name: "Fire Hydrant Systems",
    blurb: "Hoses, couplings, landing valves and hose reels.",
    intro:
      "Fire hydrant system components — landing valves, hose reels, delivery hoses, branch pipes and couplings for wet and dry riser installations.",
    icon: "hydrant",
  },
  {
    slug: "fire-alarm-detection",
    name: "Fire Alarm & Detection",
    blurb: "Smoke, heat and multi-sensor detection devices.",
    intro:
      "Conventional and addressable fire detection and alarm equipment — smoke and heat detectors, call points, sounders and control panels.",
    icon: "alarm",
  },
  {
    slug: "personal-protective-equipment",
    name: "Personal Protective Equipment",
    blurb: "Helmets, eye protection, respirators and body protection.",
    intro:
      "Head-to-toe personal protective equipment for industrial environments — helmets, eye and face protection, respiratory protection and high-visibility clothing.",
    icon: "ppe",
  },
  {
    slug: "fall-protection",
    name: "Fall Protection",
    blurb: "Harnesses, lanyards, anchors and lifeline systems.",
    intro:
      "Full-body harnesses, lanyards, anchor points and horizontal lifeline systems for work at height — selected to match your site's fall risk assessment.",
    icon: "harness",
  },
  {
    slug: "safety-footwear",
    name: "Safety Footwear",
    blurb: "Steel-toe shoes, gumboots and high-ankle industrial boots.",
    intro:
      "Industrial safety footwear across steel-toe, chemical-resistant and high-ankle formats for factory floors, warehouses and outdoor site work.",
    icon: "boot",
  },
  {
    slug: "industrial-tools",
    name: "Industrial Tools",
    blurb: "Power tools and site equipment for installation and maintenance.",
    intro:
      "Power tools and site equipment used in fire safety installation and industrial maintenance work — cutting, drilling and measuring tools.",
    icon: "tool",
  },
  {
    slug: "road-traffic-safety",
    name: "Road & Traffic Safety",
    blurb: "Barricades, cones and reflective jackets for site and road work.",
    intro:
      "Barricades, traffic cones and high-visibility reflective wear for site perimeter control, road work and visitor safety at industrial premises.",
    icon: "cone",
  },
  {
    slug: "first-aid-kits",
    name: "First Aid Kits",
    blurb: "Compliance first aid kits, boxes, stretchers and emergency gear.",
    intro:
      "First aid kits sized from 1 to 50 persons, wall-mount boxes, stretchers, splints and emergency response equipment for factories, offices, schools and vehicles.",
    icon: "firstaid",
  },
  {
    slug: "fire-suppression-systems",
    name: "Fire Suppression Systems",
    blurb: "Automatic panel, kitchen and total-flooding suppression systems.",
    intro:
      "Engineered automatic fire suppression — in-panel tube systems, kitchen hood protection, modular room flooding and compressed-air foam units — designed, supplied and installed for electrical panels, server racks, commercial kitchens and specialised infrastructure.",
    icon: "suppression",
  },
  {
    slug: "lockout-tagout",
    name: "Lockout-Tagout (LOTO)",
    blurb: "Hasps, padlocks, valve and breaker lockouts for energy isolation.",
    intro:
      "Lockout-tagout equipment for safe energy isolation during maintenance and repair — hasps, dielectric padlocks, cable and valve lockouts, circuit breaker and MCB lockouts, tags and lockable storage stations.",
    icon: "lockout",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
