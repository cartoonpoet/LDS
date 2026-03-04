import type { ReactNode } from "react";
import { lightThemeClass } from "@lds/tokens";
import { Button, Input, Select } from "@lds/ui-v3";

export function Callout({ children }: { children: ReactNode }) {
  return <div className="docs-callout">{children}</div>;
}

export function Preview({ children }: { children: ReactNode }) {
  return (
    <div className={`${lightThemeClass} docs-preview`}>
      {children}
    </div>
  );
}

export function PreviewGrid({ children }: { children: ReactNode }) {
  return <div className="docs-preview-grid">{children}</div>;
}

export function Stack({ children }: { children: ReactNode }) {
  return <div className="docs-stack">{children}</div>;
}

export function ButtonShowcase() {
  return (
    <Preview>
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
    </Preview>
  );
}

export function FormShowcase() {
  return (
    <Preview>
      <Stack>
        <Input label="Matter title" placeholder="Enter a matter title" />
        <Select
          defaultValue="draft"
          label="Status"
          options={[
            { label: "Draft", value: "draft" },
            { label: "In review", value: "review" },
            { label: "Approved", value: "approved" }
          ]}
        />
      </Stack>
    </Preview>
  );
}

