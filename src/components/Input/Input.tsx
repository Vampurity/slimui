import React from 'react';
import { classNames } from '../../utils/classNames';
import './Input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange'> {
  size?: 'small' | 'medium' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean | string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'medium',
      prefix,
      suffix,
      error,
      disabled,
      className,
      style,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value, event);
    };

    const inputProps = isControlled
      ? { value, onChange: handleChange }
      : { defaultValue, onChange: handleChange };

    const wrapperCls = classNames('sui-input__wrapper', className);

    const inputWrapperCls = classNames(
      'sui-input',
      `sui-input--${size}`,
      disabled && 'sui-input--disabled',
      error && 'sui-input--error',
    );

    return (
      <div className={wrapperCls} style={style}>
        <div className={inputWrapperCls}>
          {prefix && <span className="sui-input__prefix">{prefix}</span>}
          <input
            ref={ref}
            className="sui-input__field"
            disabled={disabled}
            aria-invalid={Boolean(error)}
            {...inputProps}
            {...rest}
          />
          {suffix && <span className="sui-input__suffix">{suffix}</span>}
        </div>
        {typeof error === 'string' && (
          <span className="sui-input__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

SInput.displayName = 'SInput';

export default SInput;
