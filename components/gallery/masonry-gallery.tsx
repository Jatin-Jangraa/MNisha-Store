"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { GalleryItem } from "@/types/gallery";

export function MasonryGallery({ compact = false, initialItems }: { compact?: boolean; initialItems: GalleryItem[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(compact ? 8 : 24);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allItems = initialItems;

  const repeatedItems = compact
    ? allItems.map((item) => ({ ...item, instanceId: item.id }))
    : Array.from({ length: 3 }, (_, round) =>
        allItems.map((item) => ({ ...item, instanceId: `${item.id}-${round}` }))
      ).flat();

  const visible = repeatedItems.slice(0, visibleCount);

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
        </div>

        <div
          id="search"
          className="sticky top-24 z-30 mt-10 rounded-2xl border border-border/40 bg-background/70 p-3 shadow-premium backdrop-blur-xl"
        >
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-11"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground/50">
          <span className="text-xs">{visible.length} images</span>
          <span className="inline-flex items-center gap-2 text-xs">
            <SlidersHorizontal className="h-3 w-3 text-luxury-gold/50" />
            Masonry
          </span>
        </div>

        <motion.div
          layout
          className="masonry mt-8 columns-1 sm:columns-2 lg:columns-3 2xl:columns-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <motion.article
                layout
                key={item.instanceId}
                className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card shadow-soft transition-shadow duration-700 hover:shadow-editorial"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.02, 0.3), ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
              >
                <button
                  className="block w-full text-left"
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  aria-label={`Preview image`}
                >
                  <div className="relative overflow-hidden" style={{ height: item.height }}>
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      loading={index < 4 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < repeatedItems.length && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount((count) => count + 12)}
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
