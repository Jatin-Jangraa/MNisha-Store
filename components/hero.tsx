"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { GalleryItem } from "@/types/gallery";

export function Hero({ items }: { items: GalleryItem[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const allImages = items.slice(0, 8);

  useEffect(() => {
    if (!heroRef.current) return;
    let context: gsap.Context | undefined;

    const load = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      context = gsap.context(() => {
        gsap.to("[data-hero-bg]", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5
          }
        });

        gsap.to("[data-hero-overlay]", {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1
          }
        });
      }, heroRef);
    };

    load();
    return () => context?.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        {allImages.length > 0 ? (
          <Image
            src={allImages[0].image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            data-hero-bg
          />
        ) : (
          <div className="absolute inset-0 bg-luxury-ink" data-hero-bg />
        )}
        <div
          data-hero-overlay
          className="absolute inset-0 bg-black/0"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Center brand mark */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="font-serif text-white text-7xl tracking-tight md:text-[10rem] leading-none">
            M
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white/30" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/50">
              Est. 2026
            </span>
            <span className="h-px w-16 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Link
        href="#showcase"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <span className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
          <ArrowDown className="h-3.5 w-3.5 text-white/60 animate-bounce-gentle" />
        </span>
      </Link>
    </section>
  );
}
