import { cn } from "@/lib/utils";

export function PageFooter({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("text-center text-sm mb-6", className)} {...props} />
  );
}
