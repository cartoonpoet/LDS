import { useState, useCallback, type ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Collapse.css";

/* ─── Types ─── */
export type CollapseVariant = "default" | "shadow" | "border" | "margin";

export interface CollapseProps {
  /** 스타일 변형 */
  variant?: CollapseVariant;
  /** 헤더 텍스트 */
  header: ReactNode;
  /** 우측 액션 아이콘 */
  action?: ReactNode;
  /** chevron 위치 */
  togglePosition?: "left" | "right";
  /** 펼침 상태 (controlled) */
  expanded?: boolean;
  /** 초기 펼침 상태 (uncontrolled) */
  defaultExpanded?: boolean;
  /** 토글 핸들러 */
  onToggle?: (expanded: boolean) => void;
  /** 콘텐츠 */
  children?: ReactNode;
  /** 추가 className */
  className?: string;
}

/* ─── Chevron Icon ─── */
const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 6.75 9 11.25l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Collapse Item ─── */
export function Collapse({
  variant = "default",
  header,
  action,
  togglePosition = "left",
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  children,
  className,
}: CollapseProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const toggle = useCallback(() => {
    const next = !expanded;
    if (!isControlled) setInternalExpanded(next);
    onToggle?.(next);
  }, [expanded, isControlled, onToggle]);

  return (
    <div className={cx(s.root({ variant, expanded }), className)}>
      <button
        type="button"
        className={s.header({ variant })}
        aria-expanded={expanded}
        onClick={toggle}
      >
        {togglePosition !== "right" && <span className={s.chevron({ expanded })}><ChevronIcon /></span>}
        <span className={s.headerText}>{header}</span>
        {action && <span className={s.headerAction}>{action}</span>}
        {togglePosition === "right" && <span className={s.chevron({ expanded })}><ChevronIcon /></span>}
      </button>

      <div className={s.content({ expanded })}>
        <div className={s.contentInner({ variant })}>
          <div className={s.contentBody}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── CollapseGroup (accordion) ─── */
export interface CollapseGroupProps {
  /** 스타일 변형 (자식에게 전파) */
  variant?: CollapseVariant;
  /** 단일 패널만 열기 (accordion 모드) */
  accordion?: boolean;
  /** children (Collapse 컴포넌트들) */
  children?: ReactNode;
  /** 추가 className */
  className?: string;
}

export function CollapseGroup({
  variant = "default",
  children,
  className,
}: CollapseGroupProps) {
  return (
    <div className={cx(s.group({ variant }), className)}>
      {children}
    </div>
  );
}
