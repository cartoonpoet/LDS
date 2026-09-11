import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./PageLayout.css";

/* ─── Types ─── */
export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface PageLayoutSlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface PageLayoutNavProps extends HTMLAttributes<HTMLElement> {
  /** LNB 폭 (px) */
  width?: number;
  /** 접힘 — collapsedWidth로 축소 */
  collapsed?: boolean;
  /** 접혔을 때 폭 (px) */
  collapsedWidth?: number;
  children?: ReactNode;
}

export interface PageLayoutPanelProps extends HTMLAttributes<HTMLElement> {
  /** 보조 패널 폭 (px) */
  width?: number;
  children?: ReactNode;
}

/* ─── Slots ─── */
export function PageLayoutHeader({ className, children, ...rest }: PageLayoutSlotProps) {
  return (
    <header className={cx(s.header, className)} {...rest}>
      {children}
    </header>
  );
}

export function PageLayoutNav({
  width = 240,
  collapsed = false,
  collapsedWidth = 64,
  className,
  style,
  children,
  ...rest
}: PageLayoutNavProps) {
  return (
    <nav
      className={cx(s.nav, className)}
      style={{ width: collapsed ? collapsedWidth : width, ...style }}
      {...rest}
    >
      {children}
    </nav>
  );
}

export function PageLayoutContent({ className, children, ...rest }: PageLayoutSlotProps) {
  return (
    <main className={cx(s.content, className)} {...rest}>
      {children}
    </main>
  );
}

export function PageLayoutPanel({
  width = 320,
  className,
  style,
  children,
  ...rest
}: PageLayoutPanelProps) {
  return (
    <aside className={cx(s.panel, className)} style={{ width, ...style }} {...rest}>
      {children}
    </aside>
  );
}

/* ─── Root ─── */
function PageLayoutRoot({ className, children, ...rest }: PageLayoutProps) {
  return (
    <div className={cx(s.root, className)} {...rest}>
      {children}
    </div>
  );
}

export const PageLayout = Object.assign(PageLayoutRoot, {
  Header: PageLayoutHeader,
  Nav: PageLayoutNav,
  Content: PageLayoutContent,
  Panel: PageLayoutPanel,
});
