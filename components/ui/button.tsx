import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold font-display uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] hover:from-orange-400 hover:via-orange-500 hover:to-red-400 active:scale-[0.98]",
        secondary:
          "bg-gradient-to-r from-zinc-800 via-space-gunmetal to-space-black text-white border border-orange-500/30 hover:border-orange-500/50 hover:from-zinc-700 hover:via-zinc-800 hover:to-space-gunmetal",
        outline:
          "border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-gradient-to-r hover:from-orange-500 hover:via-orange-600 hover:to-red-500 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-orange-500/30",
        ghost:
          "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:text-orange-500",
        link: "text-orange-500 underline-offset-4 hover:underline",
        glow:
          "bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-[0_0_20px_rgba(255,140,0,0.5)] hover:shadow-[0_0_30px_rgba(255,140,0,0.7)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

