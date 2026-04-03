import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./QuickMenu.css";

export interface QuickMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /** 아이콘 */
  icon: ReactNode;
  /** 라벨 */
  label: string;
  /** 활성(선택) 상태 */
  active?: boolean;
}

/**
 * **QuickMenuItem**
 *
 * 퀵 메뉴 아이콘 항목. 카드 전체에 그래디언트 hover/active 효과.
 *
 * ```tsx
 * <QuickMenuItem icon={<FileIcon />} label="계약" />
 * <QuickMenuItem icon={<FileIcon />} label="소송" active />
 * ```
 */
export function QuickMenuItem({
  icon,
  label,
  active = false,
  className,
  ...rest
}: QuickMenuItemProps) {
  return (
    <div
      className={cx(s.quickMenuItem, active && s.quickMenuItemActive, className)}
      {...rest}
    >
      <div className={cx(s.quickMenuIconWrapper, active && s.quickMenuIconWrapperActive)}>
        {icon}
      </div>
      <span className={cx(s.quickMenuLabel, active && s.quickMenuLabelActive)}>
        {label}
      </span>
    </div>
  );
}
