import { cn } from "@/lib/utils";

export function PageSection({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-6", className)} {...props}>
      {children}
    </section>
  );
}
