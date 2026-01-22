import { memo } from 'react';
import { cn } from '@/lib/utils/cn';

export interface KanjiButtonProps {
  kanji: string;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  tooltip?: string;
}

export const KanjiButton = memo(function KanjiButton({
  kanji,
  onClick,
  isSelected = false,
  className,
  tooltip,
}: KanjiButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={cn(
        'inline-flex items-center justify-center',
        'min-w-[2.5rem] h-[2.5rem] px-2',
        'text-[1.5rem] font-medium japanese',
        'rounded-[var(--radius-md)] border-[var(--border-thin)]',
        'transition-all duration-150',
        isSelected
          ? 'border-[var(--color-sky-blue)] bg-[var(--color-sky-tint)] text-[var(--color-sky-blue)] shadow-[var(--shadow-soft)]'
          : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-sky-blue)] hover:bg-[var(--color-sky-tint)] hover:shadow-[var(--shadow-subtle)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] focus:ring-offset-2',
        className
      )}
    >
      {kanji}
    </button>
  );
});
