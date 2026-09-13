import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Box } from ".";

/**
 * ## Box
 *
 * 패딩·배경·테두리·라운드를 디자인 토큰 키로 받는 만능 레이아웃 컨테이너입니다.
 * div + 인라인 스타일을 대체해 간격·색이 시스템을 벗어나지 않게 합니다.
 *
 * ### Import
 * ```tsx
 * import { Box } from "@lawkit/ui";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `p` | `"x1" \| ... \| "x6"` | - | 사방 패딩 토큰 |
 * | `px` / `py` | `"x1" \| ... \| "x6"` | - | 축별 패딩 (p보다 우선) |
 * | `bg` | `"page" \| "canvas" \| "subtle" \| "raised"` | - | surface 역할 배경 |
 * | `radius` | `"sm" \| "md" \| "lg"` | - | 라운드 토큰 (4/6/8px) |
 * | `border` | `boolean` | `false` | 1px border.subtle 테두리 |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    p: { control: "select", options: ["x1", "x2", "x3", "x4", "x5", "x6"] },
    bg: { control: "select", options: ["page", "canvas", "subtle", "raised"] },
    radius: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Box>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: { p: "x4", bg: "canvas", radius: "md", border: true },
  parameters: {
    docs: {
      source: {
        code: `import { Box } from "@lawkit/ui";

// 카드형 영역 — 패딩/배경/라운드/테두리를 토큰으로
<Box p="x4" bg="canvas" radius="md" border>
  콘텐츠
</Box>

// 축별 패딩
<Box px="x5" py="x3" bg="subtle" radius="lg">
  좌우 20px / 상하 12px
</Box>

// 페이지 배경 섹션
<Box p="x6" bg="page">
  섹션 콘텐츠
</Box>`,
      },
    },
  },
  render: (args) => <Box {...args}>토큰 기반 컨테이너</Box>,
};

export const Backgrounds: Story = {
  name: "배경 토큰 비교",
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {(["page", "canvas", "subtle", "raised"] as const).map((bg) => (
        <Box key={bg} p="x4" bg={bg} radius="md" border style={{ width: 120 }}>
          bg="{bg}"
        </Box>
      ))}
    </div>
  ),
};

export const PaddingShowcase: Story = {
  name: "패딩 토큰 비교 (x1~x6)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["x1", "x2", "x3", "x4", "x5", "x6"] as const).map((p) => (
        <Box key={p} p={p} bg="subtle" radius="sm" border style={{ alignSelf: "flex-start" }}>
          p="{p}"
        </Box>
      ))}
    </div>
  ),
};
