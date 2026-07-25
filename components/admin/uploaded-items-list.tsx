"use client";

import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/types/gallery";

export function UploadedItemsList({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setItems(data.items || []);
      } catch {
        console.error("Failed to fetch uploaded items");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [refreshKey]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      console.error("Failed to delete item");
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-luxury-gold/50" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border/30 bg-secondary/20 py-16 text-center">
        <p className="text-sm text-muted-foreground/40">No uploaded images yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-2xl border border-border/30 bg-card p-3.5 shadow-soft transition-all duration-500 hover:shadow-editorial"
        >
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="72px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-muted-foreground/50">{item.id}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(item.id)}
            disabled={deleting === item.id}
            className="shrink-0 text-red-400 hover:text-red-500 hover:bg-red-500/8"
          >
            {deleting === item.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
