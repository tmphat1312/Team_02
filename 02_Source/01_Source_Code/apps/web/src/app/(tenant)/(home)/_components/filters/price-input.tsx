"use client";

import { useId } from "react";

import { Slider } from "@/components/ui/slider";

const formatPrice = (value: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
  });
  return `₫${formatter.format(value)}`;
};

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
        className="mt-2 bg-airbnb"
        onValueChange={onValueChange}
      />
      <div className="flex justify-between items-center">
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
      </div>
    </div>
  );
}

type PriceNumberInputProps = {
  label: string;
} & React.ComponentProps<"input">;

function PriceNumberInput({ label, ...props }: PriceNumberInputProps) {
  const id = useId();
  const inputId = props.id ?? `${id}-${props.name}`;
  return (
    <div className="flex flex-col gap-2 items-center">
      <label htmlFor={inputId} className="text-xs font-medium">
        {label}
      </label>
      <input
        type="text"
        id={inputId}
        className="border max-w-[14ch] rounded-full text-center h-12 px-2"
        {...props}
      />
    </div>
  );
}
