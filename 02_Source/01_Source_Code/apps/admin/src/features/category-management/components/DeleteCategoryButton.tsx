import { addToast, Button } from '@heroui/react';
import { TrashIcon } from 'lucide-react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';

import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { useCategories } from '../hooks/useCategories';

type DeleteCategoryButtonProps = {
  categoryId: number;
  categoryName: string;
};

export function DeleteCategoryButton(props: DeleteCategoryButtonProps) {
  const { categoryId, categoryName } = props;

  const { isPending, deleteCategory } = useDeleteCategory();
  const { revalidateCategories } = useCategories();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleDelete = async () => {
    await deleteCategory(
      { id: categoryId },
      {
        onSuccess: () => {
          addToast({
            color: 'success',
            title: 'Category deleted successfully',
            description: 'The category has been deleted successfully.',
          });
          onClose();
        },
        onError: (err) => {
          addToast({
            color: 'danger',
            title: 'Error deleting category',
            description: err.message,
          });
          onClose();
        },
      }
    );

    setTimeout(() => {
      revalidateCategories();
    }, 500);
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label="Delete"
        variant="light"
        onPress={onOpen}
        disabled={isPending}
      >
        <TrashIcon size={14} className="stroke-red-500" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Category Deletion Confirmation
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete{' '}
              <span className="font-bold">{categoryName}</span> category?
            </p>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="bordered"
              onPress={onClose}
              disabled={isPending}
            >
              Close
            </Button>
            <Button color="danger" onPress={handleDelete} isLoading={isPending}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
