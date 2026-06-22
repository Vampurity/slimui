import type React from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import './Select.module.css';

export type SelectValue = string | number;

export interface SelectOption {
  label: string;
  value: SelectValue;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: SelectValue;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  onChange?: (value: SelectValue) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SSelect: React.FC<SelectProps> = ({
  options,
  value,
  placeholder = 'Please select',
  disabled = false,
  size = 'medium',
  onChange,
  className,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const triggerId = useId();

  const selectedIndex = useMemo(() => {
    if (value === undefined) return -1;
    return options.findIndex((option) => option.value === value);
  }, [options, value]);

  const selectedLabel = useMemo(() => {
    if (selectedIndex === -1) return null;
    return options[selectedIndex]?.label ?? null;
  }, [options, selectedIndex]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setOpen((prev) => !prev);
  }, [disabled]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (option.disabled || disabled) return;
      onChange?.(option.value);
      setOpen(false);
    },
    [disabled, onChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
        case ' ': {
          event.preventDefault();
          if (open && highlightedIndex >= 0) {
            const option = options[highlightedIndex];
            if (option) handleSelect(option);
          } else {
            setOpen((prev) => !prev);
          }
          break;
        }
        case 'Escape': {
          event.preventDefault();
          setOpen(false);
          break;
        }
        case 'ArrowDown': {
          event.preventDefault();
          setOpen(true);
          setHighlightedIndex((prev) => {
            const next = prev + 1;
            if (next >= options.length) return 0;
            return next;
          });
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          setOpen(true);
          setHighlightedIndex((prev) => {
            const next = prev - 1;
            if (next < 0) return options.length - 1;
            return next;
          });
          break;
        }
        case 'Home': {
          event.preventDefault();
          setHighlightedIndex(0);
          break;
        }
        case 'End': {
          event.preventDefault();
          setHighlightedIndex(options.length - 1);
          break;
        }
      }
    },
    [disabled, handleSelect, highlightedIndex, open, options],
  );

  useEffect(() => {
    if (open) {
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [open, selectedIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const triggerCls = classNames(
    'sui-select__trigger',
    `sui-select__trigger--${size}`,
    disabled && 'sui-select__trigger--disabled',
    open && 'sui-select__trigger--open',
  );

  return (
    <div ref={containerRef} className={classNames('sui-select', className)} style={style}>
      <button
        id={triggerId}
        type="button"
        className={triggerCls}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && highlightedIndex >= 0 ? `${listboxId}-${highlightedIndex}` : undefined
        }
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedLabel ? undefined : 'sui-select__placeholder'}>
          {selectedLabel ?? placeholder}
        </span>
        <span className="sui-select__arrow" aria-hidden="true">
          ▼
        </span>
      </button>
      {open && (
        <ul
          id={listboxId}
          className="sui-select__dropdown"
          role="listbox"
          aria-labelledby={triggerId}
          tabIndex={-1}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                key={option.value}
                id={`${listboxId}-${index}`}
                className={classNames(
                  'sui-select__option',
                  isSelected && 'sui-select__option--selected',
                  option.disabled && 'sui-select__option--disabled',
                  isHighlighted && !isSelected && 'sui-select__option--highlighted',
                )}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                tabIndex={-1}
                onClick={() => handleSelect(option)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleSelect(option);
                  }
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

SSelect.displayName = 'SSelect';

export default SSelect;
