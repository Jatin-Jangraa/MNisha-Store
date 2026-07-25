import type { Metadata } from "next";
import Image from "next/image";

import { SectionReveal } from "@/components/section-reveal";
import { Badge } from "@/components/ui/badge";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
  title: "Collections",
  description: "Designer clothing collections."
};

export default function CollectionsPage() {
  return (
    <main className="pt-24">
      <section className="container py-16 md:py-28">
        <Badge variant="gold">Collections</Badge>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">
          Collections
        </h1>
      </section>

      <section className="container grid gap-5 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection, index) => (
          <SectionReveal key={collection.id} delay={index * 0.05}>
            <article className="group overflow-hidden rounded-2xl border border-border/30 bg-card shadow-premium transition-all duration-700 hover:shadow-editorial-lg hover:scale-[1.01]">
              <div className="relative h-[460px] overflow-hidden">
                <Image
                  src={collection.image}
                  alt=""
                  fill
                  sizes="(max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>
            </article>
          </SectionReveal>
        ))}
      </section>
    </main>
  );
}
