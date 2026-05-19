import { useEffect, useRef, useId, createContext, useContext } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { toast, ToastContainer as RTToastContainer } from "react-toastify";
import type { Id, ToastContentProps } from "react-toastify";
import * as s from "./Toast.css";

/* ─── containerId context (docs 페이지 다중 컨테이너 충돌 방지) ─── */
const ToastContainerIdContext = createContext<string | undefined>(undefined);

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
  /** 프로그레스 바 표시 (수동 제어용) */
  showProgress?: boolean;
  /** 프로그레스 퍼센트 (0-100, 수동 제어용) */
  progress?: number;
  /** 자동 닫기 시간 (ms, 0이면 비활성) */
  duration?: number;
  /** 호버 시 자동 닫기 일시정지 */
  pauseOnHover?: boolean;
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

/* ─── LDSToastContent (internal) ─── */
interface LDSToastContentProps {
  intent: ToastIntent;
  icon?: ReactNode;
  title: string;
  time?: string;
  description?: string;
  showProgress?: boolean;
  progress?: number;
  hasClose: boolean;
  closeToast?: () => void;
}

function LDSToastContent({
  intent,
  icon,
  title,
  time,
  description,
  showProgress,
  progress,
  hasClose,
  closeToast,
}: LDSToastContentProps) {
  return (
    <div className={s.root} role="alert">
      {/* Top row */}
      <div className={s.top}>
        <div className={s.icon({ intent })}>
          {icon ?? defaultIcons[intent]}
        </div>
        <div className={s.titleArea}>
          <span className={s.heading}>{title}</span>
          {time && <span className={s.time}>{time}</span>}
        </div>
        {hasClose && (
          <button type="button" className={s.closeBtn} onClick={() => closeToast?.()} aria-label="닫기">
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Body */}
      {description && <div className={s.body}>{description}</div>}

      {/* Manual progress bar */}
      {showProgress && (
        <div className={s.progressTrack}>
          <div
            className={s.progressFill({ intent })}
            style={{ width: `${Math.min(100, Math.max(0, progress ?? 0))}%` }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * **Toast**
 *
 * 알림 토스트 메시지. react-toastify를 내부 엔진으로 사용.
 *
 * - `intent`: info / success / warning / error
 * - `title` + `description`: 1줄 또는 2줄
 * - `showProgress` + `progress`: 하단 프로그레스 바 (수동 제어)
 * - `duration`: 자동 닫기 (기본 5000ms, 0이면 비활성)
 * - `pauseOnHover`: 호버 시 자동 닫기 일시정지 (기본 true)
 * - 자동 닫기 시 react-toastify 카운트다운 바 (intent 색상)
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
  pauseOnHover = true,
  onClose,
}: ToastProps) {
  const toastIdRef = useRef<Id | null>(null);
  const isCleaningUpRef = useRef(false);
  const containerId = useContext(ToastContainerIdContext);

  useEffect(() => {
    isCleaningUpRef.current = false;
    const id = toast(
      ({ closeToast }: ToastContentProps) => (
        <LDSToastContent
          intent={intent}
          icon={icon}
          title={title}
          time={time}
          description={description}
          showProgress={showProgress}
          progress={progress}
          hasClose={!!onClose}
          closeToast={closeToast}
        />
      ),
      {
        containerId,
        autoClose: duration === 0 || !onClose ? false : duration,
        pauseOnHover,
        // isCleaningUpRef 가드: 언마운트 시 dismiss로 인한 onClose 발화 방지
        onClose: onClose ? () => { if (!isCleaningUpRef.current) onClose(); } : undefined,
        closeButton: false,
        icon: false,
        className: s.toastOverride({ intent }),
        hideProgressBar: showProgress || duration === 0 || !onClose,
      },
    );
    toastIdRef.current = id;

    return () => {
      if (toastIdRef.current !== null) {
        isCleaningUpRef.current = true;
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    };
  // Props are snapshot on mount. Dynamic prop changes are not reflected in a live toast.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

/* ─── ToastContainer ─── */
export interface ToastContainerProps {
  /** 화면 위치 */
  position?: ToastPosition;
  /** 토스트 트리거 컴포넌트 목록 */
  children?: ReactNode;
}

/**
 * **ToastContainer**
 *
 * 토스트를 화면 고정 위치에 렌더링하는 컨테이너.
 * react-toastify의 ToastContainer를 래핑한다.
 *
 * ```tsx
 * <ToastContainer position="top-right">
 *   <Toast title="알림" intent="success" onClose={...} />
 * </ToastContainer>
 * ```
 */
export function ToastContainer({ position = "top-right", children }: ToastContainerProps) {
  const id = useId();
  return (
    <ToastContainerIdContext.Provider value={id}>
      {children}
      <RTToastContainer
        containerId={id}
        position={position}
        closeButton={false}
        icon={false}
        style={{ width: 380 }}
      />
    </ToastContainerIdContext.Provider>
  );
}
