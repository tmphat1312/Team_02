"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatesPickerProps = {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  disabled?: boolean;
};

export function DatesPicker({
  className,
  date,
  setDate,
  children,
  disabled,
}: DatesPickerProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger
          className="grid grid-cols-2 w-full disabled:opacity-60"
          disabled={disabled}
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
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
