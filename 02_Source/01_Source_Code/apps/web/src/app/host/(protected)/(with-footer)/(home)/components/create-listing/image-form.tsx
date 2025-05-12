"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import { FileMetadata, useFileUpload } from "@/hooks/use-file-upload";

import { StepDescription, StepHeader, StepHeading, StepSection } from "../step";

type Props = {
  defaultFiles?: FileMetadata[];
  onFilesChange: (files: FileMetadata[]) => void;
};

export function ImageForm({ defaultFiles, onFilesChange }: Props) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 8;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg",
    maxSize,
    multiple: true,
    maxFiles,
    initialFiles: defaultFiles || [],
  });

  useEffect(() => {
    onFilesChange(
      files.map((f) => ({
        id: f.id,
        name: f.file.name,
        size: f.file.size,
        type: f.file.type,
        url: f.preview || "",
      }))
    );
    console.log("Files changed:", files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <StepSection className="overflow-y-auto max-h-140 pe-2">
      <StepHeader>
        <StepHeading>Add some photos of your shepherd’s hut</StepHeading>
        <StepDescription>
          You&apos;ll need 5 photos to get started. You can add more or make
          changes later.
        </StepDescription>
      </StepHeader>

      <Stack orientation="vertical" className="gap-2 w-2xl mx-auto bg-gray-50">
        {/* Drop area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          data-files={files.length > 0 || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-64 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
          />
          {files.length > 0 ? (
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-medium">
                  Uploaded Files ({files.length})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openFileDialog}
                  disabled={files.length >= maxFiles}
                >
                  <UploadIcon
                    className="-ms-0.5 size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                  Add more
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-accent relative aspect-square rounded-md"
                  >
                    <Image
                      src={file.preview || ""}
                      alt={file.file.name}
                      width={80}
                      height={80}
                      priority
                      className="size-full rounded-[inherit] object-cover shadow-sm"
                    />
                    <Button
                      onClick={() => removeFile(file.id)}
                      variant={"secondary"}
                      size="icon"
                      className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                      aria-label="Remove image"
                    >
                      <XIcon className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Stack
              orientation="vertical"
              className="items-center justify-center px-4 py-3 text-center"
            >
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Drop your images here
              </p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG (max. {maxSizeMB}MB)
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={openFileDialog}
              >
                <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                Add photos
              </Button>
            </Stack>
          )}
        </div>

        {errors.length > 0 && (
          <div
            className="text-destructive flex items-center gap-1 text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}
      </Stack>
    </StepSection>
  );
}
