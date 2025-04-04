import { Input, Button, Form, Textarea, addToast } from '@heroui/react';

import { useCreateCommonRule } from '../hooks/useCreateCommonRule';
import { useCommonRules } from '../hooks/useCommonRules';

type CreateCommonRuleFormProps = {
  onSubmit: () => void;
  onClose: () => void;
};

export function CreateCommonRuleForm(props: CreateCommonRuleFormProps) {
  const { onSubmit, onClose } = props;
  const { isPending, createCommonRule } = useCreateCommonRule();
  const { revalidateCommonRules } = useCommonRules();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    await createCommonRule(
      { name, description },
      {
        onSuccess: () => {
          revalidateCommonRules();
          addToast({
            color: 'success',
            title: 'Common Rule created successfully',
            description: 'The common rule has been created successfully.',
          });
        },
        onError: (error) => {
          addToast({
            color: 'danger',
            title: 'Error creating common rule',
            description: error.message,
          });
        },
      }
    );

    onSubmit();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Form className="lex-col flex w-full gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        isDisabled={isPending}
        errorMessage="Please enter a valid name"
        label="Name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter common rule name"
        type="text"
      />
      <Textarea
        isRequired
        isDisabled={isPending}
        errorMessage="Please enter a valid description "
        label="Description"
        labelPlacement="outside"
        name="description"
        placeholder="Enter your description"
      />
      <div className="ms-auto mt-3 flex gap-3.5">
        <Button
          color="default"
          variant="bordered"
          onPress={handleClose}
          disabled={isPending}
        >
          Close
        </Button>
        <Button color="primary" type="submit" isLoading={isPending}>
          Create
        </Button>
      </div>
    </Form>
  );
}
