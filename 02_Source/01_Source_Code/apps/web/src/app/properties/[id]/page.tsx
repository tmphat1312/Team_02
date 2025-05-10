import { Suspense } from "react";

import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";
import { Separator } from "@/components/ui/separator";
import { AddToRecentlyViewedList } from "@/features/listing/components/add-to-recently-viewed-list";
import { fetchPropertyDetails } from "@/features/listing/data/fetch-property-details";

import { HostDetails } from "./_components/host-details";
import { PhotoGallery } from "./_components/photo-gallery";
import { PropertyInfo } from "./_components/property-info";
import { PropertyMaps } from "./_components/property-maps";
import { PropertyReservation } from "./_components/property-reservation";
import { PropertyReviews } from "./_components/property-reviews";
import { PropertyRules } from "./_components/property-rules";
import { PropertyTitle } from "./_components/property-title";
import { fetchPropertyCategories } from "@/features/listing/data/fetch-property-categories";
import { fetchPropertyAmenities } from "@/features/listing/data/fetch-property-amenities";
import { fetchPropertyRules } from "@/features/listing/data/fetch-property-rules";
import { fetchPropertyHost } from "@/features/listing/data/fetch-property-host";

export default async function AirbnbRoomDetails({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const [details, categories, amenities, rules] = await Promise.all([
    fetchPropertyDetails(id),
    fetchPropertyCategories(id),
    fetchPropertyAmenities(id),
    fetchPropertyRules(id),
  ]);
  const host = await fetchPropertyHost(details.hostId);

  return (
    <Page className="space-y-8 mb-8 py-6">
      <PropertyTitle item={details} />
      <PhotoGallery item={details} />
      <Grid className="block items-start gap-16 lg:gap-8 lg:grid grid-cols-3 border-b">
        <PropertyInfo
          item={details}
          rating={{
            averageRating: 4.5,
            numberOfReviews: 100,
          }}
          host={host}
          amenities={amenities}
          categories={categories}
          className="col-span-2"
        />
        <Separator className="lg:hidden my-6" />
        <PropertyReservation item={details} />
      </Grid>
      {/* <Suspense fallback={null}>
        <PropertyReviews propertyId={details.id} />
      </Suspense> */}
      <Separator />
      <PropertyMaps longitude={details.longitude} latitude={details.latitude} />
      <Separator />
      <HostDetails host={host} />
      <Separator />
      <PropertyRules items={rules} />
      <AddToRecentlyViewedList item={details} />
    </Page>
  );
}
