import type { ReactNode, HTMLAttributes, MouseEventHandler } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Breadcrumb.css";

/* ─── Types ─── */
export type BreadcrumbSize = "small" | "medium";

export interface BreadcrumbItem {
  /** 표시 텍스트 */
  label: string;
  /** 이동 링크 (마지막 항목에서는 무시) */
  href?: string;
  /** 클릭 핸들러 (라우터 연동 시 e.preventDefault() 사용) */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** 경로 항목 목록 — 마지막 항목이 현재 페이지 */
  items: BreadcrumbItem[];
  /** 구분자 (기본 "/") */
  separator?: ReactNode;
  /** 사이즈 */
  size?: BreadcrumbSize;
}

/**
 * **Breadcrumb**
 *
 * 현재 페이지까지의 경로를 보여주는 내비게이션.
 *
 * - `items`: 경로 항목 목록. 마지막 항목은 현재 페이지로 취급되어
 *   링크가 아닌 `aria-current="page"` 텍스트로 렌더링됩니다.
 * - `separator`: 구분자 커스텀 (기본 `/`)
 * - `size`: small(12px) / medium(14px)
 */
export function Breadcrumb({
  items,
  separator = "/",
  size = "medium",
  className,
  ...rest
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx(s.root({ size }), className)} {...rest}>
      <ol className={s.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={s.item}>
              {isLast ? (
                <span className={s.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a className={s.link} href={item.href} onClick={item.onClick}>
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className={s.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
