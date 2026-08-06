import type { ReactNode } from "react";
import { lightThemeClass } from "@lds/tokens";
import { Alert, Button, Input, Select } from "@lds/ui-v3";

type CalloutProps = {
  children: ReactNode;
  tone?: "info" | "caution" | "success";
  title?: string;
};

type DecisionCardProps = {
  title: string;
  children: ReactNode;
};

type ShowcaseCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

type ChecklistProps = {
  items: ReactNode[];
};

type GuidanceCardProps = {
  title: string;
  tone?: "do" | "dont";
  children: ReactNode;
};

export function Callout({ children, tone = "info", title }: CalloutProps) {
  return (
    <div className="docs-callout" data-tone={tone}>
      {title ? <strong className="docs-callout-title">{title}</strong> : null}
      <div>{children}</div>
    </div>
  );
}

export function Preview({ children }: { children: ReactNode }) {
  return <div className={`${lightThemeClass} docs-preview`}>{children}</div>;
}

export function PreviewGrid({ children }: { children: ReactNode }) {
  return <div className="docs-preview-grid">{children}</div>;
}

export function Stack({ children }: { children: ReactNode }) {
  return <div className="docs-stack">{children}</div>;
}

export function DecisionGrid({ children }: { children: ReactNode }) {
  return <div className="docs-decision-grid">{children}</div>;
}

export function DecisionCard({ title, children }: DecisionCardProps) {
  return (
    <div className="docs-decision-card">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

export function ShowcaseCard({ title, description, children }: ShowcaseCardProps) {
  return (
    <section className="docs-showcase-card">
      <div className="docs-showcase-copy">
        <p className="docs-kicker">Preview</p>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <Preview>{children}</Preview>
    </section>
  );
}

export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="docs-checklist">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function GuidanceGrid({ children }: { children: ReactNode }) {
  return <div className="docs-guidance-grid">{children}</div>;
}

export function GuidanceCard({ title, tone = "do", children }: GuidanceCardProps) {
  return (
    <div className="docs-guidance-card" data-tone={tone}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

export function ButtonShowcase() {
  return (
    <PreviewGrid>
      <Button tone="primary">Primary</Button>
      <Button tone="secondary">Secondary</Button>
      <Button tone="danger" variant="outline">
        Outline
      </Button>
      <Button tone="primary" variant="gradient">
        Gradient
      </Button>
    </PreviewGrid>
  );
}

export function InputShowcase() {
  return (
    <Stack>
      <Input helperText="계약서 제목은 문서 목록과 검색 결과에 함께 노출됩니다." label="Matter title" placeholder="Enter a matter title" />
      <Input helperText="검토 단계에 맞는 담당자를 연결하세요." label="Reviewer email" placeholder="reviewer@lds.team" status="success" />
    </Stack>
  );
}

export function SelectShowcase() {
  return (
    <Stack>
      <Select
        caption="실무에서 가장 자주 쓰는 단일 선택 조합"
        defaultValue="review"
        helperText="상태 전환은 저장 시점에만 반영됩니다."
        label="Status"
        options={[
          { label: "Draft", value: "draft" },
          { label: "In review", value: "review" },
          { label: "Approved", value: "approved" }
        ]}
      />
      <Select
        helperText="검색 가능한 패턴이 필요하면 조합형 dropdown으로 분리하세요."
        label="Document type"
        options={[
          { label: "Contract", value: "contract" },
          { label: "Agreement", value: "agreement" },
          { label: "Certificate", value: "certificate" }
        ]}
        placeholder="Choose a document type"
      />
    </Stack>
  );
}

export function AlertShowcase() {
  return (
    <Stack>
      <Alert showCloseButton title="Approval line updated" type="info">
        결재선이 최신 조직도 기준으로 다시 정렬되었습니다.
      </Alert>
      <Alert
        layout="expanded"
        primaryAction={{ label: "Review now", tone: "primary" }}
        secondaryAction={{ label: "Later", tone: "warning" }}
        textAction={{ label: "See details" }}
        title="Sensitive clause detected"
        type="secret"
      >
        민감 조항이 감지되어 추가 검토가 필요합니다.
      </Alert>
    </Stack>
  );
}
