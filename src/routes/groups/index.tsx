import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Badge } from '@/components/atoms/Badge';
import { useGroups } from '@/features/groups/hooks/useGroups';
import type { GroupType } from '@/types/group';

export const Route = createFileRoute('/groups/')({
  component: GroupsPage,
});

function GroupsPage() {
  const { groups, isLoading } = useGroups();
  const [filterType, setFilterType] = useState<GroupType | 'all'>('all');

  // 필터링된 그룹
  const filteredGroups =
    filterType === 'all' ? groups : groups.filter((g) => g.type === filterType);

  // 그룹 타입별 개수
  const radicalCount = groups.filter((g) => g.type === 'radical').length;
  const componentCount = groups.filter((g) => g.type === 'component').length;
  const readingCount = groups.filter((g) => g.type === 'reading').length;

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
            한자 그룹
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            자동으로 생성된 한자 그룹을 확인하세요
          </p>
        </div>

        {/* 필터 */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-[var(--radius-md)] text-[var(--font-size-small)] font-medium transition-all duration-150 ${
              filterType === 'all'
                ? 'bg-[var(--color-sky-blue)] text-white'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-text-light)] hover:border-[var(--color-sky-blue)]'
            }`}
          >
            전체 ({groups.length})
          </button>
          <button
            onClick={() => setFilterType('radical')}
            className={`px-4 py-2 rounded-[var(--radius-md)] text-[var(--font-size-small)] font-medium transition-all duration-150 ${
              filterType === 'radical'
                ? 'bg-[var(--color-sky-blue)] text-white'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-text-light)] hover:border-[var(--color-sky-blue)]'
            }`}
          >
            부수 ({radicalCount})
          </button>
          <button
            onClick={() => setFilterType('component')}
            className={`px-4 py-2 rounded-[var(--radius-md)] text-[var(--font-size-small)] font-medium transition-all duration-150 ${
              filterType === 'component'
                ? 'bg-[var(--color-sky-blue)] text-white'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-text-light)] hover:border-[var(--color-sky-blue)]'
            }`}
          >
            구성요소 ({componentCount})
          </button>
          <button
            onClick={() => setFilterType('reading')}
            className={`px-4 py-2 rounded-[var(--radius-md)] text-[var(--font-size-small)] font-medium transition-all duration-150 ${
              filterType === 'reading'
                ? 'bg-[var(--color-sky-blue)] text-white'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-text-light)] hover:border-[var(--color-sky-blue)]'
            }`}
          >
            음독 ({readingCount})
          </button>
        </div>

        {/* 그룹 목록 */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-light)] mb-4">
              {filterType === 'all'
                ? '아직 생성된 그룹이 없습니다.'
                : '해당 타입의 그룹이 없습니다.'}
            </p>
            <p className="text-[var(--font-size-small)] text-[var(--color-text-lighter)]">
              단어 검색 후 한자 구성 요소를 클릭하면 자동으로 그룹이 생성됩니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="p-5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white hover:border-[var(--color-sky-blue)] hover:shadow-[var(--shadow-subtle)] transition-all duration-150"
              >
                {/* 그룹 타입 배지 */}
                <div className="mb-3">
                  <Badge
                    variant={
                      group.type === 'radical'
                        ? 'jlpt'
                        : group.type === 'component'
                        ? 'default'
                        : 'default'
                    }
                    className="text-[var(--font-size-tiny)]"
                  >
                    {group.type === 'radical'
                      ? '부수'
                      : group.type === 'component'
                      ? '구성요소'
                      : '음독'}
                  </Badge>
                </div>

                {/* 그룹 이름 */}
                <Link
                  to="/groups/$groupId"
                  params={{ groupId: group.id }}
                >
                  <h3 className="text-[var(--font-size-h3)] font-semibold text-[var(--color-text)] mb-2 japanese hover:text-[var(--color-sky-blue)] transition-colors">
                    {group.name}
                  </h3>
                </Link>

                {/* 한자 개수 */}
                <p className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
                  {group.kanjiCharacters.length}개의 한자
                </p>

                {/* 한자 미리보기 */}
                <div className="mt-3 mb-4 flex gap-1 flex-wrap">
                  {group.kanjiCharacters.slice(0, 10).map((char) => (
                    <span
                      key={char}
                      className="inline-flex items-center justify-center w-8 h-8 rounded bg-[var(--color-cream-tint)] text-[var(--font-size-body)] font-medium japanese"
                    >
                      {char}
                    </span>
                  ))}
                  {group.kanjiCharacters.length > 10 && (
                    <span className="inline-flex items-center justify-center w-8 h-8 text-[var(--font-size-small)] text-[var(--color-text-lighter)]">
                      +{group.kanjiCharacters.length - 10}
                    </span>
                  )}
                </div>

                {/* 액션 버튼들 */}
                <div className="flex gap-2">
                  <Link
                    to="/study"
                    search={{ source: 'group', groupId: group.id }}
                    className="flex-1"
                  >
                    <button className="w-full px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-sky-blue)] text-white text-[var(--font-size-small)] font-medium hover:bg-[var(--color-sky-blue)]/90 transition-colors">
                      학습 시작
                    </button>
                  </Link>
                  <Link
                    to="/groups/$groupId"
                    params={{ groupId: group.id }}
                    className="px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-light)] text-[var(--font-size-small)] font-medium hover:border-[var(--color-sky-blue)] hover:text-[var(--color-text)] transition-all"
                  >
                    상세보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
