import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-full border border-border/80 bg-background/90 px-5 py-3 text-sm shadow-soft outline-none backdrop-blur-sm transition-all duration-500 placeholder:text-muted-foreground/40 focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/8 focus:shadow-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
