import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SweetAlert } from ".";
import { Button } from "../Button";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## SweetAlert
 *
 * 아이콘 + 제목 + 본문 + 액션 버튼으로 구성된 경고/확인 다이얼로그.
 * warning, success, danger, info 4가지 intent를 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { SweetAlert } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `open` | `boolean` | - | 표시 여부 |
 * | `onClose` | `() => void` | - | 닫기 핸들러 |
 * | `intent` | `"warning" \| "success" \| "danger" \| "info"` | `"warning"` | 아이콘 의도 |
 * | `icon` | `ReactNode` | - | 커스텀 아이콘 |
 * | `title` | `ReactNode` | - | 제목 |
 * | `children` | `ReactNode` | - | 본문 텍스트 |
 * | `confirmLabel` | `string` | - | 확인 버튼 라벨 |
 * | `onConfirm` | `() => void` | - | 확인 핸들러 |
 * | `cancelLabel` | `string` | - | 취소 버튼 라벨 |
 * | `onCancel` | `() => void` | - | 취소 핸들러 |
 *
 */
const meta: Meta<typeof SweetAlert> = {
  title: "Components/SweetAlert",
  component: SweetAlert,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    open: { description: "표시 여부" },
    intent: { description: "아이콘 의도 (배경색 결정)" },
    title: { description: "제목" },
    confirmLabel: { description: "확인 버튼 라벨" },
    cancelLabel: { description: "취소 버튼 라벨" },
  },
};
export default meta;
type Story = StoryObj<typeof SweetAlert>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>SweetAlert 열기</Button>
        <SweetAlert
          open={open}
          onClose={() => setOpen(false)}
          intent="warning"
          title="정말 삭제하시겠습니까?"
          confirmLabel="삭제"
          onConfirm={() => setOpen(false)}
          cancelLabel="취소"
          onCancel={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>삭제된 데이터는 복구할 수 없습니다.</p>
        </SweetAlert>
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { SweetAlert, Button } from "@lds/ui-v3";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>삭제</Button>

<SweetAlert
  open={open}
  onClose={() => setOpen(false)}
  intent="warning"
  title="정말 삭제하시겠습니까?"
  confirmLabel="삭제"
  onConfirm={handleDelete}
  cancelLabel="취소"
  onCancel={() => setOpen(false)}
>
  <p>삭제된 데이터는 복구할 수 없습니다.</p>
</SweetAlert>

// Intent 종류: "warning" | "success" | "danger" | "info"
`,
      },
    },
  },
};

/** Warning (기본) — 삭제 확인 */
export const Warning: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Warning Alert 열기</Button>
        <SweetAlert
          open={open}
          onClose={() => setOpen(false)}
          intent="warning"
          title="Are you sure?"
          confirmLabel="Yes, delete it!"
          onConfirm={() => setOpen(false)}
          cancelLabel="Cancel"
          onCancel={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>You won't be able to revert this!</p>
        </SweetAlert>
      </>
    );
  },
};

/** Success */
export const Success: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="success" onClick={() => setOpen(true)}>Success Alert 열기</Button>
        <SweetAlert
          open={open}
          onClose={() => setOpen(false)}
          intent="success"
          title="저장 완료"
          confirmLabel="확인"
          onConfirm={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>변경 사항이 성공적으로 저장되었습니다.</p>
        </SweetAlert>
      </>
    );
  },
};

/** Danger */
export const Danger: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="danger" onClick={() => setOpen(true)}>Danger Alert 열기</Button>
        <SweetAlert
          open={open}
          onClose={() => setOpen(false)}
          intent="danger"
          title="오류가 발생했습니다"
          confirmLabel="확인"
          onConfirm={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>서버 연결에 실패했습니다. 다시 시도해주세요.</p>
        </SweetAlert>
      </>
    );
  },
};

/** Info */
export const Info: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button color="info" onClick={() => setOpen(true)}>Info Alert 열기</Button>
        <SweetAlert
          open={open}
          onClose={() => setOpen(false)}
          intent="info"
          title="안내"
          confirmLabel="확인"
          onConfirm={() => setOpen(false)}
        >
          <p style={{ margin: 0 }}>시스템 점검이 예정되어 있습니다.</p>
        </SweetAlert>
      </>
    );
  },
};

/** 비표준 계약 전환 확인 (복잡한 본문) */
export const ComplexBody: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>비표준 계약 확인 열기</Button>
        <SweetAlert
          open={open}
          onClose={() => setOpen(false)}
          intent="warning"
          title={
            <>
              비표준 계약 진행시 법무검토가 필수로 진행됩니다.
              <br />
              비표준 계약으로 전환하여 진행하시겠습니까?
            </>
          }
          confirmLabel="확인"
          onConfirm={() => setOpen(false)}
          cancelLabel="닫기"
          onCancel={() => setOpen(false)}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 8px" }}>아래 절차에 따라 비표준 전환 절차를 마무리 해주세요.</p>
            <p style={{ margin: 0, opacity: 0.7 }}>
              로컬 PC에 다운로드된 계약서를 수정
              <br />
              비표준 계약으로 작성된 계약서를 직접 업로드
            </p>
          </div>
        </SweetAlert>
      </>
    );
  },
};

/** 모든 Intent 비교 */
export const AllIntents: Story = {
  render: () => {
    const [openIntent, setOpenIntent] = useState<string | null>(null);
    const intents = ["warning", "success", "danger", "info"] as const;
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {intents.map((intent) => (
          <div key={intent}>
            <Button onClick={() => setOpenIntent(intent)}>
              {intent}
            </Button>
            <SweetAlert
              open={openIntent === intent}
              onClose={() => setOpenIntent(null)}
              intent={intent}
              title={`${intent} alert`}
              confirmLabel="확인"
              onConfirm={() => setOpenIntent(null)}
              cancelLabel="취소"
              onCancel={() => setOpenIntent(null)}
            >
              <p style={{ margin: 0 }}>This is a {intent} sweet alert.</p>
            </SweetAlert>
          </div>
        ))}
      </div>
    );
  },
};
