import type { ReactNode, MouseEventHandler } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Alert.css";

/* ─── Types ─── */
export type AlertType = "info" | "confirm" | "secret" | "saveTemporarily";
export type AlertSize = "small" | "medium";

export interface AlertAction {
  label: string;
  intent?: "primary" | "warning" | "danger" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface AlertProps {
  /** 알림 유형 */
  type?: AlertType;
  /** 크기 */
  size?: AlertSize;
  /** 알림 텍스트 */
  children: ReactNode;
  /** 제목 (expanded layout) */
  title?: string;
  /** 아이콘 (ReactNode로 커스텀 가능) */
  icon?: ReactNode;
  /** 닫기 버튼 표시 */
  closable?: boolean;
  /** 닫기 클릭 핸들러 */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /** 텍스트 버튼 */
  textButton?: { label: string; onClick?: MouseEventHandler<HTMLButtonElement> };
  /** 액션 버튼들 (승인/반려 등) */
  actions?: AlertAction[];
  /** 추가 className */
  className?: string;
}

/* ─── Default Icons (inline SVG) ─── */
const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 0.333C3.32 0.333 0.333 3.32 0.333 7S3.32 13.667 7 13.667 13.667 10.68 13.667 7 10.68 0.333 7 0.333Zm0.667 10H6.333V6.333h1.334v4Zm0-5.333H6.333V3.667h1.334V5Z"
      fill="currentColor"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 7a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 1.75c-2.338 0-7 1.175-7 3.5V14h14v-1.75c0-2.325-4.663-3.5-7-3.5Z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1 1 9M1 1l8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const defaultIcons: Record<AlertType, ReactNode> = {
  info: <InfoIcon />,
  confirm: <UserIcon />,
  secret: <InfoIcon />,
  saveTemporarily: <UserIcon />,
};

/* ─── Component ─── */
export function Alert({
  type = "info",
  size = "medium",
  children,
  title,
  icon,
  closable = false,
  onClose,
  textButton,
  actions: actionButtons,
  className,
}: AlertProps) {
  const resolvedIcon = icon ?? defaultIcons[type];

  return (
    <div className={cx(s.root({ type, size }), className)} role="alert">
      {/* Icon */}
      <span className={cx(s.iconWrapper({ size }), s.iconColor[type])}>
        {resolvedIcon}
      </span>

      {/* Content */}
      <div className={s.content}>
        {title && <div className={s.title}>{title}</div>}
        <div className={s.description}>{children}</div>
      </div>

      {/* Text Button */}
      {textButton && (
        <button type="button" className={s.textButton} onClick={textButton.onClick}>
          {textButton.label}
        </button>
      )}

      {/* Action Buttons */}
      {actionButtons && actionButtons.length > 0 && (
        <div className={s.actions}>
          {actionButtons.map((action) => (
            <button
              key={action.label}
              type="button"
              className={s.actionButton({ intent: action.intent })}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Close Button */}
      {closable && (
        <button
          type="button"
          className={s.closeButton}
          onClick={onClose}
          aria-label="닫기"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
