import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./ChartTooltip.css";

export interface ChartTooltipDataItem {
  /** 시리즈 라벨 (예: "Label :") */
  label: string;
  /** 값 (예: "90") */
  value: string | number;
  /** 시리즈 색상 (dot 표시용, default variant) */
  color?: string;
}

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** 스타일 변형 */
  variant?: "default" | "pie";
  /** 헤더 텍스트 (카테고리/날짜 등, default variant) */
  header?: string;
  /** 데이터 목록 */
  items: ChartTooltipDataItem[];
}

/**
 * **ChartTooltip**
 *
 * 차트 위에 표시되는 데이터 툴팁.
 *
 * - `default`: 흰 배경 + 헤더(날짜) + 컬러 dot + label/value
 * - `pie`: 파란 배경 + label/value (dot 없음)
 *
 * 차트 라이브러리의 custom tooltip 렌더러에서 사용합니다.
 */
export function ChartTooltip({
  variant = "default",
  header,
  items,
  className,
  ...rest
}: ChartTooltipProps) {
  return (
    <div className={cx(s.root({ variant }), className)} {...rest}>
      {variant === "default" && header && (
        <>
          <div className={s.header}>{header}</div>
          <div className={s.divider} />
        </>
      )}
      <div className={s.body}>
        {items.map((item, i) => (
          <div key={i} className={s.row}>
            {variant === "default" && item.color && (
              <span className={s.dot} style={{ backgroundColor: item.color }} />
            )}
            <span className={s.label({ variant })}>{item.label}</span>
            <span className={s.value({ variant })}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
