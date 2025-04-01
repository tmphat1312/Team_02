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
import { CreateCategoryForm } from './CreateCategoryForm';

export function CreateCategoryButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        onPress={() => (isOpen ? onClose() : onOpen())}
        startContent={<PlusIcon className="pointer-events-none stroke-white" />}
      >
        Create new category
      </Button>
      <Modal isOpen={isOpen} size={'md'} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create New Category
          </ModalHeader>
          <ModalBody>
            <CreateCategoryForm onClose={onClose} onSubmit={onClose} />
          </ModalBody>
          <ModalFooter className="p-1" />
        </ModalContent>
      </Modal>
    </>
  );
}
