import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SModal } from '../Modal';

describe('Modal', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders when open and not when closed', () => {
    const { rerender } = render(
      <SModal open title="Test">
        Content
      </SModal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender(
      <SModal open={false} title="Test">
        Content
      </SModal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when clicking mask', async () => {
    const handleClose = vi.fn();
    render(
      <SModal open title="Test" onClose={handleClose}>
        Content
      </SModal>,
    );
    const mask = document.querySelector('.sui-modal__mask') as HTMLElement;
    await userEvent.click(mask);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape key', () => {
    const handleClose = vi.fn();
    render(
      <SModal open title="Test" onClose={handleClose}>
        Content
      </SModal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking modal content', async () => {
    const handleClose = vi.fn();
    render(
      <SModal open title="Test" onClose={handleClose}>
        Content
      </SModal>,
    );
    await userEvent.click(screen.getByText('Content'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders custom footer', () => {
    render(
      <SModal open title="Test" footer={<button type="button">Custom</button>}>
        Content
      </SModal>,
    );
    expect(screen.getByRole('button', { name: 'Custom' })).toBeInTheDocument();
  });

  it('hides footer when footer is null', () => {
    const { container } = render(
      <SModal open title="Test" footer={null}>
        Content
      </SModal>,
    );
    expect(container.querySelector('.sui-modal__footer')).not.toBeInTheDocument();
  });

  it('shows confirm loading state on default OK button', () => {
    render(
      <SModal open title="Test" confirmLoading>
        Content
      </SModal>,
    );
    const okButton = screen.getByRole('button', { name: /OK/i });
    expect(okButton).toBeDisabled();
    expect(okButton).toHaveAttribute('aria-busy', 'true');
  });

  it('traps focus within the modal', async () => {
    render(
      <SModal open title="Test" footer={null}>
        <input type="text" />
        <button type="button">Inside</button>
      </SModal>,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    const insideButton = screen.getByRole('button', { name: 'Inside' });

    await waitFor(() => {
      expect(document.activeElement).toBe(closeButton);
    });

    closeButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(insideButton);

    insideButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(closeButton);
  });
});
