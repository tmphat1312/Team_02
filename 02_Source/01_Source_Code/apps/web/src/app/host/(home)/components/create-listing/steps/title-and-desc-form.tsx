"use client";

import React from "react";

import { Input } from "@/components/ui/input";
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

export function TitleAndDescForm() {
  const { state, dispatch } = useCreateListingContext();

  const [title, setTitle] = React.useState(state.title);
  const [desc, setDesc] = React.useState(state.description);

  const id = React.useId();
  const titleId = `title-${id}`;
  const descriptionId = `description-${id}`;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    dispatch({ type: ActionType.SET_TITLE, payload: e.target.value });
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
    dispatch({
      type: ActionType.SET_DESCRIPTION,
      payload: e.target.value,
    });
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Describe your listing</StepHeading>
        <StepDescription>
          Provide a detailed description of your listing.
        </StepDescription>
      </StepHeader>
      <form className="w-lg" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-6">
          <Label htmlFor={titleId} className="text-lg font-medium mb-2">
            Name your listing
          </Label>
          <Input
            id={titleId}
            placeholder="Beautiful Bungalow"
            type="text"
            className="text-lg! placeholder:text-base h-[unset]! py-2 px-4"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <Label htmlFor={descriptionId} className="text-lg font-medium mb-2">
            Tell us about your listing
          </Label>
          <Textarea
            id={descriptionId}
            placeholder="Describe your listing in a few sentences"
            className="text-lg! placeholder:text-base h-[unset]! py-2 px-4"
            rows={5}
            value={desc}
            onChange={handleDescChange}
          />
        </div>
      </form>
    </StepSection>
  );
}
