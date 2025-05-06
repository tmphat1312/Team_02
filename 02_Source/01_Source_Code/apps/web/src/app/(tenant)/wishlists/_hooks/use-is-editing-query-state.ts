import { parseAsBoolean, useQueryState } from "nuqs";

export function useIsEditingQueryState() {
  const [isEditing, setIsEditing] = useQueryState("isEditing", parseAsBoolean);

  const toggleEditing = () => {
    setIsEditing((prev) => (prev ? null : true));
  };

  return { isEditing, toggleEditing };
}
