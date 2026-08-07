import { useEffect, useRef, useState } from "react";

/**
 * 닫힘 트랜지션 동안 마운트를 유지하는 훅.
 *
 * open → 즉시 마운트, close → `exiting` 상태로 전환 클래스 적용 후
 * `exitDuration`(ms) 타이머가 끝나면 언마운트. (jsdom에서 transitionend가
 * 오지 않는 문제를 피하려고 기존 Drawer가 쓰던 setTimeout 방식 그대로)
 *
 * @returns `mounted` — 렌더 유지 여부(`open || exiting`), `exiting` — 닫힘 트랜지션 중 여부
 */
export function usePresence(open: boolean, exitDuration: number) {
  const [exiting, setExiting] = useState(false);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current && !open) {
      prevOpen.current = open;
      setExiting(true);
      const timer = setTimeout(() => setExiting(false), exitDuration);
      return () => clearTimeout(timer);
    }
    prevOpen.current = open;
  }, [open, exitDuration]);

  return { mounted: open || exiting, exiting };
}
