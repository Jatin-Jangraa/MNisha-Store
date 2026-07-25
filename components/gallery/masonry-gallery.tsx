"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { GalleryItem } from "@/types/gallery";

export function MasonryGallery({ compact = false, initialItems }: { compact?: boolean; initialItems: GalleryItem[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(compact ? 8 : 50);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allItems = initialItems;
  const filtered = query
    ? allItems.filter((item) => item.id.toLowerCase().includes(query.toLowerCase()))
    : allItems;
  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="gallery" className="relative bg-background py-20 md:py-28">
      <div className="absolute inset-0 noise pointer-events-none opacity-20" />
      <div className="container relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="gold">Gallery</Badge>
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">
              Designer Collection
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-muted-foreground">
            {filtered.length} images
          </p>
        </div>

        <div
          id="search"
          className="sticky top-24 z-30 mt-10 rounded-2xl border border-border/40 bg-background/70 p-3 shadow-premium backdrop-blur-xl"
        >
          <div className="relative max-w-md">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search images..."
            />
          </div>
        </div>

        <div className="masonry mt-8 columns-1 sm:columns-2 lg:columns-3 2xl:columns-4">
          {visible.map((item, index) => (
            <div
              key={item.id}
              className="mb-4 break-inside-avoid cursor-pointer group"
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card shadow-soft transition-all duration-500 hover:shadow-editorial">
                <Image
                  src={item.image}
                  alt=""
                  width={600}
                  height={item.height}
                  loading={index < 4 ? "eager" : "lazy"}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount((count) => count + 20)}
              className="rounded-full border border-border bg-background px-8 py-3 text-sm font-medium transition-all hover:border-luxury-gold hover:text-luxury-gold"
            >
              Load More
            </button>
          </div>
        )}

        <Lightbox
          items={visible}
          index={Math.min(lightboxIndex, Math.max(visible.length - 1, 0))}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          onIndexChange={setLightboxIndex}
        />
      </div>
    </section>
  );
}
