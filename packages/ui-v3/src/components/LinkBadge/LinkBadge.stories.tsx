import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { LinkBadge } from ".";

/**
 * ## LinkBadge
 *
 * 링크로 이동하는 뱃지. 계약번호, 사건번호처럼 식별자를 눌러 상세로 이동하는 자리에 사용합니다.
 * Badge와 같은 시각 언어(tone/variant)를 공유하며, `external`이면 새 탭으로 열립니다.
 */
const meta: Meta<typeof LinkBadge> = {
  title: "Components/LinkBadge",
  component: LinkBadge,
  args: {
    children: "C2026-01",
    href: "#"
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { LinkBadge } from "@lds/ui-v3";

// 기본 (outline / primary) — 계약번호 등 식별자 링크
<LinkBadge href="/contracts/C2026-01">C2026-01</LinkBadge>

// 새 탭으로 열기 (↗ 표시 + rel 가드 자동)
<LinkBadge href="https://example.com" external>외부 문서</LinkBadge>

// 변형
<LinkBadge href="#" variant="filled">Filled</LinkBadge>
<LinkBadge href="#" variant="muted" tone="neutral">Muted</LinkBadge>

// 아이콘 포함
<LinkBadge href="#" leadingIcon={<MyIcon />}>아이콘</LinkBadge>`
      }
    }
  }
};

export const Outline: Story = {};

export const Filled: Story = {
  args: {
    variant: "filled"
  }
};

export const External: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "외부 문서"
  }
};

export const NeutralMuted: Story = {
  args: {
    variant: "muted",
    tone: "neutral",
    children: "보관됨"
  }
};
