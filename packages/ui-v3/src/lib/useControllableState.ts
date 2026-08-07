import { useCallback, useRef, useState } from "react";

export interface UseControllableStateOptions<T> {
  /** 제어 값 — `undefined`면 uncontrolled 모드 */
  value?: T;
  /** uncontrolled 모드 초기값 (lazy initializer 지원) */
  defaultValue: T | (() => T);
  /** 변경 콜백 — controlled/uncontrolled 무관하게 항상 호출 (기존 컴포넌트 동작) */
  onChange?: (value: T) => void;
}

/**
 * controlled(`value` 전달) / uncontrolled(`defaultValue`) 상태를 통합하는 훅.
 *
 * 기존 컴포넌트들의 패턴을 그대로 추출:
 * ```ts
 * const isControlled = controlledValue !== undefined;
 * const value = isControlled ? controlledValue : internalValue;
 * const set = (next) => { if (!isControlled) setInternalValue(next); onChange?.(next); };
 * ```
 *
 * 반환된 setter는 React의 state setter처럼 참조가 안정적이다.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (next: T) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  /* setter 참조 안정성을 위해 최신 값을 ref로 유지 */
  const isControlledRef = useRef(isControlled);
  isControlledRef.current = isControlled;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback((next: T) => {
    if (!isControlledRef.current) setInternalValue(next);
    onChangeRef.current?.(next);
  }, []);

  return [currentValue, setValue];
}
