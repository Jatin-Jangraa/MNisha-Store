import type { Metadata } from "next";
import Image from "next/image";

import { SectionReveal } from "@/components/section-reveal";
import { Badge } from "@/components/ui/badge";
import { collections } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore seasonal rooms of luxury designer clothing collections."
};

export default function CollectionsPage() {
  return (
    <main className="pt-24">
      <section className="container py-16 md:py-28">
        <Badge variant="gold">Collections</Badge>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">
          Seasonal edits built like gallery rooms.
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-8 text-muted-foreground">
          Summer, winter, bridal, heritage, luxury, and minimal collections arranged as visual
          narratives rather than product shelves.
        </p>
      </section>

      <section className="container grid gap-5 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection, index) => (
          <SectionReveal key={collection.id} delay={index * 0.05}>
            <article className="group overflow-hidden rounded-2xl border border-border/30 bg-card shadow-premium transition-all duration-700 hover:shadow-editorial-lg hover:scale-[1.01]">
              <div className="relative h-[460px] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {collection.count} looks
                </div>
              </div>
              <div className="p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-luxury-gold">
                  {collection.season}
                </p>
                <h2 className="mt-2 font-serif text-3xl">{collection.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{collection.description}</p>
                <p className="mt-5 border-t border-border/30 pt-4 text-sm italic text-muted-foreground/50">
                  &ldquo;{collection.tone}&rdquo;
                </p>
              </div>
            </article>
          </SectionReveal>
        ))}
      </section>
    </main>
  );
}
