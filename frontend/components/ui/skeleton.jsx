import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-[12px] bg-[#F8FAFC] border border-[#E5E7EB]", className)}
      {...props}
    />
  );
}

export { Skeleton };
