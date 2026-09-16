import { useLayoutEffect, useState, type RefObject } from "react";

export interface SlidingIndicatorRect {
  left: number;
  width: number;
}

/**
 * 세그먼트 컨트롤(Tabs/ButtonGroup류)의 슬라이딩 인디케이터 위치·너비를
 * 실제 DOM 크기로 계산한다. 각 항목 엘리먼트에 `data-slide-item`을 붙여야
 * 컨테이너 안에서 인디케이터 자신과 구분해 찾을 수 있다.
 *
 * @returns 활성 항목이 없거나(activeIndex < 0) 아직 측정 전이면 null
 */
export function useSlidingIndicator(
  containerRef: RefObject<HTMLElement | null>,
  activeIndex: number,
): SlidingIndicatorRect | null {
  const [rect, setRect] = useState<SlidingIndicatorRect | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || activeIndex < 0) {
      setRect(null);
      return;
    }
    const items = container.querySelectorAll<HTMLElement>("[data-slide-item]");
    const activeEl = items[activeIndex];
    if (!activeEl) {
      setRect(null);
      return;
    }

    const update = () => setRect({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [containerRef, activeIndex]);

  return rect;
}
