import { Button } from '@heroui/react';
import { TrashIcon } from 'lucide-react';

export function DeleteAmenityButton() {
  return (
    <Button isIconOnly aria-label="Delete" variant="light">
      <TrashIcon size={14} className="stroke-red-500" />
    </Button>
  );
}
