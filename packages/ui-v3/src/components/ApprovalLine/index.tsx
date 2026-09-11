import type { ReactNode } from "react";
import { Badge } from "../Badge";
import * as styles from "./ApprovalLine.css";

export type ApprovalLineStatus = "pending" | "current" | "approved" | "rejected";

export type ApprovalLineItem = {
  id: string;
  order?: number;
  name: string;
  role?: string;
  department?: string;
  status?: ApprovalLineStatus;
  date?: string;
  comment?: ReactNode;
  metadata?: ReactNode;
};

export type ApprovalLineProps = {
  items: ApprovalLineItem[];
  direction?: "horizontal" | "vertical";
  showConnector?: boolean;
  ariaLabel?: string;
};

const statusLabelMap: Record<ApprovalLineStatus, string> = {
  pending: "대기",
  current: "진행중",
  approved: "승인",
  rejected: "반려"
};

const badgeToneMap: Record<ApprovalLineStatus, "primary" | "neutral"> = {
  pending: "neutral",
  current: "primary",
  approved: "primary",
  rejected: "neutral"
};

const badgeVariantMap: Record<ApprovalLineStatus, "filled" | "outline" | "muted"> = {
  pending: "muted",
  current: "outline",
  approved: "filled",
  rejected: "outline"
};

export function ApprovalLine({ ariaLabel = "결재선", direction = "horizontal", items, showConnector = true }: ApprovalLineProps) {
  return (
    <ol aria-label={ariaLabel} className={styles.root({ direction })}>
      {items.map((item, index) => {
        const status = item.status ?? "pending";
        const hasConnector = showConnector && index < items.length - 1;

        return (
          <li className={styles.item({ direction, status })} key={item.id}>
            <div className={styles.header}>
              <div className={styles.nameBlock}>
                <span className={styles.name}>{item.name}</span>
                {item.role || item.department ? (
                  <span className={styles.role}>{[item.role, item.department].filter(Boolean).join(" · ")}</span>
                ) : null}
              </div>
              {item.order ? <span aria-label={`결재 순서 ${item.order}`} className={styles.order}>{item.order}</span> : null}
            </div>
            <Badge tone={badgeToneMap[status]} variant={badgeVariantMap[status]}>{statusLabelMap[status]}</Badge>
            {item.metadata || item.date ? (
              <div className={styles.meta}>
                {item.date ? <span>{item.date}</span> : null}
                {item.metadata ? <span>{item.metadata}</span> : null}
              </div>
            ) : null}
            {item.comment ? <div className={styles.comment}>{item.comment}</div> : null}
            {hasConnector ? <span aria-hidden="true" className={styles.connector({ direction, status })} /> : null}
          </li>
        );
      })}
    </ol>
  );
}

export default ApprovalLine;
