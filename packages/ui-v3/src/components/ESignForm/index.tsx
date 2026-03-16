import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Input } from "../Input";
import * as styles from "./ESignForm.css";

export type ESignField = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
};

export type ESignParticipant = {
  id: string;
  name: string;
  role?: string;
  status?: "pending" | "signed";
  signedAt?: string;
};

export type ESignFormProps = {
  title: string;
  description?: ReactNode;
  agreementText?: ReactNode;
  fields?: ESignField[];
  participants?: ESignParticipant[];
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: (payload: { values: Record<string, string>; agreed: boolean }) => void;
  onCancel?: () => void;
};

export function ESignForm({
  agreementText = "전자서명 진행 전 문서 내용을 확인했으며 서명 요청에 동의합니다.",
  cancelLabel = "취소",
  description,
  fields = [],
  onCancel,
  onSubmit,
  participants = [],
  submitLabel = "서명 요청",
  title
}: ESignFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map(field => [field.id, field.defaultValue ?? ""]))
  );

  const isValid = useMemo(
    () => agreed && fields.every(field => !field.required || Boolean(values[field.id]?.trim())),
    [agreed, fields, values]
  );

  const columns = fields.length > 1 ? 2 : 1;

  return (
    <form
      className={styles.root}
      onSubmit={event => {
        event.preventDefault();
        onSubmit?.({ agreed, values });
      }}
    >
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>

      {fields.length > 0 ? (
        <div className={styles.fieldGrid({ columns: columns as 1 | 2 })}>
          {fields.map(field => (
            <Input
              key={field.id}
              label={field.label}
              onChange={event => setValues(current => ({ ...current, [field.id]: event.target.value }))}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.id] ?? ""}
            />
          ))}
        </div>
      ) : null}

      <label className={styles.agreement}>
        <input checked={agreed} className={styles.checkbox} onChange={event => setAgreed(event.target.checked)} type="checkbox" />
        <span>{agreementText}</span>
      </label>

      {participants.length > 0 ? (
        <div className={styles.signatures}>
          {participants.map(participant => {
            const signed = participant.status === "signed";
            return (
              <div className={styles.signatureCard({ signed })} key={participant.id}>
                <div className={styles.signatureHeader}>
                  <div>
                    <div className={styles.signatureName}>{participant.name}</div>
                    {participant.role ? <div className={styles.signatureMeta}>{participant.role}</div> : null}
                  </div>
                  <Badge variant={signed ? "filled" : "muted"}>{signed ? "서명 완료" : "서명 대기"}</Badge>
                </div>
                {participant.signedAt ? <div className={styles.signatureMeta}>{participant.signedAt}</div> : null}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className={styles.footer}>
        <Button onClick={onCancel} type="button" variant="outline">{cancelLabel}</Button>
        <Button disabled={!isValid} type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export default ESignForm;
