import { cn } from "@/lib/utils";
import React from "react";

export function StepSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return <section className={cn("m-auto", className)} {...props} />;
}

export function StepHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return <header className={cn("mb-8", className)} {...props} />;
}

export function StepHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return <h2 className={cn("font-semibold text-4xl", className)} {...props} />;
}

export function StepDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-lg text-muted-foreground", className)} {...props} />
  );
}
