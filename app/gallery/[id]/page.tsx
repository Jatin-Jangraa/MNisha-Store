import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getImage, listImages } from "@/lib/cloudinary";
import type { GalleryItem } from "@/types/gallery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ id: string }>;
};

async function findItem(id: string): Promise<GalleryItem | undefined> {
  try {
    const item = await getImage(id);
    return item || undefined;
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = await findItem(id);

  if (!item) {
    return { title: "Gallery Detail" };
  }

  return {
    title: "Gallery",
    openGraph: {
      images: [{ url: item.image }]
    }
  };
}

export default async function GalleryDetailPage({ params }: Params) {
  const { id } = await params;
  const item = await findItem(id);

  if (!item) notFound();

  const allItems = await listImages();

  const currentIndex = allItems.findIndex((candidate: GalleryItem) => candidate.id === item.id);
  const previous = allItems[(currentIndex - 1 + allItems.length) % allItems.length];
  const next = allItems[(currentIndex + 1) % allItems.length];

  return (
    <main className="pt-24">
      <section className="container py-12 md:py-24">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/gallery"
            className="rounded-full border border-border bg-background px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-all hover:border-luxury-gold hover:text-luxury-gold"
          >
            Back to Gallery
          </Link>
        </div>

        <div className="relative min-h-[70vh] overflow-hidden rounded-3xl border border-border/30 bg-card shadow-editorial-xl">
          <Image
            src={item.image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 100vw"
            className="object-contain"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {previous && (
            <Link
              href={`/gallery/${previous.id}`}
              className="rounded-full border border-border bg-background px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] transition-all hover:border-luxury-gold hover:text-luxury-gold"
            >
              Previous
            </Link>
          )}
          {next && (
            <Link
              href={`/gallery/${next.id}`}
              className="rounded-full bg-luxury-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-luxury-ink transition-all hover:bg-luxury-gold-dark"
            >
              Next
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
