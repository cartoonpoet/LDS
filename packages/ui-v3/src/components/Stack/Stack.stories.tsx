import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { HStack, VStack } from ".";

/**
 * ## HStack / VStack
 *
 * flex 레이아웃을 선언적으로 표현하는 레이아웃 컴포넌트입니다.
 * `HStack`은 가로 방향, `VStack`은 세로 방향으로 자식을 배치합니다.
 *
 * ### Import
 * ```tsx
 * import { HStack, VStack } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `gap` | `"x1" \| "x2" \| "x3" \| "x4" \| "x5" \| "x6"` | - | 자식 간격 (4~24px 토큰) |
 * | `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬 (alignItems) |
 * | `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬 (justifyContent) |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 * | `style` | `CSSProperties` | - | 인라인 스타일 |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof HStack> = {
  title: "Components/Stack",
  component: HStack,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: "select",
      options: ["x1", "x2", "x3", "x4", "x5", "x6"],
      description: "자식 간격. x1=4px, x2=8px, x3=12px, x4=16px, x5=20px, x6=24px",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
      description: "교차축 정렬 (alignItems)",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
      description: "주축 정렬 (justifyContent)",
    },
  },
};
export default meta;
type Story = StoryObj<typeof HStack>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: { gap: "x2" },
  parameters: {
    docs: {
      source: {
        code: `import { HStack, VStack } from "@lds/ui-v3";

// 기본 — gap만
<HStack gap="x2">
  <Button>취소</Button>
  <Button color="primary">확인</Button>
</HStack>

// 헤더 양끝 배치
<HStack gap="x3" justify="between" align="center">
  <h2>제목</h2>
  <Button>추가</Button>
</HStack>

// 폼 세로 쌓기
<VStack gap="x4">
  <Input label="이름" />
  <Input label="이메일" />
  <Button>제출</Button>
</VStack>`,
      },
    },
  },
  render: (args) => (
    <HStack {...args}>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 1</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 2</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 3</div>
    </HStack>
  ),
};

export const HStackDefault: Story = {
  name: "HStack — 기본",
  args: { gap: "x2" },
  render: (args) => (
    <HStack {...args}>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 1</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 2</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 3</div>
    </HStack>
  ),
};

export const HStackJustifyBetween: Story = {
  name: "HStack — 헤더 패턴 (justify=between)",
  render: () => (
    <HStack
      justify="between"
      align="center"
      style={{ padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: 8 }}
    >
      <span style={{ fontWeight: 600 }}>카드 제목</span>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ padding: "4px 12px", background: "#6366f1", color: "#fff", borderRadius: 4, fontSize: 13 }}>편집</div>
        <div style={{ padding: "4px 12px", background: "#f1f5f9", borderRadius: 4, fontSize: 13 }}>삭제</div>
      </div>
    </HStack>
  ),
};

export const VStackDefault: Story = {
  name: "VStack — 기본 (폼 패턴)",
  render: () => (
    <VStack gap="x3" style={{ width: 300 }}>
      <div style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 4, fontSize: 14 }}>이름 입력</div>
      <div style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 4, fontSize: 14 }}>이메일 입력</div>
      <div style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", borderRadius: 4, fontSize: 14, textAlign: "center" }}>
        제출
      </div>
    </VStack>
  ),
};

export const GapShowcase: Story = {
  name: "Gap 토큰 비교 (x1~x6)",
  render: () => (
    <VStack gap="x4">
      {(["x1", "x2", "x3", "x4", "x5", "x6"] as const).map((g) => (
        <div key={g}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>gap="{g}"</div>
          <HStack gap={g}>
            <div style={{ padding: "6px 14px", background: "#e0e7ff", borderRadius: 4 }}>A</div>
            <div style={{ padding: "6px 14px", background: "#e0e7ff", borderRadius: 4 }}>B</div>
            <div style={{ padding: "6px 14px", background: "#e0e7ff", borderRadius: 4 }}>C</div>
          </HStack>
        </div>
      ))}
    </VStack>
  ),
};

export const AlignShowcase: Story = {
  name: "Align 비교 (start/center/end/stretch)",
  render: () => (
    <VStack gap="x4">
      {(["start", "center", "end", "stretch"] as const).map((a) => (
        <div key={a}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>align="{a}"</div>
          <HStack
            align={a}
            gap="x2"
            style={{ height: 60, border: "1px dashed #cbd5e1", borderRadius: 4, padding: "0 8px" }}
          >
            <div style={{ padding: "4px 12px", background: "#e0e7ff", borderRadius: 4 }}>짧음</div>
            <div style={{ padding: "12px", background: "#c7d2fe", borderRadius: 4 }}>길어요</div>
            <div style={{ padding: "4px 12px", background: "#e0e7ff", borderRadius: 4 }}>짧음</div>
          </HStack>
        </div>
      ))}
    </VStack>
  ),
};
