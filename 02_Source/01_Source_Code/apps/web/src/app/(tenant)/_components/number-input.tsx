import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  label: string;
};

export function NumberInput({ label }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span>{label}</span>
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline" className="rounded-full">
          <Minus />
        </Button>
        <span>Any</span>
        <Button size="icon" variant="outline" className="rounded-full">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
