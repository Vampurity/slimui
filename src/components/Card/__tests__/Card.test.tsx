import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SCard } from '../Card';

describe('Card', () => {
  it('renders title, children and actions', () => {
    render(
      <SCard title="Card Title" actions={<button type="button">Action</button>}>
        Card content
      </SCard>,
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies bordered class by default', () => {
    const { container } = render(<SCard>Content</SCard>);
    expect(container.querySelector('.sui-card--bordered')).toBeInTheDocument();
  });

  it('applies shadowed and hoverable classes', () => {
    const { container } = render(
      <SCard shadowed hoverable>
        Content
      </SCard>,
    );
    expect(container.querySelector('.sui-card--shadowed')).toBeInTheDocument();
    expect(container.querySelector('.sui-card--hoverable')).toBeInTheDocument();
  });

  it('does not render header or footer when title/actions are absent', () => {
    const { container } = render(<SCard>Content</SCard>);
    expect(container.querySelector('.sui-card__header')).not.toBeInTheDocument();
    expect(container.querySelector('.sui-card__actions')).not.toBeInTheDocument();
  });
});
