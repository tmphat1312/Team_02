import { cn } from "@/lib/utils";

export function Page({ className, ...props }: React.ComponentProps<"main">) {
  return <main className={cn("pt-8 pb-12 grow", className)} {...props} />;
}
