import { Property } from "@/app/typings/models";
import { SaveButton } from "./save-button";
import { ShareButton } from "./share-button";

type PropertyTitleProps = {
  item: Property;
};

export function PropertyTitle({ item }: PropertyTitleProps) {
  return (
    <section className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-medium">{item.title}</h1>
      <div className="flex items-center">
        <ShareButton propertyId={item.id} />
        <SaveButton item={item} />
      </div>
    </section>
  );
}
