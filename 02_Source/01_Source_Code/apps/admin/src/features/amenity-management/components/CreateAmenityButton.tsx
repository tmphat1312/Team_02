import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { PlusIcon } from 'lucide-react';
import { CreateAmenityForm } from './CreateAmenityForm';

export function CreateAmenityButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        onPress={() => (isOpen ? onClose() : onOpen())}
        startContent={<PlusIcon className="pointer-events-none stroke-white" />}
      >
        Create new amenity
      </Button>
      <Modal isOpen={isOpen} size={'md'} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create New Amenity
          </ModalHeader>
          <ModalBody>
            <CreateAmenityForm onClose={onClose} onSubmit={onClose} />
          </ModalBody>
          <ModalFooter className="p-1" />
        </ModalContent>
      </Modal>
    </>
  );
}
