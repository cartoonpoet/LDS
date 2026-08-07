import { useRef } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Portal } from "../../lib/Portal";
import { useDismissibleLayer } from "../../lib/useDismissibleLayer";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { useScrollLock } from "../../lib/useScrollLock";
import { ModalBody, ModalFooter } from "../Modal";
import * as modal from "../Modal/Modal.css";
import * as s from "./FullScreenModal.css";

/* ─── Types ─── */
export interface FullScreenModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 모달 표시 여부 */
  open: boolean;
  /** 닫기 핸들러 (Escape, close 버튼) */
  onClose: () => void;
  /** 헤더 타이틀 */
  title?: ReactNode;
  /** 푸터 콘텐츠 */
  footer?: ReactNode;
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

/**
 * **FullScreenModal**
 *
 * 뷰포트 전체를 덮는 모달. Modal과 같은 `open`/`onClose` API를 사용하며,
 * 상단 고정 헤더(타이틀 + 닫기) + 스크롤 바디 + 하단 푸터로 구성됩니다.
 * backdrop 없이 전체가 표면입니다.
 */
export function FullScreenModal({
  open,
  onClose,
  title,
  footer,
  disableEscapeClose = false,
  children,
  className,
  ...rest
}: FullScreenModalProps) {
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={cx(s.surface, className)}
        {...rest}
      >
        <div className={modal.header}>
          <div className={modal.headerTitle}>{title}</div>
          <button
            type="button"
            className={modal.closeButton}
            onClick={onClose}
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        <ModalBody>{children}</ModalBody>

        {footer != null && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </Portal>
  );
}
