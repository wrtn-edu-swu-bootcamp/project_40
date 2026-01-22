import { memo } from 'react';
import { KanjiCard } from '@/components/molecules/KanjiCard';
import { cn } from '@/lib/utils/cn';
import type { KanjiInfo } from '@/types/kanji';

export interface KanjiListSectionProps {
  title: string;
  kanjiList: KanjiInfo[];
  bookmarkedCharacters?: string[];
  onBookmarkToggle?: (character: string) => void;
  onKanjiClick?: (character: string) => void;
  showBookmarkButton?: boolean;
  autoSaved?: boolean;
  className?: string;
}

export const KanjiListSection = memo(function KanjiListSection({
  title,
  kanjiList,
  bookmarkedCharacters = [],
  onBookmarkToggle,
  onKanjiClick,
  showBookmarkButton = true,
  autoSaved = false,
  className,
}: KanjiListSectionProps) {
  if (kanjiList.length === 0) {
    return null;
  }

  return (
    <div className={cn('', className)}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)]">
          {title}
        </h3>
        {autoSaved && (
          <span className="text-[var(--font-size-small)] text-[var(--color-sky-blue)] font-medium">
            ✓ 자동 저장됨
          </span>
        )}
      </div>

      {/* 한자 목록 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {kanjiList.map((kanjiInfo) => (
          <KanjiCard
            key={kanjiInfo.character}
            kanjiInfo={kanjiInfo}
            isBookmarked={bookmarkedCharacters.includes(kanjiInfo.character)}
            onBookmarkToggle={onBookmarkToggle}
            onClick={onKanjiClick}
            showBookmarkButton={showBookmarkButton}
          />
        ))}
      </div>
    </div>
  );
});
