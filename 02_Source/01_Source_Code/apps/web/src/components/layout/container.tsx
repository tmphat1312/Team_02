import { cn } from "@/lib/utils";

type WidthContainerProps = React.ComponentProps<"div"> & {
  size?: "sm" | "default";
};

export function Container({ className, size, ...props }: WidthContainerProps) {
  return (
    <div>
      <div
        className={cn("width-container", className, size || "default")}
        {...props}
      />
    </div>
  );
}
