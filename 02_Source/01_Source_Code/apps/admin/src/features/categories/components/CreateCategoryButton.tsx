import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

import { CreateCategoryForm } from './CreateCategoryForm';

export function CreateCategoryButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleHideDialog = () => {
    if (!isVisible) return;
    setIsVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'n') setIsVisible(true);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Button
        icon="pi pi-plus"
        label="Create new"
        size="small"
        outlined
        onClick={() => setIsVisible((prev) => !prev)}
      />
      <Dialog
        visible={isVisible}
        style={{ width: '512px' }}
        header="Create new category"
        footer={
          <DialogFooter
            onCancel={handleHideDialog}
            onCreate={handleHideDialog}
          />
        }
        onHide={handleHideDialog}
      >
        <CreateCategoryForm />
      </Dialog>
    </>
  );
}

type DialogFooterProps = {
  onCancel: () => void;
  onCreate: () => void;
};

function DialogFooter({ onCancel, onCreate }: DialogFooterProps) {
  return (
    <footer>
      <Button icon="pi pi-times" label="Cancel" outlined onClick={onCancel} />
      <Button icon="pi pi-plus" label="Create" onClick={onCreate} />
    </footer>
  );
}
