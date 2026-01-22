import { createFileRoute, Link } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { db } from '@/lib/db/schema';

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
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-2 tracking-tight">
            대시보드
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            학습 현황을 한눈에 확인하세요
          </p>
        </div>
        
        {/* 통계 카드 */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 text-center shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-soft)] transition-all duration-150"
            >
              <div className="text-[2rem] font-semibold text-[var(--color-text)] mb-2">
                {stat.value}
              </div>
              <div className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* 빠른 액션 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-subtle)]">
            <h2 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-4">
              빠른 시작
            </h2>
            <div className="space-y-3">
              <Link to="/search">
                <Button className="w-full justify-start">
                  새 단어 검색하기
                </Button>
              </Link>
              <Link to="/study">
                <Button variant="secondary" className="w-full justify-start">
                  학습 모드 시작
                </Button>
              </Link>
              <Link to="/words">
                <Button variant="secondary" className="w-full justify-start">
                  내 단어장 보기
                </Button>
              </Link>
            </div>
          </div>
          
          {/* 최근 추가한 단어 */}
          <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-subtle)]">
            <h2 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-4">
              최근 추가한 단어
            </h2>
            {!recentWords || recentWords.length === 0 ? (
              <div className="text-center text-[var(--color-text-light)] py-8">
                아직 저장된 단어가 없습니다
              </div>
            ) : (
              <div className="space-y-3">
                {recentWords.map((word) => (
                  <Link
                    key={word.id}
                    to="/words/$wordId"
                    params={{ wordId: word.id }}
                    className="block p-3 rounded-[var(--radius-md)] border-[var(--border-thin)] border-[var(--color-border)] bg-[var(--color-cream-tint)] hover:border-[var(--color-sky-blue)] hover:shadow-[var(--shadow-subtle)] transition-all duration-150"
                  >
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="font-medium text-[var(--font-size-h3)] text-[var(--color-text)] japanese">
                        {word.word}
                      </span>
                      <span className="text-[var(--font-size-small)] text-[var(--color-text-light)] japanese">
                        {word.reading}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {word.jlptLevel && (
                        <Badge variant="jlpt" jlptLevel={word.jlptLevel}>
                          {word.jlptLevel}
                        </Badge>
                      )}
                      <span className="text-xs text-[var(--color-text-lighter)]">
                        {word.meanings[0]?.definitions[0]}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* 학습 진도 */}
        {totalWords && totalWords > 0 && (
          <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-subtle)]">
            <h2 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-4">
              학습 진도
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--font-size-body)] text-[var(--color-text)]">전체 진행률</span>
                  <span className="text-[var(--font-size-body)] font-semibold text-[var(--color-text)]">
                    {Math.round(((masteredWords || 0) / totalWords) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[var(--color-light-beige)] rounded-[var(--radius-full)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-success)] transition-all duration-300 rounded-[var(--radius-full)]"
                    style={{ width: `${((masteredWords || 0) / totalWords) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-cream-tint)] border border-[var(--color-border)]">
                  <div className="text-[1.5rem] font-semibold text-[var(--color-text)]">
                    {newWords || 0}
                  </div>
                  <div className="text-[var(--font-size-small)] text-[var(--color-text-light)]">새 단어</div>
                </div>
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-cream-tint)] border border-[var(--color-border)]">
                  <div className="text-[1.5rem] font-semibold text-[var(--color-text)]">
                    {learningWords || 0}
                  </div>
                  <div className="text-[var(--font-size-small)] text-[var(--color-text-light)]">학습중</div>
                </div>
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-cream-tint)] border border-[var(--color-border)]">
                  <div className="text-[1.5rem] font-semibold text-[var(--color-text)]">
                    {masteredWords || 0}
                  </div>
                  <div className="text-[var(--font-size-small)] text-[var(--color-text-light)]">암기함</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
