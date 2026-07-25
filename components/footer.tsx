import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/constants/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/30 bg-secondary/30">
      <div className="absolute inset-0 noise pointer-events-none opacity-40" />

      <div className="relative container py-16 lg:py-20">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-luxury-gold/20 bg-background/80">
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.name} logo`}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="font-serif text-xl tracking-wide">{siteConfig.name}</span>
          </div>

          <div className="flex gap-8">
            <Link href="/gallery" className="text-sm text-muted-foreground transition-colors hover:text-luxury-gold">Gallery</Link>
            <Link href="/collections" className="text-sm text-muted-foreground transition-colors hover:text-luxury-gold">Collections</Link>
            <Link href="/designers" className="text-sm text-muted-foreground transition-colors hover:text-luxury-gold">Designers</Link>
            <Link href="/admin" className="text-sm text-muted-foreground transition-colors hover:text-luxury-gold">Admin</Link>
          </div>

          <div className="border-t border-border/30 pt-6 text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
