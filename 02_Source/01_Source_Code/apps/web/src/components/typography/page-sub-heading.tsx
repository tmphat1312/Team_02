import { cn } from "@/lib/utils";

export function PageSubHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("text-2xl font-semibold mb-6", className)} {...props} />
  );
}
