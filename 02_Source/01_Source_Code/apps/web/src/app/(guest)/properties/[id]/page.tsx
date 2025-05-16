import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";
import { Separator } from "@/components/ui/separator";
import { AddToRecentlyViewedList } from "@/features/listing/components/add-to-recently-viewed-list";
import { fetchPropertyAmenities } from "@/features/listing/data/fetch-property-amenities";
import { fetchPropertyCategories } from "@/features/listing/data/fetch-property-categories";
import { fetchPropertyDetails } from "@/features/listing/data/fetch-property-details";
import { fetchPropertyHost } from "@/features/listing/data/fetch-property-host";
import { fetchPropertyReviews } from "@/features/listing/data/fetch-property-reviews";
import { fetchPropertyRules } from "@/features/listing/data/fetch-property-rules";
import { calculateAvgRating } from "@/lib/utils";

import { HostDetails } from "./components/host-details";
import { PhotoGallery } from "./components/photo-gallery";
import { PropertyInfo } from "./components/property-info";
import { PropertyMaps } from "./components/property-maps";
import { PropertyReservation } from "./components/property-reservation";
import { PropertyReviews } from "./components/property-reviews";
import { PropertyRules } from "./components/property-rules";
import { PropertyTitle } from "./components/property-title";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const [details, categories, amenities, rules, reviews] = await Promise.all([
    fetchPropertyDetails(id),
    fetchPropertyCategories(id),
    fetchPropertyAmenities(id),
    fetchPropertyRules(id),
    fetchPropertyReviews(id),
  ]);
  const host = await fetchPropertyHost(details.hostId);

  const numberOfReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, review) => acc + calculateAvgRating(review), 0) /
    reviews.length;

  return (
    <Page className="space-y-8 mb-8 py-6">
      <PropertyTitle item={details} />
      <PhotoGallery item={details} />
      <Grid className="block items-start gap-16 lg:gap-8 lg:grid grid-cols-3 border-b">
        <PropertyInfo
          item={details}
          rating={{
            averageRating,
            numberOfReviews,
          }}
          host={host}
          amenities={amenities}
          categories={categories}
          className="col-span-2"
        />
        <Separator className="lg:hidden my-6" />
        <PropertyReservation item={details} />
      </Grid>
      <PropertyReviews reviews={reviews} />
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
