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
  const baseStyles = 'inline-flex items-center justify-center h-5 px-2 text-[var(--font-size-tiny)] font-semibold tracking-wider';
  
  const jlptColors: Record<JlptLevel, string> = {
    N5: 'bg-[var(--color-gray-tint)] text-[var(--color-dark-gray)]',
    N4: 'bg-[var(--color-gray-tint)] text-[var(--color-dark-gray)]',
    N3: 'bg-[var(--color-cream-yellow)] text-[#8a7a4a]',
    N2: 'bg-[var(--color-sky-blue)] text-white',
    N1: 'bg-[var(--color-coral-pink)] text-white',
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
