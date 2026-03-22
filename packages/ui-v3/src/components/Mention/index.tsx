import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Mention.css";

export interface MentionProps extends HTMLAttributes<HTMLSpanElement> {
  /** 사용자 이름 (@ 자동 추가) */
  name: string;
}

/**
 * **Mention**
 *
 * 인라인 멘션 태그. `@사용자명`을 파란색 뱃지로 표시.
 *
 * ```tsx
 * <p>검토자: <Mention name="나담당" /> 님이 확인 중입니다.</p>
 * ```
 */
export function Mention({ name, className, ...rest }: MentionProps) {
  return (
    <span className={cx(s.mention, className)} {...rest}>
      @{name}
    </span>
  );
}
