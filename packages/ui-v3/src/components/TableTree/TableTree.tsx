"use client";

import * as styles from "./TableTree.css";
import { type TableTreeItem, useTableTreeState } from "./useTableTreeState";

export type { TableTreeItem } from "./useTableTreeState";

export type TableTreeColumn = {
  key: string;
  label: string;
};

export type TableTreeProps = {
  columns: TableTreeColumn[];
  items: TableTreeItem[];
  ariaLabel?: string;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedIdsChange?: (expandedIds: string[]) => void;
};

export function TableTree({ ariaLabel = "테이블 트리", columns, defaultExpandedIds, expandedIds, items, onExpandedIdsChange }: TableTreeProps) {
  const { flattenedItems, toggleItem } = useTableTreeState({ items, expandedIds, defaultExpandedIds, onExpandedIdsChange });

  return (
    <div className={styles.root}>
      <table aria-label={ariaLabel} className={styles.table}>
        <thead>
          <tr>
            {columns.map(column => <th className={styles.headerCell} key={column.key} scope="col">{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {flattenedItems.map(({ hasChildren, isExpanded, item, level }) => (
            <tr className={styles.row} key={item.id}>
              {item.cells.map((cell, index) => (
                <td className={styles.cell} key={`${item.id}-${index}`}>
                  {index === 0 ? (
                    <span className={styles.primaryCell} style={{ paddingLeft: `calc(${level} * 20px)` }}>
                      {hasChildren ? (
                        <button aria-expanded={isExpanded} className={styles.expander} onClick={() => toggleItem(item.id)} type="button">
                          {isExpanded ? "▾" : "▸"}
                        </button>
                      ) : (
                        <span className={styles.expander}>•</span>
                      )}
                      <span>{cell}</span>
                    </span>
                  ) : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableTree;
