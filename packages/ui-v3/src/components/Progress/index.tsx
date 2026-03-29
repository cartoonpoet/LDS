import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Progress.css";
import type { IconName } from "../Icon/types";
import { iconRegistry } from "../Icon/registry";

/* ─── ProgressBar Types ─── */
export type ProgressColor = "primary" | "success" | "danger" | "warning" | "info";

export interface ProgressSegment {
  value: number;
  color?: ProgressColor;
  label?: string;
}

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 진행률 (0-100) */
  value?: number;
  /** 바 색상 */
  color?: ProgressColor;
  /** 스트라이프 패턴 */
  striped?: boolean;
  /** 스트라이프 애니메이션 */
  animated?: boolean;
  /** 값 표시 */
  showValue?: boolean;
  /** 멀티 바 세그먼트 (value/color 대신 사용) */
  segments?: ProgressSegment[];
}

/* ─── StepBar Types ─── */
export type StepStatus = "completed" | "active" | "scheduled";

export interface StepItem {
  /** 단계 라벨 */
  label: string;
  /** 단계 상태 */
  status: StepStatus;
  /** 커스텀 아이콘 — 아이콘 이름(string) 또는 ReactNode */
  icon?: Exclude<ReactNode, string> | IconName;
}

export interface StepBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 단계 목록 */
  steps: StepItem[];
}

/* ─── Default Step Icons ─── */
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 12.15 3.6 9l-1.05 1.05L6.75 14.25l9-9-1.05-1.05-7.95 7.95Z" fill="currentColor" />
  </svg>
);

const ActiveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="4" fill="currentColor" />
  </svg>
);

const ScheduledIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const defaultStepIcons: Record<StepStatus, () => React.ReactElement> = {
  completed: CheckIcon,
  active: ActiveIcon,
  scheduled: ScheduledIcon,
};

/* ─── ProgressBar Component ─── */
export function ProgressBar({
  value = 0,
  color = "primary",
  striped = false,
  animated = false,
  showValue = false,
  segments,
  className,
  ...rest
}: ProgressBarProps) {
  return (
    <div className={cx(s.progressTrack, className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} {...rest}>
      {segments ? (
        segments.map((seg, i) => (
          <div
            key={i}
            className={cx(
              s.progressBar({ color: seg.color ?? "primary", striped }),
              animated && striped && s.animated,
            )}
            style={{ width: `${Math.min(100, Math.max(0, seg.value))}%` }}
          >
            {seg.label && <span className={s.progressValue}>{seg.label}</span>}
          </div>
        ))
      ) : (
        <div
          className={cx(
            s.progressBar({ color, striped }),
            animated && striped && s.animated,
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        >
          {showValue && <span className={s.progressValue}>{Math.round(value)}%</span>}
        </div>
      )}
    </div>
  );
}

/* ─── Icon resolver ─── */
function resolveIcon(icon: StepItem["icon"], status: StepStatus) {
  if (icon == null) {
    const DefaultIcon = defaultStepIcons[status];
    return <DefaultIcon />;
  }
  if (typeof icon === "string") {
    const RegistryIcon = iconRegistry[icon as IconName];
    return <RegistryIcon width={20} height={20} />;
  }
  return icon;
}

/* ─── StepBar Component ─── */
export function StepBar({
  steps,
  className,
  ...rest
}: StepBarProps) {
  return (
    <div className={cx(s.stepBarRoot, className)} {...rest}>
      {steps.map((step, i) => (
        <div key={i} className={s.stepItem}>
          {i > 0 && (
            <span className={s.stepArrow}>
              <ChevronRightIcon />
            </span>
          )}
          <span className={s.stepIcon({ status: step.status })}>
            {resolveIcon(step.icon, step.status)}
          </span>
          <span className={s.stepLabel({ status: step.status })}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
