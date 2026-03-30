import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Mention } from ".";

/**
 * **Mention** — 인라인 멘션 태그
 */
const meta: Meta<typeof Mention> = {
  title: "Components/Mention",
  component: Mention,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#fff", fontSize: 14 }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Mention>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: { name: "나담당" },
  parameters: {
    docs: {
      source: {
        code: `import { Mention } from "@lds/ui-v3";

// 기본 멘션
<Mention name="나담당" />

// 문장 내 사용
<p>검토자: <Mention name="나담당" /> 님이 확인 중입니다.</p>

// 여러 멘션
<div style={{ display: "flex", gap: 8 }}>
  <Mention name="김철수" />
  <Mention name="이영희" />
</div>
`,
      },
    },
  },
};

/** 기본 */
export const Default: Story = {
  args: { name: "나담당" },
};

/** 문장 내 사용 */
export const InContext: Story = {
  name: "In Context",
  render: () => (
    <p style={{ margin: 0, lineHeight: "24px" }}>
      계약 검토를 <Mention name="이법무" /> 님에게 요청했습니다.
      <Mention name="박영업" /> 님도 참조로 추가되었습니다.
    </p>
  ),
};

/** 여러 멘션 */
export const Multiple: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Mention name="김철수" />
      <Mention name="이영희" />
      <Mention name="박민수" />
    </div>
  ),
};
