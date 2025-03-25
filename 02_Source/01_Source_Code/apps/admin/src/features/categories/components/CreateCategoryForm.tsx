import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { CustomFileUpload } from './CustomFileUpload';

export function CreateCategoryForm() {
  return (
    <form className="space-y-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <InputText
          type="text"
          className="p-inputtext-sm"
          name="name"
          id="name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <InputTextarea name="description" id="description" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="fileUpload">Image</label>
        <CustomFileUpload />
      </div>
    </form>
  );
}
