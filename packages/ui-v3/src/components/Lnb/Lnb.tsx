"use client";

import type { ReactNode } from "react";
import * as styles from "./Lnb.css";
import { useLnbState } from "./useLnbState";

export type LnbChildItem = {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  href?: string;
  active?: boolean;
};

export type LnbGroup = {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: LnbChildItem[];
};

export type LnbProps = {
  groups: LnbGroup[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedIdsChange?: (expandedIds: string[]) => void;
  collapsed?: boolean;
  logoLabel?: string;
};

const defaultGroupIcon = <span aria-hidden="true">⌂</span>;
const chevronIcon = <span aria-hidden="true">›</span>;
const collapseIcon = <span aria-hidden="true">⇤</span>;

export function Lnb({ collapsed = false, defaultExpandedIds, expandedIds, groups, logoLabel = "Law.ai", onExpandedIdsChange }: LnbProps) {
  const { expandedIds: currentExpandedIds, toggleExpanded } = useLnbState({
    expandedIds,
    defaultExpandedIds,
    onExpandedIdsChange
  });

  return (
    <aside className={styles.root({ collapsed })}>
      <div className={styles.brand({ collapsed })}>
        <div aria-label={logoLabel} className={styles.logo}>
          <span className={styles.logoMark}>L</span>
          {collapsed ? null : <span>{logoLabel}</span>}
        </div>
        {collapsed ? null : <button aria-label="Collapse local navigation" className={styles.collapseButton} type="button">{collapseIcon}</button>}
      </div>
      <nav aria-label="Local navigation" className={styles.nav({ collapsed })}>
        {groups.map(group => {
          const isExpanded = currentExpandedIds.includes(group.id);
          const hasChildren = Boolean(group.children?.length);
          const isActive = Boolean(group.children?.some(child => child.active));
          const leadingIcon = group.icon ?? defaultGroupIcon;

          return (
            <section className={styles.group} key={group.id}>
              <button
                aria-expanded={!collapsed && hasChildren ? isExpanded : undefined}
                className={styles.trigger({ active: isActive, collapsed, expanded: isExpanded })}
                onClick={() => hasChildren && !collapsed && toggleExpanded(group.id)}
                title={typeof group.label === "string" ? group.label : undefined}
                type="button"
              >
                <span className={styles.triggerMain}>
                  <span aria-hidden="true">{leadingIcon}</span>
                  {collapsed ? null : <span className={styles.triggerLabel}>{group.label}</span>}
                </span>
                {!collapsed && hasChildren ? <span className={styles.triggerIcon({ active: isActive, expanded: isExpanded })}>⌄</span> : null}
              </button>
              {!collapsed && hasChildren && isExpanded ? (
                <ul className={styles.childList}>
                  {group.children?.map(child => (
                    <li key={child.id}>
                      {child.href ? (
                        <a className={styles.child({ active: child.active })} href={child.href}>
                          <span className={styles.childText}>
                            <span className={styles.childLabel}>{child.label}</span>
                            {child.description ? <span className={styles.childDescription}>{child.description}</span> : null}
                          </span>
                          <span aria-hidden="true" className={styles.chevron}>{chevronIcon}</span>
                        </a>
                      ) : (
                        <div className={styles.child({ active: child.active })}>
                          <span className={styles.childText}>
                            <span className={styles.childLabel}>{child.label}</span>
                            {child.description ? <span className={styles.childDescription}>{child.description}</span> : null}
                          </span>
                          <span aria-hidden="true" className={styles.chevron}>{chevronIcon}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          );
        })}
      </nav>
    </aside>
  );
}

export default Lnb;
