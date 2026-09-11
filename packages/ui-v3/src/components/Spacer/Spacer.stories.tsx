import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Spacer } from ".";

/**
 * ## Spacer
 *
 * flex 컨테이너(HStack/VStack) 안에서 남는 공간을 전부 차지하는 빈 요소입니다.
 * "왼쪽엔 제목, 오른쪽 끝엔 버튼" 배치가 한 줄로 끝납니다.
 *
 * ### Import
 * ```tsx
 * import { Spacer } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof Spacer> = {
  title: "Components/Spacer",
  component: Spacer,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Spacer>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { HStack, Spacer, Button } from "@lds/ui-v3";

// 제목 왼쪽, 버튼 오른쪽 끝
<HStack gap="x3" align="center">
  <h2>사건 목록</h2>
  <Spacer />
  <Button>+ 사건 등록</Button>
</HStack>`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px dashed #cbd5e1", borderRadius: 6, padding: "8px 12px" }}>
      <span style={{ fontWeight: 600 }}>사건 목록</span>
      <Spacer style={{ background: "repeating-linear-gradient(135deg, #e2e8f0 0 3px, transparent 3px 7px)", borderRadius: 4, height: 24 }} />
      <span style={{ padding: "4px 12px", background: "#6366f1", color: "#fff", borderRadius: 4, fontSize: 13 }}>+ 사건 등록</span>
    </div>
  ),
};
