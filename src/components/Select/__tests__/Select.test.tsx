import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SSelect } from '../Select';

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana', disabled: true },
  { label: 'Cherry', value: 'cherry' },
];

describe('Select', () => {
  it('renders with placeholder', () => {
    render(<SSelect options={OPTIONS} />);
    expect(screen.getByText('Please select')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    render(<SSelect options={OPTIONS} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
  });

  it('fires onChange when selecting an option', async () => {
    const handleChange = vi.fn();
    render(<SSelect options={OPTIONS} onChange={handleChange} />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(handleChange).toHaveBeenCalledWith('cherry');
  });

  it('does not fire onChange for disabled option', async () => {
    const handleChange = vi.fn();
    render(<SSelect options={OPTIONS} onChange={handleChange} />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('reflects controlled value', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <SSelect options={OPTIONS} value="apple" onChange={handleChange} />,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Apple');

    rerender(<SSelect options={OPTIONS} value="cherry" onChange={handleChange} />);
    expect(screen.getByRole('button')).toHaveTextContent('Cherry');
  });

  it('supports keyboard navigation and selection', async () => {
    const handleChange = vi.fn();
    render(<SSelect options={OPTIONS} onChange={handleChange} />);
    const trigger = screen.getByRole('button');

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    expect(handleChange).toHaveBeenCalledWith('cherry');
  });

  it('closes dropdown on Escape', async () => {
    render(<SSelect options={OPTIONS} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects option by Enter or Space on option element', async () => {
    const handleChange = vi.fn();
    render(<SSelect options={OPTIONS} onChange={handleChange} />);
    await userEvent.click(screen.getByRole('button'));

    const cherryOption = screen.getByRole('option', { name: 'Cherry' });
    cherryOption.focus();
    fireEvent.keyDown(cherryOption, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith('cherry');

    await userEvent.click(screen.getByRole('button'));
    const appleOption = screen.getByRole('option', { name: 'Apple' });
    appleOption.focus();
    fireEvent.keyDown(appleOption, { key: ' ' });
    expect(handleChange).toHaveBeenLastCalledWith('apple');
  });
});
