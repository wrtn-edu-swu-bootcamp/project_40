import { memo } from 'react';
import { cn } from '@/lib/utils/cn';
import type { JlptLevel } from '@/types/word';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'jlpt';
  jlptLevel?: JlptLevel;
  className?: string;
}

export const Badge = memo(function Badge({
  children,
  variant = 'default',
  jlptLevel,
  className,
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium';
  
  const jlptColors: Record<JlptLevel, string> = {
    N5: 'bg-[var(--color-jlpt-n5)] text-[var(--color-text)]',
    N4: 'bg-[var(--color-jlpt-n4)] text-[var(--color-text)]',
    N3: 'bg-[var(--color-jlpt-n3)] text-[var(--color-text)]',
    N2: 'bg-[var(--color-jlpt-n2)] text-[var(--color-text)]',
    N1: 'bg-[var(--color-jlpt-n1)] text-white',
  };
  
  const variantStyles = variant === 'jlpt' && jlptLevel
    ? jlptColors[jlptLevel]
    : 'bg-[var(--color-light-beige)] text-[var(--color-text)]';
  
  return (
    <span className={cn(baseStyles, variantStyles, className)}>
      {children}
    </span>
  );
});
