import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function CompletedActions() {
  const handleReview = () => {
    // Logic to message the host
    console.log("Message host clicked");
  };

  return (
    <Button
      variant="outline"
      className="rounded-lg gap-2"
      onClick={handleReview}
    >
      <Star className="size-4" />
      Leave a review
    </Button>
  );
}
