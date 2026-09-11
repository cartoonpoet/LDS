import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Timeline.css";

/* ─── Types ─── */
export type TimelineStatus = "done" | "current" | "upcoming";

export interface TimelineItem {
  id: string;
  /** 이벤트 제목 */
  title: ReactNode;
  /** 날짜/시각 표기 */
  date?: ReactNode;
  /** 보조 설명 */
  description?: ReactNode;
  /** 진행 상태 (기본 done) */
  status?: TimelineStatus;
}

export interface TimelineProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
  items: TimelineItem[];
}

/* ─── Component ─── */
export function Timeline({ items, className, ...rest }: TimelineProps) {
  return (
    <ol className={cx(s.root, className)} {...rest}>
      {items.map((item, index) => {
        const status = item.status ?? "done";
        const isLast = index === items.length - 1;
        return (
          <li className={s.item} key={item.id}>
            <div aria-hidden="true" className={s.markerColumn}>
              <span className={s.dot({ status })} data-timeline-dot />
              {isLast ? null : <span className={s.connector} data-timeline-connector />}
            </div>
            <div className={s.content}>
              {item.date ? <span className={s.date({ status })}>{item.date}</span> : null}
              <span className={s.title({ status })}>{item.title}</span>
              {item.description ? <span className={s.description}>{item.description}</span> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
