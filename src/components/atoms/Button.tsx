import { memo, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = memo(function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'bg-[var(--color-sky-blue)] text-white hover:opacity-90 focus-visible:ring-[var(--color-sky-blue)]',
    secondary: 'border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-light-beige)] focus-visible:ring-[var(--color-border)]',
    ghost: 'hover:bg-[var(--color-light-beige)] focus-visible:ring-[var(--color-border)]',
    danger: 'bg-[var(--color-error)] text-white hover:opacity-90 focus-visible:ring-[var(--color-error)]',
  };
  
  const sizeStyles = {
    sm: 'h-7 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    lg: 'h-11 px-6 text-base',
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});
