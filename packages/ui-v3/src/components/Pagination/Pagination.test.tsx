import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '.';

describe('Pagination', () => {
  it('calls onPageChange with next page', () => {
    const handleChange = vi.fn();
    render(<Pagination onPageChange={handleChange} page={3} pageCount={10} />);
    fireEvent.click(screen.getByRole('button', { name: '다음' }));
    expect(handleChange).toHaveBeenCalledWith(4);
  });
});
