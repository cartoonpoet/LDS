import { useCallback, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode, DragEvent } from "react";
import { cx } from "../../lib/cx";
import * as s from "./FileUpload.css";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export type ThumbnailLayout = "horizontal" | "vertical";
export type ThumbnailSize = "large" | "medium" | "small";

/* ═══════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════ */

function AiSparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1L10.5 6L15.5 7.5L10.5 9L9 14L7.5 9L2.5 7.5L7.5 6L9 1Z"
        fill="currentColor"
      />
      <path
        d="M14 11L14.75 13L16.5 13.75L14.75 14.5L14 16.5L13.25 14.5L11.5 13.75L13.25 13L14 11Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 1H3.5C3.10218 1 2.72064 1.15804 2.43934 1.43934C2.15804 1.72064 2 2.10218 2 2.5V11.5C2 11.8978 2.15804 12.2794 2.43934 12.5607C2.72064 12.842 3.10218 13 3.5 13H10.5C10.8978 13 11.2794 12.842 11.5607 12.5607C11.842 12.2794 12 11.8978 12 11.5V5L8 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 1V5H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileDocIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="2" width="14" height="16" rx="2" fill="#F1F4F9" stroke="#CFD5E1" strokeWidth="0.8" />
      <path d="M6 6H14" stroke="#9EA7B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 9H14" stroke="#9EA7B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 12H10" stroke="#9EA7B8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.07 6.47L7.01 11.53C6.38 12.16 5.53 12.51 4.64 12.51C3.75 12.51 2.9 12.16 2.27 11.53C1.64 10.9 1.29 10.05 1.29 9.16C1.29 8.27 1.64 7.42 2.27 6.79L7.33 1.73C7.75 1.31 8.32 1.07 8.91 1.07C9.5 1.07 10.07 1.31 10.49 1.73C10.91 2.15 11.15 2.72 11.15 3.31C11.15 3.9 10.91 4.47 10.49 4.89L5.42 9.95C5.21 10.16 4.93 10.28 4.63 10.28C4.34 10.28 4.05 10.16 3.84 9.95C3.63 9.74 3.51 9.46 3.51 9.16C3.51 8.87 3.63 8.58 3.84 8.37L8.58 3.64"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.08334 5.83334L7 8.75001L9.91667 5.83334" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 8.75V1.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.75 1.75H12.25V5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.25 12.25H1.75V8.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.25 1.75L8.16666 5.83333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.75 12.25L5.83333 8.16666" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   FileUploadArea
   ═══════════════════════════════════════════ */

export type FileUploadAreaVariant = "ai" | "basic";

export interface FileUploadAreaProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 파일 추가 콜백 */
  onFilesAdded?: (files: File[]) => void;
  /** 설명 텍스트 */
  description?: string;
  /** accept (input file) */
  accept?: string;
  /** 추가 버튼 영역 */
  extra?: ReactNode;
  /**
   * 시각 변형.
   * - `ai`(기본): 그래디언트 보더 + 'AI 파일 분석' 헤더 (중앙 정렬)
   * - `basic`: 점선 박스 + 버튼 상단 · 좌측 설명
   */
  variant?: FileUploadAreaVariant;
  /** 첨부 파일 목록 (children) */
  children?: ReactNode;
}

/**
 * **FileUploadArea**
 *
 * 드래그 앤 드롭 파일 업로드 영역.
 *
 * - `variant="ai"`(기본): 그래디언트 보더 + AI 아이콘 + 설명, 버튼 하단 중앙
 * - `variant="basic"`: 점선 박스 + 회색 배경, '파일 첨부' 버튼 상단 · 좌측 정렬 설명
 * - children으로 첨부된 파일 목록 렌더링
 *
 * ```tsx
 * <FileUploadArea variant="basic" onFilesAdded={handleFiles} description="파일을 드래그하세요">
 *   {files.map(f => <FileItem key={f.name} filename={f.name} fileMeta="DOCX · 1.2MB" />)}
 * </FileUploadArea>
 * ```
 */
