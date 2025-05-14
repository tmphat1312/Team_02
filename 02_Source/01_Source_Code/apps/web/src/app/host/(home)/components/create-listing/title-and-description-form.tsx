"use client";

import { useId, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { StepDescription, StepHeader, StepHeading, StepSection } from "../step";

type Props = {
  defaultTitle?: string;
  defaultDescription?: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
};

export function TitleAndDescriptionForm({
  defaultTitle,
  defaultDescription,
  onTitleChange,
  onDescriptionChange,
}: Props) {
  const [title, setTitle] = useState(defaultTitle || "");
  const [description, setDescription] = useState(defaultDescription || "");

  const id = useId();
  const titleId = `title-${id}`;
  const descriptionId = `description-${id}`;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    onDescriptionChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", { title, description });
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Describe your listing</StepHeading>
        <StepDescription>
          Provide a detailed description of your listing.
        </StepDescription>
      </StepHeader>
      <form className="w-lg" onSubmit={handleSubmit}>
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
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </form>
    </StepSection>
  );
}
