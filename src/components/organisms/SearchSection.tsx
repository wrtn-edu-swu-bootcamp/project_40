import { memo } from 'react';
import { SearchBar } from '@/components/molecules/SearchBar';
import { KanjiButton } from '@/components/atoms/KanjiButton';
import { useSearchStore } from '@/stores/useSearchStore';
import { searchNaverDictionary, extractKanji } from '@/lib/api/naverDictionary';
import { addSearchHistory } from '@/lib/db/queries';

export const SearchSection = memo(function SearchSection() {
  const { searchResult, isLoading, error, setSearchResult, setIsLoading, setError, selectKanji } =
    useSearchStore();

  async function handleSearch(query: string) {
    if (!query.trim()) {
      setSearchResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await searchNaverDictionary(query);

      if (result) {
        setSearchResult(result);
        // 검색 기록 저장
        await addSearchHistory(query, result.word, result.reading);
      } else {
        setError('검색 결과를 찾을 수 없습니다.');
        setSearchResult(null);
      }
    } catch (err) {
      console.error('검색 중 오류:', err);
      setError('검색 중 오류가 발생했습니다.');
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKanjiClick(kanji: string) {
    selectKanji(kanji);
  }

  const kanjiList = searchResult ? extractKanji(searchResult.word) : [];

  return (
    <div className="space-y-6">
      {/* 검색바 */}
      <SearchBar
        onSearch={handleSearch}
        placeholder="일본어 단어를 검색하세요 (예: 清潔)"
        className="mb-6"
      />

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-8 text-center shadow-[var(--shadow-subtle)]">
          <div className="text-[var(--color-text-light)]">검색 중...</div>
        </div>
      )}

      {/* 에러 상태 */}
      {error && !isLoading && (
        <div className="bg-white rounded-[var(--radius-md)] border border-red-300 p-6 shadow-[var(--shadow-subtle)]">
          <div className="text-red-600">{error}</div>
        </div>
      )}

      {/* 검색 결과 */}
      {searchResult && !isLoading && (
        <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 shadow-[var(--shadow-subtle)]">
          {/* 단어 헤더 */}
          <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-[2rem] font-semibold text-[var(--color-text)] japanese">
                {searchResult.word}
              </h2>
              <span className="text-[1.25rem] text-[var(--color-text-light)] japanese">
                {searchResult.reading}
              </span>
            </div>
          </div>

          {/* 뜻 */}
          <div className="mb-6">
            <h3 className="text-[var(--font-size-body)] font-semibold text-[var(--color-text)] mb-3">
              의미
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {searchResult.meanings.map((meaning, idx) => (
                <li
                  key={idx}
                  className="text-[var(--font-size-body)] text-[var(--color-text)] leading-relaxed"
                >
                  {meaning}
                </li>
              ))}
            </ul>
          </div>

          {/* 예문 - Jisho API는 예문을 제공하지 않으므로 조건부 렌더링 */}
          {searchResult.examples && searchResult.examples.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[var(--font-size-body)] font-semibold text-[var(--color-text)] mb-3">
                예문
              </h3>
              <div className="space-y-3">
                {searchResult.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[var(--radius-md)] bg-[var(--color-cream-tint)] border border-[var(--color-border)]"
                  >
                    <div className="text-[var(--font-size-body)] text-[var(--color-text)] japanese mb-1">
                      {example.japanese}
                    </div>
                    <div className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
                      {example.korean}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 한자 버튼 */}
          {kanjiList.length > 0 && (
            <div>
              <h3 className="text-[var(--font-size-body)] font-semibold text-[var(--color-text)] mb-3">
                한자 분석
              </h3>
              <div className="flex flex-wrap gap-2">
                {kanjiList.map((kanji) => (
                  <KanjiButton
                    key={kanji}
                    kanji={kanji}
                    onClick={() => handleKanjiClick(kanji)}
                    tooltip={`"${kanji}" 한자의 상세 정보 보기`}
                  />
                ))}
              </div>
              <p className="mt-3 text-[var(--font-size-small)] text-[var(--color-text-light)]">
                한자를 클릭하면 구성 요소와 부수 정보를 확인할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
