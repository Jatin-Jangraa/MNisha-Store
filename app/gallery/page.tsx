import type { Metadata } from "next";

import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { listImages } from "@/lib/cloudinary";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore a premium masonry gallery of designer clothing collections."
};

export default async function GalleryPage() {
  const items = await listImages();

  return (
    <main className="pt-24">
      <MasonryGallery initialItems={items} />
    </main>
  );
}
