import { cn } from "@/lib/utils";

export function DetailsContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("details-container", className)} {...props} />;
}
