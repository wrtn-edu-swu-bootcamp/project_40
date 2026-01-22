import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { KanjiListSection } from '@/components/organisms/KanjiListSection';
import { useGroups } from '@/features/groups/hooks/useGroups';
import { useBookmarks } from '@/features/bookmarks/hooks/useBookmarks';
import { getMultipleKanjiFromDictionary } from '@/lib/data/kanji-dictionary';
import type { Group } from '@/types/group';
import type { KanjiInfo } from '@/types/kanji';

export const Route = createFileRoute('/groups/$groupId')({
  component: GroupDetailPage,
});

function GroupDetailPage() {
  const { groupId } = Route.useParams();
  const navigate = useNavigate();
  const { groups, removeGroup } = useGroups();
  const { bookmarks, toggleBookmark } = useBookmarks();

  const [group, setGroup] = useState<Group | null>(null);
  const [kanjiList, setKanjiList] = useState<KanjiInfo[]>([]);

  // 북마크된 한자 문자들
  const bookmarkedCharacters = bookmarks.map((b) => b.character);

  useEffect(() => {
    const foundGroup = groups.find((g) => g.id === groupId);
    if (foundGroup) {
      setGroup(foundGroup);
      // 한자 정보 가져오기
      const kanjiInfoList = getMultipleKanjiFromDictionary(foundGroup.kanjiCharacters);
      setKanjiList(kanjiInfoList);
    }
  }, [groupId, groups]);

  async function handleDelete() {
    if (!group) return;

    const confirmed = window.confirm(`"${group.name}" 그룹을 삭제하시겠습니까?`);
    if (confirmed) {
      await removeGroup(group.id);
      navigate({ to: '/groups' });
    }
  }

  async function handleBookmarkToggle(character: string) {
    const kanjiInfo = kanjiList.find((k) => k.character === character);
    if (!kanjiInfo) return;

    try {
      await toggleBookmark(character, kanjiInfo);
    } catch (error) {
      console.error('북마크 토글 실패:', error);
    }
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] p-8 flex items-center justify-center">
        <div className="text-[var(--color-text-light)]">그룹을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate({ to: '/groups' })}
            >
              ← 그룹 목록
            </Button>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="mb-3">
                <Badge
                  variant={
                    group.type === 'radical'
                      ? 'jlpt'
                      : group.type === 'component'
                      ? 'default'
                      : 'default'
                  }
                >
                  {group.type === 'radical'
                    ? '부수'
                    : group.type === 'component'
                    ? '구성요소'
                    : '음독'}
                </Badge>
              </div>

              <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-2 tracking-tight japanese">
                {group.name}
              </h1>
              <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
                {group.kanjiCharacters.length}개의 한자
              </p>
            </div>

            <Button variant="secondary" onClick={handleDelete}>
              그룹 삭제
            </Button>
          </div>
        </div>

        {/* 한자 목록 */}
        {kanjiList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-light)]">한자가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-subtle)]">
            <KanjiListSection
              title="그룹 한자"
              kanjiList={kanjiList}
              bookmarkedCharacters={bookmarkedCharacters}
              onBookmarkToggle={handleBookmarkToggle}
              showBookmarkButton={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
