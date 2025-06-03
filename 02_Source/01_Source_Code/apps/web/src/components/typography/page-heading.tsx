import { cn } from "@/lib/utils";

export function PageHeading({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn("text-[2rem] font-semibold mb-8", className)}
      {...props}
    />
  );
}
