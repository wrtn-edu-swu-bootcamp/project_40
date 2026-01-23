import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/atoms/Button';
import { KanjiCard } from '@/components/molecules/KanjiCard';
import { useBookmarks } from '@/features/bookmarks/hooks/useBookmarks';

export const Route = createFileRoute('/bookmarks/')({
  component: BookmarksPage,
});

function BookmarksPage() {
  const { bookmarks = [], isLoading, removeBookmark } = useBookmarks();

  async function handleBookmarkToggle(character: string) {
    const bookmark = bookmarks.find((b) => b.character === character);
    if (bookmark) {
      const confirmed = window.confirm(`"${character}" 북마크를 삭제하시겠습니까?`);
      if (confirmed) {
        await removeBookmark(bookmark.id);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] p-8 flex items-center justify-center">
        <div className="text-[var(--color-text-light)]">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-2 tracking-tight">
            저장된 단어
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            북마크한 한자를 확인하고 학습하세요
          </p>
        </div>

        {/* 통계 */}
        <div className="mb-6 flex items-center gap-4">
          <div className="px-4 py-2 rounded-[var(--radius-md)] bg-white border border-[var(--color-border)]">
            <span className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
              총 북마크:{' '}
            </span>
            <span className="text-[var(--font-size-h3)] font-semibold text-[var(--color-text)]">
              {bookmarks.length}
            </span>
          </div>

          {bookmarks.length > 0 && (
            <Link to="/study" search={{ source: 'bookmarks' }}>
              <Button>학습 시작</Button>
            </Link>
          )}
        </div>

        {/* 북마크 목록 */}
        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-light)] mb-4">
              아직 북마크한 한자가 없습니다.
            </p>
            <p className="text-[var(--font-size-small)] text-[var(--color-text-lighter)] mb-6">
              단어 검색 후 한자 옆의 별 아이콘을 클릭하여 북마크하세요.
            </p>
            <Link to="/search">
              <Button>단어 검색하기</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="relative">
                <KanjiCard
                  kanjiInfo={bookmark.kanjiInfo}
                  isBookmarked={true}
                  onBookmarkToggle={handleBookmarkToggle}
                  showBookmarkButton={true}
                />
                {/* 원본 단어 표시 */}
                {bookmark.sourceWord && (
                  <div className="mt-2 text-center">
                    <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)]">
                      출처:{' '}
                    </span>
                    <span className="text-[var(--font-size-small)] text-[var(--color-text)] japanese">
                      {bookmark.sourceWord}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
