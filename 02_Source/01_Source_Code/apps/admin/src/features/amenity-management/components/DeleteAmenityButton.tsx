import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { TrashIcon } from 'lucide-react';

import { useAmenities } from '../hooks/useAmenities';
import { useDeleteAmenity } from '../hooks/useDeleteAmenity';

type DeleteAmenityButtonProps = {
  amenityId: number;
  amenityName: string;
};

export function DeleteAmenityButton(props: DeleteAmenityButtonProps) {
  const { amenityId, amenityName } = props;

  const { isPending, deleteAmenity } = useDeleteAmenity();
  const { revalidateAmenities } = useAmenities();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleDelete = async () => {
    await deleteAmenity(
      { id: amenityId },
      {
        onSuccess: () => {
          addToast({
            color: 'success',
            title: 'Amenity deleted successfully',
            description: 'The amenity has been deleted successfully.',
          });
          onClose();
        },
        onError: (err) => {
          addToast({
            color: 'danger',
            title: 'Error deleting amenity',
            description: err.message,
          });
          onClose();
        },
      }
    );

    setTimeout(() => {
      revalidateAmenities();
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
            Amenity Deletion Confirmation
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete{' '}
              <span className="font-bold">{amenityName}</span> amenity?
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
