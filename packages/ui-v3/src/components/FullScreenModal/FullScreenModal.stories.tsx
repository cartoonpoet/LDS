import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { FullScreenModal } from ".";
import { Button } from "../Button";

/**
 * ## FullScreenModal
 *
 * 뷰포트 전체를 덮는 모달. Modal과 같은 `open`/`onClose` API를 사용하며,
 * 상단 고정 헤더(타이틀 + 닫기) + 스크롤 바디 + 하단 푸터로 구성됩니다.
 *
 * ### Import
 * ```tsx
 * import { FullScreenModal } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `open` | `boolean` | - | 모달 표시 여부 |
 * | `onClose` | `() => void` | - | 닫기 핸들러 (Escape, close 버튼) |
 * | `title` | `ReactNode` | - | 헤더 타이틀 |
 * | `footer` | `ReactNode` | - | 푸터 콘텐츠 |
 * | `disableEscapeClose` | `boolean` | `false` | Escape 키 닫기 비활성 |
 */
const meta: Meta<typeof FullScreenModal> = {
  title: "Components/FullScreenModal",
  component: FullScreenModal,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    open: { description: "모달 표시 여부" },
    title: { description: "헤더 타이틀" },
    footer: { description: "푸터 콘텐츠" },
  },
};
export default meta;

type Story = StoryObj<typeof FullScreenModal>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>전체화면 모달 열기</Button>
        <FullScreenModal
          open={open}
          onClose={() => setOpen(false)}
          title="계약서 편집"
          footer={
            <>
              <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>저장</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>전체화면 본문 콘텐츠</p>
        </FullScreenModal>
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { FullScreenModal, Button } from "@lds/ui-v3";

function MyPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>전체화면 모달 열기</Button>

      {/* 상단 고정 헤더 + 스크롤 바디 + 하단 푸터 */}
      <FullScreenModal
        open={open}
        onClose={() => setOpen(false)}
        title="계약서 편집"
        footer={
          <>
            <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={() => setOpen(false)}>저장</Button>
          </>
        }
      >
        <p>전체화면 본문 콘텐츠</p>
      </FullScreenModal>

      {/* Escape 닫기 비활성 */}
      <FullScreenModal
        open={open}
        onClose={() => setOpen(false)}
        title="문서 작성"
        disableEscapeClose
      >
        <p>작성 중 실수로 닫히지 않도록 Escape를 막습니다.</p>
      </FullScreenModal>
    </>
  );
}
`,
      },
    },
  },
};

/** 기본 — 헤더 + 스크롤 바디 + 푸터 */
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>전체화면 모달 열기</Button>
        <FullScreenModal
          open={open}
          onClose={() => setOpen(false)}
          title="계약서 편집"
          footer={
            <>
              <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>저장</Button>
            </>
          }
        >
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>제{i + 1}조 — 스크롤되는 본문 콘텐츠입니다.</p>
          ))}
        </FullScreenModal>
      </>
    );
  },
};

/** Escape 닫기 비활성 */
export const DisableEscapeClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>열기</Button>
        <FullScreenModal
          open={open}
          onClose={() => setOpen(false)}
          title="문서 작성"
          disableEscapeClose
        >
          <p style={{ margin: 0 }}>Escape로 닫히지 않습니다. 닫기 버튼을 사용하세요.</p>
        </FullScreenModal>
      </>
    );
  },
};
