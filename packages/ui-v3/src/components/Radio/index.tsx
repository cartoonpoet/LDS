import { useCallback, createContext, useContext } from "react";
import type { InputHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Radio.css";

export type RadioSize = "small" | "medium" | "large";
export type RadioVariant = "basic" | "customized";

/* ═══════════════════════════════════════════
   RadioGroup Context
   ═══════════════════════════════════════════ */

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

/* ═══════════════════════════════════════════
   Radio
   ═══════════════════════════════════════════ */

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** 사이즈 */
  size?: RadioSize;
  /** 스타일 변형: basic(원형 fill) / customized(원형 border) */
  variant?: RadioVariant;
  /** 라벨 텍스트 */
  label?: string;
  /** 라디오 값 */
  value?: string;
  /** 선택 상태 */
  checked?: boolean;
  /** 변경 핸들러 */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * **Radio**
 *
 * 라디오 버튼.
 *
 * - `variant`: basic(파란 원) / customized(파란 테두리)
 * - `size`: small(12px) / medium(14px) / large(18px)
 * - `RadioGroup`과 함께 사용하면 name/value 자동 관리
 *
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected}>
 *   <Radio value="a" label="Option A" />
 *   <Radio value="b" label="Option B" />
 * </RadioGroup>
 * ```
 */
export function Radio({
  size: sizeProp,
  variant: variantProp,
  label,
  value,
  checked: checkedProp,
  disabled: disabledProp,
  onCheckedChange,
  onChange,
  className,
  name: nameProp,
  ...rest
}: RadioProps) {
  const group = useContext(RadioGroupContext);

  const size = sizeProp ?? group.size ?? "medium";
  const variant = variantProp ?? group.variant ?? "basic";
  const disabled = disabledProp ?? group.disabled ?? false;
  const name = nameProp ?? group.name;
  const checked = checkedProp ?? (group.value !== undefined && group.value === value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (group.onChange && value !== undefined) {
        group.onChange(value);
      }
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    },
    [group, value, onCheckedChange, onChange],
  );

  return (
    <label className={cx(s.wrapper, disabled && s.wrapperDisabled, className)}>
      <input
        type="radio"
        className={s.hiddenInput}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span className={s.circle({ size, variant, checked, disabled })} />
      {label && (
        <span className={s.label({ size, disabled })}>{label}</span>
      )}
    </label>
  );
}

/* ═══════════════════════════════════════════
   RadioGroup
   ═══════════════════════════════════════════ */

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 그룹 name (자동 생성 가능) */
  name?: string;
  /** 선택된 값 */
  value?: string;
  /** 선택 변경 콜백 */
  onChange?: (value: string) => void;
  /** 공통 사이즈 */
  size?: RadioSize;
  /** 공통 스타일 변형 */
  variant?: RadioVariant;
  /** 공통 비활성화 */
  disabled?: boolean;
  /** 수직 정렬 */
  vertical?: boolean;
  children: ReactNode;
}

/**
 * **RadioGroup**
 *
 * Radio를 그룹으로 묶어 name/value를 자동 관리합니다.
 *
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected} name="plan">
 *   <Radio value="free" label="Free" />
 *   <Radio value="pro" label="Pro" />
 * </RadioGroup>
 * ```
 */
export function RadioGroup({
  name,
  value,
  onChange,
  size,
  variant,
  disabled,
  vertical = false,
  children,
  className,
  ...rest
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, size, variant, disabled }}>
      <div
        role="radiogroup"
        className={cx(s.group, vertical && s.groupVertical, className)}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
