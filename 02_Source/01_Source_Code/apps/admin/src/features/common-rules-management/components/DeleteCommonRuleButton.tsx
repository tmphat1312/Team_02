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

import { useDeleteCommonRule } from '../hooks/useDeleteCommonRule';
import { useCommonRules } from '../hooks/useCommonRules';

type DeleteCommonRuleButtonProps = {
  commonRuleId: number;
  commonRuleName: string;
};

export function DeleteCommonRuleButton(props: DeleteCommonRuleButtonProps) {
  const { commonRuleId, commonRuleName } = props;

  const { isPending, deleteCommonRule } = useDeleteCommonRule();
  const { revalidateCommonRules } = useCommonRules();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    deleteCommonRule(
      { id: commonRuleId },
      {
        onSuccess: () => {
          revalidateCommonRules();
          addToast({
            color: 'success',
            title: 'Common rule deleted successfully',
            description: 'The common rule has been deleted successfully.',
          });
          onClose();
        },
        onError: (err) => {
          addToast({
            color: 'danger',
            title: 'Error deleting common rule',
            description: err.message,
          });
          onClose();
        },
      }
    );
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
            Common Rule Deletion Confirmation
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete{' '}
              <span className="font-bold">{commonRuleName}</span> common rule?
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
