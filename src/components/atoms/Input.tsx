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
        'w-full h-9 px-2 py-2 text-[var(--font-size-body)] bg-transparent text-[var(--color-text)] transition-all duration-150',
        'font-[var(--font-family-primary)]',
        'border-0 border-b-[var(--border-base)] border-[var(--color-border)]',
        'placeholder:text-[var(--color-medium-gray)] placeholder:opacity-60',
        'hover:border-[var(--color-medium-gray)]',
        'focus:outline-none focus:border-b-[var(--border-thick)] focus:border-[var(--color-sky-blue)] focus:bg-transparent',
        'disabled:bg-[var(--color-gray-tint)] disabled:opacity-60 disabled:cursor-not-allowed',
        error
          ? 'border-[var(--color-coral-pink)] focus:border-[var(--color-coral-pink)]'
          : '',
        className
      )}
      {...props}
    />
  );
});
