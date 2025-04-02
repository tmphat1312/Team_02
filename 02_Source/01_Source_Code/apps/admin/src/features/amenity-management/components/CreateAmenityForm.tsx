import { Input, Button, Form, Textarea, addToast } from '@heroui/react';

import { useCreateAmenity } from '../hooks/useCreateAmenity';
import { useAmenities } from '../hooks/useAmenities';

type CreateAmenityFormProps = {
  onSubmit: () => void;
  onClose: () => void;
};

export function CreateAmenityForm(props: CreateAmenityFormProps) {
  const { onSubmit, onClose } = props;
  const { isPending, createAmenity } = useCreateAmenity();
  const { revalidateAmenities } = useAmenities();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;

    await createAmenity(
      { name, description, image },
      {
        onSuccess: () => {
          revalidateAmenities();
          addToast({
            color: 'success',
            title: 'Amenity created successfully',
            description: 'The amenity has been created successfully.',
          });
        },
        onError: (error) => {
          addToast({
            color: 'danger',
            title: 'Error creating amenity',
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
        placeholder="Enter amenity name"
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
      <Input
        isRequired
        isDisabled={isPending}
        errorMessage="Drop an image"
        label="Image"
        labelPlacement="outside"
        name="image"
        placeholder="Upload an image"
        type="file"
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
