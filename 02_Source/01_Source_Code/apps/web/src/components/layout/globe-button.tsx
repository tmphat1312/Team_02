import { Globe } from "lucide-react";
import { Button } from "../ui/button";

export function GlobeButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-[2.875rem] h-[2.625rem] me-1"
    >
      <Globe size={16} />
    </Button>
  );
}
