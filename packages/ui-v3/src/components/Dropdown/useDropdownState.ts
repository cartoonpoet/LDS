import { useMemo, useState } from "react";
import type { DropdownOptionGroup, DropdownProps } from ".";

type UseDropdownStateOptions = {
  defaultValue?: DropdownProps["defaultValue"];
  groups: DropdownOptionGroup[];
  multiple: boolean;
  onValueChange?: (value: string | string[]) => void;
  value?: DropdownProps["value"];
};

const normalizeValue = (value: DropdownProps["value"] | DropdownProps["defaultValue"], multiple: boolean) => {
  if (multiple) {
    return Array.isArray(value) ? value : value ? [value] : [];
  }

  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
};

export const useDropdownState = ({ defaultValue, groups, multiple, onValueChange, value }: UseDropdownStateOptions) => {
  const [internalValue, setInternalValue] = useState(() => normalizeValue(defaultValue, multiple));
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selectedValue = value ?? internalValue;

  const filteredGroups = useMemo(() => {
    if (!query.trim()) {
      return groups;
    }

    const normalizedQuery = query.trim().toLowerCase();

    return groups
      .map(group => ({
        ...group,
        options: group.options.filter(option => {
          const haystack = [option.label, ...(option.keywords ?? [])].join(" ").toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      }))
      .filter(group => group.options.length > 0);
  }, [groups, query]);

  const isSelected = (optionValue: string) =>
    Array.isArray(selectedValue) ? selectedValue.includes(optionValue) : selectedValue === optionValue;

  const commitValue = (nextValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(nextValue as never);
    }

    onValueChange?.(nextValue);
  };

  const select = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      const nextValue = currentValues.includes(optionValue)
        ? currentValues.filter(current => current !== optionValue)
        : [...currentValues, optionValue];

      commitValue(nextValue);
      return;
    }

    commitValue(optionValue);
    setOpen(false);
  };

  return {
    filteredGroups,
    isSelected,
    open,
    query,
    selectedValue,
    select,
    setOpen,
    setQuery
  };
};
