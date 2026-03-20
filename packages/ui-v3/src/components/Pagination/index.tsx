import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Pagination.css";

/* ─── Types ─── */
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** 현재 페이지 (1-based) */
  page: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 표시할 페이지 번호 수 */
  visiblePages?: number;
  /** 전체 건수 (설정 시 "총 N건" 표시) */
  totalCount?: number;
}

/* ─── Icons ─── */
const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12 6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Page range calculation ─── */
function getPageRange(page: number, totalPages: number, visible: number): number[] {
  const half = Math.floor(visible / 2);
  let start = Math.max(1, page - half);
  let end = start + visible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visible + 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}

/* ─── TotalCount sub-component ─── */
export function PaginationCount({
  totalCount,
  className,
}: {
  totalCount: number;
  className?: string;
}) {
  return (
    <span className={cx(s.totalCount, className)}>
      총
      <span className={s.totalCountNumber}>
        {totalCount.toLocaleString()}
      </span>
      건
    </span>
  );
}

/* ─── Main Component ─── */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  visiblePages = 7,
  totalCount,
  className,
  ...rest
}: PaginationProps) {
  const pages = getPageRange(page, totalPages, visiblePages);

  return (
    <nav
      aria-label="페이지 네비게이션"
      className={cx(s.root, className)}
      {...rest}
    >
      {/* Prev arrow */}
      <button
        type="button"
        className={s.arrowButton}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon />
      </button>

      {/* Page numbers track */}
      <div className={s.numbersTrack}>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={s.pageButton({ active: p === page })}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next arrow */}
      <button
        type="button"
        className={s.arrowButton}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="다음 페이지"
      >
        <ChevronRightIcon />
      </button>

      {/* Total count */}
      {totalCount != null && (
        <PaginationCount totalCount={totalCount} />
      )}
    </nav>
  );
}
