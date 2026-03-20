import { useRef, useEffect } from "react";
import type { ReactNode, ReactElement, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Portal } from "../../lib/Portal";
import { useFocusTrap } from "../../lib/useFocusTrap";
import * as s from "./SweetAlert.css";

/* ─── Types ─── */
export type SweetAlertIntent = "warning" | "success" | "danger" | "info";

export interface SweetAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 표시 여부 */
  open: boolean;
  /** 닫기 핸들러 */
  onClose: () => void;
  /** 아이콘 의도 (배경색 결정) */
  intent?: SweetAlertIntent;
  /** 커스텀 아이콘 (intent 기본 아이콘 대체) */
  icon?: ReactNode;
  /** 제목 */
  title: ReactNode;
  /** 본문 콘텐츠 */
  children?: ReactNode;
  /** 확인 버튼 라벨 */
  confirmLabel?: string;
  /** 확인 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 라벨 */
  cancelLabel?: string;
  /** 취소 핸들러 */
  onCancel?: () => void;
}

/* ─── Default Intent Icons ─── */
const WarningIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 3.333 2.5 33.333h35L20 3.333Zm0 5.774L31.547 30H8.453L20 9.107ZM18.333 25h3.334v3.333h-3.334V25Zm0-8.333h3.334v5h-3.334v-5Z"
      fill="currentColor"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 3.333C10.8 3.333 3.333 10.8 3.333 20S10.8 36.667 20 36.667 36.667 29.2 36.667 20 29.2 3.333 20 3.333Zm-3.333 25L8.333 20l2.35-2.35 5.984 5.967L29.317 11l2.35 2.367-15 15Z"
      fill="currentColor"
    />
  </svg>
);

const DangerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 3.333C10.8 3.333 3.333 10.8 3.333 20S10.8 36.667 20 36.667 36.667 29.2 36.667 20 29.2 3.333 20 3.333Zm1.667 25h-3.334v-3.333h3.334v3.333Zm0-6.666h-3.334V11.667h3.334v10Z"
      fill="currentColor"
    />
  </svg>
);

const InfoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 3.333C10.8 3.333 3.333 10.8 3.333 20S10.8 36.667 20 36.667 36.667 29.2 36.667 20 29.2 3.333 20 3.333Zm1.667 25h-3.334V18.333h3.334v10Zm0-13.333h-3.334V11.667h3.334V15Z"
      fill="currentColor"
    />
  </svg>
);

const defaultIcons: Record<SweetAlertIntent, () => ReactElement> = {
  warning: WarningIcon,
  success: SuccessIcon,
  danger: DangerIcon,
  info: InfoIcon,
};

/* ─── Main Component ─── */
export function SweetAlert({
  open,
  onClose,
  intent = "warning",
  icon,
  title,
  children,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
  className,
  ...rest
}: SweetAlertProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Escape key */
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  /* Body scroll lock */
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Focus trap */
  useFocusTrap(dialogRef, open);

  if (!open) return null;

  const DefaultIcon = defaultIcons[intent];

  return (
    <Portal>
      <div
        className={s.overlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role="alertdialog"
          aria-modal="true"
          className={cx(s.card, className)}
          {...rest}
        >
          <div className={s.iconWrapper({ intent })}>
            <span className={s.intentIconColor({ intent })}>
              {icon ?? <DefaultIcon />}
            </span>
          </div>

          <div className={s.title}>{title}</div>

          {children && <div className={s.body}>{children}</div>}

          {(confirmLabel || cancelLabel) && (
            <div className={s.actions}>
              {cancelLabel && (
                <button
                  type="button"
                  onClick={onCancel ?? onClose}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 38,
                    padding: "0 20px",
                    border: "1px solid #cfd5e1",
                    borderRadius: 5,
                    backgroundColor: "transparent",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "#4c5469",
                  }}
                >
                  {cancelLabel}
                </button>
              )}
              {confirmLabel && (
                <button
                  type="button"
                  onClick={onConfirm}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 38,
                    padding: "0 20px",
                    border: "none",
                    borderRadius: 5,
                    backgroundColor: "#2151ec",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  {confirmLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}
