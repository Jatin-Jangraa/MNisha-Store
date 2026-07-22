import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/hero";
import { ImageMarquee } from "@/components/image-marquee";
import { LoadingScreen } from "@/components/loading-screen";
import { SectionReveal } from "@/components/section-reveal";
import { collections, galleryItems } from "@/data/gallery";

export default async function HomePage() {

  return (
    <main>
      <LoadingScreen />
      <Hero />

      <ImageMarquee />

      {/* Full-bleed editorial */}
      <section id="showcase" className="relative h-[70vh] md:h-[85vh]">
        <SectionReveal>
          <Image
            src={galleryItems[2].image}
            alt={galleryItems[2].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-luxury-gold-lighter">
              {galleryItems[2].category}
            </p>
            <h2 className="mt-3 font-serif text-4xl text-white md:text-6xl">
              {galleryItems[2].collection}
            </h2>
            <Link
              href={`/gallery/${galleryItems[2].id}`}
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-luxury-gold-lighter"
            >
              View <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* 3-image grid - all same height */}
      <section className="grid grid-cols-3 gap-1">
        {[galleryItems[0], galleryItems[4], galleryItems[5]].map((item, i) => (
          <SectionReveal key={item.id} delay={i * 0.08}>
            <Link href={`/gallery/${item.id}`} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </SectionReveal>
        ))}
      </section>

      {/* Full-bleed editorial */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <SectionReveal>
          <Image
            src={galleryItems[6].image}
            alt={galleryItems[6].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-luxury-gold-lighter">
              {galleryItems[6].category}
            </p>
            <h2 className="mt-3 font-serif text-4xl text-white md:text-6xl">
              {galleryItems[6].collection}
            </h2>
            <Link
              href={`/gallery/${galleryItems[6].id}`}
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-luxury-gold-lighter"
            >
              View <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* 2-image grid - same height */}
      <section className="grid grid-cols-2 gap-1">
        {[galleryItems[7], galleryItems[8]].map((item, i) => (
          <SectionReveal key={item.id} delay={i * 0.08}>
            <Link href={`/gallery/${item.id}`} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

      {/* 4-image grid - same height */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {[galleryItems[9], galleryItems[10], galleryItems[11], galleryItems[12]].map((item, i) => (
          <SectionReveal key={item.id} delay={i * 0.06}>
            <Link href={`/gallery/${item.id}`} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </Link>
          </SectionReveal>
        ))}
      </section>

      {/* Full-bleed editorial */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <SectionReveal>
          <Image
            src={galleryItems[13].image}
            alt={galleryItems[13].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-luxury-gold-lighter">
              {galleryItems[13].category}
            </p>
            <h2 className="mt-3 font-serif text-4xl text-white md:text-6xl">
              {galleryItems[13].collection}
            </h2>
            <Link
              href={`/gallery/${galleryItems[13].id}`}
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-luxury-gold-lighter"
            >
              View <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* Reverse image marquee */}
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee-reverse gap-4">
          {[...galleryItems.slice(8, 16), ...galleryItems.slice(8, 16)].map((item, index) => (
            <div
              key={`${item.id}-rev-${index}`}
              className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl md:h-32 md:w-48"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Collection cards - all same aspect ratio */}
      <section className="px-4 py-16 md:px-8 md:py-28">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {collections.map((collection, i) => (
            <SectionReveal key={collection.id} delay={i * 0.05}>
              <Link
                href="/collections"
                className="group relative block aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full transition-transform duration-500 group-hover:translate-y-0 md:p-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-luxury-gold-lighter md:text-[9px]">
                    {collection.season}
                  </p>
                  <p className="mt-0.5 font-serif text-sm text-white md:text-base">{collection.title}</p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Designer portraits - all same aspect ratio */}
      <section className="relative bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-10 md:mb-14">
              <div className="h-px w-8 bg-luxury-gold" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50">Designers</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[galleryItems[0], galleryItems[1], galleryItems[4], galleryItems[14]].map((item, i) => (
              <SectionReveal key={item.id} delay={i * 0.08}>
                <Link
                  href={`/gallery/${item.id}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-luxury-gold-lighter">{item.designer}</p>
                    <p className="mt-1 font-serif text-lg text-white md:text-xl">{item.collection}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <Image
          src={galleryItems[15].image}
          alt={galleryItems[15].alt}
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
