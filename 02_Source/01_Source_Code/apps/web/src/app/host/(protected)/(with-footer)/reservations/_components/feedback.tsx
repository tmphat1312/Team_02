import { cn } from "@/lib/utils";
import Link from "next/link";

export function Feedback({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-center", className)} {...props}>
      <p className="text-muted-foreground">
        How can we make it easier to manage your reservations?
        <Link
          href="#"
          className="ml-1 font-medium text-primary hover:underline"
        >
          Share your feedback
        </Link>
      </p>
    </div>
  );
}
