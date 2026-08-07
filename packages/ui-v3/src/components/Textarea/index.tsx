import { forwardRef, useState } from "react";
import type { ChangeEvent, TextareaHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Textarea.css";

/* ─── Types ─── */
export type TextareaSize = "small" | "medium" | "large";
export type TextareaState = "default" | "active" | "success" | "warning" | "disabled";
export type TextareaResize = "none" | "vertical";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 사이즈 */
  textareaSize?: TextareaSize;
  /** 상태 */
  state?: TextareaState;
  /** 리사이즈 제어 */
  resize?: TextareaResize;
  /** 글자수 표시 (maxLength와 함께 사용 시 "n/max" 형식) */
  showCount?: boolean;
}

/**
 * **Textarea**
 *
 * 여러 줄 텍스트 입력 필드. Input과 동일한 시각 언어를 공유합니다.
 *
 * - `textareaSize`: small / medium / large (패딩 차이)
 * - `state`: default / active / success / warning / disabled
 * - `resize`: none / vertical (기본 vertical)
 * - `showCount`: 글자수 표시 (`maxLength`와 함께 쓰면 "n/max")
 * - InputGroup(label/helperText)과 함께 사용할 수 있습니다.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      textareaSize = "medium",
      state = "default",
      resize = "vertical",
      showCount = false,
      className,
      disabled,
      maxLength,
      value,
      defaultValue,
      onChange,
      rows = 4,
      ...rest
    },
    ref,
  ) => {
    const resolvedState = disabled ? "disabled" : state;
    const isControlled = value !== undefined;
    const [innerLength, setInnerLength] = useState(String(defaultValue ?? "").length);
    const length = isControlled ? String(value).length : innerLength;

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
      if (!isControlled) setInnerLength(e.target.value.length);
      onChange?.(e);
    }

    const textareaEl = (
      <textarea
        ref={ref}
        rows={rows}
        className={cx(
          s.textarea({ size: textareaSize, state: resolvedState, resize }),
          className,
        )}
        disabled={disabled || resolvedState === "disabled"}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      />
    );

    if (!showCount) return textareaEl;

    return (
      <div className={s.wrapper}>
        {textareaEl}
        <span className={s.count}>
          {maxLength != null ? `${length}/${maxLength}` : length}
        </span>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
