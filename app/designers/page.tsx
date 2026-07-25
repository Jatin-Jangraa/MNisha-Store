import type { Metadata } from "next";
import Image from "next/image";

import { SectionReveal } from "@/components/section-reveal";
import { Badge } from "@/components/ui/badge";
import { designers } from "@/data/designers";

export const metadata: Metadata = {
  title: "Designers",
  description: "Designers behind the collection."
};

export default function DesignersPage() {
  return (
    <main className="pt-24">
      <section className="container py-16 md:py-28">
        <Badge variant="gold">Designers</Badge>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">
          Designers
        </h1>
      </section>

      <section className="container grid gap-6 pb-24 lg:grid-cols-2">
        {designers.map((designer, index) => (
          <SectionReveal key={designer.id} delay={index * 0.06}>
            <article className="group overflow-hidden rounded-2xl border border-border/30 bg-card shadow-premium transition-all duration-700 hover:shadow-editorial-lg hover:scale-[1.005]">
              <div className="relative min-h-80 overflow-hidden">
                <Image
                  src={designer.photo}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </article>
          </SectionReveal>
        ))}
      </section>
    </main>
  );
}
