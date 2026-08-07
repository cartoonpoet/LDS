import { useEffect } from "react";

/**
 * body 스크롤락 획득/복원 훅.
 *
 * 기존 Modal/SweetAlert/FullScreenModal/Drawer의 패턴 그대로:
 * 활성화 시 `document.body.style.overflow`를 `"hidden"`으로 바꾸고,
 * 해제 시 이전 인라인 값으로 복원한다.
 * (중첩 시 안쪽 오버레이가 바깥의 `"hidden"`을 이전 값으로 복원 — 기존 동작 동일)
 */
export function useScrollLock(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [enabled]);
}
