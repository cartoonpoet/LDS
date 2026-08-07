import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Portal } from "../../lib/Portal";
import { useDismissibleLayer } from "../../lib/useDismissibleLayer";
import { useFocusTrap } from "../../lib/useFocusTrap";
import { usePresence } from "../../lib/usePresence";
import { useScrollLock } from "../../lib/useScrollLock";
import { ModalBody, ModalFooter } from "../Modal";
import * as modal from "../Modal/Modal.css";
import * as s from "./Drawer.css";

/* ─── Types ─── */
export type DrawerSide = "right" | "left";
export type DrawerSize = "small" | "medium" | "large";

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 표시 여부 */
  open: boolean;
  /** 닫기 핸들러 (Escape, backdrop 클릭, close 버튼) */
  onClose: () => void;
  /** 슬라이드 인 방향 */
  side?: DrawerSide;
  /** 패널 너비 프리셋 — small 360px / medium 480px / large 640px */
  size?: DrawerSize;
  /** 헤더 타이틀 (간편 API) */
  title?: ReactNode;
  /** 푸터 콘텐츠 (간편 API) */
  footer?: ReactNode;
  /** dim 배경 + 클릭 닫기. false면 비차단(페이지 조작 가능) */
  backdrop?: boolean;
  /** Escape 키 닫기 */
  closeOnEscape?: boolean;
  /** 패널 본문 */
  children?: ReactNode;
}

/* ─── Close Icon (inline SVG) ─── */
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 2 12M2 2l10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/**
 * **Drawer**
 *
 * 화면 가장자리에서 슬라이드 인 하는 패널 프리미티브.
 * 계약 상세, 필터 패널 등 흐름을 떠나지 않는 부가 작업에 사용합니다.
 *
 * - `side`: right(기본) / left
 * - `size`: small 360px / medium 480px / large 640px
 * - `backdrop`: true(기본)면 dim + 클릭 닫기 + 스크롤락, false면 비차단
 * - `closeOnEscape`: Escape 닫기 (기본 on)
 * - Modal과 같은 헤더(타이틀 + 닫기 X) / 스크롤 바디 / 푸터 구조
 */
export function Drawer({
  open,
  onClose,
  side = "right",
  size = "medium",
  title,
  footer,
  backdrop = true,
  closeOnEscape = true,
  children,
  className,
  ...rest
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  /* 슬라이드 아웃 트랜지션 동안 마운트 유지 */
  const { mounted, exiting } = usePresence(open, s.TRANSITION_MS);

  /* Escape key */
  useDismissibleLayer({
    enabled: open,
    onDismiss: onClose,
    closeOnEscape,
    closeOnOutsideClick: false,
    stopEscapePropagation: true,
  });

  /* Body scroll lock (backdrop일 때만 — 비차단 모드는 페이지 조작 유지) */
  useScrollLock(open && backdrop);

  /* Focus trap (차단 모드일 때만)
     Portal이 한 커밋 늦게 DOM을 붙이므로, 패널이 커밋된 뒤에 활성화 */
  const [trapReady, setTrapReady] = useState(false);
  useEffect(() => {
    setTrapReady(open);
  }, [open]);
  useFocusTrap(panelRef, open && backdrop && trapReady);

  if (!mounted) return null;

  const closing = !open;

  const panelNode = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={backdrop ? "true" : undefined}
      aria-labelledby={title != null ? titleId : undefined}
      className={cx(s.panel({ side, size, closing }), className)}
      {...rest}
    >
      {/* 간편 API: title prop이 있으면 자동 Header 생성 */}
      {title != null && (
        <div className={modal.header}>
          <div className={modal.headerTitle} id={titleId}>
            {title}
          </div>
          <button
            type="button"
            className={modal.closeButton}
            onClick={onClose}
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* 간편 API: title이 있으면 children을 Body로 감쌈 */}
      {title != null ? <ModalBody>{children}</ModalBody> : children}

      {/* 간편 API: footer prop이 있으면 자동 Footer 생성 */}
      {footer != null && <ModalFooter>{footer}</ModalFooter>}
    </div>
  );

  return (
    <Portal>
      {backdrop ? (
        <div
          className={s.overlay({ closing })}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {panelNode}
        </div>
      ) : (
        panelNode
      )}
    </Portal>
  );
}
