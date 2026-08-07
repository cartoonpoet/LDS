import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Drawer } from ".";
import { Button } from "../Button";

/**
 * ## Drawer
 *
 * 화면 가장자리에서 슬라이드 인 하는 패널 프리미티브.
 * 계약 상세, 필터 패널 등 흐름을 떠나지 않는 부가 작업에 사용합니다.
 * Modal과 같은 헤더(타이틀 + 닫기 X) / 스크롤 바디 / 푸터 구조를 공유합니다.
 *
 * ### Import
 * ```tsx
 * import { Drawer } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `open` | `boolean` | - | 표시 여부 |
 * | `onClose` | `() => void` | - | 닫기 핸들러 (Escape, backdrop 클릭, close 버튼) |
 * | `side` | `"right" \| "left"` | `"right"` | 슬라이드 인 방향 |
 * | `size` | `"small" \| "medium" \| "large"` | `"medium"` | 너비 — 360 / 480 / 640px |
 * | `title` | `ReactNode` | - | 헤더 타이틀 (간편 API) |
 * | `footer` | `ReactNode` | - | 푸터 콘텐츠 (간편 API) |
 * | `backdrop` | `boolean` | `true` | dim 배경 + 클릭 닫기 + 스크롤락. false면 비차단 |
 * | `closeOnEscape` | `boolean` | `true` | Escape 키 닫기 |
 */
const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6", minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => <BasicExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Drawer, Button } from "@lds/ui-v3";

function MyPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>계약 상세 열기</Button>

      {/* 기본 — 오른쪽에서 슬라이드 인, dim + 클릭/Escape 닫기 */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="계약 상세"
        footer={
          <>
            <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={() => setOpen(false)}>저장</Button>
          </>
        }
      >
        <p>계약 상세 콘텐츠</p>
      </Drawer>

      {/* 왼쪽 + 작은 사이즈 (필터 패널) */}
      <Drawer open={open} onClose={() => setOpen(false)} side="left" size="small" title="필터">
        <p>필터 콘텐츠</p>
      </Drawer>

      {/* 비차단 — dim 없이 페이지 조작 가능 */}
      <Drawer open={open} onClose={() => setOpen(false)} backdrop={false} title="메모">
        <p>페이지를 계속 조작할 수 있어요.</p>
      </Drawer>

      {/* Escape 닫기 비활성 */}
      <Drawer open={open} onClose={() => setOpen(false)} title="작성 중" closeOnEscape={false}>
        <p>실수로 닫히지 않도록 Escape를 막습니다.</p>
      </Drawer>
    </>
  );
}`,
      },
    },
  },
};

function BasicExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>계약 상세 열기</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="계약 상세"
        footer={
          <>
            <Button variant="outline" color="secondary" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>저장</Button>
          </>
        }
      >
        <p>휴맥스이브이 법무시스템 Law.ai 공급 계약의 상세 내용입니다.</p>
        <p>관리번호: C20221108-0001</p>
        <p>상대계약자: 휴맥스이브이</p>
      </Drawer>
    </>
  );
}

export const Basic: Story = {
  render: () => <BasicExample />,
};

function LeftSideExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>필터 열기 (왼쪽)</Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="left" size="small" title="필터">
        <p>계약 상태, 담당자, 기간 등의 필터 콘텐츠</p>
      </Drawer>
    </>
  );
}

export const LeftSide: Story = {
  render: () => <LeftSideExample />,
};

function SizesExample() {
  const [size, setSize] = useState<"small" | "medium" | "large" | null>(null);
  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <Button onClick={() => setSize("small")}>Small (360px)</Button>
        <Button onClick={() => setSize("medium")}>Medium (480px)</Button>
        <Button onClick={() => setSize("large")}>Large (640px)</Button>
      </div>
      <Drawer
        open={size !== null}
        onClose={() => setSize(null)}
        size={size ?? "medium"}
        title={`${size ?? "medium"} 사이즈`}
      >
        <p>size prop으로 패널 너비를 조절합니다.</p>
      </Drawer>
    </>
  );
}

export const Sizes: Story = {
  render: () => <SizesExample />,
};

function NonBlockingExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>비차단 패널 열기</Button>
      <p style={{ marginTop: 12 }}>backdrop이 없어 페이지를 계속 조작할 수 있어요.</p>
      <Drawer open={open} onClose={() => setOpen(false)} backdrop={false} size="small" title="메모">
        <p>페이지 위에 떠 있는 비차단 패널입니다.</p>
      </Drawer>
    </>
  );
}

export const NonBlocking: Story = {
  render: () => <NonBlockingExample />,
};
