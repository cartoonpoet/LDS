import type { FieldSize, FieldTone } from "../../foundations/field";
import type { InputProps } from "./index";

export function useInputState({ disabled = false, prefix, size = "md", status = "default", suffix }: Pick<InputProps, "disabled" | "prefix" | "size" | "status" | "suffix">): {
  hasPrefix: boolean;
  hasSuffix: boolean;
  size: FieldSize;
  tone: FieldTone;
  disabled: boolean;
} {
  const hasPrefix = prefix !== undefined && prefix !== null;
  const hasSuffix = suffix !== undefined && suffix !== null;
  const tone = status === "error" ? "danger" : status;

  return {
    hasPrefix,
    hasSuffix,
    size,
    tone,
    disabled
  };
}
