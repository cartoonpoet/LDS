import { useState, useRef, useCallback } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Tooltip.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "content"> {
  /** 툴팁에 표시할 텍스트 */
  content: ReactNode;
  /** 2-row 변형: 제목 (이름/직책 등) */
  title?: ReactNode;
  /** 화살표 방향 */
  placement?: TooltipPlacement;
  /** 지연 시간 (ms) */
  delay?: number;
  /** 비활성화 */
  disabled?: boolean;
  /** 트리거 요소 */
  children: ReactNode;
}

/**
 * **Tooltip**
 *
 * 마우스 호버 시 부가 정보를 표시하는 다크 툴팁.
 *
 * - `placement`: top / bottom / left / right
 * - `title` + `content`: 2줄 변형 (이름 + 연락처 등)
 * - `content`만 사용: 1줄 변형
 */
export function Tooltip({
  content,
  title,
  placement = "top",
  delay = 200,
  disabled = false,
  children,
  className,
  ...rest
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay, disabled]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  return (
    <div
      className={cx(s.wrapper, className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...rest}
    >
      {children}
      {visible && (
        <div className={s.tooltip({ placement })} role="tooltip">
          <div className={s.body}>
            {title && <div className={s.title}>{title}</div>}
            <div className={s.content}>{content}</div>
          </div>
          <div className={s.arrow({ placement })} />
        </div>
      )}
    </div>
  );
}
