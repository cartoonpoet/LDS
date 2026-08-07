import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { FloatingModal } from ".";
import { Button } from "../Button";

/**
 * ## FloatingModal
 *
 * 화면 우하단(기본)에 고정으로 떠 있는 비차단 모달.
 * backdrop이 없어 페이지를 계속 조작할 수 있습니다. (예: 업로드 진행, 작성 중인 메모)
 *
 * ### Import
 * ```tsx
 * import { FloatingModal } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `open` | `boolean` | - | 표시 여부 |
 * | `onClose` | `() => void` | - | 닫기 핸들러 |
 * | `title` | `ReactNode` | - | 헤더 타이틀 |
 * | `footer` | `ReactNode` | - | 푸터 콘텐츠 |
 * | `position` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | 고정 위치 |
 * | `collapsible` | `boolean` | `false` | 접기/펼치기 토글 표시 |
 * | `closeOnEscape` | `boolean` | `false` | Escape 키 닫기 (비차단 특성상 기본 off) |
 */
const meta: Meta<typeof FloatingModal> = {
  title: "Components/FloatingModal",
  component: FloatingModal,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    open: { description: "표시 여부" },
    position: { description: "고정 위치" },
    collapsible: { description: "접기/펼치기 토글 표시" },
  },
};
export default meta;

type Story = StoryObj<typeof FloatingModal>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>플로팅 모달 열기</Button>
        <FloatingModal
          open={open}
          onClose={() => setOpen(false)}
          title="파일 업로드"
          collapsible
          footer={<Button onClick={() => setOpen(false)}>완료</Button>}
        >
          <p style={{ margin: 0 }}>계약서_최종.pdf 업로드 중… (75%)</p>
        </FloatingModal>
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { FloatingModal, Button } from "@lds/ui-v3";

function MyPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>플로팅 모달 열기</Button>

      {/* 우하단 고정, backdrop 없음 — 페이지 조작 가능 */}
      <FloatingModal
        open={open}
        onClose={() => setOpen(false)}
        title="파일 업로드"
        collapsible
        footer={<Button onClick={() => setOpen(false)}>완료</Button>}
      >
        <p>계약서_최종.pdf 업로드 중… (75%)</p>
      </FloatingModal>

      {/* 좌하단 + Escape 닫기 */}
      <FloatingModal
        open={open}
        onClose={() => setOpen(false)}
        title="메모"
        position="bottom-left"
        closeOnEscape
      >
        <p>작성 중인 메모</p>
      </FloatingModal>
    </>
  );
}
`,
      },
    },
  },
};

/** 기본 — 우하단 고정 */
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>열기</Button>
        <FloatingModal open={open} onClose={() => setOpen(false)} title="파일 업로드">
          <p style={{ margin: 0 }}>계약서_최종.pdf 업로드 중… (75%)</p>
        </FloatingModal>
      </>
    );
  },
};

/** 접기/펼치기 토글 + 푸터 */
export const Collapsible: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>열기</Button>
        <FloatingModal
          open={open}
          onClose={() => setOpen(false)}
          title="파일 업로드"
          collapsible
          footer={<Button onClick={() => setOpen(false)}>완료</Button>}
        >
          <p style={{ margin: 0 }}>계약서_최종.pdf 업로드 중… (75%)</p>
        </FloatingModal>
      </>
    );
  },
};

/** 좌하단 고정 */
export const BottomLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>열기</Button>
        <FloatingModal open={open} onClose={() => setOpen(false)} title="메모" position="bottom-left">
          <p style={{ margin: 0 }}>작성 중인 메모</p>
        </FloatingModal>
      </>
    );
  },
};
