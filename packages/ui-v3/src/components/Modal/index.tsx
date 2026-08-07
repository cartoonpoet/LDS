import { useRef } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Portal } from "../../lib/Portal";
import { useDismissibleLayer } from "../../lib/useDismissibleLayer";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { useScrollLock } from "../../lib/useScrollLock";
import * as s from "./Modal.css";

/* ─── Types ─── */
export type ModalSize = "small" | "medium" | "large" | "xlarge";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 모달 표시 여부 */
  open: boolean;
  /** 닫기 핸들러 (Escape, backdrop 클릭, close 버튼) */
  onClose: () => void;
  /** 모달 너비 프리셋 */
  size?: ModalSize;
  /** 헤더 타이틀 (간편 API) */
  title?: ReactNode;
  /** 푸터 콘텐츠 (간편 API) */
  footer?: ReactNode;
  /** backdrop 클릭 닫기 비활성 */
  disableBackdropClose?: boolean;
  /** Escape 키 닫기 비활성 */
  disableEscapeClose?: boolean;
  /** 모달 본문 */
  children?: ReactNode;
}

/* ─── Close Icon (inline SVG) ─── */
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 2 12M2 2l10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* ─── Sub-components (compound pattern) ─── */
export function ModalHeader({
  children,
  actions,
  className,
}: {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx(s.header, className)}>
      <div className={s.headerTitle}>{children}</div>
      {actions && <div className={s.headerActions}>{actions}</div>}
    </div>
  );
}

export function ModalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(s.body, className)}>{children}</div>;
}

export function ModalFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(s.footer, className)}>{children}</div>;
}

/* ─── Main Component ─── */
export function Modal({
  open,
  onClose,
  size = "medium",
  title,
  footer,
  disableBackdropClose = false,
  disableEscapeClose = false,
  children,
  className,
  ...rest
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Escape key */
  useDismissibleLayer({
    enabled: open,
    onDismiss: onClose,
    closeOnEscape: !disableEscapeClose,
    closeOnOutsideClick: false,
    stopEscapePropagation: true,
  });

  /* Body scroll lock */
  useScrollLock(open);

  /* Focus trap */
  useFocusTrap(dialogRef, open);

  if (!open) return null;

  return (
    <Portal>
      <div
        className={s.overlay}
        onClick={
          disableBackdropClose
            ? undefined
            : (e) => {
                if (e.target === e.currentTarget) onClose();
              }
        }
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          className={cx(s.card({ size }), className)}
          {...rest}
        >
          {/* 간편 API: title prop이 있으면 자동 Header 생성 */}
          {title != null && (
            <div className={s.header}>
              <div className={s.headerTitle}>{title}</div>
              <button
                type="button"
                className={s.closeButton}
                onClick={onClose}
                aria-label="닫기"
              >
                <CloseIcon />
              </button>
            </div>
          )}

          {/* 간편 API: title이 있으면 children을 Body로 감쌈 */}
          {title != null ? <ModalBody>{children}</ModalBody> : children}

          {/* 간편 API: footer prop이 있으면 자동 Footer 생성 */}
          {footer != null && <ModalFooter>{footer}</ModalFooter>}
        </div>
      </div>
    </Portal>
  );
}
