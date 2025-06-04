import { Star } from "lucide-react";

import { ReviewWithTenant } from "@/typings/models";
import { Accuracy } from "@/components/icons/accuracy";
import { Cleanliness } from "@/components/icons/cleanliness";
import { Communication } from "@/components/icons/communication";
import { Location } from "@/components/icons/location";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { PageSubHeading } from "@/components/typography/page-sub-heading";
import { Separator } from "@/components/ui/separator";
import { calculateAvgRating, makePluralNoun } from "@/lib/utils";

import { ShowMore } from "@/components/show-more";
import { ReviewCard } from "./review-card";

type PropertyReviewsProps = {
  reviews: ReviewWithTenant[];
};

const CutOffLength = 6;

export function PropertyReviews({ reviews }: PropertyReviewsProps) {
  if (reviews.length === 0) {
    return <p className="text-xl font-medium">No reviews (yet)</p>;
  }

  const numberOfReviews = reviews.length;
  const numberOfReviewsInText = makePluralNoun("review", numberOfReviews);
  const {
    avgCleanlinessRatingValue,
    avgAccuracyRatingValue,
    avgCommunicationRatingValue,
    avgLocationRatingValue,
  } = reviews.reduce(
    (acc, review) => {
      acc.avgCleanlinessRatingValue += review.cleanliness / numberOfReviews;
      acc.avgAccuracyRatingValue += review.accuracy / numberOfReviews;
      acc.avgCommunicationRatingValue += review.communication / numberOfReviews;
      acc.avgLocationRatingValue += review.location / numberOfReviews;
      return acc;
    },
    {
      avgCleanlinessRatingValue: 0,
      avgAccuracyRatingValue: 0,
      avgCommunicationRatingValue: 0,
      avgLocationRatingValue: 0,
    }
  );
  const avgRatingValues = reviews.map(calculateAvgRating);
  const avgRatingValue =
    avgRatingValues.reduce((sum, rating) => sum + rating, 0) / numberOfReviews;
  const { oneStar, twoStar, threeStar, fourStar, fiveStar } =
    avgRatingValues.reduce(
      (acc, rating) => {
        const roundedRating = Math.round(rating);
        if (roundedRating === 1) acc.oneStar++;
        else if (roundedRating === 2) acc.twoStar++;
        else if (roundedRating === 3) acc.threeStar++;
        else if (roundedRating === 4) acc.fourStar++;
        else if (roundedRating === 5) acc.fiveStar++;
        return acc;
      },
      { oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0 }
    );

  return (
    <div id="reviews" className="@container">
      <section className="mb-5">
        <PageSubHeading>
          <Stack className="gap-2">
            <Star className="fill-current" size={24} />
            <span>
              {Number.isNaN(avgRatingValue) ? "__" : avgRatingValue.toFixed(1)}
            </span>
            <span>·</span>
            <span>{numberOfReviewsInText}</span>
          </Stack>
        </PageSubHeading>
      </section>

      <div className="@lg:flex gap-8 @lg:divide-x-2">
        <RatingChart
          numberOfReviews={numberOfReviews}
          oneStar={oneStar}
          twoStar={twoStar}
          threeStar={threeStar}
          fourStar={fourStar}
          fiveStar={fiveStar}
        />
        <div className="flex flex-wrap justify-start gap-12 lg:grid lg:grid-cols-4 mt-6 @lg:mt-0 w-full">
          <SpecificRatingValue
            label="Cleanliness"
            value={avgCleanlinessRatingValue}
            icon={<Cleanliness className="size-8" />}
          />
          <SpecificRatingValue
            label="Accuracy"
            value={avgAccuracyRatingValue}
            icon={<Accuracy className="size-8" />}
          />
          <SpecificRatingValue
            label="Communication"
            value={avgCommunicationRatingValue}
            icon={<Communication className="size-8" />}
          />
          <SpecificRatingValue
            label="Location"
            value={avgLocationRatingValue}
            icon={<Location className="size-8" />}
          />
        </div>
      </div>

      <Separator className="my-8" />

      <Grid className="gap-12 grid-cols-2">
        {reviews.slice(0, CutOffLength).map((review) => (
          <ReviewCard item={review} key={review.id} />
        ))}
      </Grid>

      {reviews.length > CutOffLength && (
        <ShowMore
          title="Reviews"
          buttonLabel={`Show more ${makePluralNoun(
            "review",
            numberOfReviews - CutOffLength
          )}`}
        >
          <Stack className="gap-10" orientation="vertical">
            {reviews.map((review) => (
              <ReviewCard item={review} key={review.id} />
            ))}
          </Stack>
        </ShowMore>
      )}
    </div>
  );
}

function RatingChart({
  numberOfReviews,
  oneStar,
  twoStar,
  threeStar,
  fourStar,
  fiveStar,
}: {
  numberOfReviews: number;
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
}) {
  const starPercentages = [oneStar, twoStar, threeStar, fourStar, fiveStar].map(
    (star) => (star / numberOfReviews) * 100
  );
  return (
    <section className="pe-8 min-w-xs">
      <h4 className="mb-2 font-medium">Overall rating</h4>
      <div className="text-xs">
        {Array.from({ length: 5 }, (_, i) => (
          <Stack key={i} className="gap-2">
            <span>{5 - i}</span>
            <div className="relative w-full h-1">
              <span className="absolute inset-0 bg-gray-200" />
              <span
                className="absolute inset-0 bg-gray-800"
                style={{
                  width: `${starPercentages[5 - i - 1]}%`,
                }}
              />
            </div>
          </Stack>
        ))}
      </div>
    </section>
  );
}

function SpecificRatingValue({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="mb-1 font-medium">{label}</h4>
      <Stack orientation="vertical" className="gap-3.5">
        <span className="font-medium text-xl">{value.toFixed(1)}</span>
        {icon}
      </Stack>
    </section>
  );
}
