import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function PriceChart(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props;
  return (
    <div className={cn(className)} {...rest}>
      <div className="h-12 w-full flex items-end">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="w-full bg-airbnb mx-0.5"
            style={{
              height: `${Math.max(10, Math.random() * 100)}%`,
            }}
          />
        ))}
      </div>
      <Slider
        defaultValue={[20, 80]}
        max={100}
        step={1}
        className="mt-2 bg-airbnb"
      />
    </div>
  );
}
