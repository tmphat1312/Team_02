import { ShareIcon, HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type PropertyTitleProps = {
  title: string;
  propertyId: number;
};

export function PropertyTitle({ title, propertyId }: PropertyTitleProps) {
  const handleShare = () => {
    // copy the current url or construct the url and copy the url to clipboard
    console.log("Sharing: ", propertyId);
  };
  const handleSave = () => {
    // save this property to wishlists
    console.log("Saving: ", propertyId);
  };

  return (
    <section className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-medium">{title}</h1>
      <div>
        <Button variant="ghost" className="underline" onClick={handleShare}>
          <ShareIcon size={16} />
          Share
        </Button>
        <Button variant="ghost" className="underline" onClick={handleSave}>
          <HeartIcon size={16} />
          Save
        </Button>
      </div>
    </section>
  );
}
