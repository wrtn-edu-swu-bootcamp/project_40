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
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-2 tracking-tight">
            한자 그룹
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            비슷한 한자끼리 자동으로 그룹화됩니다
          </p>
        </div>
        
        {/* 그룹 목록 */}
        {isLoading && (
          <div className="text-center text-[var(--color-text-light)] py-12">
            로딩 중...
          </div>
        )}
        
        {!isLoading && groups.length === 0 && (
          <div className="text-center text-[var(--color-text-light)] py-12">
            <p className="mb-4">아직 생성된 그룹이 없습니다</p>
            <p className="text-sm">한자가 포함된 단어를 저장하면 자동으로 그룹이 생성됩니다</p>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() => handleGroupClick(group.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
