import { X } from "lucide-react";

import { Filter } from "@/components/icons/filter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FiltersDialog({ children }: { children?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 font-normal">
          <Filter /> Filters
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[35.5rem] rounded-4xl p-0 gap-0"
        hideCloseButton
      >
        <DialogHeader className="flex items-center justify-between border-b py-4 px-6">
          <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
        </DialogHeader>

        {children}

        <DialogClose asChild>
          <Button
            variant="ghost"
            className="absolute top-4 right-4 rounded-full p-0"
          >
            <X size={32} />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
