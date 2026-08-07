import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export interface UseDismissibleLayerOptions {
  /** 레이어 활성 여부 (보통 open) */
  enabled: boolean;
  /** dismiss 동작 (ESC / 바깥 클릭 공통) */
  onDismiss: () => void;
  /** 바깥 클릭 판정 기준 요소 — `closeOnOutsideClick`일 때 필수 */
  ref?: RefObject<HTMLElement | null>;
  /** Escape 키로 닫기 (기본 true) */
  closeOnEscape?: boolean;
  /** 바깥 mousedown으로 닫기 (기본 true, `ref` 필요) */
  closeOnOutsideClick?: boolean;
  /** ESC 처리 시 `e.stopPropagation()` 호출 (Modal 계열 기존 동작) */
  stopEscapePropagation?: boolean;
  /** ESC 전용 dismiss — 지정 시 ESC에서는 `onDismiss` 대신 호출 (CalendarPopover의 onClose 동반 호출용) */
  onEscape?: () => void;
}

/**
 * 오버레이 dismiss(ESC 키 + 바깥 mousedown) 감지 훅.
 *
 * 기존 컴포넌트들이 각자 등록하던 document 레벨 리스너를 추출한 것으로,
 * 판정/등록 방식을 그대로 유지한다:
 * - 바깥 클릭: `mousedown`에서 `ref.current.contains(e.target)` 검사
 * - ESC: `keydown`에서 `e.key === "Escape"` 검사
 * - 각 오버레이가 독립적으로 리스너를 갖는 구조 (중첩 시 각자 닫힘 — 기존과 동일)
 */
export function useDismissibleLayer({
  enabled,
  onDismiss,
  ref,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  stopEscapePropagation = false,
  onEscape,
}: UseDismissibleLayerOptions) {
  /* 콜백 최신 참조 유지 — 리스너 등록/해제는 enabled/옵션 변화에만 반응 */
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  /* 바깥 클릭(mousedown) 닫기 */
  useEffect(() => {
    if (!enabled || !closeOnOutsideClick || !ref) return;

    function handleMouseDown(e: MouseEvent) {
      if (ref!.current && !ref!.current.contains(e.target as Node)) {
        onDismissRef.current();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [enabled, closeOnOutsideClick, ref]);

  /* Escape 키 닫기 */
  useEffect(() => {
    if (!enabled || !closeOnEscape) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (stopEscapePropagation) e.stopPropagation();
      (onEscapeRef.current ?? onDismissRef.current)();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, closeOnEscape, stopEscapePropagation]);
}
