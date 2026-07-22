import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { galleryItems, getGalleryItem, getRelatedItems } from "@/data/gallery";
import { getUploadedItems, getUploadedItem } from "@/lib/uploads";
import type { GalleryItem } from "@/types/gallery";

type Params = {
  params: Promise<{ id: string }>;
};

async function getAllItems(): Promise<GalleryItem[]> {
  try {
    const uploaded = await getUploadedItems();
    return [...galleryItems, ...uploaded];
  } catch {
    return galleryItems;
  }
}

async function findItem(id: string): Promise<GalleryItem | undefined> {
  const staticItem = getGalleryItem(id);
  if (staticItem) return staticItem;

  try {
    return await getUploadedItem(id);
  } catch {
    return undefined;
  }
}

export async function generateStaticParams() {
  return galleryItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = await findItem(id);

  if (!item) {
    return { title: "Gallery Detail" };
  }

  return {
    title: item.collection,
    description: item.description,
    openGraph: {
      images: [{ url: item.image, alt: item.alt }]
    }
  };
}

export default async function GalleryDetailPage({ params }: Params) {
  const { id } = await params;
  const item = await findItem(id);

  if (!item) notFound();

  const allItems = await getAllItems();
  const currentIndex = allItems.findIndex((candidate) => candidate.id === item.id);
  const previous = allItems[(currentIndex - 1 + allItems.length) % allItems.length];
  const next = allItems[(currentIndex + 1) % allItems.length];
  const related = getRelatedItems(item, 4);

  return (
    <main className="pt-24">
      <section className="container grid gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="relative min-h-[72vh] overflow-hidden rounded-3xl border border-border/30 bg-card shadow-editorial-xl">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>

        <aside className="self-center">
          <Button asChild variant="outline" size="sm">
            <Link href="/gallery">
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
          <div className="mt-10">
            <Badge variant="gold">{item.category}</Badge>
            <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">{item.collection}</h1>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-luxury-gold">
              {item.designer} / {item.year}
            </p>
            <p className="mt-8 text-[15px] leading-8 text-muted-foreground">{item.description}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <DetailBlock label="Materials" values={item.materials} />
            <DetailBlock label="Colors" values={item.colors} />
          </div>

          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">Color Palette</p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {item.palette.map((color) => (
                <span
                  key={color}
                  className="h-16 rounded-xl border border-border/30 shadow-sm transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={`/gallery/${previous.id}`}>
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Link>
            </Button>
            <Button asChild variant="gold">
              <Link href={`/gallery/${next.id}`}>
                Next
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </aside>
      </section>

      <section className="relative bg-secondary/30 py-20 md:py-28">
        <div className="absolute inset-0 noise pointer-events-none opacity-20" />
        <div className="container relative">
          <Badge variant="gold">Related designs</Badge>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {related.map((relatedItem) => (
              <Link
                href={`/gallery/${relatedItem.id}`}
                key={relatedItem.id}
                className="group overflow-hidden rounded-2xl border border-border/30 bg-card shadow-soft transition-all duration-700 hover:shadow-editorial hover:scale-[1.01]"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={relatedItem.image}
                    alt={relatedItem.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-luxury-gold">
                    {relatedItem.category}
                  </p>
                  <h3 className="mt-2 font-serif text-xl">{relatedItem.collection}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MasonryGallery compact />
    </main>
  );
}

function DetailBlock({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card p-5 shadow-soft">
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">{label}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {values.map((value) => (
          <span key={value} className="rounded-full bg-muted/40 px-3.5 py-1.5 text-xs font-medium">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
