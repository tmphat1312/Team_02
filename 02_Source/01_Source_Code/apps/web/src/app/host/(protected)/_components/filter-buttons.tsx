"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useActiveTab } from "../_hooks/use-active-tab";

type FilterButtonsProps = React.ComponentProps<"div"> & {
  checkingOutCount: number;
  arrivingSoonCount: number;
  upcomingCount: number;
  pendingReviewCount: number;
};

export function FilterButtons({
  checkingOutCount,
  arrivingSoonCount,
  upcomingCount,
  pendingReviewCount,
  className,
  ...props
}: FilterButtonsProps) {
  return (
    <div className={cn("flex gap-3", className)} {...props}>
      <FilterButton tabValue={"checking-out"}>
        Checking out ({checkingOutCount})
      </FilterButton>
      <FilterButton tabValue={"arriving-soon"}>
        Arriving soon ({arrivingSoonCount})
      </FilterButton>
      <FilterButton tabValue={"upcoming"}>
        Upcoming ({upcomingCount})
      </FilterButton>
      <FilterButton tabValue={"pending-review"}>
        Pending Review ({pendingReviewCount})
      </FilterButton>
    </div>
  );
}

type FilterButtonProps = {
  tabValue: "checking-out" | "arriving-soon" | "upcoming" | "pending-review";
  children: React.ReactNode;
};

function FilterButton({ tabValue, children }: FilterButtonProps) {
  const [activeTab, setActiveTab] = useActiveTab();
  return (
    <Button
      variant="outline"
      className={cn("rounded-full border-border/50 font-normal border-2", {
        "border-black": activeTab === tabValue,
      })}
      onClick={() => setActiveTab(tabValue)}
    >
      {children}
    </Button>
  );
}
