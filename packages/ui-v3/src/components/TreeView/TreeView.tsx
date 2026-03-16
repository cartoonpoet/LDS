"use client";

import * as styles from "./TreeView.css";
import { type TreeViewItem, useTreeCollection } from "./useTreeCollection";

export type { TreeViewItem } from "./useTreeCollection";

export type TreeViewProps = {
  items: TreeViewItem[];
  ariaLabel?: string;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  selectedId?: string;
  defaultSelectedId?: string;
  onExpandedIdsChange?: (expandedIds: string[]) => void;
  onSelectedIdChange?: (selectedId?: string) => void;
};

export function TreeView({
  ariaLabel = "트리 뷰",
  defaultExpandedIds,
  defaultSelectedId,
  expandedIds,
  items,
  onExpandedIdsChange,
  onSelectedIdChange,
  selectedId
}: TreeViewProps) {
  const { flattenedItems, selectItem, toggleItem } = useTreeCollection({
    items,
    expandedIds,
    defaultExpandedIds,
    selectedId,
    defaultSelectedId,
    onExpandedIdsChange,
    onSelectedIdChange
  });

  return (
    <div aria-label={ariaLabel} className={styles.root} role="tree">
      {flattenedItems.map(({ hasChildren, isExpanded, isSelected, item, level }) => (
        <button
          aria-disabled={item.disabled}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-level={level + 1}
          aria-selected={isSelected}
          className={styles.row}
          data-disabled={item.disabled ? "true" : "false"}
          data-selected={isSelected ? "true" : "false"}
          key={item.id}
          onClick={() => {
            if (item.disabled) return;
            selectItem(item.id);
            if (hasChildren) {
              toggleItem(item.id);
            }
          }}
          role="treeitem"
          style={{ paddingLeft: `calc(${level} * 20px + 12px)` }}
          type="button"
        >
          <span aria-hidden="true" className={styles.expander}>{hasChildren ? (isExpanded ? "▾" : "▸") : item.icon ?? "•"}</span>
          <span className={styles.labelBlock}>
            <span className={styles.primaryLine}>
              {item.icon && hasChildren ? <span aria-hidden="true">{item.icon}</span> : null}
              <span className={styles.label}>{item.label}</span>
            </span>
            {item.description ? <span className={styles.description}>{item.description}</span> : null}
          </span>
          {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
        </button>
      ))}
    </div>
  );
}

export default TreeView;
