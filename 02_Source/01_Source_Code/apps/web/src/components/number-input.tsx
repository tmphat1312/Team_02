"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  greaterInput?: boolean;
  maxValue?: number;
  minValue?: number;
  disabled?: boolean;
};

export function NumberInput({
  label,
  onValueChange,
  value,
  greaterInput,
  maxValue,
  minValue,
  disabled,
}: Props) {
  const increment = () => {
    const newValue = Math.min(maxValue ?? Infinity, value + 1);
    onValueChange(newValue);
  };
  const decrement = () => {
    const newValue = Math.max(minValue ?? 0, value - 1);
    onValueChange(newValue);
  };

  const semanticValue =
    value == 0 ? "Any" : `${value}${greaterInput ? "+" : ""}`;
  const decrementDisabled = disabled || value <= 0 || value === minValue;
  const incrementDisabled = disabled || value >= (maxValue ?? Infinity);

  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <div className="grid grid-cols-[auto_1.5rem_auto] items-center gap-4">
        <CountButton onClick={decrement} disabled={decrementDisabled}>
          <Minus />
        </CountButton>
        <span className="text-center">{semanticValue}</span>
        <CountButton onClick={increment} disabled={incrementDisabled}>
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
