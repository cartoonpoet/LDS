import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination, PaginationCount } from ".";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## Pagination
 *
 * 페이지 네비게이션 컴포넌트. Basic / Count 2가지 변형과 단독 PaginationCount를 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { Pagination, PaginationCount } from "@lds/ui-v3";
 * ```
 *
 * ### Props (Pagination)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `page` | `number` | - | 현재 페이지 (1-based) |
 * | `totalPages` | `number` | - | 전체 페이지 수 |
 * | `onPageChange` | `(page: number) => void` | - | 페이지 변경 핸들러 |
 * | `visiblePages` | `number` | `7` | 표시할 페이지 번호 수 |
 * | `totalCount` | `number` | - | 전체 건수 (설정 시 "총 N건" 표시) |
 *
 * ### Template Code
 * ```tsx
 * // Basic
 * <Pagination page={page} totalPages={10} onPageChange={setPage} />
 *
 * // With Count
 * <Pagination page={page} totalPages={100} onPageChange={setPage} totalCount={1144} />
 *
 * // Count only
 * <PaginationCount totalCount={1144} />
 * ```
 */
const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    page: { description: "현재 페이지 (1-based)" },
    totalPages: { description: "전체 페이지 수" },
    visiblePages: { description: "표시할 페이지 번호 수" },
    totalCount: { description: "전체 건수 (설정 시 '총 N건' 표시)" },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

/** Basic — 페이지 번호만 */
export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    return (
      <Pagination page={page} totalPages={10} onPageChange={setPage} />
    );
  },
};

/** With Count — 페이지 번호 + "총 N건" */
export const WithCount: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    return (
      <Pagination
        page={page}
        totalPages={100}
        onPageChange={setPage}
        totalCount={1144}
      />
    );
  },
};

/** Read Link — "총 N건" 텍스트만 */
export const ReadLink: Story = {
  render: () => (
    <PaginationCount totalCount={1144} />
  ),
};

/** 첫 페이지 (Prev 비활성) */
export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination page={page} totalPages={20} onPageChange={setPage} />
    );
  },
};

/** 마지막 페이지 (Next 비활성) */
export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(20);
    return (
      <Pagination page={page} totalPages={20} onPageChange={setPage} />
    );
  },
};

/** 적은 페이지 수 */
export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination page={page} totalPages={3} onPageChange={setPage} />
    );
  },
};

/** 커스텀 visiblePages */
export const CustomVisiblePages: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        page={page}
        totalPages={50}
        onPageChange={setPage}
        visiblePages={5}
        totalCount={500}
      />
    );
  },
};
