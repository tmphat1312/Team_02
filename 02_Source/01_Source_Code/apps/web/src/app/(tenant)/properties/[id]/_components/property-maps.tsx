export function PropertyMaps() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">Where you&apos;ll be</h2>
      <iframe
        width="100%"
        height={600}
        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        className="rounded-2xl"
      ></iframe>
    </section>
  );
}
