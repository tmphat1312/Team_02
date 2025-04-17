import { Switch } from "@/components/ui/switch";

export function DisplayPriceAfterTaxes() {
  return (
    <label className="border flex items-center justify-center rounded-md gap-2 text-sm px-4 h-12 pointer-events-none grayscale">
      Display total before taxes <Switch />
    </label>
  );
}
