import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SInput } from '../Input';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<SInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders prefix and suffix', () => {
    render(<SInput prefix="$" suffix=".00" />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('.00')).toBeInTheDocument();
  });

  it('supports controlled value and onChange', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(<SInput value="hello" onChange={handleChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('hello');

    await userEvent.type(input, ' world');
    expect(handleChange).toHaveBeenCalledTimes(6);
    expect(handleChange).toHaveBeenLastCalledWith('hellod', expect.anything());

    rerender(<SInput value="hello world" onChange={handleChange} />);
    expect(input.value).toBe('hello world');
  });

  it('supports uncontrolled defaultValue', async () => {
    render(<SInput defaultValue="initial" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('initial');

    await userEvent.type(input, '!');
    expect(input.value).toBe('initial!');
  });

  it('reflects disabled state', () => {
    render(<SInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('displays error string and applies error styles', () => {
    render(<SInput error="Invalid input" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid input');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies error style when error is boolean true', () => {
    const { container } = render(<SInput error />);
    expect(container.querySelector('.sui-input--error')).toBeInTheDocument();
  });
});
