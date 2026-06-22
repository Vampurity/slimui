import React from 'react';
import { classNames } from '../../utils/classNames';
import './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const SButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'default', size = 'medium', loading = false, children, className, style, ...rest },
    ref,
  ) => {
    const cls = classNames(
      'sui-button',
      `sui-button--${variant}`,
      `sui-button--${size}`,
      (rest.disabled || loading) && 'sui-button--disabled',
      loading && 'sui-button--loading',
      className,
    );

    return (
      <button
        ref={ref}
        type={rest.type ?? 'button'}
        className={cls}
        style={style}
        disabled={rest.disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {loading && <span className="sui-button__spinner" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

SButton.displayName = 'SButton';

export default SButton;
