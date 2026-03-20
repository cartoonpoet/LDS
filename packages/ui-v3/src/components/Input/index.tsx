import { forwardRef } from "react";
import type { ReactNode, InputHTMLAttributes, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Input.css";

/* ─── Types ─── */
export type InputSize = "small" | "medium" | "large";
export type InputState = "default" | "active" | "success" | "warning" | "disabled";

/* ═══════════════════════════════════════════
   Input
   ═══════════════════════════════════════════ */

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 사이즈 */
  inputSize?: InputSize;
  /** 상태 */
  state?: InputState;
  /** 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: ReactNode;
  /** 오른쪽 접미사 (단위 텍스트, 드롭다운 등) */
  suffix?: ReactNode;
  /** wrapper className */
  wrapperClassName?: string;
}

/**
 * **Input**
 *
 * 텍스트 입력 필드.
 *
 * - `inputSize`: small(30) / medium(38) / large(46)
 * - `state`: default / active / success / warning / disabled
 * - `leftIcon` / `rightIcon`: 아이콘 슬롯
 * - `suffix`: 오른쪽 접미사 (단위, 드롭다운 버튼 등)
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "medium",
      state = "default",
      leftIcon,
      rightIcon,
      suffix: suffixNode,
      wrapperClassName,
      className,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const resolvedState = disabled ? "disabled" : state;

    return (
      <div className={cx(s.inputWrapper({ size: inputSize, state: resolvedState }), wrapperClassName)}>
        {leftIcon && <span className={s.iconSlot({ size: inputSize })}>{leftIcon}</span>}
        <input
          ref={ref}
          className={cx(s.input, className)}
          disabled={disabled || resolvedState === "disabled"}
          {...rest}
        />
        {rightIcon && <span className={s.iconSlot({ size: inputSize })}>{rightIcon}</span>}
        {suffixNode && (
          <div className={s.suffix}>
            <span className={s.suffixDivider} />
            {suffixNode}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

/* ═══════════════════════════════════════════
   InputGroup (Label + Input + Helper)
   ═══════════════════════════════════════════ */

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** 라벨 */
  label?: string;
  /** 필수 표시 */
  required?: boolean;
  /** 캡션 (라벨 오른쪽) */
  caption?: string;
  /** 도움말 텍스트 (인풋 아래) */
  helperText?: string;
  /** 상태 (도움말 색상에 반영) */
  state?: InputState;
  /** 내부 콘텐츠 (Input 등) */
  children: ReactNode;
}

/**
 * **InputGroup**
 *
 * 라벨 + 인풋 + 도움말을 묶는 필드 래퍼.
 *
 * ```tsx
 * <InputGroup label="Email" required helperText="유효한 이메일을 입력하세요" state="warning">
 *   <Input placeholder="email@example.com" state="warning" />
 * </InputGroup>
 * ```
 */
export function InputGroup({
  label,
  required = false,
  caption,
  helperText,
  state = "default",
  children,
  className,
  ...rest
}: InputGroupProps) {
  return (
    <div className={cx(s.field, className)} {...rest}>
      {(label || caption) && (
        <div className={s.labelRow}>
          {label && (
            <span className={s.labelGroup}>
              <span className={s.label}>{label}</span>
              {required && <span className={s.requiredDot} />}
            </span>
          )}
          {caption && <span className={s.caption}>{caption}</span>}
        </div>
      )}
      {children}
      {helperText && <span className={s.helper({ state })}>{helperText}</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MultiSelect
   ═══════════════════════════════════════════ */

export interface MultiSelectItem {
  /** 고유 키 */
  key: string;
  /** 표시 라벨 */
  label: string;
}

export interface MultiSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 선택된 항목 목록 */
  value: MultiSelectItem[];
  /** 항목 제거 콜백 */
  onRemove?: (key: string) => void;
  /** placeholder */
  placeholder?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 입력 변경 콜백 (검색용) */
  onInputChange?: (value: string) => void;
}

/* ─── Small X Icon ─── */
const XIcon = () => (
  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1 1 6M1 1l5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

/* ─── Search Icon ─── */
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/**
 * **MultiSelect**
 *
 * 여러 항목을 뱃지 태그로 표시하는 멀티 셀렉트 입력.
 *
 * ```tsx
 * <MultiSelect
 *   value={[{ key: "1", label: "User Name1" }]}
 *   onRemove={(key) => removeItem(key)}
 *   placeholder="검색..."
 * />
 * ```
 */
export function MultiSelect({
  value,
  onRemove,
  placeholder,
  disabled = false,
  onInputChange,
  className,
  ...rest
}: MultiSelectProps) {
  return (
    <div className={cx(s.multiWrapper({ disabled }), className)} {...rest}>
      {value.map((item) => (
        <span key={item.key} className={s.badge}>
          {item.label}
          {onRemove && !disabled && (
            <button
              type="button"
              className={s.badgeRemove}
              onClick={() => onRemove(item.key)}
              aria-label={`${item.label} 제거`}
            >
              <XIcon />
            </button>
          )}
        </span>
      ))}
      <input
        className={s.multiInput}
        placeholder={value.length === 0 ? placeholder : undefined}
        disabled={disabled}
        onChange={(e) => onInputChange?.(e.target.value)}
      />
      <span className={s.multiIcon}>
        <SearchIcon />
      </span>
    </div>
  );
}
