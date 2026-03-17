import type { FieldSize, FieldTone } from "../../foundations/field";
import type { SelectProps } from "./index";

export function useSelectState({ invalid = false, multiple = false, placeholder, size = "md" }: Pick<SelectProps, "invalid" | "multiple" | "placeholder" | "size">): {
  hasPlaceholder: boolean;
  multiple: boolean;
  size: FieldSize;
  tone: FieldTone;
} {
  const hasPlaceholder = Boolean(placeholder) && !multiple;

  return {
    hasPlaceholder,
    multiple,
    size,
    tone: invalid ? "danger" : "default"
  };
}
