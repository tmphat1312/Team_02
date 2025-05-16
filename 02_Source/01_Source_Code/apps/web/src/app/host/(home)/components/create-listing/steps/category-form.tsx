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
import { useCategories } from "../../../hooks/use-categories";
import { StepHeader, StepHeading, StepSection } from "../../step";

export function CategoryForm() {
  const { data: categories, isLoading } = useCategories();
  const { state, dispatch } = useCreateListingContext();

  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set(state.categories)
  );

  const handleCategoryClick = (categoryId: number) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId);
    } else {
      newSet.add(categoryId);
    }
    setSelectedCategories(newSet);
    dispatch({
      type: ActionType.SET_CATEGORIES,
      payload: Array.from(newSet),
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <TextAlert>Loading categories...</TextAlert>
      </Layout>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Layout>
        <TextAlert>No categories available</TextAlert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid className="grid-cols-3 gap-4 max-h-120 overflow-y-auto p-0.5 pe-2">
        {categories.map((category) => (
          <Stack
            key={category.id}
            orientation="vertical"
            className={cn(
              "p-4 border rounded-lg cursor-pointer gap-1.5",
              selectedCategories.has(category.id)
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
        <StepHeading>Which of these best describes your place?</StepHeading>
      </StepHeader>
      {children}
    </StepSection>
  );
}
