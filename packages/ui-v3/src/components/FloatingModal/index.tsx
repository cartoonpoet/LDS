import { useEffect, useState } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Portal } from "../../lib/Portal";
import { ModalBody, ModalFooter } from "../Modal";
import * as modal from "../Modal/Modal.css";
import * as s from "./FloatingModal.css";

/* ─── Types ─── */
export type FloatingModalPosition = "bottom-right" | "bottom-left";

export interface FloatingModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 표시 여부 */
  open: boolean;
  /** 닫기 핸들러 (close 버튼) */
  onClose: () => void;
  /** 헤더 타이틀 */
  title?: ReactNode;
  /** 푸터 콘텐츠 */
  footer?: ReactNode;
  /** 고정 위치 */
  position?: FloatingModalPosition;
  /** 최소화(접기) 토글 버튼 표시 */
  collapsible?: boolean;
  /** Escape 키 닫기 (비차단 특성상 기본 off) */
  closeOnEscape?: boolean;
  /** 본문 */
  children?: ReactNode;
}

/* ─── Icons (inline SVG) ─── */
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 2 12M2 2l10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m3 5.5 4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m3 8.5 4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * **FloatingModal**
 *
 * 화면 우하단(기본)에 고정으로 떠 있는 비차단 모달.
 * backdrop이 없어 페이지를 계속 조작할 수 있습니다. (예: 업로드 진행, 미니 플레이어)
 *
 * - `position`: bottom-right(기본) / bottom-left
 * - `collapsible`: 헤더의 접기/펼치기 토글
 * - `closeOnEscape`: Escape 닫기 (기본 off — 비차단 특성)
 */
export function FloatingModal({
  open,
  onClose,
  title,
  footer,
  position = "bottom-right",
  collapsible = false,
  closeOnEscape = false,
  children,
  className,
  ...rest
}: FloatingModalProps) {
  const [collapsed, setCollapsed] = useState(false);

  /* Escape key (opt-in) */
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div
        role="dialog"
        aria-label={typeof title === "string" ? title : undefined}
        className={cx(s.card({ position }), className)}
        {...rest}
      >
        <div className={modal.header}>
          <div className={modal.headerTitle}>{title}</div>
          <div className={modal.headerActions}>
            {collapsible && (
              <button
                type="button"
                className={modal.closeButton}
                onClick={() => setCollapsed((prev) => !prev)}
                aria-label={collapsed ? "펼치기" : "접기"}
              >
                {collapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            )}
            <button
              type="button"
              className={modal.closeButton}
              onClick={onClose}
              aria-label="닫기"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {!collapsed && <ModalBody>{children}</ModalBody>}
        {!collapsed && footer != null && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </Portal>
  );
}
