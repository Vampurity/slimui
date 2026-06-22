import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SButton } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<SButton>Click me</SButton>);
    expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<SButton onClick={handleClick}>Click me</SButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const handleClick = vi.fn();
    render(
      <SButton disabled onClick={handleClick}>
        Disabled
      </SButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state and blocks click', async () => {
    const handleClick = vi.fn();
    const { container } = render(
      <SButton loading onClick={handleClick}>
        Loading
      </SButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelector('.sui-button__spinner')).toBeInTheDocument();
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant and size classes', () => {
    const { container } = render(
      <SButton variant="primary" size="large">
        Primary Large
      </SButton>,
    );
    expect(container.querySelector('.sui-button--primary')).toBeInTheDocument();
    expect(container.querySelector('.sui-button--large')).toBeInTheDocument();
  });
});
