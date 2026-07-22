import type { Metadata } from "next";
import Image from "next/image";

import { SectionReveal } from "@/components/section-reveal";
import { Badge } from "@/components/ui/badge";
import { designers } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Designers",
  description: "Meet the designers behind the Mnisha fashion gallery."
};

export default function DesignersPage() {
  return (
    <main className="pt-24">
      <section className="container py-16 md:py-28">
        <Badge variant="gold">Designers</Badge>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">
          Profiles with atelier detail and editorial restraint.
        </h1>
      </section>

      <section className="container grid gap-6 pb-24 lg:grid-cols-2">
        {designers.map((designer, index) => (
          <SectionReveal key={designer.id} delay={index * 0.06}>
            <article className="group grid overflow-hidden rounded-2xl border border-border/30 bg-card shadow-premium transition-all duration-700 hover:shadow-editorial-lg hover:scale-[1.005] md:grid-cols-[280px_1fr]">
              <div className="relative min-h-80 overflow-hidden">
                <Image
                  src={designer.photo}
                  alt={designer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
              <div className="p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-luxury-gold">
                  {designer.specialty}
                </p>
                <h2 className="mt-3 font-serif text-3xl">{designer.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground/50">{designer.yearsActive}</p>
                <p className="mt-5 text-[15px] leading-7 text-muted-foreground">{designer.biography}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Stat label="Collections" value={designer.stats.collections} />
                  <Stat label="Exhibitions" value={designer.stats.exhibitions} />
                  <Stat label="Editorials" value={designer.stats.editorials} />
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {designer.collections.map((collection) => (
                    <span key={collection} className="rounded-full bg-muted/40 px-3.5 py-1.5 text-xs font-medium">
                      {collection}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </SectionReveal>
        ))}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/30 p-3.5">
      <p className="font-serif text-2xl">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/50">{label}</p>
    </div>
  );
}
