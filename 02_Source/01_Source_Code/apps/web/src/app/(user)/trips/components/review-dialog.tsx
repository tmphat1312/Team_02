"use client";

import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trip } from "@/typings/models";

import { RatingSlider } from "./rating-slider";
import React from "react";
import { usePostAReview } from "../hooks/use-post-a-review";
import { useUserContext } from "@/features/auth/contexts/UserContext";

type Props = {
  trip: Trip;
};

const MinReviewLength = 50;
const MaxReviewLength = 500;

export function ReviewDialog({ trip }: Props) {
  const tenant = useUserContext();
  const id = React.useId();
  const reviewId = `review-${id}`;

  const [review, setReview] = React.useState("");
  const [cleanliness, setCleanliness] = React.useState(4);
  const [accuracy, setAccuracy] = React.useState(4);
  const [location, setLocation] = React.useState(4);
  const [communication, setCommunication] = React.useState(4);

  const { mutate: postReview, isPending: isPosting } = usePostAReview();

  const isPostReviewDisabled =
    isPosting ||
    cleanliness === 0 ||
    accuracy === 0 ||
    location === 0 ||
    communication === 0 ||
    review.length < MinReviewLength ||
    review.length > MaxReviewLength;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Leave a review</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
          <DialogDescription>
            {trip.property.title} from&nbsp;
            <strong>{trip.property.host.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <Stack orientation="vertical" className="gap-4.5 mb-2">
          <Stack orientation="vertical" className="gap-3">
            <RatingSlider
              label="Cleanliness"
              defaultValue={cleanliness}
              onValueChange={setCleanliness}
            />
            <RatingSlider
              label="Accuracy"
              defaultValue={accuracy}
              onValueChange={setAccuracy}
            />
            <RatingSlider
              label="Location"
              defaultValue={location}
              onValueChange={setLocation}
            />
            <RatingSlider
              label="Communication"
              defaultValue={communication}
              onValueChange={setCommunication}
            />
          </Stack>
          <Stack orientation="vertical">
            <Label className="text-base mb-0.5 gap-0" htmlFor={reviewId}>
              Your review&nbsp;
              <span className="text-sm text-muted-foreground">
                ({review.length}/{MaxReviewLength})
              </span>
            </Label>
            <Textarea
              id={reviewId}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              placeholder="Write something about your experience (min 50 characters)"
            />
          </Stack>
        </Stack>
        <DialogFooter>
          <Stack className="gap-3">
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant={"secondary"}
              disabled={isPostReviewDisabled}
              onClick={() => {
                postReview({
                  reservationId: trip.id,
                  propertyId: trip.property.id,
                  tenantId: tenant.id,
                  cleanliness,
                  accuracy,
                  location,
                  communication,
                  content: review,
                });
              }}
            >
              Post my review
            </Button>
          </Stack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
