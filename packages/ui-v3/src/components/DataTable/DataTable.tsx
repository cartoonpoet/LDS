"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnSort,
  type OnChangeFn,
  type SortingState
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import * as styles from "./DataTable.css";

export type DataTableAlign = "left" | "center" | "right";
export type DataTableDensity = "compact" | "comfortable";
export type DataTableSortDirection = "asc" | "desc";

export type DataTableColumn<Row> = {
  key: string;
  label: ReactNode;
  accessor?: keyof Row | ((row: Row) => ReactNode);
  renderCell?: (row: Row) => ReactNode;
  align?: DataTableAlign;
  sortable?: boolean;
  width?: CSSProperties["width"];
};

export type DataTableSortState = {
  key: string;
  direction: DataTableSortDirection;
};

export type DataTableProps<Row> = {
  columns: Array<DataTableColumn<Row>>;
  rows: Row[];
  rowKey?: keyof Row | ((row: Row, index: number) => string);
  caption?: string;
  density?: DataTableDensity;
  emptyState?: ReactNode;
  sortState?: DataTableSortState;
  defaultSortState?: DataTableSortState;
  onSortChange?: (sortState: DataTableSortState) => void;
  getSortableValue?: (row: Row, column: DataTableColumn<Row>) => string | number;
};

const defaultEmptyState = "표시할 데이터가 없습니다.";

const compareValues = (left: string | number, right: string | number) => {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  return String(left).localeCompare(String(right), "ko", {
    numeric: true,
    sensitivity: "base"
  });
};

const getCellValue = <Row,>(row: Row, column: DataTableColumn<Row>) => {
  if (column.renderCell) {
    return column.renderCell(row);
  }

  if (typeof column.accessor === "function") {
    return column.accessor(row);
  }

  if (typeof column.accessor === "string") {
    return row[column.accessor] as ReactNode;
  }

  return null;
};

const getRowKeyValue = <Row,>(row: Row, rowKey: DataTableProps<Row>["rowKey"], index: number) => {
  if (typeof rowKey === "function") {
    return rowKey(row, index);
  }

  if (typeof rowKey === "string") {
    return String(row[rowKey]);
  }

  return String(index);
};

const getComparableValue = <Row,>(
  row: Row,
  column: DataTableColumn<Row>,
  getSortableValue?: DataTableProps<Row>["getSortableValue"]
) => {
  const explicitValue = getSortableValue?.(row, column);

  if (explicitValue !== undefined) {
    return explicitValue;
  }

  const cellValue = getCellValue(row, column);

  if (typeof cellValue === "number" || typeof cellValue === "string") {
    return cellValue;
  }

  return String(cellValue ?? "");
};

const toSortingState = (sortState?: DataTableSortState): SortingState =>
  sortState ? [{ id: sortState.key, desc: sortState.direction === "desc" }] : [];

const toExternalSortState = (sorting: SortingState): DataTableSortState | undefined => {
  const current = sorting[0];
  if (!current) return undefined;

  return {
    key: current.id,
    direction: current.desc ? "desc" : "asc"
  };
};

export function DataTable<Row>({
  caption,
  columns,
  defaultSortState,
  density = "comfortable",
  emptyState = defaultEmptyState,
  getSortableValue,
  onSortChange,
  rowKey,
  rows,
  sortState
}: DataTableProps<Row>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>(() => toSortingState(defaultSortState));
  const controlledSorting = sortState ? toSortingState(sortState) : undefined;
  const sorting = controlledSorting ?? internalSorting;

  const tableColumns = useMemo<ColumnDef<Row>[]>(() => {
    return columns.map(column => ({
      id: column.key,
      accessorFn: row => getComparableValue(row, column, getSortableValue),
      enableSorting: Boolean(column.sortable),
      sortingFn: (left, right) => {
        const leftValue = getComparableValue(left.original, column, getSortableValue);
        const rightValue = getComparableValue(right.original, column, getSortableValue);
        return compareValues(leftValue, rightValue);
      },
      meta: {
        align: column.align ?? "left",
        density,
        width: column.width,
        label: column.label
      },
      header: () => column.label,
      cell: info => getCellValue(info.row.original, column)
    }));
  }, [columns, density, getSortableValue]);

  const handleSortingChange: OnChangeFn<SortingState> = updater => {
    const nextSorting = typeof updater === "function" ? updater(sorting) : updater;

    if (sortState === undefined) {
      setInternalSorting(nextSorting);
    }

    const nextSortState = toExternalSortState(nextSorting);
    if (nextSortState) {
      onSortChange?.(nextSortState);
    }
  };

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    },
    onSortingChange: handleSortingChange,
    manualSorting: false
  });

  return (
    <div className={styles.root}>
      <div className={styles.scrollArea}>
        <table className={styles.table}>
          {caption ? <caption className={styles.caption}>{caption}</caption> : null}
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const meta = header.column.columnDef.meta as {
                    align: DataTableAlign;
                    density: DataTableDensity;
                    width?: CSSProperties["width"];
                  };
                  const sorted = header.column.getIsSorted();
                  const direction = sorted === "desc" ? "desc" : "asc";

                  return (
                    <th
                      aria-sort={
                        sorted ? (sorted === "asc" ? "ascending" : "descending") : header.column.getCanSort() ? "none" : undefined
                      }
                      className={styles.headerCell({ align: meta.align, density: meta.density })}
                      key={header.id}
                      scope="col"
                      style={meta.width ? { width: meta.width } : undefined}
                    >
                      {header.column.getCanSort() ? (
                        <button
                          className={styles.sortButton({ align: meta.align })}
                          onClick={header.column.getToggleSortingHandler()}
                          type="button"
                        >
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <span
                            aria-hidden="true"
                            className={styles.sortIcon({ active: Boolean(sorted), direction })}
                          >
                            ↕
                          </span>
                        </button>
                      ) : (
                        <span className={styles.headerLabel({ align: meta.align })}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <tr className={styles.row} key={getRowKeyValue(row.original, rowKey, index)}>
                  {row.getVisibleCells().map(cell => {
                    const meta = cell.column.columnDef.meta as {
                      align: DataTableAlign;
                      density: DataTableDensity;
                    };

                    return (
                      <td className={styles.bodyCell({ align: meta.align, density: meta.density })} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td className={styles.emptyCell({ density })} colSpan={columns.length}>
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
