"use client";

import React from "react";

import { FileMetadata } from "@/hooks/use-file-upload";

const InitialState: CreateListingContextState = {
  title: "Beautiful House",
  description: "A beautiful house in the countryside",
  categories: [8, 6],
  price: 10,
  address: "Cần Giờ, Ho Chi Minh City, Vietnam",
  guests: 4,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  images: [],
  imageFiles: [],
  amenities: [42, 41, 38, 37],
  rules: [14, 13, 12, 11, 10],
  customRules: [],
  coordinates: [106.8094544274897, 10.606903854022747],
};

export type CreateListingContextState = {
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
  imageFiles: File[];
  amenities: number[];
  rules: number[];
  customRules: string[];
  coordinates?: [number, number];
};

export enum ActionType {
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
  SET_IMAGE_FILES = "SET_IMAGE_FILES",
  SET_AMENITIES = "SET_AMENITIES",
  SET_RULES = "SET_RULES",
  SET_CUSTOM_RULES = "SET_CUSTOM_RULES",
  SET_COORDINATES = "SET_COORDINATES",
}

type Action =
  | { type: ActionType.SET_TITLE; payload: CreateListingContextState["title"] }
  | {
      type: ActionType.SET_DESCRIPTION;
      payload: CreateListingContextState["description"];
    }
  | {
      type: ActionType.SET_CATEGORIES;
      payload: CreateListingContextState["categories"];
    }
  | { type: ActionType.SET_PRICE; payload: CreateListingContextState["price"] }
  | {
      type: ActionType.SET_ADDRESS;
      payload: CreateListingContextState["address"];
    }
  | {
      type: ActionType.SET_GUESTS;
      payload: CreateListingContextState["guests"];
    }
  | {
      type: ActionType.SET_BEDROOMS;
      payload: CreateListingContextState["bedrooms"];
    }
  | { type: ActionType.SET_BEDS; payload: CreateListingContextState["beds"] }
  | {
      type: ActionType.SET_BATHROOMS;
      payload: CreateListingContextState["bathrooms"];
    }
  | {
      type: ActionType.SET_IMAGES;
      payload: CreateListingContextState["images"];
    }
  | {
      type: ActionType.SET_IMAGE_FILES;
      payload: CreateListingContextState["imageFiles"];
    }
  | {
      type: ActionType.SET_AMENITIES;
      payload: CreateListingContextState["amenities"];
    }
  | { type: ActionType.SET_RULES; payload: CreateListingContextState["rules"] }
  | {
      type: ActionType.SET_CUSTOM_RULES;
      payload: CreateListingContextState["customRules"];
    }
  | {
      type: ActionType.SET_COORDINATES;
      payload: CreateListingContextState["coordinates"];
    };

function reducer(prevState: CreateListingContextState, action: Action) {
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
    case ActionType.SET_IMAGE_FILES:
      return { ...prevState, imageFiles: action.payload };
    case ActionType.SET_AMENITIES:
      return { ...prevState, amenities: action.payload };
    case ActionType.SET_RULES:
      return { ...prevState, rules: action.payload };
    case ActionType.SET_CUSTOM_RULES:
      return { ...prevState, customRules: action.payload };
    case ActionType.SET_COORDINATES:
      return { ...prevState, coordinates: action.payload };
    default:
      return prevState;
  }
}

const CreateListingContext = React.createContext<{
  state: CreateListingContextState;
  dispatch: React.Dispatch<Action>;
}>({
  state: InitialState,
  dispatch: () => {},
});

export function CreateListingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  return (
    <CreateListingContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateListingContext.Provider>
  );
}

export function useCreateListingContext() {
  const context = React.use(CreateListingContext);
  if (!context) {
    throw new Error(
      "useCreateListingContext must be used within a CreateListingContextProvider"
    );
  }
  return context;
}