export function FileUploadArea({
  onFilesAdded,
  description = "파일을 이 영역에 드래그하거나 '파일 첨부' 버튼을 클릭하여 업로드하세요.",
  accept,
  extra,
  variant = "ai",
  children,
  className,
  ...rest
}: FileUploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onFilesAdded?.(files);
    },
    [onFilesAdded],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length > 0) onFilesAdded?.(files);
      e.target.value = "";
    },
    [onFilesAdded],
  );

  const openPicker = () => inputRef.current?.click();
  const dragProps = {
    style: isDragging ? { opacity: 0.85 } : undefined,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  };
  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple
      onChange={handleFileInput}
      style={{ display: "none" }}
    />
  );

  if (variant === "basic") {
    return (
      <div className={cx(s.uploadBasicArea, className)} {...dragProps} {...rest}>
        <div className={s.uploadButtons}>
          <button type="button" className={s.attachButton} onClick={openPicker}>
            <FileIcon />
            파일 첨부
          </button>
          {extra}
        </div>
        <span className={s.uploadBasicDescription}>{description}</span>
        {children && <div className={s.uploadBasicList}>{children}</div>}
        {hiddenInput}
      </div>
    );
  }

  return (
    <div className={cx(s.uploadAreaOuter, className)} {...dragProps} {...rest}>
      <div className={s.uploadAreaInner}>
        <div className={s.uploadTextGroup}>
          <span className={s.uploadTitle}>
            <AiSparkleIcon />
            AI 파일 분석
          </span>
          <span className={s.uploadDescription}>{description}</span>
        </div>

        {children && <div className={s.attachedList}>{children}</div>}

        <div className={s.uploadButtons}>
          <button type="button" className={s.attachButton} onClick={openPicker}>
            <FileIcon />
            파일 첨부
          </button>
          {extra}
        </div>

        {hiddenInput}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FileThumbnail
   ═══════════════════════════════════════════ */

export interface FileThumbnailProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** 이미지 src */
  src: string;
  /** 파일명 */
  filename?: string;
  /** 레이아웃 */
  layout?: ThumbnailLayout;
  /** 사이즈 */
  size?: ThumbnailSize;
  /** 다운로드 콜백 */
  onDownload?: () => void;
  /** 확대/삭제 콜백 */
  onExpand?: () => void;
}

/**
 * **FileThumbnail**
 *
 * 이미지 썸네일 미리보기 카드.
 *
 * - horizontal / vertical 레이아웃
 * - large / medium / small 사이즈
 * - 호버 시 오버레이 + 액션 아이콘
 *
 * ```tsx
 * <FileThumbnail src="/img.jpg" filename="photo.jpg" size="large" />
 * ```
 */
export function FileThumbnail({
  src,
  filename,
  layout = "horizontal",
  size = "medium",
  onDownload,
  onExpand,
  className,
  ...rest
}: FileThumbnailProps) {
  return (
    <div className={cx(s.thumbnail({ layout, size }), className)} {...rest}>
      <img src={src} alt={filename ?? ""} className={s.thumbnailImg} />
      <div className={s.thumbnailOverlay}>
        <div className={s.thumbnailActions}>
          {onDownload && (
            <button
              type="button"
              className={s.thumbnailActionBtn}
              onClick={onDownload}
              aria-label="다운로드"
            >
              <DownloadIcon />
            </button>
          )}
          {onExpand && (
            <button
              type="button"
              className={s.thumbnailActionBtn}
              onClick={onExpand}
              aria-label="확대"
            >
              <ExpandIcon />
            </button>
          )}
        </div>
        {filename && <span className={s.thumbnailFilename}>{filename}</span>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FileItem
   ═══════════════════════════════════════════ */

export interface FileItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** 파일명 */
  filename: string;
  /** 파일 크기 / 설명 */
  fileMeta?: string;
  /** 선택(active) 상태 */
  active?: boolean;
  /** 삭제 콜백 */
  onDelete?: () => void;
  /** 커스텀 아이콘 */
  icon?: ReactNode;
}

/**
 * **FileItem**
 *
 * 파일 목록 항목. 아이콘 + 파일명 + 메타 + 삭제 버튼.
 *
 * ```tsx
 * <FileItem filename="document.docx" fileMeta="2.4 MB" onDelete={handleDelete} />
 * ```
 */
export function FileItem({
  filename,
  fileMeta,
  active = false,
  onDelete,
  icon,
  className,
  ...rest
}: FileItemProps) {
  return (
    <div className={cx(s.fileItem({ active }), className)} {...rest}>
      <div className={s.fileItemLeft}>
        <div className={s.fileIconBox}>{icon ?? <FileDocIcon />}</div>
        <div className={s.fileInfo}>
          <span className={s.fileName}>{filename}</span>
          {fileMeta && <span className={s.fileMeta}>{fileMeta}</span>}
        </div>
      </div>
      {onDelete && (
        <button
          type="button"
          className={s.fileDeleteBtn}
          onClick={onDelete}
          aria-label="삭제"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   FileAttachBadge
   ═══════════════════════════════════════════ */

export interface FileAttachBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 파일명 */
  filename: string;
  /** 제거 콜백 */
  onRemove?: () => void;
}

/**
 * **FileAttachBadge**
 *
 * 첨부 파일 인라인 배지 (📎 파일명 ✕).
 *
 * ```tsx
 * <FileAttachBadge filename="report.pdf" onRemove={() => {}} />
 * ```
 */
export function FileAttachBadge({
  filename,
  onRemove,
  className,
  ...rest
}: FileAttachBadgeProps) {
  return (
    <span className={cx(s.badge, className)} {...rest}>
      <span className={s.badgeIcon}>
        <PaperclipIcon />
      </span>
      {filename}
      {onRemove && (
        <button
          type="button"
          className={s.badgeRemoveBtn}
          onClick={onRemove}
          aria-label="제거"
        >
          <CloseIcon size={10} />
        </button>
      )}
    </span>
  );
}
