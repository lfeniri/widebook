import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-block rounded-full bg-[#ff385c]/10 text-[#ff385c] px-3 py-1 text-xs font-semibold",
        className
      )}
      {...props}
    />
  );
}
