import { cn } from "@/lib/utils";
import React from "react";

type StackProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

export function Stack({
  orientation = "horizontal",
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        {
          "flex-col items-stretch": orientation === "vertical",
          "flex-row items-center": orientation === "horizontal",
        },
        className
      )}
      {...props}
    />
  );
}
