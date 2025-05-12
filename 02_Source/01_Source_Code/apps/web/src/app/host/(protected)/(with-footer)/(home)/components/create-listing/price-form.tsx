"use client";

import { useId, useState } from "react";

import { StepDescription, StepHeader, StepHeading, StepSection } from "../step";
import { formatPrice } from "@/lib/utils";

type Props = {
  defaultPrice?: number;
  onPriceChange: (price: number) => void;
};

const MaxPrice = 100_000;
const MinPrice = 2;

export function PriceForm({ defaultPrice, onPriceChange }: Props) {
  const id = useId();
  const [exceedPriceRange, setExceedPriceRange] = useState(false);
  const [price, setPrice] = useState(formatPrice(defaultPrice || 10));

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceStr = e.target.value;
    const priceNum = parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));

    const price = isNaN(priceNum) ? 0 : priceNum;

    if (price < MinPrice || price > MaxPrice) {
      setExceedPriceRange(true);
      onPriceChange(0);
    } else {
      setExceedPriceRange(false);
      onPriceChange(price);
    }

    setPrice(formatPrice(price));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <StepSection>
      <StepHeader>
        <StepHeading>Now, set your price</StepHeading>
        <StepDescription>You can change it anytime.</StepDescription>
      </StepHeader>

      <form className="mb-18" onSubmit={handleSubmit}>
        <label htmlFor={id} className="sr-only">
          price
        </label>
        <input
          id={id}
          className="text-7xl focus:outline-none font-semibold text-center! max-w-lg"
          value={price}
          onChange={handlePriceChange}
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
