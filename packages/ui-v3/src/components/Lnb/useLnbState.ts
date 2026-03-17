import { useState } from "react";

export type UseLnbStateOptions = {
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedIdsChange?: (expandedIds: string[]) => void;
};

const toggleValue = (values: string[], id: string) => (values.includes(id) ? values.filter(value => value !== id) : [...values, id]);

export const useLnbState = ({ defaultExpandedIds = [], expandedIds, onExpandedIdsChange }: UseLnbStateOptions) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState(defaultExpandedIds);
  const currentExpandedIds = expandedIds ?? internalExpandedIds;

  const setExpandedIds = (value: string[]) => {
    if (expandedIds === undefined) {
      setInternalExpandedIds(value);
    }
    onExpandedIdsChange?.(value);
  };

  return {
    expandedIds: currentExpandedIds,
    toggleExpanded: (id: string) => setExpandedIds(toggleValue(currentExpandedIds, id))
  };
};
