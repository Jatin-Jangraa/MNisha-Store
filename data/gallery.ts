import { getImageUrl, slugify } from "@/lib/utils";
import type { Category, Collection, Designer, GalleryItem } from "@/types/gallery";

const image = (id: string, width?: number) => getImageUrl(id, width);

export const categories: Category[] = [
  "Women",
  "Men",
  "Wedding",
  "Casual",
  "Luxury",
  "Traditional",
  "Modern",
  "Streetwear",
  "Summer",
  "Winter",
  "Luxury Gowns",
  "Indian Wear",
  "International",
  "Editorial"
];

export const galleryItems: GalleryItem[] = [
  {
    id: "golden-hour-gown",
    designer: "Amara Valen",
    collection: "Golden Hour Atelier",
    category: "Luxury Gowns",
    year: "2026",
    image: image("photo-1515886657613-9f3515b0c78f"),
    alt: "Editorial model in a sculptural luxury gown",
    height: 620,
    description:
      "A sculptural evening silhouette with soft architecture, liquid drape, and a quiet metallic finish built for gallery-like presence.",
    materials: ["Silk organza", "Hand beading", "Satin lining"],
    colors: ["Champagne", "Ivory", "Antique gold"],
    palette: ["#E9D8A6", "#F8F8F8", "#C9A227", "#111111"],
    featured: true
  },
  {
    id: "noir-tailoring",
    designer: "Luca Ren",
    collection: "Noir Tailoring",
    category: "Men",
    year: "2025",
    image: image("photo-1520975916090-3105956dac38"),
    alt: "Model wearing a premium black tailored suit",
    height: 520,
    description:
      "Precision-cut suiting with long lapels, matte wool, and a runway posture that feels restrained, powerful, and modern.",
    materials: ["Super 120s wool", "Silk canvas", "Horn buttons"],
    colors: ["Black", "Charcoal", "Bone"],
    palette: ["#111111", "#2F2F2F", "#F1EEE8", "#C9A227"]
  },
  {
    id: "saffron-vows",
    designer: "Ira Mehta",
    collection: "Saffron Vows",
    category: "Indian Wear",
    year: "2026",
    image: image("photo-1610030469983-98e550d6193c"),
    alt: "Luxury traditional bridal wear with ornate embroidery",
    height: 720,
    description:
      "Ceremonial craft translated into a couture frame with dense threadwork, regal volume, and heirloom color.",
    materials: ["Raw silk", "Zari embroidery", "Velvet trim"],
    colors: ["Saffron", "Ruby", "Gold"],
    palette: ["#B6402A", "#8F1D2C", "#C9A227", "#F8F0E3"],
    featured: true
  },
  {
    id: "ivory-minimal",
    designer: "Claire Noem",
    collection: "Ivory Minimal",
    category: "Modern",
    year: "2025",
    image: image("photo-1509631179647-0177331693ae"),
    alt: "Minimal fashion editorial in ivory tones",
    height: 560,
    description:
      "Clean-lined daywear with architectural restraint, quiet texture, and the polished ease of a private showroom.",
    materials: ["Cotton sateen", "Viscose crepe", "Mother-of-pearl"],
    colors: ["Ivory", "Stone", "Ink"],
    palette: ["#F6F2EA", "#BDB6AA", "#111111", "#FFFFFF"]
  },
  {
    id: "street-couture",
    designer: "Mika Sato",
    collection: "Street Couture",
    category: "Streetwear",
    year: "2026",
    image: image("photo-1483985988355-763728e1935b"),
    alt: "Editorial streetwear look in a city setting",
    height: 680,
    description:
      "Oversized proportions, refined utility details, and city-ready texture tuned to feel more atelier than street rack.",
    materials: ["Technical cotton", "Nylon twill", "Brushed metal"],
    colors: ["Graphite", "White", "Signal red"],
    palette: ["#2C2C2C", "#FFFFFF", "#B51F2B", "#C9A227"]
  },
  {
    id: "summer-drift",
    designer: "Sofia Bell",
    collection: "Summer Drift",
    category: "Summer",
    year: "2025",
    image: image("photo-1496747611176-843222e1e57c"),
    alt: "Light summer designer clothing in an outdoor editorial",
    height: 500,
    description:
      "Airy vacation dressing with sunlit cotton, precise cutouts, and a resort mood kept crisp and editorial.",
    materials: ["Linen", "Cotton voile", "Shell buttons"],
    colors: ["White", "Sky", "Sand"],
    palette: ["#FFFFFF", "#BBD7E8", "#D9C8A8", "#111111"]
  },
  {
    id: "velvet-winter",
    designer: "Etienne Vale",
    collection: "Velvet Winter",
    category: "Winter",
    year: "2026",
    image: image("photo-1516762689617-e1cffcef479d"),
    alt: "Luxury winter coat editorial",
    height: 640,
    description:
      "Dense winter layering with a tactile surface, elongated shape, and dramatic collar work for a cinematic silhouette.",
    materials: ["Cashmere wool", "Velvet", "Silk satin"],
    colors: ["Oxblood", "Black", "Pearl"],
    palette: ["#561F24", "#111111", "#F8F8F8", "#C9A227"]
  },
  {
    id: "atelier-wedding",
    designer: "Amara Valen",
    collection: "Atelier Wedding",
    category: "Wedding",
    year: "2026",
    image: image("photo-1594552072238-b8a33785b261"),
    alt: "Modern designer wedding dress in soft light",
    height: 740,
    description:
      "A modern bridal form with translucent layers, clean corsetry, and delicate hand-finished edges.",
    materials: ["Tulle", "Silk faille", "Pearl applique"],
    colors: ["Ivory", "Pearl", "Warm white"],
    palette: ["#FDFBF7", "#EFEAE2", "#C9A227", "#111111"],
    featured: true
  },
  {
    id: "prism-editorial",
    designer: "Rhea Laurent",
    collection: "Prism Editorial",
    category: "Editorial",
    year: "2025",
    image: image("photo-1503342217505-b0a15ec3261c"),
    alt: "Bold editorial fashion portrait",
    height: 600,
    description:
      "Color-blocked editorial dressing designed for high-impact magazine compositions and gallery walls.",
    materials: ["Crepe", "Silk mesh", "Lacquered hardware"],
    colors: ["Crimson", "Powder", "Black"],
    palette: ["#B11226", "#E7D8DE", "#111111", "#C9A227"]
  },
  {
    id: "pearl-accessories",
    designer: "Noor Elian",
    collection: "Pearl Objects",
    category: "Luxury",
    year: "2026",
    image: image("photo-1523170335258-f5ed11844a49"),
    alt: "Luxury fashion accessories with jewelry styling",
    height: 520,
    description:
      "A compact study of accessories, jewelry scale, and luminous styling details that complete an atelier look.",
    materials: ["Pearl", "Gold vermeil", "Silk cord"],
    colors: ["Pearl", "Gold", "Black"],
    palette: ["#F6F1E7", "#C9A227", "#111111", "#FFFFFF"]
  },
  {
    id: "international-line",
    designer: "Marco Ives",
    collection: "International Line",
    category: "International",
    year: "2025",
    image: image("photo-1512436991641-6745cdb1723f"),
    alt: "International luxury ready-to-wear editorial",
    height: 680,
    description:
      "Global ready-to-wear with elongated outerwear, sharp separates, and quiet travel-ready polish.",
    materials: ["Wool gabardine", "Silk knit", "Leather"],
    colors: ["Camel", "Black", "White"],
    palette: ["#B8976B", "#111111", "#FFFFFF", "#C9A227"]
  },
  {
    id: "casual-ritual",
    designer: "Mila Croix",
    collection: "Casual Ritual",
    category: "Casual",
    year: "2026",
    image: image("photo-1529139574466-a303027c1d8b"),
    alt: "Premium casual designer clothing editorial",
    height: 560,
    description:
      "Elevated casualwear with relaxed denim, sculpted shirting, and studio styling that keeps every line intentional.",
    materials: ["Japanese denim", "Poplin", "Calf leather"],
    colors: ["Blue", "White", "Tobacco"],
    palette: ["#315E86", "#FFFFFF", "#8B5F3D", "#111111"]
  },
  {
    id: "garden-traditional",
    designer: "Ira Mehta",
    collection: "Garden Heirloom",
    category: "Traditional",
    year: "2025",
    image: image("photo-1610030469983-98e550d6193c"),
    alt: "Traditional designer garment with ornate detailing",
    height: 700,
    description:
      "Traditional craft softened with botanical color, fluid drape, and ceremonial detail for a contemporary archive.",
    materials: ["Chiffon", "Thread embroidery", "Mirror work"],
    colors: ["Rose", "Mint", "Gold"],
    palette: ["#C9858F", "#AFCBB2", "#C9A227", "#F8F8F8"]
  },
  {
    id: "mens-resort",
    designer: "Luca Ren",
    collection: "Resort Line",
    category: "Men",
    year: "2026",
    image: image("photo-1507680434567-5739c80be1ac"),
    alt: "Mens resort tailoring with relaxed luxury styling",
    height: 580,
    description:
      "Relaxed menswear with open collars, softened tailoring, and refined resort proportions.",
    materials: ["Linen suiting", "Silk blend", "Suede"],
    colors: ["Olive", "Cream", "Black"],
    palette: ["#4F5B45", "#EFE7D7", "#111111", "#C9A227"]
  },
  {
    id: "white-space",
    designer: "Claire Noem",
    collection: "White Space",
    category: "Women",
    year: "2026",
    image: image("photo-1539109136881-3be0616acf4b"),
    alt: "Luxury womenswear editorial in neutral tones",
    height: 630,
    description:
      "A monochrome womenswear study balancing negative space, fluid tailoring, and subtle sculptural detail.",
    materials: ["Silk crepe", "Wool voile", "Satin"],
    colors: ["White", "Ash", "Black"],
    palette: ["#FFFFFF", "#C9C9C9", "#111111", "#C9A227"]
  },
  {
    id: "copper-evening",
    designer: "Rhea Laurent",
    collection: "Copper Evening",
    category: "Luxury Gowns",
    year: "2025",
    image: image("photo-1512316609839-ce289d3eba0a"),
    alt: "Cinematic evening fashion portrait",
    height: 760,
    description:
      "A warm-toned evening narrative built around reflected light, softened volume, and precise jewelry-scale shine.",
    materials: ["Lamé", "Silk georgette", "Crystal trim"],
    colors: ["Copper", "Black", "Gold"],
    palette: ["#AD6F45", "#111111", "#C9A227", "#F8F8F8"]
  }
];

