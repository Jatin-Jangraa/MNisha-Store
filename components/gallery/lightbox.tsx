"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Heart, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/types/gallery";

export function Lightbox({
  items,
  index,
  open,
  onOpenChange,
  onIndexChange
}: {
  items: GalleryItem[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}) {
  const item = items[index];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
      if (event.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onIndexChange, onOpenChange, open]);

  if (!item) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-3xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content className="fixed inset-3 z-[71] grid overflow-hidden rounded-3xl border border-white/5 bg-background shadow-editorial-xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 md:inset-6 lg:grid-cols-[1fr_400px]">
          <div className="relative min-h-[55vh] bg-black">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-contain"
            />
            <div className="absolute left-5 top-5 flex gap-2">
              <Button size="icon" variant="outline" aria-label="Fullscreen preview" className="glass border-white/10 text-white hover:bg-white/10">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" aria-label="Favorite design" className="glass border-white/10 text-white hover:bg-white/10">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="absolute left-5 top-1/2 -translate-y-1/2 glass border-white/10 text-white hover:bg-white/10"
              size="icon"
              variant="outline"
              aria-label="Previous image"
              onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              className="absolute right-5 top-1/2 -translate-y-1/2 glass border-white/10 text-white hover:bg-white/10"
              size="icon"
              variant="outline"
              aria-label="Next image"
              onClick={() => onIndexChange((index + 1) % items.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="absolute bottom-5 left-5 text-xs text-white/40">
              {index + 1} / {items.length}
            </div>
          </div>

          <aside className="flex flex-col justify-between overflow-y-auto p-8">
            <div>
              <div className="flex items-start justify-between gap-4">
                <Dialog.Title className="font-serif text-4xl leading-tight md:text-5xl">
                  {item.collection}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <Button size="icon" variant="ghost" aria-label="Close preview" className="shrink-0">
                    <X className="h-5 w-5" />
                  </Button>
                </Dialog.Close>
              </div>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-luxury-gold">
                {item.designer} / {item.year}
              </p>
              <p className="mt-8 text-[15px] leading-8 text-muted-foreground">{item.description}</p>

              {item.materials && item.materials.length > 0 && (
                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">Materials</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.materials.map((m) => (
                      <span key={m} className="rounded-full bg-muted/50 px-3.5 py-1.5 text-xs font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.colors && item.colors.length > 0 && (
                <div className="mt-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">Colors</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.colors.map((c) => (
                      <span key={c} className="rounded-full bg-muted/50 px-3.5 py-1.5 text-xs font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 grid grid-cols-4 gap-2">
              {item.palette.map((color) => (
                <span
                  key={color}
                  className="h-14 rounded-xl border border-border/30 shadow-sm transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
