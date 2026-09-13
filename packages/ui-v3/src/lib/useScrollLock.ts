import { useEffect } from "react";

let lockCount = 0;
let previousOverflow = "";

/**
 * body 스크롤락 획득/복원 훅. 참조 카운트 방식.
 *
 * 여러 오버레이가 동시에 활성화돼 있어도 마지막 락이 해제될 때만
 * `document.body.style.overflow`를 원래 값으로 복원한다.
 * (예: Modal 위에 SweetAlert 확인창을 띄운 뒤 Modal이 먼저 닫혀도,
 *  SweetAlert가 아직 열려 있으면 스크롤이 풀리지 않는다.)
 */
export function useScrollLock(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [enabled]);
}
