"use client";

import { useEffect } from "react";

import { Property } from "@/app/typings/models";

import { addToRecentlyViewedList } from "../data/add-to-recently-viewed-list";

type Props = {
  item: Property;
};

export function AddToRecentlyViewedList({ item }: Props) {
  useEffect(() => {
    addToRecentlyViewedList({
      propertyId: item.id,
      name: item.title,
      imageUrl: item.imageUrls[0],
      rating: 4.5,
      viewedAt: new Date().toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
