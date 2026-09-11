import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Callout.css";

/* ─── Types ─── */
export type CalloutIntent = "info" | "success" | "warning" | "danger";

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 의도 색 (기본 info) */
  intent?: CalloutIntent;
  /** 굵은 제목 줄 (선택) */
  title?: ReactNode;
  /** 아이콘 교체 — 기본은 intent별 글리프 */
  icon?: ReactNode;
  /** 아이콘 숨김 */
  hideIcon?: boolean;
  /** 본문 */
  children?: ReactNode;
}

/* ─── Default icons ─── */
const InfoGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 11v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const SuccessGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="m8.5 12 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertGlyph = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 8v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

const defaultIconMap: Record<CalloutIntent, ReactNode> = {
  info: InfoGlyph,
  success: SuccessGlyph,
  warning: AlertGlyph,
  danger: AlertGlyph,
};

/* ─── Component ─── */
export function Callout({
  intent = "info",
  title,
  icon,
  hideIcon = false,
  className,
  children,
  ...rest
}: CalloutProps) {
  return (
    <div role="note" className={cx(s.root({ intent }), className)} {...rest}>
      {hideIcon ? null : (
        <span aria-hidden="true" className={s.icon({ intent })} data-callout-icon>
          {icon ?? defaultIconMap[intent]}
        </span>
      )}
      <div className={s.body}>
        {title ? <div className={s.title}>{title}</div> : null}
        {children}
      </div>
    </div>
  );
}
