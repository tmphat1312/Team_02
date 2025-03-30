import { Input, Button, Form, Textarea } from '@heroui/react';

export function CreateCategoryForm() {
  return (
    <Form className="lex-col flex w-full gap-4" onSubmit={() => {}}>
      <Input
        isRequired
        errorMessage="Please enter a valid name"
        label="Name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter category name"
        type="text"
      />
      <Textarea
        errorMessage="Please enter a valid description "
        label="Description"
        labelPlacement="outside"
        name="description"
        placeholder="Enter your description"
      />
      <Input
        isRequired
        errorMessage="Drop an image"
        label="Image"
        labelPlacement="outside"
        name="image"
        placeholder="Upload an image"
        type="file"
      />
      <div className="ms-auto mt-3 flex gap-3.5">
        <Button color="default" variant="bordered">
          Close
        </Button>
        <Button color="primary">Create</Button>
      </div>
    </Form>
  );
}
