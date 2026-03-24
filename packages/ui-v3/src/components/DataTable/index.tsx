import { useCallback, useMemo } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  RowSelectionState,
  OnChangeFn,
  Row,
} from "@tanstack/react-table";
import { cx } from "../../lib/cx";
import * as s from "./DataTable.css";

/* ═══════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════ */

function SortArrowIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2L8 7H2L5 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export type {   
  ColumnDef,
  SortingState,
  RowSelectionState,
  OnChangeFn,
  Row, 
};

export interface DataTableProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** 테이블 데이터 */
  data: T[];
  /** @tanstack/react-table ColumnDef 배열 */
  columns: ColumnDef<T, any>[];
  /** 행 선택 체크박스 표시 */
  selectable?: boolean;
  /** 세로 구분선 표시 */
  bordered?: boolean;
  /** 정렬 상태 (controlled) */
  sorting?: SortingState;
  /** 정렬 상태 변경 콜백 */
  onSortingChange?: OnChangeFn<SortingState>;
  /** 행 선택 상태 (controlled) */
  rowSelection?: RowSelectionState;
  /** 행 선택 상태 변경 콜백 */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  /** 행 클릭 콜백 */
  onRowClick?: (row: T) => void;
  /** 데이터 없을 때 표시 메시지 */
  emptyText?: ReactNode;
  /** 행의 고유 ID를 반환하는 함수 */
  getRowId?: (row: T) => string;
}

/* ═══════════════════════════════════════════
   DataTable
   ═══════════════════════════════════════════ */

/**
 * **DataTable**
 *
 * @tanstack/react-table 기반 데이터 테이블 컴포넌트.
 *
 * - `selectable`: 행 선택 체크박스 자동 추가
 * - `bordered`: 세로 구분선 표시
 * - `sorting` / `onSortingChange`: 정렬 상태 제어
 * - `rowSelection` / `onRowSelectionChange`: 행 선택 제어
 *
 * ```tsx
 * const columns: ColumnDef<Item>[] = [
 *   { accessorKey: "name", header: "이름" },
 *   { accessorKey: "email", header: "이메일" },
 * ];
 *
 * <DataTable data={items} columns={columns} selectable bordered />
 * ```
 */
export function DataTable<T>({
  data,
  columns,
  selectable = false,
  bordered = false,
  sorting: controlledSorting,
  onSortingChange,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  onRowClick,
  emptyText = "데이터가 없습니다.",
  getRowId,
  className,
  ...rest
}: DataTableProps<T>) {
  /* ── checkbox column ── */
  const allColumns = useMemo(() => {
    if (!selectable) return columns;

    const checkboxCol: ColumnDef<T, any> = {
      id: "__select",
      header: ({ table }) => (
        <input
          type="checkbox"
          className={s.checkbox}
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          aria-label="전체 선택"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className={s.checkbox}
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label="행 선택"
        />
      ),
      size: 62,
      enableSorting: false,
    };

    return [checkboxCol, ...columns];
  }, [columns, selectable]);

  /* ── table instance ── */
  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      ...(controlledSorting !== undefined && { sorting: controlledSorting }),
      ...(controlledRowSelection !== undefined && { rowSelection: controlledRowSelection }),
    },
    onSortingChange,
    onRowSelectionChange,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: selectable,
  });

  const handleRowClick = useCallback(
    (row: Row<T>) => {
      onRowClick?.(row.original);
    },
    [onRowClick],
  );

  const colCount = allColumns.length;

  return (
    <div className={cx(s.wrapper, className)} {...rest}>
      <table className={cx(s.table, bordered && s.tableBordered)}>
        <thead className={s.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isCheckbox = header.column.id === "__select";
                const canSort = header.column.getCanSort();
                const sortDir = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className={cx(
                      s.th,
                      isCheckbox && s.checkboxCell,
                      canSort && s.thSortable,
                      bordered && s.thBordered,
                    )}
                    style={
                      header.column.columnDef.size
                        ? { width: header.column.columnDef.size }
                        : undefined
                    }
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <span className={s.thInner}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span
                          className={s.sortIcon({
                            active: !!sortDir,
                            direction: sortDir === "asc" ? "asc" : "desc",
                          })}
                        >
                          <SortArrowIcon />
                        </span>
                      </span>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className={s.tbody}>
          {table.getRowModel().rows.length === 0 ? (
            <tr className={s.emptyRow}>
              <td className={s.emptyCell} colSpan={colCount}>
                {emptyText}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              const isSelected = row.getIsSelected();
              return (
                <tr
                  key={row.id}
                  className={cx(s.tr, isSelected && s.trSelected)}
                  onClick={onRowClick ? () => handleRowClick(row) : undefined}
                  style={onRowClick ? { cursor: "pointer" } : undefined}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isCheckbox = cell.column.id === "__select";
                    return (
                      <td
                        key={cell.id}
                        className={cx(
                          s.td,
                          isCheckbox && s.checkboxCell,
                          bordered && s.tdBordered,
                        )}
                        onClick={
                          isCheckbox ? (e) => e.stopPropagation() : undefined
                        }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
