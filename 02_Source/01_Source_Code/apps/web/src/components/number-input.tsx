"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
};

export function NumberInput({ label, onValueChange, value }: Props) {
  const increment = () => {
    const newValue = value + 1;
    onValueChange(newValue);
  };
  const decrement = () => {
    const newValue = Math.max(0, value - 1);
    onValueChange(newValue);
  };

  const semanticValue = value == 0 ? "Any" : `${value}+`;

  return (
    <div className="flex items-center justify-between mb-4">
      <span>{label}</span>
      <div className="grid grid-cols-[auto_1.5rem_auto] items-center gap-4">
        <CountButton onClick={decrement} disabled={value <= 0}>
          <Minus />
        </CountButton>
        <span className="text-center">{semanticValue}</span>
        <CountButton onClick={increment}>
          <Plus />
        </CountButton>
      </div>
    </div>
  );
}

function CountButton(props: React.ComponentProps<"button">) {
  const { className, ...rest } = props;
  return (
    <Button
      size="icon"
      variant="outline"
      className={cn("rounded-full", className)}
      {...rest}
    />
  );
}
