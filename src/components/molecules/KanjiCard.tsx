import { memo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import type { KanjiInfo } from '@/types/kanji';

export interface KanjiCardProps {
  kanjiInfo: KanjiInfo;
  isBookmarked?: boolean;
  onBookmarkToggle?: (character: string) => void;
  onClick?: (character: string) => void;
  showBookmarkButton?: boolean;
  className?: string;
}

export const KanjiCard = memo(function KanjiCard({
  kanjiInfo,
  isBookmarked = false,
  onBookmarkToggle,
  onClick,
  showBookmarkButton = true,
  className,
}: KanjiCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  function handleBookmarkClick(e: React.MouseEvent) {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmarkToggle?.(kanjiInfo.character);
  }

  function handleCardClick() {
    onClick?.(kanjiInfo.character);
  }

  return (
    <div
      className={cn(
        'relative p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream-tint)] transition-all duration-150',
        onClick && 'cursor-pointer hover:border-[var(--color-sky-blue)] hover:shadow-[var(--shadow-subtle)]',
        className
      )}
      onClick={handleCardClick}
    >
      {/* 북마크 버튼 */}
      {showBookmarkButton && (
        <button
          onClick={handleBookmarkClick}
          className={cn(
            'absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-150',
            bookmarked
              ? 'text-[var(--color-coral-pink)] bg-[var(--color-pink-tint)]'
              : 'text-[var(--color-text-lighter)] bg-[var(--color-light-beige)] hover:bg-[var(--color-border)]'
          )}
          aria-label={bookmarked ? '북마크 해제' : '북마크 추가'}
        >
          {bookmarked ? '★' : '☆'}
        </button>
      )}

      {/* 한자 문자 */}
      <div className="text-[2.5rem] font-bold text-[var(--color-text)] mb-3 text-center japanese">
        {kanjiInfo.character}
      </div>

      {/* 뜻 */}
      {kanjiInfo.meanings && kanjiInfo.meanings.length > 0 && (
        <div className="mb-2">
          <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] font-semibold uppercase tracking-wider">
            뜻
          </span>
          <p className="text-[var(--font-size-small)] text-[var(--color-text)] mt-1">
            {kanjiInfo.meanings.join(', ')}
          </p>
        </div>
      )}

      {/* 음독 */}
      {kanjiInfo.readings.on && kanjiInfo.readings.on.length > 0 && (
        <div className="mb-2">
          <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] font-semibold uppercase tracking-wider">
            음독
          </span>
          <p className="text-[var(--font-size-small)] text-[var(--color-text)] mt-1 japanese">
            {kanjiInfo.readings.on.join(', ')}
          </p>
        </div>
      )}

      {/* 훈독 */}
      {kanjiInfo.readings.kun && kanjiInfo.readings.kun.length > 0 && (
        <div>
          <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] font-semibold uppercase tracking-wider">
            훈독
          </span>
          <p className="text-[var(--font-size-small)] text-[var(--color-text)] mt-1 japanese">
            {kanjiInfo.readings.kun.join(', ')}
          </p>
        </div>
      )}

      {/* 뜻, 음독, 훈독이 모두 없으면 빈칸 표시 */}
      {(!kanjiInfo.meanings || kanjiInfo.meanings.length === 0) &&
        (!kanjiInfo.readings.on || kanjiInfo.readings.on.length === 0) &&
        (!kanjiInfo.readings.kun || kanjiInfo.readings.kun.length === 0) && (
          <div className="text-[var(--font-size-small)] text-[var(--color-text-lighter)] text-center italic">
            정보 없음
          </div>
        )}
    </div>
  );
});