export const collections: Collection[] = [
  {
    id: "summer-collection",
    title: "Summer Collection",
    season: "Resort 2026",
    description: "Sunlit linens, sculpted cotton, and weightless silhouettes for modern resort dressing.",
    image: image("photo-1496747611176-843222e1e57c"),
    tone: "Air, light, and precision",
    count: 32
  },
  {
    id: "winter-collection",
    title: "Winter Collection",
    season: "Winter 2026",
    description: "Cashmere coats, velvet surfaces, and dramatic tailoring with gallery-scale presence.",
    image: image("photo-1516762689617-e1cffcef479d"),
    tone: "Tactile and cinematic",
    count: 28
  },
  {
    id: "luxury-collection",
    title: "Luxury Collection",
    season: "Atelier Edit",
    description: "Hand-finished gowns, rare materials, and luminous accessories curated as wearable art.",
    image: image("photo-1515886657613-9f3515b0c78f"),
    tone: "Opulent restraint",
    count: 41
  },
  {
    id: "wedding-collection",
    title: "Wedding Collection",
    season: "Bridal 2026",
    description: "Modern bridal silhouettes, ceremonial embroidery, and heirloom-level finishing.",
    image: image("photo-1594552072238-b8a33785b261"),
    tone: "Ceremonial elegance",
    count: 24
  },
  {
    id: "traditional-collection",
    title: "Traditional Collection",
    season: "Heritage",
    description: "Couture craft, regional textiles, and ornate details presented with contemporary spacing.",
    image: image("photo-1610030469983-98e550d6193c"),
    tone: "Heritage in motion",
    count: 36
  },
  {
    id: "minimal-collection",
    title: "Minimal Collection",
    season: "Permanent",
    description: "Strict lines, quiet palettes, and wardrobe pieces designed for editorial longevity.",
    image: image("photo-1509631179647-0177331693ae"),
    tone: "Quiet architecture",
    count: 19
  }
];

