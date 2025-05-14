"use client";

import { useState } from "react";

import { Stack } from "@/components/layout/stack";
import { NumberInput } from "@/components/number-input";
import { Separator } from "@/components/ui/separator";

import { StepDescription, StepHeader, StepHeading, StepSection } from "../step";

type Props = {
  defaultBeds?: number;
  defaultGuests?: number;
  defaultBedrooms?: number;
  defaultBathrooms?: number;
  onBedsChange: (beds: number) => void;
  onGuestsChange: (guests: number) => void;
  onBedroomsChange: (bedrooms: number) => void;
  onBathroomsChange: (bathrooms: number) => void;
};

export function NumbersForm({
  defaultBeds,
  defaultGuests,
  defaultBedrooms,
  defaultBathrooms,
  onBedsChange,
  onGuestsChange,
  onBedroomsChange,
  onBathroomsChange,
}: Props) {
  const [beds, setBeds] = useState(defaultBeds || 1);
  const [guests, setGuests] = useState(defaultGuests || 1);
  const [bedrooms, setBedrooms] = useState(defaultBedrooms || 1);
  const [bathrooms, setBathrooms] = useState(defaultBathrooms || 1);

  const handleBedsChange = (value: number) => {
    setBeds(value);
    onBedsChange(value);
  };
  const handleGuestsChange = (value: number) => {
    setGuests(value);
    onGuestsChange(value);
  };
  const handleBedroomsChange = (value: number) => {
    setBedrooms(value);
    onBedroomsChange(value);
  };
  const handleBathroomsChange = (value: number) => {
    setBathrooms(value);
    onBathroomsChange(value);
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Share some basic about your place</StepHeading>
        <StepDescription>
          You&apos;ll add more details later, like bed types
        </StepDescription>
      </StepHeader>
      <Stack orientation="vertical" className="gap-4">
        <NumberInput
          label="Guests"
          value={guests}
          onValueChange={handleGuestsChange}
          minValue={1}
          maxValue={20}
        />
        <Separator />
        <NumberInput
          label="Bedrooms"
          value={bedrooms}
          onValueChange={handleBedroomsChange}
          minValue={1}
          maxValue={20}
        />
        <Separator />
        <NumberInput
          label="Beds"
          value={beds}
          onValueChange={handleBedsChange}
          minValue={1}
          maxValue={20}
        />
        <Separator />
        <NumberInput
          label="Bathrooms"
          value={bathrooms}
          onValueChange={handleBathroomsChange}
          minValue={1}
          maxValue={20}
        />
      </Stack>
    </StepSection>
  );
}
