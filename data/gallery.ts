import { getImageUrl } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery";

const image = (id: string, width?: number) => getImageUrl(id, width);

export const galleryItems: GalleryItem[] = [
  {
    id: "golden-hour-gown",
    image: image("photo-1515886657613-9f3515b0c78f"),
    height: 620
  },
  {
    id: "noir-tailoring",
    image: image("photo-1520975916090-3105956dac38"),
    height: 520
  },
  {
    id: "saffron-vows",
    image: image("photo-1610030469983-98e550d6193c"),
    height: 720
  },
  {
    id: "ivory-minimal",
    image: image("photo-1509631179647-0177331693ae"),
    height: 560
  },
  {
    id: "street-couture",
    image: image("photo-1483985988355-763728e1935b"),
    height: 680
  },
  {
    id: "summer-drift",
    image: image("photo-1496747611176-843222e1e57c"),
    height: 500
  },
  {
    id: "velvet-winter",
    image: image("photo-1516762689617-e1cffcef479d"),
    height: 640
  },
  {
    id: "atelier-wedding",
    image: image("photo-1594552072238-b8a33785b261"),
    height: 740
  },
  {
    id: "prism-editorial",
    image: image("photo-1503342217505-b0a15ec3261c"),
    height: 600
  },
  {
    id: "pearl-accessories",
    image: image("photo-1523170335258-f5ed11844a49"),
    height: 520
  },
  {
    id: "international-line",
    image: image("photo-1512436991641-6745cdb1723f"),
    height: 680
  },
  {
    id: "casual-ritual",
    image: image("photo-1529139574466-a303027c1d8b"),
    height: 560
  },
  {
    id: "garden-traditional",
    image: image("photo-1610030469983-98e550d6193c"),
    height: 700
  },
  {
    id: "mens-resort",
    image: image("photo-1507680434567-5739c80be1ac"),
    height: 580
  },
  {
    id: "white-space",
    image: image("photo-1539109136881-3be0616acf4b"),
    height: 630
  },
  {
    id: "copper-evening",
    image: image("photo-1512316609839-ce289d3eba0a"),
    height: 760
  }
];

export function getGalleryItem(id: string) {
  return galleryItems.find((item) => item.id === id);
}

export function getRelatedItems(item: GalleryItem, limit = 4) {
  return galleryItems
    .filter((candidate) => candidate.id !== item.id)
    .slice(0, limit);
}
