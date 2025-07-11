import { Property } from "@/typings/models";
import { Stack } from "@/components/layout/stack";
import { PageHeading } from "@/components/typography/page-heading";

import { SaveButton } from "./save-button";
import { ShareButton } from "./share-button";

type PropertyTitleProps = {
  item: Property;
};

export function PropertyTitle({ item }: PropertyTitleProps) {
  return (
    <section className="flex justify-center md:justify-between items-center mb-6 flex-wrap gap-2 @container">
      <PageHeading className="text-2xl @md:text-3xl mb-0 font-semibold">
        {item.title}
      </PageHeading>
      <Stack>
        <ShareButton propertyId={item.id} />
        <SaveButton item={item} />
      </Stack>
    </section>
  );
}
