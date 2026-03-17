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
  children?: LnbChildItem[];
};

export type LnbProps = {
  groups: LnbGroup[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedIdsChange?: (expandedIds: string[]) => void;
};

export function Lnb({ defaultExpandedIds, expandedIds, groups, onExpandedIdsChange }: LnbProps) {
  const { expandedIds: currentExpandedIds, toggleExpanded } = useLnbState({
    expandedIds,
    defaultExpandedIds,
    onExpandedIdsChange
  });

  return (
    <aside className={styles.root}>
      <nav aria-label="Local navigation" className={styles.nav}>
        {groups.map(group => {
          const isExpanded = currentExpandedIds.includes(group.id);
          const hasChildren = Boolean(group.children?.length);

          return (
            <section className={styles.group} key={group.id}>
              <button
                aria-expanded={hasChildren ? isExpanded : undefined}
                className={styles.trigger({ expanded: isExpanded })}
                onClick={() => hasChildren && toggleExpanded(group.id)}
                type="button"
              >
                <span className={styles.triggerLabel}>{group.label}</span>
                {hasChildren ? <span className={styles.triggerIcon({ expanded: isExpanded })}>⌄</span> : null}
              </button>
              {hasChildren && isExpanded ? (
                <ul className={styles.childList}>
                  {group.children?.map(child => (
                    <li key={child.id}>
                      {child.href ? (
                        <a className={styles.child({ active: child.active })} href={child.href}>
                          <span className={styles.childLabel}>{child.label}</span>
                          {child.description ? <span className={styles.childDescription}>{child.description}</span> : null}
                        </a>
                      ) : (
                        <div className={styles.child({ active: child.active })}>
                          <span className={styles.childLabel}>{child.label}</span>
                          {child.description ? <span className={styles.childDescription}>{child.description}</span> : null}
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
