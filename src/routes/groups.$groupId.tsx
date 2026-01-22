import { createFileRoute } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { WordCard } from '@/components/molecules/WordCard';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { db } from '@/lib/db/schema';
import { useWords } from '@/features/words/hooks/useWords';

export const Route = createFileRoute('/groups/$groupId')({
  component: GroupDetailPage,
});

function GroupDetailPage() {
  const { groupId } = Route.useParams();
  const { toggleWordStatus } = useWords();
  
  // 그룹 정보 조회
  const group = useLiveQuery(
    () => db.groups.get(groupId),
    [groupId]
  );
  
  // 그룹에 속한 단어들 조회
  const words = useLiveQuery(
    async () => {
      if (!group) return [];
      return await db.words.where('id').anyOf(group.wordIds).toArray();
    },
    [group]
  );
  
  if (!group) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center">
        <div className="text-center text-[var(--color-text-light)]">
          그룹을 찾을 수 없습니다
        </div>
      </div>
    );
  }
  
  const typeLabels = {
    radical: '부수',
    component: '구성요소',
    reading: '음독',
    custom: '사용자',
  };
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4"
          >
            ← 뒤로 가기
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] tracking-tight japanese">
              {group.name}
            </h1>
            <Badge>{typeLabels[group.type]}</Badge>
          </div>
          
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            {words?.length || 0}개의 단어
          </p>
        </div>
        
        {/* 단어 목록 */}
        {!words || words.length === 0 ? (
          <div className="text-center text-[var(--color-text-light)] py-12">
            이 그룹에 속한 단어가 없습니다
          </div>
        ) : (
          <div className="space-y-4">
            {words.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                showCheckbox
                onToggleStatus={() => toggleWordStatus(word.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
