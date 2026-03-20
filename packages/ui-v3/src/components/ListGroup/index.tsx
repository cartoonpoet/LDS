import { createContext, useContext } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./ListGroup.css";

/* ─── Types ─── */
export type ListGroupVariant = "default" | "flush";

export interface ListGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** default=bordered, flush=border 없음 (BottomSheet 용) */
  variant?: ListGroupVariant;
  /** 간편 API: 문자열 배열로 아이템 생성 */
  items?: string[];
  children?: ReactNode;
}

export interface ListGroupItemProps extends HTMLAttributes<HTMLDivElement> {
  /** 선택/활성 상태 (파란 배경 + 흰 텍스트) */
  active?: boolean;
  /** 위험 항목 (빨간 텍스트) */
  danger?: boolean;
  /** 비활성 */
  disabled?: boolean;
  /** 좌측 아이콘/뱃지 영역 */
  leading?: ReactNode;
  /** 우측 시간/뱃지 영역 */
  trailing?: ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  children: ReactNode;
}

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/* ─── Context ─── */
const ListGroupContext = createContext<ListGroupVariant>("default");

/* ─── ListGroupItem ─── */
export function ListGroupItem({
  active = false,
  danger = false,
  disabled = false,
  leading: leadingNode,
  trailing: trailingNode,
  onClick,
  children,
  className,
  ...rest
}: ListGroupItemProps) {
  const variant = useContext(ListGroupContext);

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      className={cx(
        s.item({
          active,
          danger,
          disabled,
          clickable: !!onClick,
          flush: variant === "flush",
        }),
        className,
      )}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...rest}
    >
      {leadingNode && <span className={s.leading}>{leadingNode}</span>}
      <span className={s.content}>{children}</span>
      {trailingNode && <span className={s.trailing}>{trailingNode}</span>}
    </div>
  );
}

/* ─── ListGroup ─── */
export function ListGroup({
  variant = "default",
  items,
  children,
  className,
  ...rest
}: ListGroupProps) {
  return (
    <ListGroupContext.Provider value={variant}>
      <div
        role="list"
        className={cx(s.root({ variant }), className)}
        {...rest}
      >
        {items
          ? items.map((text) => (
              <ListGroupItem key={text}>{text}</ListGroupItem>
            ))
          : children}
      </div>
    </ListGroupContext.Provider>
  );
}

/* ─── BottomSheet ─── */
export function BottomSheet({
  children,
  className,
  ...rest
}: BottomSheetProps) {
  return (
    <div className={cx(s.bottomSheet, className)} {...rest}>
      <div className={s.dragHandle}>
        <div className={s.dragHandleBar} />
      </div>
      {children}
    </div>
  );
}
