"use client";

import { useEffect } from "react";

/**
 * 홈 전용 런타임 이펙트 (시안 스크립트의 충실한 포팅):
 * - IntersectionObserver 스크롤 reveal
 * - 통계 카운트업 (0 → 128)
 * (마퀴 트랙 복제는 추출 단계에서 정적으로 처리됨)
 */
export const HomeEffects = () => {
  useEffect(() => {
    const revealIO = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach(el => revealIO.observe(el));

    const countEl = document.querySelector<HTMLElement>("[data-count]");
    let countIO: IntersectionObserver | null = null;
    if (countEl && !countEl.dataset.counted) {
      countIO = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting || countEl.dataset.counted) {
              return;
            }
            countEl.dataset.counted = "1";
            const target = Number.parseInt(countEl.getAttribute("data-count") ?? "0", 10);
            let start: number | null = null;
            const tick = (timestamp: number) => {
              if (start === null) {
                start = timestamp;
              }
              const progress = Math.min((timestamp - start) / 1400, 1);
              countEl.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
            countIO?.disconnect();
          });
        },
        { threshold: 0.4 }
      );
      countIO.observe(countEl);
    }

    return () => {
      revealIO.disconnect();
      countIO?.disconnect();
    };
  }, []);

  return null;
};
