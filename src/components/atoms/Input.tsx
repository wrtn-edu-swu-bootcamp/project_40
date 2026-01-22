import { memo, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = memo(function Input({
  className,
  error,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 text-sm rounded-md border bg-white transition-colors',
        'placeholder:text-[var(--color-text-lighter)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        error
          ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
          : 'border-[var(--color-border)]',
        className
      )}
      {...props}
    />
  );
});
