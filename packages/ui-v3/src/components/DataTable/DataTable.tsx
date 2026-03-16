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
  const [internalSortState, setInternalSortState] = useState<DataTableSortState | undefined>(defaultSortState);
  const activeSortState = sortState ?? internalSortState;

  const sortedRows = useMemo(() => {
    if (!activeSortState) {
      return rows;
    }

    const targetColumn = columns.find(column => column.key === activeSortState.key);

    if (!targetColumn || !targetColumn.sortable) {
      return rows;
    }

    const nextRows = [...rows];
    nextRows.sort((leftRow, rightRow) => {
      const left = getComparableValue(leftRow, targetColumn, getSortableValue);
      const right = getComparableValue(rightRow, targetColumn, getSortableValue);
      const result = compareValues(left, right);

      return activeSortState.direction === "asc" ? result : result * -1;
    });

    return nextRows;
  }, [activeSortState, columns, getSortableValue, rows]);

  const handleSort = (column: DataTableColumn<Row>) => {
    if (!column.sortable) {
      return;
    }

    const nextSortState: DataTableSortState =
      activeSortState?.key === column.key && activeSortState.direction === "asc"
        ? { key: column.key, direction: "desc" }
        : { key: column.key, direction: "asc" };

    if (sortState === undefined) {
      setInternalSortState(nextSortState);
    }

    onSortChange?.(nextSortState);
  };

  return (
    <div className={styles.root}>
      <div className={styles.scrollArea}>
        <table className={styles.table}>
          {caption ? <caption className={styles.caption}>{caption}</caption> : null}
          <thead>
            <tr>
              {columns.map(column => {
                const direction = activeSortState?.key === column.key ? activeSortState.direction : undefined;

                return (
                  <th
                    aria-sort={
                      direction ? (direction === "asc" ? "ascending" : "descending") : column.sortable ? "none" : undefined
                    }
                    className={styles.headerCell({ align: column.align ?? "left", density })}
                    key={column.key}
                    scope="col"
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {column.sortable ? (
                      <button className={styles.sortButton({ align: column.align ?? "left" })} onClick={() => handleSort(column)} type="button">
                        <span>{column.label}</span>
                        <span aria-hidden="true" className={styles.sortIcon({ active: Boolean(direction), direction: direction ?? "asc" })}>
                          ↕
                        </span>
                      </button>
                    ) : (
                      <span className={styles.headerLabel({ align: column.align ?? "left" })}>{column.label}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedRows.length > 0 ? (
              sortedRows.map((row, index) => (
                <tr className={styles.row} key={getRowKeyValue(row, rowKey, index)}>
                  {columns.map(column => (
                    <td className={styles.bodyCell({ align: column.align ?? "left", density })} key={column.key}>
                      {getCellValue(row, column)}
                    </td>
                  ))}
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
