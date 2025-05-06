"use client";

import { Button } from "@/components/ui/button";

import { useIsEditingQueryState } from "../_hooks/use-is-editing-query-state";

export function ToggleEditingButton() {
  const { isEditing, toggleEditing } = useIsEditingQueryState();

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
