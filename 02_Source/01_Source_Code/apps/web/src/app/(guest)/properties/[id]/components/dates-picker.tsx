"use client";

import { addDays } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Property } from "@/typings/models";
import { usePropertyAvailability } from "../hooks/use-property-availability";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  disabled?: boolean;
  item: Property;
};

const Tomorrow = addDays(new Date(), 1);

export function DatesPicker({
  className,
  date,
  setDate,
  children,
  disabled,
  item,
}: Props) {
  const { data: reservedDates } = usePropertyAvailability(item.id);
  const isPickerDisabled = disabled || !reservedDates;

  const disabledDateRange = reservedDates
    ? reservedDates.map((d) => ({
        from: new Date(d.startDate),
        to: new Date(d.endDate),
      }))
    : [];

  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger
          className="grid grid-cols-2 w-full disabled:opacity-60"
          disabled={isPickerDisabled}
        >
          {children}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={[{ before: Tomorrow }, ...disabledDateRange]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
