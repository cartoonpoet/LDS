"use client";

import type { FormEvent, ReactNode } from "react";
import { Button } from "../Button";
import * as styles from "./Comments.css";
import { useCommentsState } from "./useCommentsState";

export type CommentsVariant = "timeline" | "chat" | "bottom-sheet";
export type CommentTone = "default" | "accent" | "muted";

export type CommentItem = {
  id: string;
  author: ReactNode;
  body: ReactNode;
  timestamp?: ReactNode;
  meta?: ReactNode;
  avatar?: ReactNode;
  attachments?: ReactNode[];
  tone?: CommentTone;
  mine?: boolean;
};

export type CommentsProps = {
  items: CommentItem[];
  variant?: CommentsVariant;
  title?: ReactNode;
  description?: ReactNode;
  emptyMessage?: ReactNode;
  composerLabel?: ReactNode;
  composerPlaceholder?: string;
  composerHelperText?: ReactNode;
  submitLabel?: string;
  resetLabel?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

const renderAvatarFallback = (author: ReactNode) => {
  if (typeof author !== "string") {
    return "•";
  }

  return author.slice(0, 1);
};

const renderCommentLeading = (item: CommentItem, variant: CommentsVariant) => {
  if (variant === "timeline") {
    return (
      <>
        <span aria-hidden="true" className={styles.timelineRail} />
        <span className={styles.timelineDot({ tone: item.tone ?? "default" })} />
      </>
    );
  }

  return <span className={styles.avatar({ tone: item.tone ?? "default" })}>{item.avatar ?? renderAvatarFallback(item.author)}</span>;
};

const renderCommentAttachments = (attachments?: ReactNode[]) => {
  if (!attachments?.length) {
    return null;
  }

  return <div className={styles.attachments}>{attachments.map((attachment, index) => <span className={styles.attachment} key={index}>{attachment}</span>)}</div>;
};

export function Comments({
  composerHelperText = "Shift + Enter로 줄바꿈, 등록 후 입력창은 자동으로 초기화됩니다.",
  composerLabel = "댓글 작성",
  composerPlaceholder = "검토 의견을 남겨주세요.",
  defaultValue,
  description,
  emptyMessage = "아직 등록된 코멘트가 없습니다.",
  items,
  onSubmit,
  onValueChange,
  resetLabel = "초기화",
  submitLabel = "등록",
  title,
  value,
  variant = "timeline"
}: CommentsProps) {
  const { hasValue, resetValue, setValue, submitValue, value: currentValue } = useCommentsState({ defaultValue, onSubmit, onValueChange, value });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitValue();
  };

  return (
    <section className={styles.root({ variant })}>
      {title || description ? (
        <header className={styles.header}>
          {title ? <div className={styles.title}>{title}</div> : null}
          {description ? <div className={styles.description}>{description}</div> : null}
        </header>
      ) : null}

      <div className={styles.list({ variant })}>
        {items.length ? items.map(item => {
          const tone = item.tone ?? "default";

          return (
            <article className={styles.item({ mine: item.mine, tone, variant })} key={item.id}>
              {renderCommentLeading(item, variant)}
              <div className={styles.itemBody}>
                <div className={styles.metaRow({ mine: item.mine })}>
                  <span className={styles.author}>{item.author}</span>
                  {item.timestamp ? <span className={styles.timestamp}>{item.timestamp}</span> : null}
                  {item.meta ? <span className={styles.itemMeta}>{item.meta}</span> : null}
                </div>
                <div className={styles.bubble({ mine: item.mine, tone, variant })}>{item.body}</div>
                {renderCommentAttachments(item.attachments)}
              </div>
            </article>
          );
        }) : <div className={styles.empty}>{emptyMessage}</div>}
      </div>

      <form className={styles.composer({ variant })} onSubmit={handleSubmit}>
        <label>
          <span className={styles.composerLabel}>{composerLabel}</span>
          <textarea className={styles.textarea} onChange={event => setValue(event.target.value)} placeholder={composerPlaceholder} value={currentValue} />
        </label>
        <div className={styles.composerFooter}>
          <span className={styles.helperText}>{composerHelperText}</span>
          <div className={styles.composerActions}>
            <Button onClick={resetValue} tone="neutral" type="button" variant="outline">{resetLabel}</Button>
            <Button disabled={!hasValue} type="submit">{submitLabel}</Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Comments;
