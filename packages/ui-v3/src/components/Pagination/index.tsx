import * as styles from './Pagination.css';

export type PaginationProps = { page: number; pageCount: number; onPageChange: (page: number) => void; siblingCount?: number; showFirstLast?: boolean; };

const range = (start: number, end: number) => Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);

const getPages = (page: number, pageCount: number, siblingCount: number) => {
  const pages = new Set<number>([1, pageCount, ...range(page - siblingCount, page + siblingCount).filter(value => value >= 1 && value <= pageCount)]);
  return Array.from(pages).sort((left, right) => left - right);
};

export function Pagination({ onPageChange, page, pageCount, showFirstLast = true, siblingCount = 1 }: PaginationProps) {
  const pages = getPages(page, pageCount, siblingCount);
  return (
    <nav aria-label="Pagination" className={styles.root}>
      {showFirstLast ? <button className={styles.pageButton()} disabled={page <= 1} onClick={() => onPageChange(1)} type="button">처음</button> : null}
      <button className={styles.pageButton()} disabled={page <= 1} onClick={() => onPageChange(page - 1)} type="button">이전</button>
      {pages.map((pageNumber, index) => {
        const previousPage = pages[index - 1];
        const hasGap = previousPage !== undefined && pageNumber - previousPage > 1;
        return (
          <span key={pageNumber}>
            {hasGap ? <span className={styles.ellipsis}>…</span> : null}
            <button aria-current={page === pageNumber ? 'page' : undefined} className={styles.pageButton({ active: page === pageNumber })} onClick={() => onPageChange(pageNumber)} type="button">{pageNumber}</button>
          </span>
        );
      })}
      <button className={styles.pageButton()} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} type="button">다음</button>
      {showFirstLast ? <button className={styles.pageButton()} disabled={page >= pageCount} onClick={() => onPageChange(pageCount)} type="button">마지막</button> : null}
    </nav>
  );
}
