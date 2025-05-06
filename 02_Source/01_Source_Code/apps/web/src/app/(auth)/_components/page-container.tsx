import { cn } from "@/lib/utils";

export function PageContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-lg mx-auto rounded-xl border shadow-lg", className)}
      {...props}
    />
  );
}
