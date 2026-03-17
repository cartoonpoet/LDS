import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from '.';

const groups = [{ options: [{ value: 'last-year', label: '지난 1년' }, { value: 'last-3-years', label: '지난 3년' }] }];

describe('Dropdown', () => {
  it('renders placeholder and label', () => {
    render(<Dropdown groups={groups} label="조회 기간" placeholder="항목 선택" />);
    expect(screen.getByText('조회 기간')).toBeInTheDocument();
    expect(screen.getByText('항목 선택')).toBeInTheDocument();
  });

  it('updates selected value in single mode', () => {
    render(<Dropdown groups={groups} placeholder="항목 선택" />);
    fireEvent.click(screen.getByRole('button', { name: '항목 선택' }));
    fireEvent.click(screen.getByRole('button', { name: '지난 1년' }));
    expect(screen.getByText('지난 1년')).toBeInTheDocument();
  });
});
