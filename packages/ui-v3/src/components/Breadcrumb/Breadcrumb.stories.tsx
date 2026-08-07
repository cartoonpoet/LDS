import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Breadcrumb } from ".";

/**
 * ## Breadcrumb
 *
 * 현재 페이지까지의 경로를 보여주는 내비게이션.
 * 마지막 항목은 현재 페이지로 취급되어 링크가 아닌 `aria-current="page"` 텍스트로 렌더링됩니다.
 *
 * ### Import
 * ```tsx
 * import { Breadcrumb } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `BreadcrumbItem[]` — `{ label, href?, onClick? }` | - | 경로 항목 목록 (마지막 = 현재 페이지) |
 * | `separator` | `ReactNode` | `"/"` | 구분자 |
 * | `size` | `"small" \| "medium"` | `"medium"` | 사이즈 |
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { label: "홈", href: "#" },
      { label: "계약", href: "#" },
      { label: "계약 상세" },
    ],
  },
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
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
  parameters: {
    docs: {
      source: {
        code: `import { Breadcrumb } from "@lds/ui-v3";

// 기본 — 마지막 항목이 현재 페이지 (aria-current="page")
<Breadcrumb
  items={[
    { label: "홈", href: "/" },
    { label: "계약", href: "/contracts" },
    { label: "계약 상세" },
  ]}
/>

// 구분자 커스텀 (chevron 등)
<Breadcrumb items={items} separator=">" />

// 라우터 연동 (onClick)
<Breadcrumb
  items={[
    { label: "홈", href: "/", onClick: (e) => { e.preventDefault(); router.push("/"); } },
    { label: "현재 페이지" },
  ]}
/>

// 작은 사이즈
<Breadcrumb items={items} size="small" />`,
      },
    },
  },
};

export const Basic: Story = {};

export const ChevronSeparator: Story = {
  args: {
    separator: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m4.5 2.5 3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};
