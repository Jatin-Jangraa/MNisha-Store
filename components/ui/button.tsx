import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-luxury-ink text-white hover:bg-luxury-gold hover:text-luxury-ink dark:bg-white dark:text-luxury-ink dark:hover:bg-luxury-gold",
        outline:
          "border border-border bg-transparent hover:border-luxury-gold hover:text-luxury-gold hover:bg-luxury-gold/5",
        ghost:
          "hover:bg-muted/80 hover:text-foreground",
        gold:
          "bg-luxury-gold text-luxury-ink shadow-glow-sm hover:bg-luxury-gold-dark hover:text-white hover:shadow-glow",
        "gold-outline":
          "border-2 border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-ink hover:border-luxury-gold",
        dark:
          "bg-luxury-ink text-white hover:bg-luxury-ink/80 dark:bg-white dark:text-luxury-ink dark:hover:bg-white/80"
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