export const designers: Designer[] = [
  {
    id: slugify("Amara Valen"),
    name: "Amara Valen",
    photo: image("photo-1494790108377-be9c29b29330"),
    specialty: "Bridal and evening atelier",
    yearsActive: "2012 - Present",
    biography:
      "Known for architectural gowns and quiet opulence, Amara builds ceremony pieces with sculptural precision and luminous textile work.",
    collections: ["Golden Hour Atelier", "Atelier Wedding", "Pearl Objects"],
    stats: { collections: 18, exhibitions: 42, editorials: 96 }
  },
  {
    id: slugify("Luca Ren"),
    name: "Luca Ren",
    photo: image("photo-1500648767791-00dcc994a43e"),
    specialty: "Modern menswear",
    yearsActive: "2010 - Present",
    biography:
      "Luca's tailoring is built around restraint, proportion, and fabric discipline, creating menswear that feels private, powerful, and exact.",
    collections: ["Noir Tailoring", "Resort Line", "International Line"],
    stats: { collections: 21, exhibitions: 34, editorials: 71 }
  },
  {
    id: slugify("Ira Mehta"),
    name: "Ira Mehta",
    photo: image("photo-1534528741775-53994a69daeb"),
    specialty: "Heritage couture",
    yearsActive: "2015 - Present",
    biography:
      "Ira translates traditional craft into gallery-ready couture, working with embroidery houses and textile artisans across India.",
    collections: ["Saffron Vows", "Garden Heirloom", "Heritage Line"],
    stats: { collections: 14, exhibitions: 29, editorials: 64 }
  },
  {
    id: slugify("Mika Sato"),
    name: "Mika Sato",
    photo: image("photo-1508214751196-bcfd4ca60f91"),
    specialty: "Street couture",
    yearsActive: "2018 - Present",
    biography:
      "Mika shapes utility and street language into polished couture codes with a strong eye for movement and city silhouettes.",
    collections: ["Street Couture", "Graphite Motion", "Night Signal"],
    stats: { collections: 11, exhibitions: 22, editorials: 58 }
  }
];

export function getGalleryItem(id: string) {
  return galleryItems.find((item) => item.id === id);
}

export function getRelatedItems(item: GalleryItem, limit = 4) {
  return galleryItems
    .filter(
      (candidate) =>
        candidate.id !== item.id &&
        (candidate.category === item.category || candidate.designer === item.designer)
    )
    .slice(0, limit);
}
