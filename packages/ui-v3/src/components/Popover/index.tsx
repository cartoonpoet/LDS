import { useRef, useCallback } from "react";
import type { ReactNode, HTMLAttributes, MouseEvent } from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../lib/useControllableState";
import { useDismissibleLayer } from "../../lib/useDismissibleLayer";
import * as s from "./Popover.css";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "content"> {
  /** 헤더 제목 (파란 바) */
  title?: ReactNode;
  /** 본문 콘텐츠 (간편 API — 텍스트) */
  content?: ReactNode;
  /** 화살표 방향 */
  placement?: PopoverPlacement;
  /** 열림 상태 (제어 모드) */
  open?: boolean;
  /** 열림/닫힘 핸들러 (제어 모드) */
  onOpenChange?: (open: boolean) => void;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 확인 클릭 핸들러 */
  onConfirm?: () => void;
  /** 취소 클릭 핸들러 */
  onCancel?: () => void;
  /** 커스텀 바디 (compound 패턴) */
  children: ReactNode;
  /** 팝오버 바디에 렌더링할 커스텀 콘텐츠 (compound) */
  popoverBody?: ReactNode;
}

/**
 * **Popover**
 *
 * 클릭 시 나타나는 팝오버.
 * 파란색 헤더 바 + 본문 + 버튼 구성.
 *
 * - `placement`: top / bottom / left / right
 * - `title`: 헤더 제목
 * - `content`: 본문 텍스트 (간편 API)
 * - `popoverBody`: 커스텀 본문 (compound)
 * - `confirmText` / `cancelText`: 버튼 텍스트
 */
export function Popover({
  title,
  content,
  placement = "bottom",
  open: controlledOpen,
  onOpenChange,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  children,
  popoverBody,
  className,
  ...rest
}: PopoverProps) {
  const [open, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: false,
    onChange: onOpenChange,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  const handleConfirm = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onConfirm?.();
      setOpen(false);
    },
    [onConfirm, setOpen],
  );

  const handleCancel = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onCancel?.();
      setOpen(false);
    },
    [onCancel, setOpen],
  );

  /* 외부 클릭 + Escape 키 닫기 */
  useDismissibleLayer({
    enabled: open,
    ref: wrapperRef,
    onDismiss: () => setOpen(false),
  });

  const hasFooter = confirmText || cancelText;

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)} {...rest}>
      <div onClick={toggle} style={{ cursor: "pointer" }}>
        {children}
      </div>
      {open && (
        <div className={s.popover({ placement })}>
          <div className={s.card}>
            {title && (
              <div className={s.header}>
                <span className={s.headerTitle}>{title}</span>
              </div>
            )}
            <div className={s.body}>
              {popoverBody ?? <div className={s.bodyText}>{content}</div>}
            </div>
            {hasFooter && (
              <div className={s.footer}>
                {cancelText && (
                  <button type="button" className={s.outlineBtn} onClick={handleCancel}>
                    {cancelText}
                  </button>
                )}
                {confirmText && (
                  <button type="button" className={s.primaryBtn} onClick={handleConfirm}>
                    {confirmText}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={s.arrow({ placement })} />
        </div>
      )}
    </div>
  );
}
