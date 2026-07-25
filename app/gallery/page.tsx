import type { Metadata } from "next";

import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { galleryItems } from "@/data/gallery";
import { listImages } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore a premium masonry gallery of designer clothing collections."
};

async function getAllItems() {
  try {
    const uploaded = await listImages();
    return [...galleryItems, ...uploaded];
  } catch {
    return galleryItems;
  }
}

export default async function GalleryPage() {
  const allItems = await getAllItems();

  return (
    <main className="pt-24">
      <MasonryGallery initialItems={allItems} />
    </main>
  );
}
