import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Skeleton.css";

export type SkeletonVariant = "rect" | "circle" | "text";

export interface SkeletonContentProps extends HTMLAttributes<HTMLDivElement> {
  /** true이면 fallback(스켈레톤)을 표시, false이면 children을 표시 */
  loading: boolean;
  /** 로딩 중에 보여줄 스켈레톤 UI */
  fallback: ReactNode;
  /** 로딩 완료 후 보여줄 실제 콘텐츠 */
  children: ReactNode;
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** 모양 */
  variant?: SkeletonVariant;
  /** 너비 (px 또는 CSS 값) */
  width?: number | string;
  /** 높이 (px 또는 CSS 값, text variant에서는 무시) */
  height?: number | string;
  /** 텍스트 줄 수 (variant="text"일 때만 사용) */
  lines?: number;
}

/**
 * Skeleton — 콘텐츠 로딩 자리 표시 컴포넌트
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={16} />
 * <Skeleton variant="circle" width={40} height={40} />
 * <Skeleton variant="text" lines={3} />
 * ```
 */
export function Skeleton({
  variant = "rect",
  width,
  height,
  lines = 3,
  className,
  style,
  ...rest
}: SkeletonProps) {
  if (variant === "text") {
    return (
      <div
        className={cx(s.textGroup, className)}
        style={{ width, ...style }}
        {...rest}
      >
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cx(
              s.root({ variant: "text" }),
              i === lines - 1 && lines > 1 && s.lastLine,
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cx(s.root({ variant }), className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}

/**
 * Skeleton.Content — 로딩 ↔ 콘텐츠 전환 래퍼
 *
 * loading이 true이면 fallback(스켈레톤)을 표시하고,
 * false가 되면 fade-in 트랜지션과 함께 children을 표시합니다.
 *
 * @example
 * ```tsx
 * <Skeleton.Content
 *   loading={isLoading}
 *   fallback={<Skeleton variant="text" lines={3} />}
 * >
 *   <p>{data.content}</p>
 * </Skeleton.Content>
 * ```
 */
function SkeletonContent({
  loading,
  fallback,
  children,
  className,
  ...rest
}: SkeletonContentProps) {
  return (
    <div className={cx(s.contentWrapper, className)} {...rest}>
      {loading ? fallback : <div className={s.contentVisible}>{children}</div>}
    </div>
  );
}

Skeleton.Content = SkeletonContent;
