import type { ReactNode } from "react";
import { Badge } from "../Badge";
import * as styles from "./Viewer.css";

export type ViewerProps = {
  title: string;
  description?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
  toolbarStart?: ReactNode;
  toolbarEnd?: ReactNode;
  children: ReactNode;
  mode?: "page" | "embed";
};

export function Viewer({ actions, children, description, metadata, mode = "page", title, toolbarEnd, toolbarStart }: ViewerProps) {
  return (
    <section className={styles.root}>
      <header className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <div className={styles.titleBlock}>
            <span className={styles.title}>{title}</span>
            {description ? <span className={styles.description}>{description}</span> : null}
          </div>
          {metadata ? <span className={styles.meta}>{metadata}</span> : null}
        </div>
        <div className={styles.toolbarGroup}>
          {toolbarStart}
          {actions}
          {toolbarEnd}
        </div>
      </header>
      <div className={styles.viewport({ mode })}>
        {mode === "page" ? <div className={styles.page}>{children}</div> : children}
      </div>
    </section>
  );
}

export function ViewerStatusBadge({ children }: { children: ReactNode }) {
  return <Badge variant="muted">{children}</Badge>;
}

export default Viewer;
