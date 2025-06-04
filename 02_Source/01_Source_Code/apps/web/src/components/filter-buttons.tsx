"use client";

import { useQueryState } from "nuqs";

import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = {
  value: string | null;
  label: string;
};

type FilterButtonsProps = React.ComponentProps<"div"> & {
  tabs: Tab[];
};

export function FilterButtons({
  className,
  tabs,
  ...props
}: FilterButtonsProps) {
  return (
    <Stack className={cn("gap-3", className)} {...props}>
      {tabs.map((tab) => (
        <FilterButton key={tab.value} tabValue={tab.value}>
          {tab.label}
        </FilterButton>
      ))}
    </Stack>
  );
}

type FilterButtonProps = {
  tabValue: string | null;
  children: React.ReactNode;
};

function FilterButton({ tabValue, children }: FilterButtonProps) {
  const [activeTab, setActiveTab] = useQueryState("tab");
  return (
    <Button
      size="lg"
      variant="outline"
      className={cn(
        "rounded-full border-2",
        activeTab === tabValue ? "border-secondary" : undefined
      )}
      onClick={() => setActiveTab(tabValue)}
    >
      {children}
    </Button>
  );
}
