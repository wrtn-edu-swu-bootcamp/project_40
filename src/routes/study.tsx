import { createFileRoute, useSearch, Link } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { KanjiFlashcard } from '@/components/organisms/KanjiFlashcard';
import { Button } from '@/components/atoms/Button';
import { useBookmarks } from '@/features/bookmarks/hooks/useBookmarks';
import { useGroups } from '@/features/groups/hooks/useGroups';
import { getMultipleKanjiFromDictionary } from '@/lib/data/kanji-dictionary';
import type { KanjiInfo } from '@/types/kanji';

export const Route = createFileRoute('/study')({
  component: StudyPage,
  validateSearch: (search: Record<string, unknown>): {
    source?: 'bookmarks' | 'group';
    groupId?: string;
  } => {
    return {
      source: (search.source as 'bookmarks' | 'group') || undefined,
      groupId: (search.groupId as string) || undefined,
    };
  },
});

function StudyPage() {
  const searchParams = useSearch({ from: '/study' });
  const { bookmarks = [] } = useBookmarks();
  const { groups = [] } = useGroups();

  const [studyKanji, setStudyKanji] = useState<KanjiInfo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 학습할 한자 준비
  useEffect(() => {
    if (searchParams.source === 'bookmarks') {
      // 북마크된 한자들
      const kanjiList = bookmarks.map((b) => b.kanjiInfo);
      setStudyKanji(kanjiList);
    } else if (searchParams.source === 'group' && searchParams.groupId) {
      // 선택한 그룹의 한자들
      const group = groups.find((g) => g.id === searchParams.groupId);
      if (group && group.kanjiCharacters) {
        const kanjiList = getMultipleKanjiFromDictionary(group.kanjiCharacters);
        setStudyKanji(kanjiList);
      }
    }
    setCurrentIndex(0);
  }, [searchParams.source, searchParams.groupId, bookmarks, groups]);

  const currentKanji = studyKanji[currentIndex];
  const progress =
    studyKanji.length > 0 ? ((currentIndex + 1) / studyKanji.length) * 100 : 0;

  // 이전 카드
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  // 다음 카드
  const handleNext = useCallback(() => {
    if (currentIndex < studyKanji.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, studyKanji.length]);

  // 키보드 단축키
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  // 소스 선택 화면
  if (!searchParams.source || (searchParams.source === 'group' && !searchParams.groupId)) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-8">
            학습 모드
          </h1>

          <div className="space-y-4">
            {/* 북마크로 학습 */}
            {bookmarks.length > 0 ? (
              <Link
                to="/study"
                search={{ source: 'bookmarks' }}
                className="block p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white hover:border-[var(--color-sky-blue)] hover:shadow-[var(--shadow-subtle)] transition-all duration-150"
              >
                <h3 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-2">
                  북마크된 한자 학습
                </h3>
                <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
                  {bookmarks.length}개의 북마크된 한자를 학습합니다
                </p>
              </Link>
            ) : (
              <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white">
                <h3 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-2">
                  북마크된 한자 학습
                </h3>
                <p className="text-[var(--font-size-body)] text-[var(--color-text-light)] mb-3">
                  아직 북마크한 한자가 없습니다.
                </p>
                <p className="text-[var(--font-size-small)] text-[var(--color-text-lighter)]">
                  단어 검색 후 한자 옆의 별 아이콘을 클릭하여 북마크하세요.
                </p>
              </div>
            )}

            {/* 그룹별 학습 */}
            <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white">
              <h3 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-4">
                그룹별 학습
              </h3>

              {groups.length === 0 ? (
                <div>
                  <p className="text-[var(--color-text-light)] mb-2">
                    아직 생성된 그룹이 없습니다.
                  </p>
                  <p className="text-[var(--font-size-small)] text-[var(--color-text-lighter)]">
                    단어 검색 후 한자 구성 요소를 클릭하면 자동으로 그룹이 생성됩니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {groups.map((group) => (
                    <Link
                      key={group.id}
                      to="/study"
                      search={{ source: 'group', groupId: group.id }}
                      className="block p-4 rounded-[var(--radius-md)] border border-[var(--color-light-beige)] bg-[var(--color-cream-tint)] hover:border-[var(--color-sky-blue)] hover:bg-white transition-all duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--font-size-body)] font-medium text-[var(--color-text)] japanese">
                          {group.name}
                        </span>
                        <span className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
                          {group.kanjiCharacters?.length || 0}개
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 학습할 한자가 없을 때
  if (studyKanji.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            학습할 한자가 없습니다
          </h1>
          <p className="text-[var(--color-text-light)] mb-6">
            {searchParams.source === 'bookmarks'
              ? '먼저 한자를 북마크해주세요'
              : '선택한 그룹에 한자가 없습니다'}
          </p>
          <Link to="/study">
            <Button>돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  // 학습 화면
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-6">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <Link to="/study">
                <Button variant="secondary" size="sm">
                  ← 돌아가기
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">학습 모드</h1>
            </div>
            <div className="text-sm text-[var(--color-text-light)]">
              {currentIndex + 1} / {studyKanji.length}
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="w-full h-2 bg-[var(--color-light-beige)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-sky-blue)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 플래시카드 */}
        <KanjiFlashcard kanjiInfo={currentKanji} className="mb-6" />

        {/* 컨트롤 */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            ← 이전 (←)
          </Button>

          <div className="text-sm text-[var(--color-text-light)] text-center">
            Space: 뒤집기
          </div>

          <Button
            variant="secondary"
            onClick={handleNext}
            disabled={currentIndex === studyKanji.length - 1}
            className="flex-1"
          >
            다음 (→)
          </Button>
        </div>

        {/* 학습 완료 */}
        {currentIndex === studyKanji.length - 1 && (
          <div className="mt-6 p-4 rounded-lg bg-[var(--color-sky-blue)] text-white text-center">
            <p className="font-bold mb-2">마지막 카드입니다!</p>
            <p className="text-sm">모든 한자를 학습했습니다. 수고하셨습니다!</p>
          </div>
        )}
      </div>
    </div>
  );
}
