import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Spinner } from ".";

/**
 * ## Spinner
 *
 * 로딩 상태를 나타내는 스피너 컴포넌트입니다.
 *
 * ### 사이즈
 * - `sm` (16px) — 인라인, 버튼 내부
 * - `md` (20px) — 기본
 * - `lg` (32px) — 섹션 로딩
 * - `xl` (48px) — 페이지 로딩
 */
const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["primary", "white"],
    },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: {},
  parameters: {
    docs: {
      source: {
        code: `import { Spinner } from "@lds/ui-v3";

// 기본
<Spinner />

// 크기 변경
<Spinner size="lg" />

// 라벨 포함
<Spinner size="lg" label="로딩 중..." />

// 흰색 (어두운 배경용)
<Spinner color="white" />
`,
      },
    },
  },
};

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Spinner size="sm" label="로딩 중..." />
      <Spinner size="md" label="데이터를 불러오고 있습니다" />
      <Spinner size="lg" label="잠시만 기다려주세요" />
    </div>
  ),
};

export const WhiteOnDark: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: 24,
        backgroundColor: "#2155ec",
        borderRadius: 8,
      }}
    >
      <Spinner size="sm" color="white" />
      <Spinner size="md" color="white" />
      <Spinner size="lg" color="white" />
    </div>
  ),
};
