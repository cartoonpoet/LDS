import { Fragment, useState } from "react";
import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { cx } from "../../lib/cx";
import * as s from "./TableTree.css";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export interface TableTreeColumn {
  /** 셀 데이터 키 (`row.cells`의 키와 매칭) */
  key: string;
  /** 헤더 라벨 */
  header: ReactNode;
  /** 컬럼 너비 (px 숫자 또는 CSS 값) */
  width?: number | string;
  /** 정렬 */
  align?: "left" | "center" | "right";
}

export interface TableTreeRow {
  /** 고유 ID */
  id: string;
  /** 컬럼 키 → 셀 콘텐츠 */
  cells: Record<string, ReactNode>;
  /** 자식 행 (부모 확장 시에만 렌더) */
  children?: TableTreeRow[];
}

export interface TableTreeProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** 컬럼 정의 */
  columns: TableTreeColumn[];
  /** 계층 행 데이터 */
  rows: TableTreeRow[];
  /** 초기 펼침 행 ID 목록 (uncontrolled) */
  defaultExpandedIds?: string[];
  /** 펼침 행 ID 목록 (controlled) */
  expandedIds?: string[];
  /** 펼침 상태 변경 콜백 */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** 행 클릭 콜백 */
  onRowClick?: (row: TableTreeRow) => void;
  /** 선택된 행 ID */
  selectedId?: string;
  /** 세로 구분선 표시 */
  bordered?: boolean;
  /** 깊이당 들여쓰기 px */
  indentSize?: number;
  /** 데이터 없을 때 표시 메시지 */
  emptyText?: ReactNode;
}

/* ═══════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════ */

function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   TableTree
   ═══════════════════════════════════════════ */

/**
 * **TableTree**
 *
 * 모계약–하위계약처럼 계층이 있는 데이터를 표 안에서 접었다 펼치는 프리미티브.
 *
 * - table/thead/tbody 시맨틱 마크업 + DataTable과 같은 시각 언어
 * - 자식 행은 부모 확장 시에만 렌더 (자체 재귀 렌더, 외부 의존성 없음)
 * - 들여쓰기는 첫 번째 컬럼에 적용 (`indentSize` × 깊이)
 * - `expandedIds`/`onExpandedChange`로 controlled 사용 가능
 *
 * ```tsx
 * <TableTree
 *   columns={[{ key: "code", header: "관리번호" }, { key: "title", header: "계약명" }]}
 *   rows={[{ id: "1", cells: { code: "C-001", title: "모계약" }, children: [...] }]}
 * />
 * ```
 */
export function TableTree({
  columns,
  rows,
  defaultExpandedIds,
  expandedIds: controlledExpandedIds,
  onExpandedChange,
  onRowClick,
  selectedId,
  bordered = false,
  indentSize = 20,
  emptyText = "데이터가 없습니다.",
  className,
  ...rest
}: TableTreeProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(
    () => defaultExpandedIds ?? [],
  );

  const isControlled = controlledExpandedIds !== undefined;
  const expandedIds = isControlled ? controlledExpandedIds : internalExpandedIds;
  const expandedSet = new Set(expandedIds);

  const toggleExpand = (id: string) => {
    const next = expandedSet.has(id)
      ? expandedIds.filter((expandedId) => expandedId !== id)
      : [...expandedIds, id];
    if (!isControlled) {
      setInternalExpandedIds(next);
    }
    onExpandedChange?.(next);
  };

  const cellStyle = (column: TableTreeColumn): CSSProperties | undefined =>
    column.align ? { textAlign: column.align } : undefined;

  const renderRow = (row: TableTreeRow, depth: number): ReactNode => {
    const hasChildren = !!(row.children && row.children.length > 0);
    const isExpanded = expandedSet.has(row.id);

    return (
      <Fragment key={row.id}>
        <tr
          className={cx(s.tr, onRowClick && s.trClickable)}
          data-selected={selectedId === row.id ? "true" : undefined}
          onClick={onRowClick ? () => onRowClick(row) : undefined}
        >
          {columns.map((column, colIndex) => (
            <td
              key={column.key}
              className={cx(s.td, bordered && s.tdBordered)}
              style={cellStyle(column)}
            >
              {colIndex === 0 ? (
                <div
                  className={s.firstCell}
                  style={depth > 0 ? { paddingLeft: depth * indentSize } : undefined}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      className={s.toggleButton}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? "접기" : "펼치기"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(row.id);
                      }}
                    >
                      <span className={s.caret({ expanded: isExpanded })}>
                        <ChevronIcon />
                      </span>
                    </button>
                  ) : (
                    <span className={s.toggleSpacer} aria-hidden="true" />
                  )}
                  <span className={s.firstCellContent}>{row.cells[column.key]}</span>
                </div>
              ) : (
                row.cells[column.key]
              )}
            </td>
          ))}
        </tr>

        {/* 자식 행은 부모 확장 시에만 렌더 */}
        {hasChildren &&
          isExpanded &&
          row.children!.map((child) => renderRow(child, depth + 1))}
      </Fragment>
    );
  };

  return (
    <div className={cx(s.wrapper, className)} {...rest}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cx(s.th, bordered && s.thBordered)}
                style={{
                  ...(column.width != null && { width: column.width }),
                  ...(column.align && { textAlign: column.align }),
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr className={s.emptyRow}>
              <td className={s.emptyCell} colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row) => renderRow(row, 0))
          )}
        </tbody>
      </table>
    </div>
  );
}
