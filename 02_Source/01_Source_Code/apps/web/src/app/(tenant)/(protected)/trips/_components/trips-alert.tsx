import Link from "next/link";

export function TripsAlert() {
  return (
    <p>
      Can&apos;t find your reservation here?{" "}
      <Link href="#" className="underline">
        Visit the Help Center
      </Link>
    </p>
  );
}
