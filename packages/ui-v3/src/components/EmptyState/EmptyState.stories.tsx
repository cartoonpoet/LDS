import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Button } from "../Button";
import { EmptyState } from ".";

/**
 * ## EmptyState
 *
 * 데이터가 없을 때의 표준 빈 화면입니다. 아이콘 + 제목 + 설명 + 액션 구성으로,
 * 화면마다 제각각인 "데이터가 없습니다" 표기를 통일합니다.
 *
 * ### Import
 * ```tsx
 * import { EmptyState } from "@lawkit/ui";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `title` | `ReactNode` | (필수) | 제목 |
 * | `icon` | `ReactNode` | - | 상단 아이콘 (44px 내외 권장) |
 * | `description` | `ReactNode` | - | 보조 설명 |
 * | `action` | `ReactNode` | - | 하단 액션 (Button 등) |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

const FolderIcon = (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M9.5 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { EmptyState, Button } from "@lawkit/ui";

// 기본 — 목록/테이블의 빈 상태
<EmptyState
  icon={<FolderIcon />}
  title="조회된 사건이 없어요"
  description="필터를 조정하거나 새 사건을 등록하세요."
  action={<Button>+ 사건 등록</Button>}
/>

// 제목만 (검색 결과 없음 등)
<EmptyState title="검색 결과가 없어요" description="다른 키워드로 검색해 보세요." />`,
      },
    },
  },
  render: () => (
    <EmptyState
      icon={FolderIcon}
      title="조회된 사건이 없어요"
      description="필터를 조정하거나 새 사건을 등록하세요."
      action={<Button>+ 사건 등록</Button>}
    />
  ),
};

export const TitleOnly: Story = {
  name: "제목만",
  render: () => (
    <EmptyState title="검색 결과가 없어요" description="다른 키워드로 검색해 보세요." />
  ),
};
