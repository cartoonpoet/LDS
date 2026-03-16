"use client";

import type { ReactNode } from "react";
import * as styles from "./Lnb.css";
import { useLnbState } from "./useLnbState";

export type LnbChildItem = { id: string; label: ReactNode; active?: boolean };
export type LnbGroup = { id: string; label: ReactNode; children?: LnbChildItem[] };
export type LnbProps = {
  groups: LnbGroup[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedIdsChange?: (expandedIds: string[]) => void;
};

export function Lnb({ defaultExpandedIds, expandedIds, groups, onExpandedIdsChange }: LnbProps) {
  const { expandedIds: currentExpandedIds, toggleExpanded } = useLnbState({ expandedIds, defaultExpandedIds, onExpandedIdsChange });

  return (
    <aside className={styles.root}>
      {groups.map(group => {
        const isExpanded = currentExpandedIds.includes(group.id);
        return (
          <div className={styles.group} key={group.id}>
            <button className={styles.trigger} onClick={() => toggleExpanded(group.id)} type="button">
              <span>{group.label}</span>
              <span>{isExpanded ? "−" : "+"}</span>
            </button>
            {isExpanded && group.children?.length ? (
              <div className={styles.childList}>
                {group.children.map(child => <div className={styles.child} data-active={child.active ? "true" : "false"} key={child.id}>{child.label}</div>)}
              </div>
            ) : null}
          </div>
        );
      })}
    </aside>
  );
}

export default Lnb;
