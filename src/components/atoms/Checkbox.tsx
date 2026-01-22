import { memo, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = memo(function Checkbox({
  label,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input
        type="checkbox"
        id={checkboxId}
        className={cn(
          'w-4 h-4 border-[var(--color-border)] text-[var(--color-sky-blue)]',
          'focus:ring-2 focus:ring-[var(--color-sky-blue)] focus:ring-offset-0',
          'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="text-sm text-[var(--color-text)] cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
});
