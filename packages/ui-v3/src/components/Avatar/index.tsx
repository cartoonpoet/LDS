import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Avatar.css";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "away" | "busy";
export type AvatarColor =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "secondary";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 이미지 URL (photo 모드) */
  src?: string;
  /** 이니셜 텍스트 (label 모드) */
  initials?: string;
  /** 시스템 아이콘 모드 */
  system?: boolean;
  /** 커스텀 시스템 아이콘 */
  icon?: ReactNode;
  /** 사이즈 */
  size?: AvatarSize;
  /** 상태 표시 (online/away/busy) */
  status?: AvatarStatus;
  /** 이니셜 배경 색상 */
  color?: AvatarColor;
  /** alt 텍스트 */
  alt?: string;
}

/* ═══════════════════════════════════════════
   Default system icon
   ═══════════════════════════════════════════ */

function DefaultSystemIcon({ size }: { size: AvatarSize }) {
  const d = size === "sm" ? 14 : size === "lg" ? 28 : 22;
  return (
    <svg
      width={d}
      height={d}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1L13.5 7.5L20 9L13.5 11.5L11 18L8.5 11.5L2 9L8.5 7.5L11 1Z"
        fill="currentColor"
      />
      <path
        d="M17 14L18 16.5L20.5 17.5L18 18.5L17 21L16 18.5L13.5 17.5L16 16.5L17 14Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Avatar
   ═══════════════════════════════════════════ */

/**
 * **Avatar**
 *
 * 사용자 프로필 아바타.
 *
 * - **Photo**: `src` 제공 시 이미지 표시
 * - **System**: `system` 플래그로 아이콘 아바타
 * - **Label**: `initials` 제공 시 이니셜 표시
 * - `status`: online(초록) / away(노랑) / busy(빨강) 상태 점
 *
 * ```tsx
 * <Avatar src="/photo.jpg" status="online" />
 * <Avatar system />
 * <Avatar initials="PI" color="success" status="away" />
 * ```
 */
export function Avatar({
  src,
  initials,
  system = false,
  icon,
  size = "md",
  status,
  color = "success",
  alt,
  className,
  ...rest
}: AvatarProps) {
  const renderContent = () => {
    if (src) {
      return (
        <img src={src} alt={alt ?? ""} className={s.photoCircle} />
      );
    }
    if (system || icon) {
      return (
        <div className={s.systemCircle}>
          {icon ?? <DefaultSystemIcon size={size} />}
        </div>
      );
    }
    if (initials) {
      return (
        <div className={s.labelCircle({ color, size })}>
          {initials}
        </div>
      );
    }
    /* fallback: empty system */
    return (
      <div className={s.systemCircle}>
        <DefaultSystemIcon size={size} />
      </div>
    );
  };

  return (
    <div className={cx(s.avatar({ size }), className)} {...rest}>
      {renderContent()}
      {status && <span className={s.statusDot({ status, size })} />}
    </div>
  );
}

/* ═══════════════════════════════════════════
   AvatarGroup
   ═══════════════════════════════════════════ */

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * **AvatarGroup**
 *
 * 아바타를 겹쳐서 그룹으로 표시.
 *
 * ```tsx
 * <AvatarGroup>
 *   <Avatar src="/a.jpg" size="sm" />
 *   <Avatar src="/b.jpg" size="sm" />
 *   <Avatar initials="AB" size="sm" color="info" />
 * </AvatarGroup>
 * ```
 */
export function AvatarGroup({
  children,
  className,
  ...rest
}: AvatarGroupProps) {
  return (
    <div className={cx(s.group, className)} {...rest}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className={s.groupItem}>
              {child}
            </div>
          ))
        : <div className={s.groupItem}>{children}</div>}
    </div>
  );
}
