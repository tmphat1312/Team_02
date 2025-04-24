import { SaveButton } from "./save-button";
import { ShareButton } from "./share-button";

type PropertyTitleProps = {
  title: string;
  propertyId: number;
};

export function PropertyTitle({ title, propertyId }: PropertyTitleProps) {
  return (
    <section className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-medium">{title}</h1>
      <div className="flex items-center">
        <ShareButton propertyId={propertyId} />
        <SaveButton propertyId={propertyId} />
      </div>
    </section>
  );
}
