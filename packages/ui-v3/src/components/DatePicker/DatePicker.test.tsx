import { render, screen } from '@testing-library/react';
import { DatePicker, DateRangePicker, TimePicker } from '.';

describe('DatePicker family', () => {
  it('renders date field', () => {
    render(<DatePicker label="시작일" />);
    expect(screen.getByLabelText('시작일')).toHaveAttribute('type', 'date');
  });

  it('renders range and time field', () => {
    render(<><DateRangePicker label="조회 기간" /><TimePicker label="시간" /></>);
    expect(screen.getByText('조회 기간')).toBeInTheDocument();
    expect(screen.getByLabelText('시간')).toHaveAttribute('type', 'time');
  });
});
