import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./DdayBadge.css";

/* ─── Types ─── */
export type DdayLevel = "dday" | "danger" | "warning" | "neutral" | "overdue";

export interface DdayBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 목표 날짜 (달력일 기준으로 D-day 계산) */
  date: Date | string;
  /** 기준일 — 기본값은 현재. 테스트/스토리에서 고정할 때 사용 */
  today?: Date | string;
}

/* ─── Helpers ─── */
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (value: Date | string) => {
  const d = typeof value === "string" ? new Date(`${value}T00:00:00`) : value;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};

const levelOf = (diff: number): DdayLevel => {
  if (diff < 0) return "overdue";
  if (diff === 0) return "dday";
  if (diff <= 3) return "danger";
  if (diff <= 7) return "warning";
  return "neutral";
};

const labelOf = (diff: number) => {
  if (diff < 0) return `D+${-diff} 경과`;
  if (diff === 0) return "D-DAY";
  return `D-${diff}`;
};

/* ─── Component ─── */
export function DdayBadge({ date, today, className, ...rest }: DdayBadgeProps) {
  const diff = Math.round((startOfDay(date) - startOfDay(today ?? new Date())) / MS_PER_DAY);
  return (
    <span className={cx(s.badge({ level: levelOf(diff) }), className)} {...rest}>
      {labelOf(diff)}
    </span>
  );
}
