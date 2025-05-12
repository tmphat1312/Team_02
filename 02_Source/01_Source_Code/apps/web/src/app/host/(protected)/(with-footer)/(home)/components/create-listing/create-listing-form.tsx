"use client";

import { useReducer, useState } from "react";

import { LogoCompact } from "@/components/icons/logo-compact";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

import { FileMetadata } from "@/hooks/use-file-upload";
import { prefetchCategories } from "../../hooks/use-categories";
import { AddressForm } from "./address-form";
import { AmenityForm } from "./amenity-form";
import { CategoryForm } from "./category-form";
import { ImageForm } from "./image-form";
import { NumbersForm } from "./numbers-form";
import { PriceForm } from "./price-form";
import { RuleForm } from "./rule-form";
import { TitleAndDescriptionForm } from "./title-and-description-form";
import { prefetchAmenities } from "../../hooks/use-amenities";
import { prefetchCommonRules } from "../../hooks/use-common-rules";

const Steps = [
  {
    step: 1,
    title: "Title + Description",
    description: "Add a title and description for your listing",
  },
  {
    step: 2,
    title: "Categories",
    description: "Select the categories for your listing",
  },
  {
    step: 3,
    title: "Price",
    description: "Set the price for your listing",
  },
  {
    step: 4,
    title: "Address",
    description: "Enter the address for your listing",
  },
  {
    step: 5,
    title: "Guests + Bedrooms + Beds + Bathrooms",
    description:
      "Specify the number of guests, bedrooms, beds, and bathrooms for your listing",
  },
  {
    step: 6,
    title: "Images",
    description: "Upload images for your listing",
  },
  {
    step: 7,
    title: "Amenities",
    description: "Select the amenities for your listing",
  },
  {
    step: 8,
    title: "Rules",
    description: "Set the rules for your listing",
  },
];

const MaxSteps = Steps.length;

const InitialState: State = {
  title: "Beautiful House",
  description: "A beautiful house in the countryside",
  categories: [],
  price: 10,
  address: "Long An",
  guests: 4,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  images: [],
  amenities: [],
  rules: [],
  customRules: [],
};

prefetchCategories();
prefetchAmenities();
prefetchCommonRules();

export function CreateListingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, InitialState);

  const progress = ((currentStep - 1) / (MaxSteps - 1)) * 100;
  const isLastStep = currentStep === MaxSteps;
  const isFirstStep = currentStep === 1;

  const handleNextStep = () => {
    if (isLastStep) {
      handleSaveAndPublish();
    } else {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, MaxSteps));
    }
  };
  const handleBackStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };
  const handleSaveAndPublish = () => {
    // Handle save and publish action
    console.log("Save and publish:", state);
  };

  const checkNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !state.title || !state.description;
      case 2:
        return state.categories.length === 0;
      case 3:
        return state.price <= 0;
      case 4:
        return !state.address;
      case 5:
        return (
          state.guests <= 0 ||
          state.bedrooms <= 0 ||
          state.beds <= 0 ||
          state.bathrooms <= 0
        );
      case 6:
        return state.images.length < 5;
      case 7:
        return state.amenities.length === 0;
      case 8:
        return state.rules.length === 0 && state.customRules.length === 0;
      default:
        return false;
    }
  };

  const isNextDisabled = checkNextDisabled();

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
            disabled={isNextDisabled}
          >
            Save & Publish
          </Button>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              size={"lg"}
              className="rounded-full text-base"
              onClick={() => setCurrentStep(1)}
            >
              Exit
            </Button>
          </DialogClose>
        </Stack>
      </Stack>

      {currentStep == 1 && (
        <TitleAndDescriptionForm
          defaultTitle={state.title}
          onTitleChange={(title) =>
            dispatch({ type: ActionType.SET_TITLE, payload: title })
          }
          defaultDescription={state.description}
          onDescriptionChange={(description) =>
            dispatch({
              type: ActionType.SET_DESCRIPTION,
              payload: description,
            })
          }
        />
      )}
      {currentStep == 2 && (
        <CategoryForm
          defaultCategories={state.categories}
          onCategoriesChange={(categories) =>
            dispatch({ type: ActionType.SET_CATEGORIES, payload: categories })
          }
        />
      )}
      {currentStep == 3 && (
        <PriceForm
          defaultPrice={state.price}
          onPriceChange={(price) =>
            dispatch({ type: ActionType.SET_PRICE, payload: price })
          }
        />
      )}
      {currentStep == 4 && <AddressForm />}
      {currentStep == 5 && (
        <NumbersForm
          defaultBeds={state.beds}
          defaultGuests={state.guests}
          defaultBedrooms={state.bedrooms}
          defaultBathrooms={state.bathrooms}
          onBedsChange={(beds) =>
            dispatch({ type: ActionType.SET_BEDS, payload: beds })
          }
          onGuestsChange={(guests) =>
            dispatch({ type: ActionType.SET_GUESTS, payload: guests })
          }
          onBedroomsChange={(bedrooms) =>
            dispatch({ type: ActionType.SET_BEDROOMS, payload: bedrooms })
          }
          onBathroomsChange={(bathrooms) =>
            dispatch({ type: ActionType.SET_BATHROOMS, payload: bathrooms })
          }
        />
      )}
      {currentStep == 6 && (
        <ImageForm
          defaultFiles={state.images}
          onFilesChange={(images) =>
            dispatch({ type: ActionType.SET_IMAGES, payload: images })
          }
        />
      )}
      {currentStep == 7 && (
        <AmenityForm
          defaultAmenities={state.amenities}
          onAmenitiesChange={(amenities) =>
            dispatch({ type: ActionType.SET_AMENITIES, payload: amenities })
          }
        />
      )}
      {currentStep == 8 && (
        <RuleForm
          defaultRules={state.rules}
          onRulesChange={(rules) =>
            dispatch({ type: ActionType.SET_RULES, payload: rules })
          }
          defaultCustomRules={state.customRules}
          onCustomRulesChange={(customRules) =>
            dispatch({
              type: ActionType.SET_CUSTOM_RULES,
              payload: customRules,
            })
          }
        />
      )}

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

