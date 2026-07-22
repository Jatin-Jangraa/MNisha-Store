import { ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaBehance, FaDribbble, FaInstagram, FaPinterest } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/constants/site";

const socials = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaPinterest, label: "Pinterest", href: "#" },
  { icon: FaBehance, label: "Behance", href: "#" },
  { icon: FaDribbble, label: "Dribbble", href: "#" }
];

const links = [
  { label: "Gallery", href: "/gallery" },
  { label: "Collections", href: "/collections" },
  { label: "Designers", href: "/designers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/30 bg-secondary/30">
      <div className="absolute inset-0 noise pointer-events-none opacity-40" />

      <div className="relative container py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-luxury-gold/20 bg-background/80">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.name} logo`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl tracking-wide">{siteConfig.name}</span>
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border/50 bg-background/50 text-muted-foreground transition-all duration-500 hover:border-luxury-gold/40 hover:bg-luxury-gold/5 hover:text-luxury-gold hover:shadow-glow-sm"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:items-end">
            <div className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-luxury-gold"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="w-full max-w-md lg:ml-auto">
              <div className="rounded-2xl border border-border/40 bg-background/60 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-luxury-gold/10">
                    <Mail className="h-3.5 w-3.5 text-luxury-gold" />
                  </span>
                  Private newsletter
                </div>
                <div className="mt-4 flex gap-2">
                  <Input aria-label="Email address" placeholder="studio@example.com" />
                  <Button aria-label="Join newsletter" size="icon" variant="gold">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 text-xs text-muted-foreground/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="transition-colors duration-300 hover:text-luxury-gold">
              Contact studio
            </Link>
            <span className="text-muted-foreground/20">|</span>
            <span>Designed with intention</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
