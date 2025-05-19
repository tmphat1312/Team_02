import { Page } from "@/components/layout/page";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Page role="status" aria-busy>
      <div className="lg:hidden">
        <Skeleton className="h-20 w-full mb-6" />
        <Skeleton className="aspect-square max-h-100 w-full mb-8" />
        <div className="mb-3">
          <Skeleton className="h-6 mb-0.5 w-[28ch]" />
          <Skeleton className="h-5 w-[32ch]" />
        </div>
        <Skeleton className="h-7 w-[20ch]" />
        <Separator className="my-6" />
        <Skeleton className="h-12 w-[20ch]" />
        <Separator className="my-6" />

        <div className="space-y-1 [--line-height:--spacing(5)]">
          <Skeleton className="h-(--line-height) w-full" />
          <Skeleton className="h-(--line-height) w-full" />
          <Skeleton className="h-(--line-height) w-full" />
          <Skeleton className="h-(--line-height) w-[12ch]" />
        </div>

        <Separator className="my-6" />

        <div>
          <Skeleton className="h-7 mb-6 w-[20ch]" />
          <Skeleton className="h-50 w-full" />
        </div>
      </div>
      <div className="hidden lg:block space-y-8">
        <div className="h-9 flex justify-between gap-2">
          <Skeleton className="h-full w-[32ch]" />
          <div className="h-full flex gap-2">
            <Skeleton className="h-full w-20" />
            <Skeleton className="h-full w-20" />
          </div>
        </div>

        <div className="md:grid grid-cols-4 grid-rows-[repeat(2,200px)] gap-2">
          <Skeleton className="size-full row-span-2 col-span-2" />
          <Skeleton className="size-full" />
          <Skeleton className="size-full" />
          <Skeleton className="size-full" />
          <Skeleton className="size-full" />
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="mb-3">
              <Skeleton className="h-6 mb-0.5 w-[28ch]" />
              <Skeleton className="h-5 w-[32ch]" />
            </div>

            <Skeleton className="h-7 w-[20ch]" />
            <Separator className="my-6" />
            <Skeleton className="h-12 w-[20ch]" />
            <Separator className="my-6" />

            <div className="space-y-1 [--line-height:--spacing(5)]">
              <Skeleton className="h-(--line-height) w-full" />
              <Skeleton className="h-(--line-height) w-full" />
              <Skeleton className="h-(--line-height) w-full" />
              <Skeleton className="h-(--line-height) w-[12ch]" />
            </div>

            <Separator className="my-6" />

            <div>
              <Skeleton className="h-7 mb-6 w-[20ch]" />
              <Skeleton className="h-50 w-full" />
            </div>
          </div>
          <Skeleton className="h-100" />
        </div>

        <Separator className="my-6" />
        <Separator className="my-6" />
        <Skeleton className="h-100" />
      </div>
    </Page>
  );
}