type State = {
  title: string;
  description: string;
  categories: number[];
  price: number;
  address: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  images: FileMetadata[];
  amenities: number[];
  rules: number[];
  customRules: string[];
};

enum ActionType {
  SET_TITLE = "SET_TITLE",
  SET_DESCRIPTION = "SET_DESCRIPTION",
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_PRICE = "SET_PRICE",
  SET_ADDRESS = "SET_ADDRESS",
  SET_GUESTS = "SET_GUESTS",
  SET_BEDROOMS = "SET_BEDROOMS",
  SET_BEDS = "SET_BEDS",
  SET_BATHROOMS = "SET_BATHROOMS",
  SET_IMAGES = "SET_IMAGES",
  SET_AMENITIES = "SET_AMENITIES",
  SET_RULES = "SET_RULES",
  SET_CUSTOM_RULES = "SET_CUSTOM_RULES",
}

type Action =
  | { type: ActionType.SET_TITLE; payload: State["title"] }
  | { type: ActionType.SET_DESCRIPTION; payload: State["description"] }
  | { type: ActionType.SET_CATEGORIES; payload: State["categories"] }
  | { type: ActionType.SET_PRICE; payload: State["price"] }
  | { type: ActionType.SET_ADDRESS; payload: State["address"] }
  | { type: ActionType.SET_GUESTS; payload: State["guests"] }
  | { type: ActionType.SET_BEDROOMS; payload: State["bedrooms"] }
  | { type: ActionType.SET_BEDS; payload: State["beds"] }
  | { type: ActionType.SET_BATHROOMS; payload: State["bathrooms"] }
  | { type: ActionType.SET_IMAGES; payload: State["images"] }
  | { type: ActionType.SET_AMENITIES; payload: State["amenities"] }
  | { type: ActionType.SET_RULES; payload: State["rules"] }
  | { type: ActionType.SET_CUSTOM_RULES; payload: State["customRules"] };

function reducer(prevState: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_TITLE:
      return { ...prevState, title: action.payload.trim() };
    case ActionType.SET_DESCRIPTION:
      return { ...prevState, description: action.payload.trim() };
    case ActionType.SET_CATEGORIES:
      return { ...prevState, categories: action.payload };
    case ActionType.SET_PRICE:
      const price = parseFloat(action.payload.toString());
      return {
        ...prevState,
        price: isNaN(price) ? 0 : price,
      };
    case ActionType.SET_ADDRESS:
      return { ...prevState, address: action.payload.trim() };
    case ActionType.SET_GUESTS:
      return { ...prevState, guests: action.payload };
    case ActionType.SET_BEDROOMS:
      return { ...prevState, bedrooms: action.payload };
    case ActionType.SET_BEDS:
      return { ...prevState, beds: action.payload };
    case ActionType.SET_BATHROOMS:
      return { ...prevState, bathrooms: action.payload };
    case ActionType.SET_IMAGES:
      return { ...prevState, images: action.payload };
    case ActionType.SET_AMENITIES:
      return { ...prevState, amenities: action.payload };
    case ActionType.SET_RULES:
      return { ...prevState, rules: action.payload };
    case ActionType.SET_CUSTOM_RULES:
      return { ...prevState, customRules: action.payload };
    default:
      return prevState;
  }
}
