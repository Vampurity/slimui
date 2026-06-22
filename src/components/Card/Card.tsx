import type React from 'react';
import { classNames } from '../../utils/classNames';
import './Card.module.css';

export interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  bordered?: boolean;
  shadowed?: boolean;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SCard: React.FC<CardProps> = ({
  title,
  children,
  actions,
  bordered = true,
  shadowed = false,
  hoverable = false,
  className,
  style,
}) => {
  const cls = classNames(
    'sui-card',
    bordered && 'sui-card--bordered',
    shadowed && 'sui-card--shadowed',
    hoverable && 'sui-card--hoverable',
    className,
  );

  return (
    <div className={cls} style={style}>
      {title && (
        <div className="sui-card__header">
          <div className="sui-card__title">{title}</div>
        </div>
      )}
      <div className="sui-card__body">{children}</div>
      {actions && <div className="sui-card__actions">{actions}</div>}
    </div>
  );
};

SCard.displayName = 'SCard';

export default SCard;
