"use client";

import { motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-all duration-700",
          scrolled
            ? "py-3"
            : "py-5"
        )}
      >
        <div className={cn(
          "mx-auto max-w-[1400px] px-6 transition-all duration-700",
          scrolled && "lg:px-6"
        )}>
          <nav className={cn(
            "flex h-16 items-center justify-between rounded-2xl px-6 transition-all duration-700",
            scrolled
              ? "glass border border-border/30 shadow-premium"
              : "bg-transparent"
          )}>
            <Link href="/" className="group flex items-center gap-3" aria-label={siteConfig.name}>
              <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-luxury-gold/20 bg-background/90 shadow-sm transition-all duration-500 group-hover:border-luxury-gold/50 group-hover:shadow-glow-sm">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.name} logo`}
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </span>
              <span className="hidden font-serif text-lg tracking-wide transition-colors duration-500 group-hover:text-luxury-gold sm:block">
                {siteConfig.name}
              </span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-400",
                    pathname === item.href
                      ? "text-luxury-gold bg-luxury-gold/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 h-px bg-luxury-gold transition-all duration-400",
                      pathname === item.href
                        ? "w-4 -translate-x-1/2"
                        : "w-0 -translate-x-1/2 group-hover:w-4"
                    )}
                  />
                </Link>
              ))}
              <Link
                href="/admin"
                className={cn(
                  "group relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-400",
                  pathname === "/admin"
                    ? "text-luxury-gold bg-luxury-gold/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                Admin
              </Link>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <Button asChild size="icon-sm" variant="ghost" aria-label="Search gallery">
                <Link href="/gallery#search">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
              <ThemeToggle />
            </div>

            <button
              aria-label="Toggle navigation"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-background/60 backdrop-blur-lg transition-all duration-400 hover:border-luxury-gold/30 hover:bg-muted/50 lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </motion.header>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-[76px] z-40 overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-2xl lg:hidden"
      >
        <div className="container flex flex-col gap-1 py-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                pathname === item.href
                  ? "bg-luxury-gold/5 text-luxury-gold"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className={cn(
              "rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
              pathname === "/admin"
                ? "bg-luxury-gold/5 text-luxury-gold"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
          <div className="flex gap-2 px-4 pt-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/gallery#search">Search</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </motion.div>
    </>
  );
}
