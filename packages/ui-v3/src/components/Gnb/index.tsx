import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Gnb.css";

/* ─── Types ─── */
export interface GnbProps extends HTMLAttributes<HTMLDivElement> {
  /** 왼쪽 영역 — 아이콘 버튼 · 구분선 · 검색 */
  start?: ReactNode;
  /** 오른쪽 영역 — 아이콘 버튼 · 프로필 */
  end?: ReactNode;
}

export interface GnbIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 20px 아이콘 */
  icon: ReactNode;
  /** 접근성 라벨 (툴팁 title로도 쓰임) */
  label: string;
}

export interface GnbProfileProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** 사용자 이름 */
  name: string;
  /** 소속 · 직함 */
  description?: string;
  /** 아바타 */
  avatar?: ReactNode;
  /** 텍스트 숨김 (모바일) — 이름은 스크린리더용으로 남는다 */
  compact?: boolean;
}

/* ─── Parts ─── */
export function GnbIconButton({ icon, label, className, title, ...rest }: GnbIconButtonProps) {
  return (
    <button
      type="button"
      className={cx(s.iconButton, className)}
      aria-label={label}
      title={title ?? label}
      {...rest}
    >
      {icon}
    </button>
  );
}

export function GnbDivider({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx(s.divider, className)} aria-hidden {...rest} />;
}

/** onClick이 있으면 `<button>`(프로필 메뉴 트리거), 없으면 `<div>` */
export function GnbProfile({ name, description, avatar, compact = false, className, onClick, ...rest }: GnbProfileProps) {
  const content = (
    <>
      {compact ? (
        <span className={s.srOnly}>{name}</span>
      ) : (
        <span className={s.profileText}>
          <span className={s.profileName}>{name}</span>
          {description && <span className={s.profileDescription}>{description}</span>}
        </span>
      )}
      {avatar}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={cx(s.profile, className)}
        onClick={onClick}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
  return (
    <div className={cx(s.profile, className)} {...rest}>
      {content}
    </div>
  );
}

/* ─── Root ─── */
function GnbRoot({ start, end, className, ...rest }: GnbProps) {
  return (
    <div className={cx(s.root, className)} {...rest}>
      <div className={s.start}>{start}</div>
      <div className={s.end}>{end}</div>
    </div>
  );
}

export const Gnb = Object.assign(GnbRoot, {
  IconButton: GnbIconButton,
  Divider: GnbDivider,
  Profile: GnbProfile,
});
