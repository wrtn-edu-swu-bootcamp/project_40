import { memo } from 'react';
import { cn } from '@/lib/utils/cn';
import type { StudyStatus } from '@/types/word';

export interface FilterPanelProps {
  selectedStatus: StudyStatus | 'all';
  onStatusChange: (status: StudyStatus | 'all') => void;
  counts: {
    all: number;
    new: number;
    learning: number;
    mastered: number;
  };
  className?: string;
}

export const FilterPanel = memo(function FilterPanel({
  selectedStatus,
  onStatusChange,
  counts,
  className,
}: FilterPanelProps) {
  const filters: { value: StudyStatus | 'all'; label: string; key: keyof typeof counts }[] = [
    { value: 'all', label: '전체', key: 'all' },
    { value: 'new', label: '새 단어', key: 'new' },
    { value: 'learning', label: '학습중', key: 'learning' },
    { value: 'mastered', label: '암기함', key: 'mastered' },
  ];
  
  return (
    <div className={cn('p-6', className)}>
      <h3 className="text-sm font-bold text-[var(--color-text)] mb-5 pb-3 border-b-[var(--border-base)] border-[var(--color-border)]">
        학습 상태
      </h3>
      
      <div className="space-y-0">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onStatusChange(filter.value)}
            className={cn(
              'w-full text-left px-4 py-3 text-sm transition-colors border-l-[3px]',
              selectedStatus === filter.value
                ? 'border-[var(--color-sky-blue)] text-[var(--color-sky-blue)] font-medium'
                : 'border-transparent hover:border-[var(--color-light-beige)] text-[var(--color-text)]'
            )}
          >
            <div className="flex items-center justify-between">
              <span>{filter.label}</span>
              <span className="text-xs opacity-75">
                {counts[filter.key]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});
