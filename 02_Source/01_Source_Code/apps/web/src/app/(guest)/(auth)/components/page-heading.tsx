import { cn } from "@/lib/utils";

export function PageHeading({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return <h1 className={cn("font-semibold text-lg", className)} {...props} />;
}
