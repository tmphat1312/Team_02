import Image from "next/image";

type PhotoGalleryProps = {
  imageUrls: string[];
  propertyName: string;
};

export function PhotoGallery({ imageUrls, propertyName }: PhotoGalleryProps) {
  const [spotlightImageUrl, ...featuredImageUrls] = imageUrls.slice(0, 5);
  return (
    <div className="grid grid-cols-4 grid-rows-[200px_200px] gap-2 rounded-2xl overflow-clip">
      <Image
        src={spotlightImageUrl}
        alt={`Spotlight image of ${propertyName}`}
        width={560}
        height={400}
        className="object-cover w-full h-full col-span-2 row-span-2 bg-accent"
      />
      {featuredImageUrls.map((url, i) => (
        <Image
          key={url + i}
          src={url}
          alt={`Featured image of ${propertyName}`}
          width={300}
          height={300}
          className="object-cover w-full h-full bg-accent"
        />
      ))}
    </div>
  );
}
