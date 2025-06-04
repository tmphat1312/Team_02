"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Stack } from "@/components/layout/stack";

type Props = {
  defaultValue?: number;
  label: string;
  onValueChange?: (value: number) => void;
};

export function RatingSlider({
  label,
  defaultValue = 4,
  onValueChange = () => {},
}: Props) {
  const [value, setValue] = useState([defaultValue]);

  const rating = value[0];
  const ratingEmoji = {
    1: "😡",
    2: "😕",
    3: "😐",
    4: "😊",
    5: "😍",
  }[rating];
  const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];

  return (
    <Stack orientation="vertical" className="gap-0.5">
      <Stack className="justify-between gap-2">
        <Label className="leading-6 font-semibold text-base">{label}</Label>
        <span className="text-sm font-medium italic">{labels[rating - 1]}</span>
      </Stack>
      <Stack className="gap-2">
        <Slider
          value={value}
          onValueChange={(value) => {
            setValue(value);
            onValueChange(value[0]);
          }}
          min={1}
          max={5}
          aria-label="Rate your experience"
        />
        <span className="text-xl" aria-hidden="true" role="presentation">
          {ratingEmoji}
        </span>
      </Stack>
    </Stack>
  );
}
