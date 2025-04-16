import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function OrSeparator() {
  return (
    <div className="relative my-6">
      <Separator />
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "bg-white px-3 text-sm -mt-[2px]"
        )}
      >
        or
      </span>
    </div>
  );
}
