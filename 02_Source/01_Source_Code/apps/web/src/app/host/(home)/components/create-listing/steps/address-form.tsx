"use client";

import React from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  ActionType,
  useCreateListingContext,
} from "../../../contexts/create-listing-context";
import {
  StepDescription,
  StepHeader,
  StepHeading,
  StepSection,
} from "../../step";

export function AddressForm() {
  const { state, dispatch } = useCreateListingContext();

  const [address, setAddress] = React.useState(state.address);

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
    dispatch({ type: ActionType.SET_ADDRESS, payload: e.target.value });
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Polish your address</StepHeading>
        <StepDescription>
          This is how your listing will appear on our platform.
        </StepDescription>
      </StepHeader>
      <form onSubmit={(e) => e.preventDefault()}>
        <Label className="block">
          <span className="block text-base mb-2">Listing Address</span>
          <Textarea value={address} onChange={handleAddressChange} />
        </Label>
      </form>
    </StepSection>
  );
}
