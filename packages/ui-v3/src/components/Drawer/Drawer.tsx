"use client";

import type { ReactNode } from "react";
import * as styles from "./Drawer.css";
import { useDrawerState } from "./useDrawerState";

export type DrawerPlacement = "left" | "right" | "bottom";

export type DrawerProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  placement?: DrawerPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeLabel?: string;
};

export function Drawer({
  children,
  closeLabel = "닫기",
  defaultOpen,
  description,
  footer,
  onOpenChange,
  open,
  placement = "right",
  title
}: DrawerProps) {
  const { closeDrawer, open: isOpen } = useDrawerState({ open, defaultOpen, onOpenChange });

  return (
    <div className={styles.root({ open: isOpen, placement })} role="presentation">
      <button aria-hidden={!isOpen} className={styles.backdrop} onClick={closeDrawer} tabIndex={isOpen ? 0 : -1} type="button" />
      <section aria-modal="true" className={styles.panel({ placement })} role="dialog">
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.title}>{title}</div>
            {description ? <div className={styles.description}>{description}</div> : null}
          </div>
          <button aria-label={closeLabel} className={styles.closeButton} onClick={closeDrawer} type="button">×</button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </section>
    </div>
  );
}

export default Drawer;
