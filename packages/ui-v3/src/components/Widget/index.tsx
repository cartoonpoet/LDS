import { useState, useCallback } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Widget.css";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export type StatValueColor =
  | "primary"
  | "heading"
  | "success"
  | "danger"
  | "warning";

/* ═══════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════ */

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Widget
   ═══════════════════════════════════════════ */

export interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
  /** 위젯 제목 */
  title?: string;
  /** 헤더 뱃지 (숫자 등) */
  badge?: ReactNode;
  /** 접기/펼치기 지원 */
  collapsible?: boolean;
  /** 접힌 상태 (controlled) */
  collapsed?: boolean;
  /** 접기 상태 변경 콜백 */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 헤더 우측 커스텀 영역 */
  extra?: ReactNode;
  /** 본문 패딩 없음 (테이블 등) */
  flush?: boolean;
  children?: ReactNode;
}

/**
 * **Widget**
 *
 * 대시보드 위젯 카드 컨테이너.
 *
 * - `title` + `badge`: 헤더 영역
 * - `collapsible`: 접기/펼치기 토글
 * - `flush`: 본문 패딩 제거 (테이블 위젯용)
 *
 * ```tsx
 * <Widget title="통계" badge={5} collapsible>
 *   <StatGrid>
 *     <StatCell label="건수" value={120} />
 *   </StatGrid>
 * </Widget>
 * ```
 */
export function Widget({
  title,
  badge,
  collapsible = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  extra,
  flush = false,
  children,
  className,
  ...rest
}: WidgetProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  const toggleCollapse = useCallback(() => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }, [isCollapsed, onCollapsedChange]);

  return (
    <div className={cx(s.widget, className)} {...rest}>
      {title && (
        <>
          <div className={s.widgetHeader}>
            <div className={s.headerLeft}>
              <span className={s.headerTitle}>{title}</span>
              {badge !== undefined && (
                <span className={s.headerBadge}>{badge}</span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {extra}
              {collapsible && (
                <button
                  type="button"
                  className={cx(
                    s.collapseButton,
                    !isCollapsed && s.collapseButtonOpen,
                  )}
                  onClick={toggleCollapse}
                  aria-label={isCollapsed ? "펼치기" : "접기"}
                >
                  <ChevronDownIcon />
                </button>
              )}
            </div>
          </div>
          <div className={s.divider} />
        </>
      )}
      {!isCollapsed && (
        <div className={flush ? s.widgetBodyFlush : s.widgetBody}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   StatCell
   ═══════════════════════════════════════════ */

export interface StatCellProps extends HTMLAttributes<HTMLDivElement> {
  /** 라벨 */
  label: string;
  /** 값 (숫자 또는 문자열) */
  value: ReactNode;
  /** 값 색상 */
  valueColor?: StatValueColor;
  /** 활성 상태 */
  active?: boolean;
}

/**
 * **StatCell**
 *
 * 통계 수치 표시 셀. 라벨 + 큰 숫자.
 *
 * ```tsx
 * <StatCell label="총 건수" value={120} valueColor="primary" />
 * ```
 */
export function StatCell({
  label,
  value,
  valueColor = "primary",
  active = false,
  className,
  ...rest
}: StatCellProps) {
  return (
    <div className={cx(s.statCell({ active }), className)} {...rest}>
      <span className={s.statLabel}>{label}</span>
      <span className={s.statValue({ color: valueColor })}>{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   StatGrid
   ═══════════════════════════════════════════ */

export interface StatGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * **StatGrid**
 *
 * StatCell을 가로로 배치하는 그리드 컨테이너.
 *
 * ```tsx
 * <StatGrid>
 *   <StatCell label="건수" value={120} />
 *   <StatCell label="완료" value={80} valueColor="success" />
 * </StatGrid>
 * ```
 */
export function StatGrid({
  children,
  className,
  ...rest
}: StatGridProps) {
  return (
    <div className={cx(s.statGrid, className)} {...rest}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   QuickMenuItem
   ═══════════════════════════════════════════ */

export interface QuickMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /** 아이콘 */
  icon: ReactNode;
  /** 라벨 */
  label: string;
}

/**
 * **QuickMenuItem**
 *
 * 퀵 메뉴 아이콘 항목. 그래디언트 원형 아이콘 + 라벨.
 *
 * ```tsx
 * <QuickMenuItem icon={<FileIcon />} label="계약" />
 * ```
 */
export function QuickMenuItem({
  icon,
  label,
  className,
  ...rest
}: QuickMenuItemProps) {
  return (
    <div className={cx(s.quickMenu, className)} {...rest}>
      <div className={s.quickMenuIcon}>{icon}</div>
      <span className={s.quickMenuLabel}>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ScheduleItem
   ═══════════════════════════════════════════ */

export interface ScheduleItemProps extends HTMLAttributes<HTMLDivElement> {
  /** 날짜 텍스트 */
  date: string;
  /** 제목 */
  title: string;
  /** 본문 */
  body?: string;
  /** 상태 뱃지 영역 */
  badges?: ReactNode;
}

/**
 * **ScheduleItem**
 *
 * 일정 카드 항목.
 *
 * ```tsx
 * <ScheduleItem date="2025.03.21" title="계약 검토" body="본문 내용..." />
 * ```
 */
export function ScheduleItem({
  date,
  title,
  body,
  badges,
  className,
  ...rest
}: ScheduleItemProps) {
  return (
    <div className={cx(s.scheduleItem, className)} {...rest}>
      <div className={s.scheduleTop}>
        <span className={s.scheduleDate}>{date}</span>
        {badges}
      </div>
      <span className={s.scheduleTitle}>{title}</span>
      {body && <span className={s.scheduleBody}>{body}</span>}
    </div>
  );
}
