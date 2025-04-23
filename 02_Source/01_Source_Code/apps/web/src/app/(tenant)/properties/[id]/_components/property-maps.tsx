export function PropertyMaps({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">Where you&apos;ll be</h2>
      <iframe
        width="100%"
        height={600}
        src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${latitude},${longitude}&z=14&output=embed`}
        className="rounded-2xl"
      ></iframe>
    </section>
  );
}
