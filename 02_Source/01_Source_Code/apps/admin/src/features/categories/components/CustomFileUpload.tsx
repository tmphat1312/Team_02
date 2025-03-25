import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  ItemTemplateOptions,
} from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { useRef } from 'react';

export function CustomFileUpload() {
  const fileUploadRef = useRef<FileUpload>(null);

  return (
    <div>
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="file-update"
        url="/api/upload"
        accept="image/*"
        maxFileSize={10_000_000}
        headerTemplate={HeaderTemplate}
        itemTemplate={ItemTemplate}
        emptyTemplate={EmptyTemplate}
        chooseOptions={{
          icon: 'pi pi-fw pi-images',
          iconOnly: true,
          className: 'custom-choose-btn p-button-rounded p-button-outlined',
        }}
        cancelOptions={{
          icon: 'pi pi-fw pi-times',
          iconOnly: true,
          className:
            'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
        }}
      />
    </div>
  );
}

function HeaderTemplate(options: FileUploadHeaderTemplateOptions) {
  const { className, chooseButton, cancelButton } = options;
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'transparent',
        padding: '0.625rem',
        gap: '0.25rem',
      }}
    >
      {chooseButton}
      {cancelButton}
    </div>
  );
}

function ItemTemplate(inFile: object, props: ItemTemplateOptions) {
  const file = inFile as File;
  return (
    <div className="flex items-center p-0!">
      <div className="space-y-2 text-center">
        <img
          alt={file.name}
          role="presentation"
          src={URL.createObjectURL(file)}
          width={96}
          height={96}
          className="size-24 rounded object-contain"
        />
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
      </div>
      <span className="flex-column ml-3 flex text-left">{file.name}</span>
    </div>
  );
}

function EmptyTemplate() {
  return (
    <div className="flex flex-col items-center">
      <i
        className="pi pi-image mt-3 p-5"
        style={{
          fontSize: '3em',
          borderRadius: '50%',
          backgroundColor: 'var(--surface-b)',
          color: 'var(--surface-d)',
        }}
      ></i>
      <span>Drag and Drop Image Here</span>
    </div>
  );
}
