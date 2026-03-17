import { fireEvent, render, screen } from '@testing-library/react';
import { ButtonGroup } from '.';

describe('ButtonGroup', () => {
  it('changes active item when clicked', () => {
    render(<ButtonGroup items={[{ label: '전체', value: 'all' }, { label: '진행중', value: 'open' }]} />);
    fireEvent.click(screen.getByRole('button', { name: '진행중' }));
    expect(screen.getByRole('button', { name: '진행중' })).toHaveAttribute('aria-pressed', 'true');
  });
});
