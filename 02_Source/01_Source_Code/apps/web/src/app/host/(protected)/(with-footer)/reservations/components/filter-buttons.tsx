"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useActiveTab } from "../hooks/use-active-tab";

export function FilterButtons({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex gap-3", className)} {...props}>
      <FilterButton tabValue={"all"}>All</FilterButton>
      <FilterButton tabValue={"upcoming"}>Upcoming</FilterButton>
      <FilterButton tabValue={"completed"}>Completed</FilterButton>
      <FilterButton tabValue={"cancelled"}>Cancelled</FilterButton>
    </div>
  );
}

type FilterButtonProps = {
  tabValue: "upcoming" | "completed" | "cancelled" | "all" | null;
  children: React.ReactNode;
};

function FilterButton({ tabValue, children }: FilterButtonProps) {
  const [activeTab, setActiveTab] = useActiveTab();
  return (
    <Button
      size="lg"
      variant="outline"
      className={cn("rounded-full border-border font-medium border-2", {
        "border-secondary": activeTab === tabValue,
      })}
      onClick={() => setActiveTab(tabValue)}
    >
      {children}
    </Button>
  );
}
