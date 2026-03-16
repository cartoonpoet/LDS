import { useMemo, useState } from "react";
import type { ReactNode } from "react";

export type TreeViewItem = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children?: TreeViewItem[];
};

export type UseTreeCollectionOptions = {
  items: TreeViewItem[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  selectedId?: string;
  defaultSelectedId?: string;
  onExpandedIdsChange?: (expandedIds: string[]) => void;
  onSelectedIdChange?: (selectedId?: string) => void;
};

export type FlattenedTreeItem = {
  item: TreeViewItem;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  hasChildren: boolean;
};

const nextExpandedIds = (expandedIds: string[], id: string) =>
  expandedIds.includes(id) ? expandedIds.filter(value => value !== id) : [...expandedIds, id];

export const useTreeCollection = ({
  defaultExpandedIds = [],
  defaultSelectedId,
  expandedIds,
  items,
  onExpandedIdsChange,
  onSelectedIdChange,
  selectedId
}: UseTreeCollectionOptions) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpandedIds);
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(defaultSelectedId);

  const currentExpandedIds = expandedIds ?? internalExpandedIds;
  const currentSelectedId = selectedId ?? internalSelectedId;

  const setExpandedIds = (value: string[]) => {
    if (expandedIds === undefined) {
      setInternalExpandedIds(value);
    }
    onExpandedIdsChange?.(value);
  };

  const setSelectedId = (value?: string) => {
    if (selectedId === undefined) {
      setInternalSelectedId(value);
    }
    onSelectedIdChange?.(value);
  };

  const flattenedItems = useMemo(() => {
    const result: FlattenedTreeItem[] = [];

    const visit = (nodes: TreeViewItem[], level: number) => {
      nodes.forEach(node => {
        const hasChildren = Boolean(node.children?.length);
        const isExpanded = hasChildren && currentExpandedIds.includes(node.id);

        result.push({
          item: node,
          level,
          isExpanded,
          isSelected: currentSelectedId === node.id,
          hasChildren
        });

        if (hasChildren && isExpanded) {
          visit(node.children ?? [], level + 1);
        }
      });
    };

    visit(items, 0);
    return result;
  }, [currentExpandedIds, currentSelectedId, items]);

  const toggleItem = (id: string) => {
    setExpandedIds(nextExpandedIds(currentExpandedIds, id));
  };

  const selectItem = (id?: string) => {
    setSelectedId(id);
  };

  return {
    expandedIds: currentExpandedIds,
    selectedId: currentSelectedId,
    flattenedItems,
    toggleItem,
    selectItem
  };
};
