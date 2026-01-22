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
        'w-full h-9 px-3 py-2 text-[var(--font-size-body)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-warm-white)] text-[var(--color-text)] transition-all duration-150',
        'font-[var(--font-family-primary)]',
        'placeholder:text-[var(--color-medium-gray)] placeholder:opacity-60',
        'hover:border-[var(--color-medium-gray)]',
        'focus:outline-none focus:border-[var(--color-sky-blue)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(143,193,227,0.2)]',
        'disabled:bg-[var(--color-gray-tint)] disabled:opacity-60 disabled:cursor-not-allowed',
        error
          ? 'border-[var(--color-coral-pink)] focus:border-[var(--color-coral-pink)] focus:shadow-[0_0_0_3px_rgba(225,106,132,0.2)]'
          : '',
        className
      )}
      {...props}
    />
  );
});
