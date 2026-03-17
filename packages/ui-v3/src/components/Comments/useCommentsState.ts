import { useMemo, useState } from "react";

export type UseCommentsStateOptions = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

const normalizeValue = (value: string) => value.trim();

export const useCommentsState = ({ defaultValue = "", onSubmit, onValueChange, value }: UseCommentsStateOptions) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const normalizedValue = useMemo(() => normalizeValue(currentValue), [currentValue]);

  const setValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const resetValue = () => {
    setValue("");
  };

  const submitValue = () => {
    if (!normalizedValue) {
      return;
    }

    onSubmit?.(normalizedValue);
    resetValue();
  };

  return {
    value: currentValue,
    hasValue: Boolean(normalizedValue),
    setValue,
    resetValue,
    submitValue
  };
};
