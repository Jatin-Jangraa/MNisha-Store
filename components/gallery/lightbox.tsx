"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
        <Dialog.Content className="fixed inset-0 z-[71] flex items-center justify-center p-4 md:p-8">
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 z-[72] grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:right-6 md:top-6">
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>

          <div className="relative h-full w-full max-w-6xl">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <Button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 md:left-6"
            size="icon"
            variant="outline"
            aria-label="Previous image"
            onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 md:right-6"
            size="icon"
            variant="outline"
            aria-label="Next image"
            onClick={() => onIndexChange((index + 1) % items.length)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40">
            {index + 1} / {items.length}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
