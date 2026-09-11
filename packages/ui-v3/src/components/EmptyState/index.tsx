import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./EmptyState.css";

/* ─── Types ─── */
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 상단 아이콘 (44px 내외 권장) */
  icon?: ReactNode;
  /** 제목 */
  title: ReactNode;
  /** 보조 설명 */
  description?: ReactNode;
  /** 하단 액션 (Button 등) */
  action?: ReactNode;
}

/* ─── Component ─── */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div className={cx(s.root, className)} {...rest}>
      {icon ? <div aria-hidden="true" className={s.icon}>{icon}</div> : null}
      <div className={s.title}>{title}</div>
      {description ? <div className={s.description}>{description}</div> : null}
      {action ? <div className={s.action}>{action}</div> : null}
    </div>
  );
}
