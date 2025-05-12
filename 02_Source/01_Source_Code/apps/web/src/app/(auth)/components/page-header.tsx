import { cn } from "@/lib/utils";

export function PageHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <header
      className={cn("text-center border-b p-4.5", className)}
      {...props}
    />
  );
}
