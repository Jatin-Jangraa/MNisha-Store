const words = [
  "Couture",
  "Editorial",
  "Atelier",
  "Runway",
  "Heritage",
  "Silhouette",
  "Textile",
  "Luxury",
  "Ethereal",
  "Bespoke"
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border/30 bg-secondary/30 py-8">
      <div className="absolute inset-0 noise pointer-events-none opacity-30" />
      <div className="relative flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="font-serif text-6xl text-muted-foreground/15 transition-colors duration-500 hover:text-luxury-gold/30 md:text-8xl"
          >
            {word} <span className="text-luxury-gold/20 text-4xl md:text-5xl">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
