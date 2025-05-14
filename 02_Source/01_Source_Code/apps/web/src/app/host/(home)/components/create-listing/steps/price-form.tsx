"use client";

import { useId, useState } from "react";

import {
  StepDescription,
  StepHeader,
  StepHeading,
  StepSection,
} from "../../step";
import { formatPrice } from "@/lib/utils";
import {
  ActionType,
  useCreateListingContext,
} from "../../../contexts/create-listing-context";

const MaxPrice = 100_000;
const MinPrice = 2;

export function PriceForm() {
  const { state, dispatch } = useCreateListingContext();

  const id = useId();
  const [exceedPriceRange, setExceedPriceRange] = useState(false);
  const [price, setPrice] = useState(formatPrice(state.price));

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceStr = e.target.value;
    const priceNum = parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
    const price = isNaN(priceNum) ? 0 : priceNum;

    if (price < MinPrice || price > MaxPrice) {
      setExceedPriceRange(true);
      dispatch({ type: ActionType.SET_PRICE, payload: 0 });
    } else {
      setExceedPriceRange(false);
      dispatch({ type: ActionType.SET_PRICE, payload: price });
    }

    setPrice(formatPrice(price));
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Now, set your price</StepHeading>
        <StepDescription>You can change it anytime.</StepDescription>
      </StepHeader>

      <form className="mb-18" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={id} className="sr-only">
          price
        </label>
        <input
          id={id}
          className="text-7xl focus:outline-none font-semibold text-center! max-w-lg"
          value={price}
          onChange={handlePriceChange}
          autoComplete="off"
        />
        {exceedPriceRange && (
          <p
            className="text-destructive text-center"
            role="alert"
            aria-live="polite"
          >
            Price should be between {formatPrice(MinPrice)} and{" "}
            {formatPrice(MaxPrice)}
          </p>
        )}
      </form>
    </StepSection>
  );
}
