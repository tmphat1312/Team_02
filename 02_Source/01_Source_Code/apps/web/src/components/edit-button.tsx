"use client";

import { Button } from "@/components/ui/button";
import { useEditState } from "@/hooks/use-edit-state";

export function EditButton() {
  const { isEditing, toggleEditing } = useEditState();

  return (
    <Button
      size={"lg"}
      variant={"ghost"}
      className="underline text-lg"
      onClick={toggleEditing}
    >
      {isEditing ? "Done" : "Edit"}
    </Button>
  );
}
