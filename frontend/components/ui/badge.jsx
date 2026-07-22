import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#0F766E] text-white",
        secondary: "border-transparent bg-[#14B8A6] text-white",
        outline: "border-[#E5E7EB] text-[#111827] bg-white",
        success: "border-transparent bg-[#22C55E] text-white",
        warning: "border-transparent bg-[#F59E0B] text-white",
        danger: "border-transparent bg-[#EF4444] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
