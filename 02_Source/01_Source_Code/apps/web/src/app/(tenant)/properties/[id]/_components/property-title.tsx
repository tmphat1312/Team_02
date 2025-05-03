import { Property } from "@/app/typings/models";
import { SaveButton } from "./save-button";
import { ShareButton } from "./share-button";

type PropertyTitleProps = {
  item: Property;
};

export function PropertyTitle({ item }: PropertyTitleProps) {
  return (
    <section className="flex justify-center md:justify-between items-center mb-6 flex-wrap gap-2 @container">
      <h1 className="text-2xl @md:text-3xl font-medium">{item.title}</h1>
      <div className="flex items-center">
        <ShareButton propertyId={item.id} />
        <SaveButton item={item} />
      </div>
    </section>
  );
}
