import type React from 'react';
import { useCallback, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils/classNames';
import { SButton } from '../Button/Button';
import './Modal.module.css';

export interface ModalProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode | null;
  confirmLoading?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const TABBABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getTabbableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(TABBABLE_SELECTOR));
}

export const SModal: React.FC<ModalProps> = ({
  open = false,
  title,
  children,
  footer,
  confirmLoading = false,
  onClose,
  className,
  style,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const titleId = useId();

  const handleMaskClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open || !modalRef.current) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key === 'Tab') {
        const tabbable = getTabbableElements(modalRef.current);
        if (tabbable.length === 0) return;

        const first = tabbable[0];
        const last = tabbable[tabbable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [open, onClose],
  );

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      const timer = setTimeout(() => {
        const tabbable = modalRef.current ? getTabbableElements(modalRef.current) : [];
        const focusTarget = tabbable[0] ?? modalRef.current;
        focusTarget?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }

    if (previousActiveElement.current instanceof HTMLElement) {
      previousActiveElement.current.focus();
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const defaultFooter = (
    <>
      <SButton variant="default" onClick={onClose}>
        Cancel
      </SButton>
      <SButton variant="primary" loading={confirmLoading} onClick={onClose}>
        OK
      </SButton>
    </>
  );

  return createPortal(
    <div
      className="sui-modal__mask"
      onClick={handleMaskClick}
      role="presentation"
      aria-hidden="false"
    >
      <div
        ref={modalRef}
        className={classNames('sui-modal', className)}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        {title && (
          <div className="sui-modal__header">
            <div id={titleId} className="sui-modal__title">
              {title}
            </div>
            <button type="button" className="sui-modal__close" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        )}
        <div className="sui-modal__body">{children}</div>
        {footer !== null && (
          <div className="sui-modal__footer">{footer === undefined ? defaultFooter : footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
};

SModal.displayName = 'SModal';

export default SModal;
