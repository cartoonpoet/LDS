import { useMemo } from "react";
import * as styles from "./Pagination.css";

export type PaginationChangeSource = "page" | "previous" | "next" | "first" | "last";

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  pageSize?: number;
  totalCount?: number;
  itemLabel?: string;
};

export type UsePaginationStateOptions = {
  pageIndex: number;
  pageSize: number;
  totalCount?: number;
  pageCount?: number;
  onPageIndexChange?: (pageIndex: number) => void;
};

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);

const getPages = (page: number, pageCount: number, siblingCount: number) => {
  const pages = new Set<number>([
    1,
    pageCount,
    ...range(page - siblingCount, page + siblingCount).filter(value => value >= 1 && value <= pageCount)
  ]);

  return Array.from(pages).sort((left, right) => left - right);
};

const clampPage = (page: number, pageCount: number) => Math.min(Math.max(page, 1), Math.max(pageCount, 1));

const getPageCount = ({ pageCount, pageSize, totalCount }: Pick<UsePaginationStateOptions, "pageCount" | "pageSize" | "totalCount">) => {
  if (pageCount !== undefined) {
    return Math.max(pageCount, 1);
  }

  if (totalCount !== undefined) {
    return Math.max(Math.ceil(totalCount / pageSize), 1);
  }

  return 1;
};

const arrow = {
  first: "«",
  previous: "‹",
  next: "›",
  last: "»"
} as const;

export function usePaginationState({ onPageIndexChange, pageCount, pageIndex, pageSize, totalCount }: UsePaginationStateOptions) {
  const resolvedPageCount = getPageCount({ pageCount, pageSize, totalCount });
  const page = clampPage(pageIndex + 1, resolvedPageCount);

  return {
    page,
    pageCount: resolvedPageCount,
    onPageChange: (nextPage: number) => onPageIndexChange?.(clampPage(nextPage, resolvedPageCount) - 1)
  };
}

export function Pagination({ itemLabel = "items", onPageChange, page, pageCount, pageSize, showFirstLast = true, siblingCount = 1, totalCount }: PaginationProps) {
  const currentPage = clampPage(page, pageCount);
  const pages = useMemo(() => getPages(currentPage, pageCount, siblingCount), [currentPage, pageCount, siblingCount]);

  return (
    <nav aria-label="Pagination" className={styles.root}>
      {totalCount !== undefined ? (
        <p className={styles.summary}>
          총 <span className={styles.totalCount}>{totalCount.toLocaleString()}</span> {itemLabel}
        </p>
      ) : <span />}
      <div className={styles.controls}>
        {showFirstLast ? (
          <button aria-label="처음" className={styles.pageButton({ kind: "icon" })} disabled={currentPage <= 1} onClick={() => onPageChange(1)} type="button">
            {arrow.first}
          </button>
        ) : null}
        <button aria-label="이전" className={styles.pageButton({ kind: "icon" })} disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} type="button">
          {arrow.previous}
        </button>
        <div className={styles.pageList}>
          {pages.map((pageNumber, index) => {
            const previousPage = pages[index - 1];
            const hasGap = previousPage !== undefined && pageNumber - previousPage > 1;

            return (
              <span className={styles.pageItem} key={pageNumber}>
                {hasGap ? <span className={styles.ellipsis}>…</span> : null}
                <button
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                  className={styles.pageButton({ active: currentPage === pageNumber, kind: "number" })}
                  onClick={() => onPageChange(pageNumber)}
                  type="button"
                >
                  {pageNumber}
                </button>
              </span>
            );
          })}
        </div>
        <button aria-label="다음" className={styles.pageButton({ kind: "icon" })} disabled={currentPage >= pageCount} onClick={() => onPageChange(currentPage + 1)} type="button">
          {arrow.next}
        </button>
        {showFirstLast ? (
          <button aria-label="마지막" className={styles.pageButton({ kind: "icon" })} disabled={currentPage >= pageCount} onClick={() => onPageChange(pageCount)} type="button">
            {arrow.last}
          </button>
        ) : null}
      </div>
    </nav>
  );
}
