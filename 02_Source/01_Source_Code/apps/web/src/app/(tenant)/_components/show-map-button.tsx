import { cn } from "@/lib/utils";
import { Map } from "lucide-react";

export function ShowMapButton() {
  return (
    <button
      className={cn(
        "fixed bottom-12 left-1/2 -translate-x-1/2 text-base font-medium",
        "items-center rounded-full flex gap-2 cursor-pointer",
        "text-white bg-black/80 hover:bg-black/90 py-3 px-4.5"
      )}
    >
      Show map <Map size={20} />
    </button>
  );
}
