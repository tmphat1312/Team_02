"use client";

import { useState } from "react";

import { Stack } from "@/components/layout/stack";
import { NumberInput } from "@/components/number-input";
import { Separator } from "@/components/ui/separator";

import {
  ActionType,
  useCreateListingContext,
} from "../../contexts/create-listing-context";
import { StepDescription, StepHeader, StepHeading, StepSection } from "../step";

export function NumbersForm() {
  const { state, dispatch } = useCreateListingContext();
  const [beds, setBeds] = useState(state.beds);
  const [guests, setGuests] = useState(state.guests);
  const [bedrooms, setBedrooms] = useState(state.bedrooms);
  const [bathrooms, setBathrooms] = useState(state.bathrooms);

  const handleBedsChange = (value: number) => {
    setBeds(value);
    dispatch({ type: ActionType.SET_BEDS, payload: value });
  };
  const handleGuestsChange = (value: number) => {
    setGuests(value);
    dispatch({ type: ActionType.SET_GUESTS, payload: value });
  };
  const handleBedroomsChange = (value: number) => {
    setBedrooms(value);
    dispatch({ type: ActionType.SET_BEDROOMS, payload: value });
  };
  const handleBathroomsChange = (value: number) => {
    setBathrooms(value);
    dispatch({ type: ActionType.SET_BATHROOMS, payload: value });
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Share some basic about your place</StepHeading>
        <StepDescription>
          Select the right numbers of guests, bedrooms, beds and bathrooms of
          your place.
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
          minValue={0}
          maxValue={20}
          semantic={false}
        />
        <Separator />
        <NumberInput
          label="Beds"
          value={beds}
          onValueChange={handleBedsChange}
          minValue={0}
          maxValue={20}
          semantic={false}
        />
        <Separator />
        <NumberInput
          label="Bathrooms"
          value={bathrooms}
          onValueChange={handleBathroomsChange}
          minValue={0}
          maxValue={20}
          semantic={false}
        />
      </Stack>
    </StepSection>
  );
}
