import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { lightThemeClass } from "@lds/tokens";
import { Pagination, usePaginationState } from ".";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: 24, width: 720, background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [page, setPage] = useState(5);
    return <Pagination {...args} onPageChange={setPage} page={page} />;
  },
  args: { pageCount: 24 }
};

export const WithSummary: Story = {
  render: args => {
    const [page, setPage] = useState(3);
    return <Pagination {...args} onPageChange={setPage} page={page} />;
  },
  args: {
    pageCount: 12,
    pageSize: 20,
    totalCount: 228,
    itemLabel: "rows"
  }
};

export const TanstackTableBridge: Story = {
  render: () => {
    const [pageIndex, setPageIndex] = useState(2);
    const pagination = usePaginationState({ pageIndex, pageSize: 20, totalCount: 228, onPageIndexChange: setPageIndex });

    return <Pagination {...pagination} pageSize={20} totalCount={228} itemLabel="rows" />;
  }
};
