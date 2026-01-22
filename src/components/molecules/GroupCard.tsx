import { memo } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';
import type { Group } from '@/types/group';

export interface GroupCardProps {
  group: Group;
  wordCount?: number;
  onClick?: () => void;
  className?: string;
}

export const GroupCard = memo(function GroupCard({
  group,
  wordCount,
  onClick,
  className,
}: GroupCardProps) {
  const typeLabels = {
    radical: '부수',
    component: '구성요소',
    reading: '음독',
    custom: '사용자',
  };
  
  return (
    <div
      className={cn(
        'py-6 px-6 border-[var(--border-thin)] border-[var(--color-border)]',
        'hover:border-[var(--color-sky-blue)] transition-all cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="mb-4">
        <h3 className="text-base font-bold text-[var(--color-text)] mb-3 japanese">
          {group.name}
        </h3>
        <Badge>{typeLabels[group.type]}</Badge>
      </div>
      
      <div className="text-sm text-[var(--color-text-light)] pt-3 border-t-[var(--border-thin)] border-[var(--color-border)]">
        {wordCount !== undefined ? `${wordCount}개 단어` : `${group.wordIds.length}개 단어`}
      </div>
    </div>
  );
});
