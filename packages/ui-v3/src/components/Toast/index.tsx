import { useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Portal } from "../../lib/Portal";
import * as s from "./Toast.css";

/* ─── Types ─── */
export type ToastIntent = "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** 아이콘 색상 의도 */
  intent?: ToastIntent;
  /** 커스텀 아이콘 (기본 제공) */
  icon?: ReactNode;
  /** 제목 */
  title: string;
  /** 시간 텍스트 (예: "11 mins ago") */
  time?: string;
  /** 본문 설명 (2-row) */
  description?: string;
  /** 프로그레스 바 표시 */
  showProgress?: boolean;
  /** 프로그레스 퍼센트 (0-100) */
  progress?: number;
  /** 자동 닫기 시간 (ms, 0이면 비활성) */
  duration?: number;
  /** 닫기 콜백 */
  onClose?: () => void;
}

/* ─── Default Icons ─── */
const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1Zm.5 9h-1V6h1v4Zm0-5h-1V4h1v1Z" fill="currentColor" />
  </svg>
);
const SuccessIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1Zm3.1 4.4-3.8 4a.5.5 0 0 1-.36.16.5.5 0 0 1-.36-.15L3.9 7.73a.5.5 0 0 1 .72-.7l1.32 1.35 3.44-3.6a.5.5 0 1 1 .72.7Z" fill="currentColor" />
  </svg>
);
const WarningIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4 11.5 7.9 1.5a1 1 0 0 0-1.8 0L.6 11.5a1 1 0 0 0 .9 1.5h11a1 1 0 0 0 .9-1.5ZM7.5 11h-1V9.5h1V11Zm0-3h-1V5h1v3Z" fill="currentColor" />
  </svg>
);
const ErrorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1Zm2.83 8.12a.5.5 0 0 1-.71.71L7 7.71 4.88 9.83a.5.5 0 0 1-.71-.71L6.29 7 4.17 4.88a.5.5 0 1 1 .71-.71L7 6.29l2.12-2.12a.5.5 0 0 1 .71.71L7.71 7l2.12 2.12Z" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1 1 7M1 1l6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const defaultIcons: Record<ToastIntent, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/**
 * **Toast**
 *
 * 알림 토스트 메시지.
 *
 * - `intent`: info / success / warning / error
 * - `title` + `description`: 1줄 또는 2줄
 * - `showProgress` + `progress`: 하단 프로그레스 바
 * - `duration`: 자동 닫기 (기본 5000ms, 0이면 비활성)
 */
export function Toast({
  intent = "info",
  icon,
  title,
  time,
  description,
  showProgress = false,
  progress = 0,
  duration = 5000,
  onClose,
  className,
  ...rest
}: ToastProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration <= 0 || !onClose) return;
    timerRef.current = setTimeout(onClose, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, onClose]);

  return (
    <div className={cx(s.root, className)} role="alert" {...rest}>
      {/* Top row */}
      <div className={s.top}>
        <div className={s.icon({ intent })}>
          {icon ?? defaultIcons[intent]}
        </div>
        <div className={s.titleArea}>
          <span className={s.heading}>{title}</span>
          {time && <span className={s.time}>{time}</span>}
        </div>
        {onClose && (
          <button type="button" className={s.closeBtn} onClick={onClose} aria-label="닫기">
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Body */}
      {description && <div className={s.body}>{description}</div>}

      {/* Progress bar */}
      {showProgress && (
        <div className={s.progressTrack}>
          <div
            className={s.progressFill({ intent })}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── ToastContainer ─── */
export interface ToastContainerProps {
  /** 화면 위치 */
  position?: ToastPosition;
  /** 토스트 목록 */
  children: ReactNode;
}

/**
 * **ToastContainer**
 *
 * 토스트를 화면 고정 위치에 렌더링하는 컨테이너.
 *
 * ```tsx
 * <ToastContainer position="top-right">
 *   <Toast title="알림" intent="success" onClose={...} />
 * </ToastContainer>
 * ```
 */
export function ToastContainer({ position = "top-right", children }: ToastContainerProps) {
  return (
    <Portal>
      <div className={s.container({ position })}>
        {children}
      </div>
    </Portal>
  );
}
