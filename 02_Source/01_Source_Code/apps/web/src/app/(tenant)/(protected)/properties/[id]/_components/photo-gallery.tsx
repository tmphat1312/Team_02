import Image from "next/image";

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-4 grid-rows-[200px_200px] gap-2 rounded-2xl overflow-clip">
      <Image
        src="/placeholder.svg"
        alt="Traditional Japanese wooden building exterior"
        width={560}
        height={400}
        className="object-cover w-full h-full col-span-2 row-span-2"
      />
      <Image
        src="/placeholder.svg?height=300&width=300"
        alt="Bedroom with white bedding"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
      <Image
        src="/placeholder.svg?height=300&width=300"
        alt="View of water and mountains"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
      <Image
        src="/placeholder.svg?height=300&width=300"
        alt="Traditional Japanese slippers"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
      <Image
        src="/placeholder.svg?height=300&width=300"
        alt="Breakfast with view"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
