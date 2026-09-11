import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Container } from ".";

/**
 * ## Container
 *
 * 콘텐츠 최대 폭을 정하고 중앙 정렬 + 좌우 패딩(x5=20px)을 제공합니다.
 * 넓은 모니터에서 내용이 무한정 퍼지는 것을 막습니다.
 *
 * ### Import
 * ```tsx
 * import { Container } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `size` | `"sm" \| "md" \| "lg" \| "full"` | `"lg"` | 최대 폭 768/1024/1280px/무제한 |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "full"] },
  },
};
export default meta;
type Story = StoryObj<typeof Container>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: { size: "lg" },
  parameters: {
    docs: {
      source: {
        code: `import { Container } from "@lds/ui-v3";

// 페이지 본문 폭 제한 (기본 lg=1280px)
<Container size="lg">
  <h1>사건 목록</h1>
  {/* 본문 */}
</Container>

// 읽기용 좁은 폭
<Container size="sm">
  <article>약관 본문</article>
</Container>`,
      },
    },
  },
  render: (args) => (
    <div style={{ background: "#f1f5f9", padding: "16px 0" }}>
      <Container {...args}>
        <div style={{ background: "#e0e7ff", borderRadius: 4, padding: 16, textAlign: "center" }}>
          size="{args.size}" 콘텐츠 영역
        </div>
      </Container>
    </div>
  ),
};

export const SizeShowcase: Story = {
  name: "사이즈 비교 (sm/md/lg)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "#f1f5f9", padding: "16px 0" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Container key={size} size={size}>
          <div style={{ background: "#e0e7ff", borderRadius: 4, padding: 8, textAlign: "center", fontSize: 13 }}>
            {size}
          </div>
        </Container>
      ))}
    </div>
  ),
};
