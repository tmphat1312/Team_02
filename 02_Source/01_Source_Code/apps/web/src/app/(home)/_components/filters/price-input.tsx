"use client";

import { useId } from "react";

import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";
import { Stack } from "@/components/layout/stack";

type PriceInputProps = {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onValueChange: (value: number[]) => void;
  onPriceMinChange: (value: number) => void;
  onPriceMaxChange: (value: number) => void;
};

export function PriceInput({
  min,
  max,
  step,
  value,
  onValueChange,
  onPriceMaxChange,
  onPriceMinChange,
}: PriceInputProps) {
  const [minValue, maxValue] = value;

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceMinChange(Number(e.target.value.replace(/[^0-9]/g, "")));
  };
  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceMaxChange(Number(e.target.value.replace(/[^0-9]/g, "")));
  };

  return (
    <div className="space-y-8">
      <Slider
        max={max}
        min={min}
        step={step}
        value={value}
        className="mt-2 bg-primary"
        onValueChange={onValueChange}
      />
      <Stack className="justify-between">
        <PriceNumberInput
          label="Minimum"
          name="minimum"
          value={formatPrice(minValue)}
          onChange={handlePriceMinChange}
        />
        <PriceNumberInput
          label="Maximum"
          name="maximum"
          value={formatPrice(maxValue)}
          onChange={handlePriceMaxChange}
        />
      </Stack>
    </div>
  );
}

type PriceNumberInputProps = {
  label: string;
} & React.ComponentProps<"input">;

function PriceNumberInput({ label, ...props }: PriceNumberInputProps) {
  const id = useId();
  return (
    <Stack orientation="vertical" className="gap-2">
      <label htmlFor={id} className="text-xs font-medium">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="border max-w-[14ch] rounded-full text-center h-12 px-2"
        {...props}
      />
    </Stack>
  );
}
