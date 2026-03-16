"use client";

import type { ReactNode } from "react";
import * as styles from "./Gnb.css";
import { useGnbState } from "./useGnbState";

export type GnbItem = {
  id: string;
  label: ReactNode;
  disabled?: boolean;
};

export type GnbProps = {
  brand: ReactNode;
  items: GnbItem[];
  actions?: ReactNode;
  activeId?: string;
  defaultActiveId?: string;
  onActiveIdChange?: (activeId: string) => void;
};

export function Gnb({ actions, activeId, brand, defaultActiveId, items, onActiveIdChange }: GnbProps) {
  const { activeId: currentActiveId, setActiveId } = useGnbState({ activeId, defaultActiveId, onActiveIdChange });

  return (
    <header className={styles.root}>
      <div className={styles.brand}>{brand}</div>
      <nav className={styles.nav}>
        {items.map(item => (
          <button className={styles.item} data-active={currentActiveId === item.id ? "true" : "false"} disabled={item.disabled} key={item.id} onClick={() => setActiveId(item.id)} type="button">
            {item.label}
          </button>
        ))}
      </nav>
      {actions ? <div className={styles.actions}>{actions}</div> : <span />}
    </header>
  );
}

export default Gnb;
