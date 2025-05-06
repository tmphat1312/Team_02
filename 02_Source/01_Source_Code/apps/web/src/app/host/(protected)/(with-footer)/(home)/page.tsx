import { Plus } from "lucide-react";

import { Property, Review } from "@/app/typings/models";
import { Button } from "@/components/ui/button";
import { mockHttpClient } from "@/lib/http-client";

import { Grid } from "@/components/layout/grid";
import { Page } from "@/components/layout/page";
import { Stack } from "@/components/layout/stack";
import { PageHeading } from "@/components/typography/page-heading";
import { TextAlert } from "@/components/typography/text-alert";
import { calculateAvgRating } from "@/lib/utils";
import { ListingCard } from "./_components/listing-card";
import { PropertyWithReviews } from "./_models/property-with-reviews";

async function fetchListings({
  hostId,
}: {
  hostId: string;
}): Promise<PropertyWithReviews[]> {
  const params = new URLSearchParams();
  params.append("hostId", hostId);

  const { data: properties } = await mockHttpClient.get("/properties", {
    params,
  });

  const propertiesWithReviewsPromises = properties.map(
    async (property: Property) => {
      const params = new URLSearchParams();
      params.append("propertyId", property.id.toString());
      const { data: reviews } = await mockHttpClient.get(`/reviews/`, {
        params,
      });

      const numberOfReviews = reviews.length;
      const rating =
        reviews.reduce(
          (acc: number, review: Review) => acc + calculateAvgRating(review),
          0
        ) / numberOfReviews || 0;

      return {
        ...property,
        reviews: {
          rating,
          numberOfReviews,
        },
      };
    }
  );

  const propertiesWithReviews = await Promise.all(
    propertiesWithReviewsPromises
  );

  return propertiesWithReviews;
}

export default async function ListingsPage() {
  const host = {
    id: "host_1",
  };

  const listings = await fetchListings({ hostId: host.id });

  return (
    <Page>
      <Stack className="justify-between mb-8">
        <PageHeading className="mb-0">Your listings</PageHeading>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="size-4" />
        </Button>
      </Stack>
      {listings.length == 0 ? (
        <TextAlert>You have not hosted any listings yet.</TextAlert>
      ) : (
        <Grid className="grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} item={listing} />
          ))}
        </Grid>
      )}
    </Page>
  );
}
