"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/gallery";

export function MasonryGallery({ compact = false, initialItems }: { compact?: boolean; initialItems: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(compact ? 8 : 18);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allItems = initialItems;

  const repeatedItems = useMemo(
    () =>
      Array.from({ length: 3 }, (_, round) =>
        allItems.map((item) => ({ ...item, instanceId: `${item.id}-${round}` }))
      ).flat(),
    [allItems]
  );

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return repeatedItems.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const text = [
        item.designer,
        item.collection,
        item.category,
        item.year,
        item.colors.join(" "),
        item.materials.join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return categoryMatch && (!normalized || text.includes(normalized));
    });
  }, [activeCategory, query, repeatedItems]);

  const visible = filtered.slice(0, visibleCount);
  const lightboxItems = visible;

  return (
    <section id="gallery" className="relative bg-background py-20 md:py-28">
      <div className="absolute inset-0 noise pointer-events-none opacity-20" />
      <div className="container relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="gold">Gallery</Badge>
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">
              A living wall of designer fashion.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-muted-foreground">
            Browse couture gowns, tailoring, heritage craft, and accessories in a
            responsive masonry exhibition.
          </p>
        </div>

        <div
          id="search"
          className="sticky top-24 z-30 mt-10 rounded-2xl border border-border/40 bg-background/70 p-3 shadow-premium backdrop-blur-xl"
        >
          <div className="grid gap-3 lg:grid-cols-[minmax(240px,360px)_1fr]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-11"
                placeholder="Search designer, collection, color..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {["All", ...categories].map((category) => (
                <button
                  key={category}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-all duration-500",
                    activeCategory === category
                      ? "border-luxury-gold bg-luxury-gold text-luxury-ink shadow-glow-sm"
                      : "border-border/50 bg-muted/30 text-muted-foreground hover:border-luxury-gold/30 hover:text-luxury-gold"
                  )}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(compact ? 8 : 18);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground/50">
          <span className="text-xs">{filtered.length} curated looks</span>
          <span className="inline-flex items-center gap-2 text-xs">
            <SlidersHorizontal className="h-3 w-3 text-luxury-gold/50" />
            Masonry / scroll
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
                  aria-label={`Preview ${item.collection}`}
                >
                  <div className="relative overflow-hidden" style={{ height: item.height }}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      loading={index < 4 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="absolute inset-0 border border-white/0 transition-all duration-700 group-hover:border-white/5 rounded-2xl" />
                    <div className="absolute right-3.5 top-3.5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-500 group-hover:bg-luxury-gold group-hover:text-luxury-ink">
                        <Heart className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 text-white transition-all duration-700 ease-out group-hover:translate-y-0">
                      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-luxury-gold-lighter">
                        {item.category} / {item.year}
                      </p>
                      <h3 className="mt-1.5 font-serif text-2xl leading-tight">{item.collection}</h3>
                      <p className="mt-1 text-sm text-white/55">{item.designer}</p>
                    </div>
                  </div>
                </button>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="flex gap-1.5">
                    {item.palette.slice(0, 4).map((color) => (
                      <span
                        key={color}
                        className="h-3 w-3 rounded-full border border-border/60 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <Link
                    className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40 transition-colors duration-400 hover:text-luxury-gold"
                    href={`/gallery/${item.id}`}
                  >
                    Details
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < filtered.length ? (
          <div className="mt-16 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setVisibleCount((count) => count + 12)}>
              Load More Looks
            </Button>
          </div>
        ) : null}

        <Lightbox
          items={lightboxItems}
          index={Math.min(lightboxIndex, Math.max(lightboxItems.length - 1, 0))}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          onIndexChange={setLightboxIndex}
        />
      </div>
    </section>
  );
}
