"use client";

import { useEffect, useRef, useState } from "react";
import { FILM_HTML } from "../../data/home-html";

/**
 * 18s 루프 브랜드 필름 히어로.
 * - 최초 로드 시 100vw×100vh, 스크롤에 따라 여백 14px + 라운드 24px 카드로 수축
 * - ⏸ 버튼: 모든 필름 애니메이션이 18s 주기 keyframes라 일괄 정지/재개
 */
export const HeroFilm = () => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const shrink = () => {
      const media = mediaRef.current;
      const hint = hintRef.current;
      if (!media || !hint) {
        return;
      }
      const t = Math.min(Math.max(window.scrollY / 260, 0), 1);
      const eased = 1 - Math.pow(1 - t, 2);
      media.style.marginLeft = `${14 * eased}px`;
      media.style.marginRight = `${14 * eased}px`;
      media.style.borderRadius = `${24 * eased}px`;
      hint.style.opacity = `${Math.max(1 - t * 1.8, 0)}`;
    };
    shrink();
    window.addEventListener("scroll", shrink, { passive: true });
    window.addEventListener("resize", shrink);
    return () => {
      window.removeEventListener("scroll", shrink);
      window.removeEventListener("resize", shrink);
    };
  }, []);

  return (
    <div ref={mediaRef} className={`hero-media${paused ? " paused" : ""}`}>
      <div className="film" dangerouslySetInnerHTML={{ __html: FILM_HTML }} />
      <div ref={hintRef} className="scroll-hint">
        <span>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 5.5L7 9.5L11 5.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <button
        className="hero-pause"
        aria-label={paused ? "모션 재생" : "모션 일시정지"}
        onClick={() => setPaused(prev => !prev)}
      >
        <svg className="icon-pause" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <rect x="2.5" y="1.5" width="3.2" height="11" rx="1.2" />
          <rect x="8.3" y="1.5" width="3.2" height="11" rx="1.2" />
        </svg>
        <svg className="icon-play" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M3.5 2.2C3.5 1.4 4.4.9 5.1 1.4l7 4.8c.6.4.6 1.3 0 1.7l-7 4.8c-.7.5-1.6 0-1.6-.9V2.2Z" />
        </svg>
      </button>
    </div>
  );
};
