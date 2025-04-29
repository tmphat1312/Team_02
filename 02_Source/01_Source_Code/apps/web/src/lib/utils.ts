import { type ClassValue, clsx } from "clsx";
import { formatDistance } from "date-fns/formatDistance";
import pluralize from "pluralize";
import { twMerge } from "tailwind-merge";

import { Review } from "@/app/typings/models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (value: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
  });
  return `₫${formatter.format(value)}`;
};

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateRelativeTime(date: Date) {
  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ] as const;

  let duration = (new Date().getTime() - date.getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return `${Math.round(duration)} ${division.name}`;
    }
    duration /= division.amount;
  }
}

export function formatRelativeTime(date: Date) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
}

export function calculateAvgRating(review: Review) {
  return (
    (review.cleanliness +
      review.communication +
      review.accuracy +
      review.location) /
    4
  );
}

export function makePluralNoun(word: string, count: number) {
  return pluralize(word, count, true);
}
