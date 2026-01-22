import { createFileRoute } from '@tanstack/react-router';
import { SearchSection } from '@/components/organisms/SearchSection';
import { KanjiDetailSection } from '@/components/organisms/KanjiDetailSection';
import { RelatedKanjiSection } from '@/components/organisms/RelatedKanjiSection';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-2 tracking-tight">
            일본어 한자 검색
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            네이버 일본어 사전으로 단어를 검색하고, 한자의 구성 요소를 분석합니다
          </p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="space-y-6">
          {/* 섹션 1: 검색 결과 */}
          <SearchSection />

          {/* 섹션 2: 선택한 한자 상세 정보 */}
          <KanjiDetailSection />

          {/* 섹션 3: 관련 한자 목록 */}
          <RelatedKanjiSection />
        </div>

        {/* 푸터 */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
          <p>
            이 서비스는 네이버 일본어 사전과 KanjiDic2 데이터를 사용합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
