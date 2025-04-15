import { ShareIcon, HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  propertyId: number;
};

export function PropertyTitle({ title, propertyId }: Props) {
  return (
    <section className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-medium">{title}</h1>
      <div>
        <Button variant="ghost" className="underline">
          <ShareIcon size={16} />
          Share
        </Button>
        <Button variant="ghost" className="underline">
          <HeartIcon size={16} />
          Save
        </Button>
      </div>
    </section>
  );
}
