import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./InfoPopover.css";

export interface InfoPopoverStep {
  /** 스텝 아이콘 (ReactNode) */
  icon?: ReactNode;
  /** 스텝 라벨 */
  label: string;
}

export interface InfoPopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 요약 헤더 텍스트 (예: "법무검토 중 외 3개") */
  title: string;
  /** 프로세스 스텝 목록 */
  steps: InfoPopoverStep[];
  /** 열림 상태 (제어 모드) */
  open?: boolean;
  /** 열림/닫힘 핸들러 */
  onOpenChange?: (open: boolean) => void;
  /** 트리거 요소 */
  children: ReactNode;
}

/* ─── Chevron Right Icon ─── */
const ChevronRight = () => (
  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * **InfoPopover**
 *
 * 프로세스 진행 상태를 스텝으로 보여주는 정보 팝오버.
 * 다크 헤더바에 요약 텍스트, 본문에 아이콘+라벨 스텝이 화살표로 연결됩니다.
 *
 * ```tsx
 * <InfoPopover
 *   title="법무검토 중 외 3개"
 *   steps={[
 *     { label: "법무 검토 중", icon: <SomeIcon /> },
 *     { label: "요청자 검토 중", icon: <SomeIcon /> },
 *   ]}
 * >
 *   <span>법무검토 중 외 3개</span>
 * </InfoPopover>
 * ```
 */
export function InfoPopover({
  title,
  steps,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
  ...rest
}: InfoPopoverProps) {
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
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)} {...rest}>
      <div onClick={toggle} style={{ cursor: "pointer" }}>
        {children}
      </div>
      {open && (
        <div className={s.card}>
          <div className={s.header}>
            <span className={s.headerText}>{title}</span>
          </div>
          <div className={s.body}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div className={s.step}>
                  {step.icon && <div className={s.stepIcon}>{step.icon}</div>}
                  <span className={s.stepLabel}>{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={s.stepArrow}>
                    <ChevronRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
