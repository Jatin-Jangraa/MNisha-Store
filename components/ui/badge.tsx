import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "gold" | "dark" }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300",
        variant === "default" &&
          "border-border/60 bg-muted/40 text-muted-foreground",
        variant === "gold" &&
          "border-luxury-gold/20 bg-luxury-gold/5 text-luxury-gold",
        variant === "dark" &&
          "border-white/10 bg-white/5 text-white/70",
        className
      )}
      {...props}
    />
  );
}
