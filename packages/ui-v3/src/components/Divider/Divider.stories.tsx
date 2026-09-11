import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Divider } from ".";

/**
 * ## Divider
 *
 * 색·두께가 항상 border 토큰으로 고정되는 구분선입니다. 수평·수직을 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { Divider } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | 방향 (vertical은 flex 부모에서 stretch) |
 * | `...rest` | `HTMLAttributes<HTMLElement>` | - | 네이티브 속성 전달 |
 */
const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { Divider } from "@lds/ui-v3";

// 섹션 구분
<section>위 콘텐츠</section>
<Divider />
<section>아래 콘텐츠</section>

// 수직 구분 (flex 부모 안)
<HStack gap="x3" align="center">
  <span>진행 중 24</span>
  <Divider orientation="vertical" />
  <span>종결 96</span>
</HStack>`,
      },
    },
  },
  render: () => (
    <div>
      <p style={{ margin: "0 0 12px" }}>위 콘텐츠</p>
      <Divider />
      <p style={{ margin: "12px 0 0" }}>아래 콘텐츠</p>
    </div>
  ),
};

export const Vertical: Story = {
  name: "수직 구분선",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 40 }}>
      <span>진행 중 24</span>
      <Divider orientation="vertical" />
      <span>종결 96</span>
    </div>
  ),
};
