import { PageSubHeading } from "@/components/typography/page-sub-heading";

export function PropertyMaps({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) {
  return (
    <section>
      <PageSubHeading>Where you&apos;ll be</PageSubHeading>
      <iframe
        width="100%"
        src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${latitude},${longitude}&z=14&output=embed`}
        className="rounded-2xl aspect-square max-h-[600px]"
      ></iframe>
    </section>
  );
}
