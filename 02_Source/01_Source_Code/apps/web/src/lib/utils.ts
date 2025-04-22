import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
