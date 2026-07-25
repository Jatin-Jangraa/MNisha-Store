"use client";

import Image from "next/image";
import type { GalleryItem } from "@/types/gallery";

export function ImageMarquee({ items }: { items: GalleryItem[] }) {
  const images = items.slice(0, 8);
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden py-4">
      <div className="flex w-max animate-marquee gap-4">
        {doubled.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl md:h-32 md:w-48"
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
