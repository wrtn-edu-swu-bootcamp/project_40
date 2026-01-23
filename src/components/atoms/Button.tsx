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
  const baseStyles = 'inline-flex items-center justify-center rounded-[var(--radius-lg)] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:brightness-95';
  
  const variantStyles = {
    primary: 'bg-[var(--color-sky-blue)] text-white hover:bg-[#2a6b93] active:scale-[0.98] shadow-[var(--shadow-subtle)] font-semibold',
    secondary: 'border border-[var(--color-border)] bg-transparent text-[var(--color-dark-gray)] hover:border-[var(--color-sky-blue)] hover:bg-[var(--color-sky-tint)]',
    ghost: 'bg-transparent text-[var(--color-sky-blue)] hover:bg-[var(--color-sky-tint)]',
    danger: 'bg-[var(--color-coral-pink)] text-white hover:bg-[#d15876] active:scale-[0.98]',
  };
  
  const sizeStyles = {
    sm: 'h-7 px-3 text-[var(--font-size-small)]',
    md: 'h-9 px-6 text-[var(--font-size-body)]',
    lg: 'h-11 px-8 text-[var(--font-size-h3)]',
  };
  
  const inlineStyles = variant === 'primary' 
    ? { backgroundColor: 'var(--color-sky-blue)', color: 'white' }
    : undefined;

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={inlineStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});
