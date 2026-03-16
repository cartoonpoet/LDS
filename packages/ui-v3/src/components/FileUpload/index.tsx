import { useId, useRef, useState } from "react";
import type { DragEvent, InputHTMLAttributes } from "react";
import { Button } from "../Button";
import * as styles from "./FileUpload.css";

export type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type?: string;
  file?: File;
};

export type FileUploadProps = {
  label?: string;
  helperText?: string;
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  multiple?: boolean;
  value?: UploadedFile[];
  defaultValue?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  onRemove?: (file: UploadedFile) => void;
};

const formatSize = (size: number) => {
  if (size < 1024) return `${size}B`;
  if (size < 1024 * 1024) return `${Math.round(size / 102.4) / 10}KB`;
  return `${Math.round(size / 1024 / 102.4) / 10}MB`;
};

const mapFiles = (files: FileList | File[]) => Array.from(files).map(file => ({ id: `${file.name}-${file.size}-${file.lastModified}`, name: file.name, size: file.size, type: file.type, file }));

export function FileUpload({ accept, defaultValue = [], helperText = "파일을 드래그하거나 버튼으로 선택하세요.", label = "파일 업로드", multiple = true, onChange, onRemove, value }: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>(defaultValue);
  const files = value ?? internalFiles;

  const commit = (nextFiles: UploadedFile[]) => {
    if (value === undefined) {
      setInternalFiles(nextFiles);
    }
    onChange?.(nextFiles);
  };

  const appendFiles = (incoming: UploadedFile[]) => {
    commit(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files?.length) {
      appendFiles(mapFiles(event.dataTransfer.files));
    }
  };

  return (
    <div className={styles.root}>
      <label
        className={styles.dropzone({ dragging })}
        htmlFor={inputId}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDragOver={event => event.preventDefault()}
        onDrop={handleDrop}
      >
        <span className={styles.title}>{label}</span>
        <span className={styles.helper}>{helperText}</span>
        <Button onClick={() => inputRef.current?.click()} size="sm" type="button" variant="outline">파일 선택</Button>
        <input
          accept={accept}
          className={styles.hiddenInput}
          id={inputId}
          multiple={multiple}
          onChange={event => {
            if (event.target.files?.length) {
              appendFiles(mapFiles(event.target.files));
            }
          }}
          ref={inputRef}
          type="file"
        />
      </label>

      {files.length > 0 ? (
        <div className={styles.fileList}>
          {files.map(file => (
            <div className={styles.fileItem} key={file.id}>
              <div className={styles.fileMeta}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{formatSize(file.size)}</span>
              </div>
              <Button
                onClick={() => {
                  const nextFiles = files.filter(item => item.id !== file.id);
                  commit(nextFiles);
                  onRemove?.(file);
                }}
                size="sm"
                type="button"
                variant="outline"
              >
                삭제
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default FileUpload;
