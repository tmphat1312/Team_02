import { cn } from "@/lib/utils";

export function Grid({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid", className)} {...props} />;
}
