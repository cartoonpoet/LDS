import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '.';

const meta = { title: 'Components/Pagination', component: Pagination } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = { render: args => { const [page, setPage] = useState(5); return <Pagination {...args} onPageChange={setPage} page={page} />; }, args: { pageCount: 24 } };
