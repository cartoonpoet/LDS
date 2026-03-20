import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode, HTMLAttributes, MouseEvent } from "react";
import { cx } from "../../lib/cx";
import * as s from "./CalendarPopover.css";

export type CalendarPopoverPlacement = "top" | "bottom" | "left" | "right";

export interface CalendarPopoverField {
  /** 라벨 (예: "관리번호", "요청자") */
  label: string;
  /** 값 (텍스트 또는 ReactNode) */
  value: ReactNode;
}

export interface CalendarPopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 카테고리 뱃지 (예: "계약검토", "기일") */
  badge?: string;
  /** 제목 */
  title: string;
  /** 뱃지 행 (ReactNode — Badge 컴포넌트 조합) */
  badges?: ReactNode;
  /** 상세 정보 행 (ReactNode — 자유 구성) */
  details?: ReactNode;
  /** key-value 필드 목록 */
  fields?: CalendarPopoverField[];
  /** 화살표 위치 */
  placement?: CalendarPopoverPlacement;
  /** 열림 상태 (제어 모드) */
  open?: boolean;
  /** 열림/닫힘 핸들러 */
  onOpenChange?: (open: boolean) => void;
  /** 닫기 핸들러 */
  onClose?: () => void;
  /** 주요 버튼 텍스트 */
  primaryText?: string;
  /** 보조 버튼 텍스트 */
  secondaryText?: string;
  /** 주요 버튼 클릭 */
  onPrimary?: () => void;
  /** 보조 버튼 클릭 */
  onSecondary?: () => void;
  /** 트리거 요소 */
  children: ReactNode;
}

/* ─── Close Icon ─── */
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 1 1 11M1 1l10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/**
 * **CalendarPopover**
 *
 * 캘린더 일정 상세를 보여주는 카드형 팝오버.
 * Badge, key-value 필드, 버튼으로 구성됩니다.
 *
 * ```tsx
 * <CalendarPopover
 *   badge="계약검토"
 *   title="법무시스템 공급 계약"
 *   fields={[
 *     { label: "관리번호", value: "C20221108-0001" },
 *     { label: "요청자", value: "박영업" },
 *   ]}
 *   primaryText="일정 수정"
 *   secondaryText="사건 바로가기"
 *   placement="right"
 * >
 *   <div>6/19</div>
 * </CalendarPopover>
 * ```
 */
export function CalendarPopover({
  badge,
  title,
  badges,
  details,
  fields,
  placement = "right",
  open: controlledOpen,
  onOpenChange,
  onClose,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
  children,
  className,
  ...rest
}: CalendarPopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  const handleClose = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onClose?.();
      setOpen(false);
    },
    [onClose, setOpen],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose, setOpen]);

  const hasFooter = primaryText || secondaryText;

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)} {...rest}>
      <div onClick={toggle} style={{ cursor: "pointer" }}>
        {children}
      </div>
      {open && (
        <div className={s.container({ placement })}>
          <div className={s.card}>
            {/* Header */}
            <div className={s.header}>
              <div className={s.headerContent}>
                {badge && <span className={s.headerBadge}>{badge}</span>}
                <div className={s.headerTitle}>{title}</div>
              </div>
              <button type="button" className={s.closeBtn} onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>

            <div className={s.divider} />

            {/* Badges row */}
            {badges && (
              <>
                <div className={s.badgesRow}>{badges}</div>
                <div className={s.divider} />
              </>
            )}

            {/* Details (free-form) */}
            {details && (
              <>
                {details}
                <div className={s.divider} />
              </>
            )}

            {/* Fields (key-value list) */}
            {fields && fields.length > 0 && (
              <>
                <div className={s.listGroup}>
                  {fields.map((field, i) => (
                    <div key={i} className={s.listItem}>
                      <span className={s.listLabel}>{field.label}</span>
                      <span className={s.listValue}>{field.value}</span>
                    </div>
                  ))}
                </div>
                <div className={s.divider} />
              </>
            )}

            {/* Footer */}
            {hasFooter && (
              <div className={s.footer}>
                {secondaryText && (
                  <button type="button" className={s.outlineBtn} onClick={onSecondary}>
                    {secondaryText}
                  </button>
                )}
                {primaryText && (
                  <button type="button" className={s.primaryBtn} onClick={onPrimary}>
                    {primaryText}
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
