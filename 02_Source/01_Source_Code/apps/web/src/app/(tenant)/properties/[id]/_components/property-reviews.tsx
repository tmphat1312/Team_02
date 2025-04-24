import { Star } from "lucide-react";
import pluralize from "pluralize";

import { Accuracy } from "@/components/icons/accuracy";
import { Cleanliness } from "@/components/icons/cleanliness";
import { Communication } from "@/components/icons/communication";
import { Location } from "@/components/icons/location";
import { Separator } from "@/components/ui/separator";

import { fetchPropertyReviews } from "../_data/fetch-property-reviews";
import { ReviewCard } from "./review-card";
import { calculateAvgRating } from "@/lib/utils";

type PropertyReviewsProps = {
  propertyId: number;
};

export async function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  const reviews = await fetchPropertyReviews(propertyId);

  const numberOfReviews = reviews.length;
  const numberOfReviewsInText = pluralize("review", numberOfReviews, true);
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
    <div id="reviews">
      <section className="mb-5">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Star className="fill-current" size={24} />
          <span>{avgRatingValue.toFixed(1)}</span>
          <span>·</span>
          <span>{numberOfReviewsInText}</span>
        </h3>
      </section>

      <div className="grid grid-cols-5 gap-8 divide-x-2 divide-black/10">
        <RatingChart
          numberOfReviews={numberOfReviews}
          oneStar={oneStar}
          twoStar={twoStar}
          threeStar={threeStar}
          fourStar={fourStar}
          fiveStar={fiveStar}
        />
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

      <Separator className="my-8" />

      <div className="grid grid-cols-2 gap-12">
        {reviews.map((review) => (
          <ReviewCard item={review} key={review.id} />
        ))}
      </div>
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
    <section className="pe-8">
      <h4 className="mb-2 font-medium">Overall rating</h4>
      <div className="text-xs">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center gap-2">
            <span>{5 - i}</span>
            <div className="w-full h-1 relative">
              <span className="absolute inset-0 bg-gray-200" />
              <span
                className="absolute inset-0 bg-gray-800"
                style={{
                  width: `${starPercentages[5 - i - 1]}%`,
                }}
              />
            </div>
          </div>
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
      <div className="flex flex-col gap-3.5">
        <span className="text-xl font-medium">{value.toFixed(1)}</span>
        {icon}
      </div>
    </section>
  );
}
