import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/hero";
import { ImageMarquee } from "@/components/image-marquee";
import { LoadingScreen } from "@/components/loading-screen";
import { SectionReveal } from "@/components/section-reveal";
import { galleryItems } from "@/data/gallery";
import { getUploadedItems } from "@/lib/uploads";
import type { GalleryItem } from "@/types/gallery";

async function getAllItems(): Promise<GalleryItem[]> {
  try {
    const uploaded = await getUploadedItems();
    return [...galleryItems, ...uploaded];
  } catch {
    return galleryItems;
  }
}

export default async function HomePage() {
  const allItems = await getAllItems();

  return (
    <main>
      <LoadingScreen />
      <Hero items={allItems} />

      <ImageMarquee items={allItems} />

      {/* Full-bleed image */}
      <section id="showcase" className="relative h-[70vh] md:h-[85vh]">
        <SectionReveal>
          <Image
            src={allItems[2].image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </SectionReveal>
      </section>

      {/* 3-image grid */}
      <section className="grid grid-cols-3 gap-1">
        {[allItems[0], allItems[4], allItems[5]].map((item, i) => (
          <SectionReveal key={item.id} delay={i * 0.08}>
            <Link href={`/gallery/${item.id}`} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </Link>
          </SectionReveal>
        ))}
      </section>

      {/* Full-bleed image */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <SectionReveal>
          <Image
            src={allItems[6].image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </SectionReveal>
      </section>

      {/* 2-image grid */}
      <section className="grid grid-cols-2 gap-1">
        {[allItems[7], allItems[8]].map((item, i) => (
          <SectionReveal key={item.id} delay={i * 0.08}>
            <Link href={`/gallery/${item.id}`} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </Link>
          </SectionReveal>
        ))}
      </section>

      {/* Statement strip */}
      <section className="relative flex items-center justify-center bg-luxury-ink py-20 md:py-28">
        <div className="absolute inset-0 noise pointer-events-none opacity-30" />
        <SectionReveal>
          <div className="text-center px-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-luxury-gold">Mnisha</p>
            <h2 className="mt-6 font-serif text-4xl text-white md:text-6xl lg:text-7xl">
              Ethnic. Elegant.<br />Timeless.
            </h2>
            <Link
              href="/gallery"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-all duration-500 hover:border-luxury-gold hover:text-luxury-gold"
            >
              Enter Gallery <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* 4-image grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {[allItems[9], allItems[10], allItems[11], allItems[12]].map((item, i) => (
          <SectionReveal key={item.id} delay={i * 0.06}>
            <Link href={`/gallery/${item.id}`} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </Link>
          </SectionReveal>
        ))}
      </section>

      {/* Full-bleed image */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <SectionReveal>
          <Image
            src={allItems[13].image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </SectionReveal>
      </section>

      {/* Reverse image marquee */}
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee-reverse gap-4">
          {[...allItems.slice(8, 16), ...allItems.slice(8, 16)].map((item, index) => (
            <div
              key={`${item.id}-rev-${index}`}
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

      {/* Reverse image marquee */}
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee gap-4">
          {[...allItems.slice(0, 8), ...allItems.slice(0, 8)].map((item, index) => (
            <div
              key={`${item.id}-fwd-${index}`}
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

      {/* Final CTA */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <Image
          src={allItems[15].image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <SectionReveal>
            <div className="text-center px-6">
              <p className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold">Explore</p>
              <h2 className="mt-5 font-serif text-5xl text-white md:text-7xl">The Gallery</h2>
              <Link
                href="/gallery"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-luxury-ink transition-all duration-500 hover:bg-luxury-gold hover:text-luxury-ink"
              >
                Browse All Looks <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
