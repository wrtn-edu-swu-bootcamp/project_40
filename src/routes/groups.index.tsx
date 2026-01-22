import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { GroupCard } from '@/components/molecules/GroupCard';
import { useGroups } from '@/features/groups/hooks/useGroups';

export const Route = createFileRoute('/groups/')({
  component: GroupsPage,
});

function GroupsPage() {
  const { groups, isLoading } = useGroups();
  const navigate = useNavigate();
  
  function handleGroupClick(groupId: string) {
    navigate({ to: '/groups/$groupId', params: { groupId } });
  }
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="px-12 py-8 border-b border-[var(--color-dark-charcoal)]">
          <h1 className="text-[var(--font-size-h1)] font-medium text-[var(--color-text)] tracking-tight">
            한자 그룹
          </h1>
        </div>
        
        {/* 그룹 목록 */}
        {isLoading && (
          <div className="px-12 py-12 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
            로딩 중...
          </div>
        )}
        
        {!isLoading && groups.length === 0 && (
          <div className="px-12 py-12 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
            <p className="mb-2">아직 생성된 그룹이 없습니다</p>
            <p className="text-[var(--font-size-tiny)]">한자가 포함된 단어를 저장하면 자동으로 그룹이 생성됩니다</p>
          </div>
        )}
        
        {/* 테이블 형식 그룹 목록 */}
        <div className="space-y-0">
          {groups.map((group, index) => {
            const typeLabels = {
              radical: '부수',
              component: '구성요소',
              reading: '음독',
              custom: '사용자',
            };
            
            return (
              <div
                key={group.id}
                onClick={() => handleGroupClick(group.id)}
                className="px-12 py-4 border-b border-[var(--color-light-beige)] cursor-pointer hover:bg-[var(--color-warm-white)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="font-medium text-[var(--font-size-body)] text-[var(--color-text)] japanese">
                      {group.name}
                    </span>
                    <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] uppercase tracking-wide">
                      {typeLabels[group.type]}
                    </span>
                  </div>
                  <span className="text-[var(--font-size-small)] text-[var(--color-text-light)] tabular-nums">
                    {group.wordIds.length}개 단어
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
