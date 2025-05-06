import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useActiveTab } from "../_hooks/use-active-tab";

export function FilterButtons({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex gap-3 overflow-x-auto", className)} {...props}>
      <FilterButton tabValue={null}>All</FilterButton>
      <FilterButton tabValue={"upcoming"}>Upcoming</FilterButton>
      <FilterButton tabValue={"completed"}>Completed</FilterButton>
      <FilterButton tabValue={"cancelled"}>Cancelled</FilterButton>
    </div>
  );
}

type FilterButtonProps = {
  tabValue: string | null;
  children: React.ReactNode;
};

function FilterButton({ tabValue, children }: FilterButtonProps) {
  const [activeTab, setActiveTab] = useActiveTab();
  return (
    <Button
      size="lg"
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
