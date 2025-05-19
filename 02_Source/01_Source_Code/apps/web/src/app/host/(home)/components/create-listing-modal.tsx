import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateListingContextProvider } from "../contexts/create-listing-context";
import { CreateListingForm } from "./create-listing/create-listing-form";

export function CreateListingModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Plus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="size-full rounded-none max-w-none! p-0"
        hideCloseButton
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Create a new listing</DialogTitle>
          <DialogDescription>
            Create a new listing and start sharing your space with the world.
          </DialogDescription>
        </DialogHeader>
        <CreateListingContextProvider>
          <CreateListingForm />
        </CreateListingContextProvider>
      </DialogContent>
    </Dialog>
  );
}
