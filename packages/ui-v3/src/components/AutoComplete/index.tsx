import { useState, useRef, useEffect, useCallback } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./AutoComplete.css";

/* ─── Types ─── */
export interface AutoCompleteOption {
  /** 고유 값 */
  value: string;
  /** 표시 라벨 */
  label: string;
}

export type AutoCompleteSize = "small" | "medium" | "large";

export interface AutoCompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> {
  /** 옵션 목록 */
  options: AutoCompleteOption[];
  /** 다중 선택 모드 */
  multiple?: boolean;
  /** 선택된 값 (single: string, multiple: string[]) */
  value?: string | string[];
  /** 선택 변경 콜백 (single: string, multiple: string[]) */
  onChange?: (value: string | string[], option: AutoCompleteOption) => void;
  /** 입력 텍스트 변경 콜백 (외부 필터링용) */
  onInputChange?: (text: string) => void;
  /** 사이즈 */
  inputSize?: AutoCompleteSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 결과 없을 때 메시지 */
  noResultText?: string;
  /** wrapper className */
  className?: string;
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

/* ─── Component ─── */

/**
 * **AutoComplete**
 *
 * 텍스트 입력 시 매칭되는 옵션을 드롭다운으로 표시하는 자동완성 컴포넌트.
 *
 * - `multiple`: false(단일) — input에 선택값 표시 / true(다중) — 아래에 badge 태그
 * - `options`: 전체 옵션 목록
 * - `value`: 선택된 값 (단일: string, 다중: string[])
 * - `onChange`: 옵션 선택 시 콜백
 * - `onInputChange`: 입력 텍스트 변경 콜백 (서버 필터링 등)
 * - `inputSize`: small(30) / medium(38) / large(46)
 */
export function AutoComplete({
  options,
  multiple = false,
  value,
  onChange,
  onInputChange,
  inputSize = "medium",
  disabled = false,
  noResultText = "검색 결과가 없습니다",
  placeholder,
  className,
  ...rest
}: AutoCompleteProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── normalize value ─── */
  const selectedValues: string[] = multiple
    ? (Array.isArray(value) ? value : [])
    : (typeof value === "string" && value ? [value] : []);

  const [inputText, setInputText] = useState(() => {
    if (multiple) return "";
    const found = options.find((o) => o.value === value);
    return found ? found.label : "";
  });
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  /* ─── sync input text when value changes externally (single mode) ─── */
  useEffect(() => {
    if (!multiple && !isOpen) {
      const found = options.find((o) => o.value === value);
      setInputText(found ? found.label : "");
    }
  }, [value, options, isOpen, multiple]);

  /* ─── filter options ─── */
  const filtered = options.filter((o) => {
    if (multiple && selectedValues.includes(o.value)) return false;
    if (!inputText) return true;
    return o.label.toLowerCase().includes(inputText.toLowerCase());
  });

  /* ─── click outside ─── */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ─── select handler ─── */
  const handleSelect = useCallback(
    (option: AutoCompleteOption) => {
      setHighlightIndex(-1);

      if (multiple) {
        const next = [...selectedValues, option.value];
        setInputText("");
        setIsOpen(false);
        onChange?.(next, option);
      } else {
        setInputText(option.label);
        setIsOpen(false);
        onChange?.(option.value, option);
      }
    },
    [onChange, multiple, selectedValues],
  );

  /* ─── remove badge (multiple) ─── */
  const handleRemove = useCallback(
    (val: string) => {
      const next = selectedValues.filter((v) => v !== val);
      const removed = options.find((o) => o.value === val);
      onChange?.(next, removed ?? { value: val, label: val });
    },
    [onChange, selectedValues, options],
  );

  /* ─── keyboard navigation ─── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightIndex(-1);
        break;
    }
  };

  /* ─── input change ─── */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    setIsOpen(true);
    setHighlightIndex(-1);
    onInputChange?.(text);
  };

  /* ─── should show panel ─── */
  const showPanel = isOpen && (multiple ? true : inputText.length > 0);

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)}>
      <div className={s.inputWrapper({ size: inputSize, open: isOpen, disabled })}>
        <input
          ref={inputRef}
          className={s.input}
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          {...rest}
        />
        <span className={s.suffixGroup}>
          <span className={s.divider} />
          <span className={s.searchIcon}>
            <SearchIcon />
          </span>
        </span>
      </div>

      {/* badges (multiple mode) */}
      {multiple && selectedValues.length > 0 && (
        <div className={s.badgesArea}>
          {selectedValues.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <span key={val} className={s.badge}>
                {opt?.label ?? val}
                {!disabled && (
                  <button
                    type="button"
                    className={s.badgeRemove}
                    onClick={() => handleRemove(val)}
                    aria-label={`${opt?.label ?? val} 제거`}
                  >
                    <XIcon />
                  </button>
                )}
              </span>
            );
          })}
        </div>
      )}

      {/* dropdown panel */}
      {showPanel && (
        <ul className={s.panel} role="listbox">
          {filtered.length > 0 ? (
            filtered.map((opt, idx) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={selectedValues.includes(opt.value)}
                className={s.option({ highlighted: idx === highlightIndex })}
                onMouseEnter={() => setHighlightIndex(idx)}
                onMouseLeave={() => setHighlightIndex(-1)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(opt);
                }}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className={s.noResult}>{noResultText}</li>
          )}
        </ul>
      )}
    </div>
  );
}
