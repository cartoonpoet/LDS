import { useState, useRef, useCallback } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { useDismissibleLayer } from "../../lib/useDismissibleLayer";
import * as s from "./TagSelect.css";

export interface TagSelectOption {
  /** 고유 값 */
  value: string;
  /** 표시 라벨 */
  label: string;
}

export interface TagSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 옵션 목록 */
  options: TagSelectOption[];
  /** 선택된 값 목록 */
  value: string[];
  /** 선택 변경 콜백 */
  onChange: (value: string[]) => void;
  /** placeholder */
  placeholder?: string;
  /** 비활성화 */
  disabled?: boolean;
}

/* ─── Icons ─── */
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const XIcon = () => (
  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1 1 6M1 1l5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * **TagSelect**
 *
 * 드롭다운 셀렉트 + 선택된 항목을 아래 태그 뱃지로 표시.
 *
 * ```tsx
 * <TagSelect
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B" },
 *   ]}
 *   value={["a"]}
 *   onChange={(v) => setValue(v)}
 *   placeholder="Placeholder"
 * />
 * ```
 */
export function TagSelect({
  options,
  value,
  onChange,
  placeholder = "Placeholder",
  disabled = false,
  className,
  ...rest
}: TagSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(
    (optValue: string) => {
      if (value.includes(optValue)) {
        onChange(value.filter((v) => v !== optValue));
      } else {
        onChange([...value, optValue]);
      }
    },
    [value, onChange],
  );

  const remove = useCallback(
    (optValue: string) => {
      onChange(value.filter((v) => v !== optValue));
    },
    [value, onChange],
  );

  /* 외부 클릭 닫기 (ESC 없음 — 기존 동작) */
  useDismissibleLayer({
    enabled: open,
    ref: wrapperRef,
    closeOnEscape: false,
    onDismiss: () => {
      setOpen(false);
      setSearch("");
    },
  });

  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selectedOptions = options.filter((o) => value.includes(o.value));

  return (
    <div ref={wrapperRef} className={cx(s.root, className)} {...rest}>
      {/* Trigger */}
      <div className={s.trigger} onClick={() => !disabled && setOpen(!open)}>
        <input
          className={s.triggerInput}
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => !disabled && setOpen(true)}
          disabled={disabled}
        />
        <span className={s.triggerIcon}>
          <SearchIcon />
        </span>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div className={s.panel}>
          <div className={s.menu}>
            {filtered.map((opt) => {
              const selected = value.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={s.option}
                  onClick={() => toggle(opt.value)}
                >
                  <span
                    className={cx(s.optionCheck, selected && s.optionCheckSelected)}
                  >
                    {selected && <CheckIcon />}
                  </span>
                  {opt.label}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className={s.option} style={{ cursor: "default", color: "rgb(158,167,184)" }}>
                검색 결과 없음
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {selectedOptions.length > 0 && (
        <div className={s.tags}>
          {selectedOptions.map((opt) => (
            <span key={opt.value} className={s.tag}>
              {opt.label}
              {!disabled && (
                <button
                  type="button"
                  className={s.tagRemove}
                  onClick={() => remove(opt.value)}
                  aria-label={`${opt.label} 제거`}
                >
                  <XIcon />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
