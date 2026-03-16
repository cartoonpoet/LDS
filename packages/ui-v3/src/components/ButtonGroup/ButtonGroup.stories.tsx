import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '.';

const meta = { title: 'Components/ButtonGroup', component: ButtonGroup } satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = { args: { items: [{ label: '전체', value: 'all' }, { label: '진행중', value: 'open' }, { label: '완료', value: 'done' }] } };
