import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Card.css";

/* ─── Types ─── */
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 헤더 텍스트 (divider 포함 상단 영역) */
  header?: ReactNode;
  /** 헤더 우측 액션 영역 */
  headerActions?: ReactNode;
  /** 본문 제목 (body 내부, 18px medium) */
  title?: ReactNode;
  /** 푸터 (divider 포함 하단 영역) */
  footer?: ReactNode;
  /** 명시적 border 표시 */
  bordered?: boolean;
  /** 본문 콘텐츠 */
  children?: ReactNode;
}

/* ─── Sub-components for compound pattern ─── */
export function CardHeader({
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

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(s.body, className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(s.footer, className)}>{children}</div>;
}

/* ─── Main Component ─── */
export function Card({
  header,
  headerActions: headerActionsProp,
  title,
  footer,
  bordered = false,
  children,
  className,
  ...rest
}: CardProps) {
  return (
    <div className={cx(s.root({ bordered }), className)} {...rest}>
      {header != null && (
        <CardHeader actions={headerActionsProp}>{header}</CardHeader>
      )}

      <CardBody>
        {title != null && <div className={s.title}>{title}</div>}
        {children}
      </CardBody>

      {footer != null && <CardFooter>{footer}</CardFooter>}
    </div>
  );
}
