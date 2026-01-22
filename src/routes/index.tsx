import { createFileRoute, Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { db } from '@/lib/db/schema';
import { cn } from '@/lib/utils/cn';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  // 통계 데이터 조회
  const totalWords = useLiveQuery(() => db.words.count(), []);
  const newWords = useLiveQuery(() => db.words.where('studyStatus').equals('new').count(), []);
  const learningWords = useLiveQuery(() => db.words.where('studyStatus').equals('learning').count(), []);
  const masteredWords = useLiveQuery(() => db.words.where('studyStatus').equals('mastered').count(), []);
  const totalGroups = useLiveQuery(() => db.groups.count(), []);
  
  // 최근 추가한 단어
  const recentWords = useLiveQuery(
    () => db.words.orderBy('createdAt').reverse().limit(5).toArray(),
    []
  );
  
  const stats = [
    { label: '전체 단어', value: totalWords || 0, color: 'bg-[var(--color-sky-blue)]' },
    { label: '새 단어', value: newWords || 0, color: 'bg-[var(--color-light-beige)]' },
    { label: '학습중', value: learningWords || 0, color: 'bg-[var(--color-warning)]' },
    { label: '암기함', value: masteredWords || 0, color: 'bg-[var(--color-success)]' },
    { label: '한자 그룹', value: totalGroups || 0, color: 'bg-[var(--color-coral-pink)]' },
  ];
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 - 다이어리 상단 */}
        <div className="px-12 py-8 border-b border-[var(--color-dark-charcoal)]">
          <h1 className="text-[var(--font-size-h1)] font-medium text-[var(--color-text)] tracking-tight">
            대시보드
          </h1>
        </div>
        
        {/* 통계 테이블 */}
        <div className="border-b border-[var(--color-dark-charcoal)]">
          <div className="grid grid-cols-5">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "px-8 py-6 text-center",
                  index < stats.length - 1 && "border-r border-[var(--color-dark-charcoal)]"
                )}
              >
                <div className="text-[1.5rem] font-normal text-[var(--color-text)] mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 빠른 액션 & 최근 단어 - 2단 테이블 */}
        <div className="grid grid-cols-2 border-b border-[var(--color-dark-charcoal)]">
          {/* 왼쪽 컬럼 */}
          <div className="px-12 py-8 border-r border-[var(--color-dark-charcoal)]">
            <h2 className="text-[var(--font-size-small)] font-medium text-[var(--color-text)] mb-6 uppercase tracking-wide">
              빠른 시작
            </h2>
            <div className="space-y-0">
              <Link to="/search" className="block py-3 px-4 border-t border-[var(--color-light-beige)] text-[var(--font-size-body)] text-[var(--color-text)] hover:bg-[var(--color-sky-tint)] transition-colors">
                새 단어 검색하기
              </Link>
              <Link to="/study" className="block py-3 px-4 border-t border-[var(--color-light-beige)] text-[var(--font-size-body)] text-[var(--color-text)] hover:bg-[var(--color-sky-tint)] transition-colors">
                학습 모드 시작
              </Link>
              <Link to="/words" className="block py-3 px-4 border-t border-[var(--color-light-beige)] border-b border-[var(--color-light-beige)] text-[var(--font-size-body)] text-[var(--color-text)] hover:bg-[var(--color-sky-tint)] transition-colors">
                내 단어장 보기
              </Link>
            </div>
          </div>
          
          {/* 오른쪽 컬럼 */}
          <div className="px-12 py-8">
            <h2 className="text-[var(--font-size-small)] font-medium text-[var(--color-text)] mb-6 uppercase tracking-wide">
              최근 추가한 단어
            </h2>
            {!recentWords || recentWords.length === 0 ? (
              <div className="py-8 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
                아직 저장된 단어가 없습니다
              </div>
            ) : (
              <div className="space-y-0">
                {recentWords.map((word, index) => (
                  <Link
                    key={word.id}
                    to="/words/$wordId"
                    params={{ wordId: word.id }}
                    className={cn(
                      "block py-3 px-4 border-t border-[var(--color-light-beige)] hover:bg-[var(--color-cream-tint)] transition-colors",
                      index === recentWords.length - 1 && "border-b border-[var(--color-light-beige)]"
                    )}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-medium text-[var(--font-size-body)] text-[var(--color-text)] japanese">
                        {word.word}
                      </span>
                      <span className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] japanese">
                        {word.reading}
                      </span>
                      {word.jlptLevel && (
                        <span className="ml-auto text-[var(--font-size-tiny)] text-[var(--color-text-lighter)]">
                          {word.jlptLevel}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* 학습 진도 */}
        {totalWords && totalWords > 0 && (
          <div className="px-12 py-8 border-b border-[var(--color-dark-charcoal)]">
            <h2 className="text-[var(--font-size-small)] font-medium text-[var(--color-text)] mb-6 uppercase tracking-wide">
              학습 진도
            </h2>
            
            {/* 진행률 바 */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-[var(--font-size-small)] text-[var(--color-text-light)]">전체 진행률</span>
                <span className="text-[var(--font-size-body)] font-medium text-[var(--color-text)] tabular-nums">
                  {Math.round(((masteredWords || 0) / totalWords) * 100)}%
                </span>
              </div>
              <div className="w-full h-[2px] bg-[var(--color-light-beige)]">
                <div
                  className="h-full bg-[var(--color-dark-charcoal)] transition-all duration-300"
                  style={{ width: `${((masteredWords || 0) / totalWords) * 100}%` }}
                />
              </div>
            </div>
            
            {/* 상태별 통계 */}
            <div className="grid grid-cols-3">
              <div className="px-4 py-4 text-center border-r border-[var(--color-light-beige)]">
                <div className="text-[1.25rem] font-normal text-[var(--color-text)] mb-1 tabular-nums">
                  {newWords || 0}
                </div>
                <div className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] uppercase tracking-wide">새 단어</div>
              </div>
              <div className="px-4 py-4 text-center border-r border-[var(--color-light-beige)]">
                <div className="text-[1.25rem] font-normal text-[var(--color-text)] mb-1 tabular-nums">
                  {learningWords || 0}
                </div>
                <div className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] uppercase tracking-wide">학습중</div>
              </div>
              <div className="px-4 py-4 text-center">
                <div className="text-[1.25rem] font-normal text-[var(--color-text)] mb-1 tabular-nums">
                  {masteredWords || 0}
                </div>
                <div className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] uppercase tracking-wide">암기함</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
