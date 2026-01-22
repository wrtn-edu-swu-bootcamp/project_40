import { memo } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Checkbox } from '@/components/atoms/Checkbox';
import { cn } from '@/lib/utils/cn';
import type { Word } from '@/types/word';

export interface WordCardProps {
  word: Word;
  selected?: boolean;
  showCheckbox?: boolean;
  onSelect?: () => void;
  onToggleStatus?: () => void;
  className?: string;
}

export const WordCard = memo(function WordCard({
  word,
  selected,
  showCheckbox = false,
  onSelect,
  onToggleStatus,
  className,
}: WordCardProps) {
  return (
    <div
      className={cn(
        'py-5 px-6 border-[var(--border-thin)] transition-all cursor-pointer',
        'hover:border-[var(--color-sky-blue)]',
        selected && 'border-[var(--color-sky-blue)] border-[var(--border-thick)]',
        !selected && 'border-[var(--color-border)]',
        className
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* 단어 및 읽기 */}
          <div className="flex items-baseline gap-2 mb-4">
            <h3 className="text-lg font-bold text-[var(--color-text)] japanese">
              {word.word}
            </h3>
            <span className="text-sm text-[var(--color-text-light)] japanese">
              {word.reading}
            </span>
          </div>
          
          {/* 뜻 */}
          <div className="mb-4 pb-4 border-b-[var(--border-thin)] border-[var(--color-border)]">
            {word.meanings.slice(0, 2).map((meaning, idx) => (
              <div key={idx} className="text-sm text-[var(--color-text)] leading-relaxed">
                <span className="text-[var(--color-text-lighter)] mr-1">
                  {meaning.partOfSpeech}
                </span>
                {meaning.definitions.slice(0, 2).join(', ')}
              </div>
            ))}
          </div>
          
          {/* 배지 */}
          <div className="flex items-center gap-2 flex-wrap">
            {word.jlptLevel && (
              <Badge variant="jlpt" jlptLevel={word.jlptLevel}>
                {word.jlptLevel}
              </Badge>
            )}
            {word.kanji.length > 0 && (
              <Badge>
                한자 {word.kanji.length}개
              </Badge>
            )}
            {word.studyStatus === 'mastered' && (
              <Badge className="bg-[var(--color-success)] text-white">
                암기함
              </Badge>
            )}
          </div>
        </div>
        
        {/* 체크박스 */}
        {showCheckbox && (
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={word.studyStatus === 'mastered'}
              onChange={onToggleStatus}
              label=""
            />
          </div>
        )}
      </div>
    </div>
  );
});
