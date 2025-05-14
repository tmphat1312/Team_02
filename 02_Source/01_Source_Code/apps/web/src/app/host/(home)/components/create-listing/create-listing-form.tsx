"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { LogoCompact } from "@/components/icons/logo-compact";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/features/auth/hooks/use-user";
import { http } from "@/lib/http";

import {
  CreateListingContextState,
  useCreateListingContext,
} from "../../contexts/create-listing-context";
import { prefetchAmenities } from "../../hooks/use-amenities";
import { prefetchCategories } from "../../hooks/use-categories";
import { prefetchCommonRules } from "../../hooks/use-common-rules";
import { NumbersForm } from "./numbers-form";
import { AddressForm } from "./steps/address-form";
import { AmenityForm } from "./steps/amenity-form";
import { CategoryForm } from "./steps/category-form";
import { CoordinatesForm } from "./steps/coordinates-form";
import { ImageForm } from "./steps/image-form";
import { PriceForm } from "./steps/price-form";
import { RuleForm } from "./steps/rule-form";
import { TitleAndDescForm } from "./steps/title-and-desc-form";

prefetchCategories();
prefetchAmenities();
prefetchCommonRules();

const Steps = [
  {
    component: TitleAndDescForm,
    checkNextDisabled: (state: CreateListingContextState) =>
      state.title.length <= 5 || state.description.length <= 5,
  },
  {
    component: CategoryForm,
    checkNextDisabled: (state: CreateListingContextState) =>
      state.categories.length === 0,
  },
  {
    component: PriceForm,
    checkNextDisabled: (state: CreateListingContextState) => state.price <= 0,
  },
  {
    component: CoordinatesForm,
    checkNextDisabled: (state: CreateListingContextState) => !state.coordinates,
  },
  {
    component: AddressForm,
    checkNextDisabled: (state: CreateListingContextState) => !state.address,
  },
  {
    component: NumbersForm,
    checkNextDisabled: (state: CreateListingContextState) =>
      state.guests <= 0 ||
      state.bedrooms <= 0 ||
      state.beds <= 0 ||
      state.bathrooms <= 0,
  },
  {
    component: ImageForm,
    checkNextDisabled: (state: CreateListingContextState) =>
      state.images.length < 5,
  },
  {
    component: AmenityForm,
    checkNextDisabled: (state: CreateListingContextState) =>
      state.amenities.length === 0,
  },
  {
    component: RuleForm,
    checkNextDisabled: (state: CreateListingContextState) =>
      state.rules.length === 0 && state.customRules.length === 0,
  },
] as const;

const MaxSteps = Steps.length - 1;

export function CreateListingForm() {
  const exitButtonRef = useRef<HTMLButtonElement>(null);
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const { state } = useCreateListingContext();

  const progress = (currentStep / MaxSteps) * 100;
  const isLastStep = currentStep === MaxSteps;
  const isFirstStep = currentStep === 0;

  const handleNextStep = () => {
    if (isLastStep) {
      handleSaveAndPublish();
    } else {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, MaxSteps));
    }
  };
  const handleBackStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    }
  };

  const handleSaveAndPublish = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("description", state.description);
      formData.append("pricePerNight", state.price.toString());
      formData.append("address", state.address);
      formData.append("longitude", state.coordinates![0].toString());
      formData.append("latitude", state.coordinates![1].toString());
      formData.append("numberOfGuests", state.guests.toString());
      formData.append("numberOfBedrooms", state.bedrooms.toString());
      formData.append("numberOfBeds", state.beds.toString());
      formData.append("numberOfBathrooms", state.bathrooms.toString());
      formData.append("categories", JSON.stringify(state.categories));
      formData.append("amenities", JSON.stringify(state.amenities));
      formData.append("rules", JSON.stringify(state.rules));
      formData.append("customRules", JSON.stringify(state.customRules));
      state.imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      try {
        await http.post("/properties", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-user-id": user?.id,
          },
        });
        toast.success("Listing saved and published successfully!");
        exitButtonRef.current?.click();
      } catch (error) {
        console.error("Error saving and publishing:", error);
        toast.error("Failed to save and publish the listing.");
      }
    });
  };

  const step = Steps[currentStep];
  const StepComponent = step.component;
  const checkNextDisabled = step.checkNextDisabled;
  const isNextDisabled = checkNextDisabled(state) || isPending;
  const canPublish =
    state.title.length > 5 &&
    state.description.length > 5 &&
    state.categories.length > 0 &&
    state.price > 0 &&
    !!state.coordinates &&
    !!state.address &&
    state.guests > 0 &&
    state.bedrooms > 0 &&
    state.beds > 0 &&
    state.bathrooms > 0 &&
    state.images.length >= 5 &&
    state.imageFiles.length >= 5 &&
    state.amenities.length > 0 &&
    (state.rules.length > 0 || state.customRules.length > 0);

  return (
    <Grid className="grid-rows-[auto_1fr_auto] gap-2">
      <Stack className="py-6 px-10 justify-between">
        <LogoCompact />
        <Stack className="gap-3">
          <Button
            variant={"outline"}
            size={"lg"}
            className="rounded-full text-base"
            onClick={handleSaveAndPublish}
            disabled={!canPublish}
          >
            Save & Publish
          </Button>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              size={"lg"}
              className="rounded-full text-base"
              ref={exitButtonRef}
            >
              Exit
            </Button>
          </DialogClose>
        </Stack>
      </Stack>

      <StepComponent />

      <Stack orientation="vertical" className="gap-2">
        <Progress value={progress} className="h-1.5 rounded-none" />
        <Stack className="justify-between px-10 py-4">
          <Button
            size={"lg"}
            variant={"ghost"}
            className="underline text-lg h-12"
            onClick={handleBackStep}
            disabled={isFirstStep}
          >
            Back
          </Button>
          <Button
            size={"lg"}
            variant={"secondary"}
            className="text-lg h-12 px-6"
            onClick={handleNextStep}
            disabled={isNextDisabled}
          >
            {isLastStep ? "Save & Publish" : "Next"}
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}
