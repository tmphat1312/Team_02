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

function formatCurrency(value: string) {
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return "";
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function unformatCurrency(value: string) {
  return value.replace(/[^0-9.]/g, "");
}

export function PriceForm() {
  const { state, dispatch } = useCreateListingContext();

  const id = useId();
  const [exceedPriceRange, setExceedPriceRange] = useState(false);
  const [priceInput, setPriceInput] = useState(
    state.price ? state.price.toString() : ""
  );
  const [isFocused, setIsFocused] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Remove non-numeric except dot
    if (
      !/^\$?\d{0,3}(,\d{3})*(\.\d*)?$/.test(input.replace(/ /g, "")) &&
      input !== ""
    )
      return;

    const raw = unformatCurrency(input);
    setPriceInput(raw);

    const priceNum = parseFloat(raw);
    const price = isNaN(priceNum) ? 0 : priceNum;

    if (price < MinPrice || price > MaxPrice) {
      setExceedPriceRange(true);
      dispatch({ type: ActionType.SET_PRICE, payload: 0 });
    } else {
      setExceedPriceRange(false);
      dispatch({ type: ActionType.SET_PRICE, payload: price });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPriceInput((prev) => {
      if (!prev) return "";
      return formatCurrency(prev);
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setPriceInput((prev) => unformatCurrency(prev));
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Now, set your price</StepHeading>
        <StepDescription>
          Choose a nightly price that works for you.
        </StepDescription>
      </StepHeader>

      <form className="mb-18" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={id} className="sr-only">
          price
        </label>
        <input
          id={id}
          className="text-7xl focus:outline-none font-semibold text-center! max-w-lg"
          value={
            isFocused
              ? priceInput
              : priceInput
              ? formatCurrency(priceInput)
              : ""
          }
          onChange={handlePriceChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoComplete="off"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
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
