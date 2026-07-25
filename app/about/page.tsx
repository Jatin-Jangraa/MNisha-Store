import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description: "About Mnisha."
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      <section className="container py-16 md:py-28">
        <Badge variant="gold">About</Badge>
        <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
          About Mnisha
        </h1>
        <p className="mt-8 max-w-2xl text-[15px] leading-8 text-muted-foreground">
          A digital fashion exhibition showcasing designer clothing through a refined visual gallery.
        </p>
      </section>
    </main>
  );
}
