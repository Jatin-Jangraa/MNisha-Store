import type { Metadata } from "next";
import Image from "next/image";

import { SectionReveal } from "@/components/section-reveal";
import { Badge } from "@/components/ui/badge";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Mnisha digital fashion exhibition."
};

const timeline = [
  ["2019", "The first private visual archive is assembled for editorial references."],
  ["2022", "The format expands into a digital exhibition model for designer collections."],
  ["2024", "Masonry discovery, designer profiles, and collection rooms become the core experience."],
  ["2026", "Mnisha launches as a luxury gallery for fashion imagery."]
];

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="container grid gap-12 py-16 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionReveal>
          <Badge variant="gold">About</Badge>
          <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
            A digital fashion exhibition, not a store.
          </h1>
          <p className="mt-8 text-[15px] leading-8 text-muted-foreground">
            Mnisha exists to showcase designer clothing collections with the quiet authority
            of a fashion magazine and the exploratory rhythm of a visual archive.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <div className="relative min-h-[620px] overflow-hidden rounded-3xl border border-border/30 shadow-editorial-xl">
            <Image
              src={galleryItems[2].image}
              alt={galleryItems[2].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </SectionReveal>
      </section>

      <section className="relative bg-secondary/30 py-20 md:py-32">
        <div className="absolute inset-0 noise pointer-events-none opacity-20" />
        <div className="container relative grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <Badge variant="gold">Mission</Badge>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl">Make fashion feel collectible.</h2>
            <p className="mt-6 text-[15px] leading-8 text-muted-foreground">
              The mission is to present clothing as culture: materials, silhouette, color, movement,
              and provenance arranged into a calm, immersive interface.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <Badge variant="gold">Vision</Badge>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl">Slow looking, fast discovery.</h2>
            <p className="mt-6 text-[15px] leading-8 text-muted-foreground">
              The vision is a responsive fashion gallery where every scroll, hover, and transition
              supports discovery without turning the experience into commerce.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="container py-20 md:py-32">
        <Badge variant="gold">Timeline</Badge>
        <div className="mt-10 space-y-0">
          {timeline.map(([year, text], index) => (
            <SectionReveal key={year} delay={index * 0.06}>
              <div className="grid gap-4 border-t border-border/30 py-7 md:grid-cols-[160px_1fr]">
                <p className="font-serif text-3xl text-luxury-gold">{year}</p>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
