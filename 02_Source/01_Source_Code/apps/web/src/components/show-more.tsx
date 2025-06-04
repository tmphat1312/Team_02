import { X } from "lucide-react";

import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader } from "./ui/dialog";

export function ShowMore({
  children,
  title,
  buttonLabel,
}: {
  title: string;
  buttonLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-normal mt-4">
          {buttonLabel || "Show more"}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[35.5rem] rounded-4xl p-0 gap-0"
        hideCloseButton
      >
        <DialogHeader className="flex items-center justify-between border-b py-4 px-6">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[32rem] overflow-y-auto mb-6 p-6">{children}</div>
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
