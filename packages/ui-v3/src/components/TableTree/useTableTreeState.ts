import { useMemo, useState } from "react";
import type { ReactNode } from "react";

export type TableTreeItem = {
  id: string;
  cells: ReactNode[];
  children?: TableTreeItem[];
  disabled?: boolean;
};

export type UseTableTreeStateOptions = {
  items: TableTreeItem[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedIdsChange?: (expandedIds: string[]) => void;
};

export type FlattenedTableTreeItem = {
  item: TableTreeItem;
  level: number;
  hasChildren: boolean;
  isExpanded: boolean;
};

const toggleValue = (values: string[], id: string) => (values.includes(id) ? values.filter(value => value !== id) : [...values, id]);

export const useTableTreeState = ({ defaultExpandedIds = [], expandedIds, items, onExpandedIdsChange }: UseTableTreeStateOptions) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpandedIds);
  const currentExpandedIds = expandedIds ?? internalExpandedIds;

  const setExpandedIds = (value: string[]) => {
    if (expandedIds === undefined) {
      setInternalExpandedIds(value);
    }
    onExpandedIdsChange?.(value);
  };

  const flattenedItems = useMemo(() => {
    const result: FlattenedTableTreeItem[] = [];

    const visit = (nodes: TableTreeItem[], level: number) => {
      nodes.forEach(node => {
        const hasChildren = Boolean(node.children?.length);
        const isExpanded = hasChildren && currentExpandedIds.includes(node.id);

        result.push({ item: node, level, hasChildren, isExpanded });

        if (hasChildren && isExpanded) {
          visit(node.children ?? [], level + 1);
        }
      });
    };

    visit(items, 0);
    return result;
  }, [currentExpandedIds, items]);

  return {
    flattenedItems,
    toggleItem: (id: string) => setExpandedIds(toggleValue(currentExpandedIds, id))
  };
};
