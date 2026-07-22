import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { SectionReveal } from "@/components/section-reveal";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for Mnisha."
};

const details = [
  { icon: Mail, label: "Email", value: "studio@mnisha.example" },
  { icon: Phone, label: "Phone", value: "+1 212 555 0148" },
  { icon: MapPin, label: "Studio", value: "New York / Paris / Milan" }
];

export default function ContactPage() {
  return (
    <main className="pt-24">
      <section className="container py-16 md:py-28">
        <Badge variant="gold">Contact</Badge>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">
          For editorials, exhibitions, and private collection inquiries.
        </h1>
        <p className="mt-8 max-w-2xl text-[15px] leading-8 text-muted-foreground">
          This page is intentionally simple: no accounts, no checkout, no commerce flow. Just an
          elegant point of contact for the gallery.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {details.map(({ icon: Icon, label, value }, index) => (
            <SectionReveal key={label} delay={index * 0.07}>
              <div className="group rounded-2xl border border-border/30 bg-card p-7 shadow-premium transition-all duration-700 hover:shadow-editorial hover:scale-[1.01]">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-luxury-gold/8 transition-all duration-500 group-hover:bg-luxury-gold/15">
                  <Icon className="h-5 w-5 text-luxury-gold" />
                </span>
                <p className="mt-7 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">{label}</p>
                <p className="mt-2 text-xl">{value}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
