"use client";

import Image from "next/image";
import { useState } from "react";

import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { TextAlert } from "@/components/typography/text-alert";
import { cn } from "@/lib/utils";

import {
  ActionType,
  useCreateListingContext,
} from "../../../contexts/create-listing-context";
import { useAmenities } from "../../../hooks/use-amenities";
import {
  StepDescription,
  StepHeader,
  StepHeading,
  StepSection,
} from "../../step";

export function AmenityForm() {
  const { state, dispatch } = useCreateListingContext();
  const { data: amenities, isLoading } = useAmenities();
  const [selectedAmenities, setSelectedAmenities] = useState<Set<number>>(
    new Set(state.amenities)
  );

  const handleCategoryClick = (categoryId: number) => {
    const newSet = new Set(selectedAmenities);
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId);
    } else {
      newSet.add(categoryId);
    }
    dispatch({
      type: ActionType.SET_AMENITIES,
      payload: Array.from(newSet),
    });
    setSelectedAmenities(newSet);
  };

  if (isLoading) {
    return (
      <Layout>
        <TextAlert>Loading amenities...</TextAlert>
      </Layout>
    );
  }

  if (!amenities || amenities.length === 0) {
    return (
      <Layout>
        <TextAlert>No amenities available</TextAlert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid className="grid-cols-3 gap-4 max-h-120 overflow-y-auto p-0.5 pe-2">
        {amenities.map((category) => (
          <Stack
            key={category.id}
            orientation="vertical"
            className={cn(
              "p-4 border rounded-lg cursor-pointer gap-1.5",
              selectedAmenities.has(category.id)
                ? "ring-2 bg-gray-50"
                : "hover:ring-2"
            )}
            tabIndex={0}
            role="button"
            onClick={() => handleCategoryClick(category.id)}
          >
            <Image
              src={category.imageUrl}
              alt={category.name}
              width={32}
              height={32}
              className="size-8"
            />
            <span className="font-medium">{category.name}</span>
          </Stack>
        ))}
      </Grid>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Tell guests what your place has to offer</StepHeading>
        <StepDescription>
          Select the amenities you provide to help guests know what to expect
          during their stay.
        </StepDescription>
      </StepHeader>
      {children}
    </StepSection>
  );
}
