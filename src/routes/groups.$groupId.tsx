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
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <div className="max-w-[1200px] mx-auto">
        {/* 헤더 */}
        <div className="px-12 py-8 border-b border-[var(--color-dark-charcoal)]">
          <button
            onClick={() => window.history.back()}
            className="mb-4 text-[var(--font-size-small)] text-[var(--color-text-light)] hover:text-[var(--color-text)]"
          >
            ← 뒤로 가기
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-[var(--font-size-h1)] font-medium text-[var(--color-text)] tracking-tight japanese">
              {group.name}
            </h1>
            <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] uppercase tracking-wide">
              {typeLabels[group.type]}
            </span>
          </div>
          
          <p className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
            {words?.length || 0}개의 단어
          </p>
        </div>
        
        {/* 단어 목록 */}
        {!words || words.length === 0 ? (
          <div className="px-12 py-12 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
            이 그룹에 속한 단어가 없습니다
          </div>
        ) : (
          <div className="space-y-0">
            {words.map((word) => (
              <div
                key={word.id}
                className="px-12 py-4 border-b border-[var(--color-light-beige)] hover:bg-[var(--color-warm-white)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={word.studyStatus === 'mastered'}
                    onChange={() => toggleWordStatus(word.id)}
                    className="w-4 h-4"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-medium text-[var(--font-size-body)] text-[var(--color-text)] japanese">
                        {word.word}
                      </span>
                      <span className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] japanese">
                        {word.reading}
                      </span>
                    </div>
                    <div className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
                      {word.meanings[0]?.definitions[0]}
                    </div>
                  </div>
                  
                  {word.jlptLevel && (
                    <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)]">
                      {word.jlptLevel}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
