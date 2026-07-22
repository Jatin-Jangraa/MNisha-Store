import type { Metadata } from "next";

import { MasonryGallery } from "@/components/gallery/masonry-gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore a premium masonry gallery of designer clothing collections."
};

export default function GalleryPage() {
  return (
    <main className="pt-24">
      <MasonryGallery />
    </main>
  );
}
