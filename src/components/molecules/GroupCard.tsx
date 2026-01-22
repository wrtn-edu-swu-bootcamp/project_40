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
        'p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-tint)]',
        'hover:shadow-md hover:border-[var(--color-sky-blue)] transition-all cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="mb-2">
        <h3 className="text-base font-bold text-[var(--color-text)] mb-1 japanese">
          {group.name}
        </h3>
        <Badge>{typeLabels[group.type]}</Badge>
      </div>
      
      <div className="text-sm text-[var(--color-text-light)]">
        {wordCount !== undefined ? `${wordCount}개 단어` : `${group.wordIds.length}개 단어`}
      </div>
    </div>
  );
});
