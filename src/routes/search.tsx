import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { SearchBar } from '@/components/molecules/SearchBar';
import { ComponentDisplay } from '@/components/molecules/ComponentDisplay';
import { KanjiListSection } from '@/components/organisms/KanjiListSection';
import { useSearch } from '@/features/search/hooks/useSearch';
import { useBookmarks } from '@/features/bookmarks/hooks/useBookmarks';
import { useAutoGroup } from '@/features/groups/hooks/useAutoGroup';
import { extractKanji } from '@/features/kanji/utils/kanjiExtractor';
import { getKanjiFromDictionary, getMultipleKanjiFromDictionary } from '@/lib/data/kanji-dictionary';
import { findKanjiByComponent } from '@/features/kanji/utils/componentAnalyzer';
import type { KanjiInfo } from '@/types/kanji';

export const Route = createFileRoute('/search')({
  component: SearchPage,
});

function SearchPage() {
  const { results, isSearching, search } = useSearch();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { autoSaveComponentGroup } = useAutoGroup();

  // 상태
  const [selectedResult, setSelectedResult] = useState<typeof results[0] | null>(null);
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [componentKanjiList, setComponentKanjiList] = useState<KanjiInfo[]>([]);
  const [autoSavedComponents, setAutoSavedComponents] = useState<Set<string>>(new Set());

  // 북마크된 한자 문자들
  const bookmarkedCharacters = bookmarks.map((b) => b.character);

  // 검색 결과 선택
  function handleResultSelect(result: typeof results[0]) {
    setSelectedResult(result);
    setSelectedKanji(null);
    setSelectedComponent(null);
    setComponentKanjiList([]);
  }

  // 한자 클릭 (섹션 2 표시)
  function handleKanjiClick(character: string) {
    setSelectedKanji(character);
    setSelectedComponent(null);
    setComponentKanjiList([]);
  }

  // 구성 요소/부수 클릭 (섹션 3 표시 + 자동 그룹 저장)
  async function handleComponentClick(component: string) {
    setSelectedComponent(component);

    // 해당 구성 요소를 포함하는 한자들 찾기
    const kanjiCharacters = findKanjiByComponent(component);
    const kanjiInfoList = getMultipleKanjiFromDictionary(kanjiCharacters);
    setComponentKanjiList(kanjiInfoList);

    // 자동 그룹 저장 (이미 저장된 요소가 아니면)
    if (!autoSavedComponents.has(component)) {
      try {
        await autoSaveComponentGroup(component, kanjiCharacters);
        setAutoSavedComponents((prev) => new Set(prev).add(component));
      } catch (error) {
        console.error('자동 그룹 저장 실패:', error);
      }
    }
  }

  // 북마크 토글
  async function handleBookmarkToggle(character: string) {
    const kanjiInfo = getKanjiFromDictionary(character);
    if (!kanjiInfo) return;

    try {
      await toggleBookmark(character, kanjiInfo, selectedResult?.word);
    } catch (error) {
      console.error('북마크 토글 실패:', error);
    }
  }

  // 선택된 한자의 구성 요소 정보
  const selectedKanjiComponents: KanjiInfo[] = selectedKanji
    ? (() => {
        const kanjiInfo = getKanjiFromDictionary(selectedKanji);
        if (!kanjiInfo || !kanjiInfo.components) return [];
        return getMultipleKanjiFromDictionary(kanjiInfo.components);
      })()
    : [];

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-2 tracking-tight">
            단어 검색
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            한자로 이루어진 단어를 검색하고 구성 요소를 분석하세요
          </p>
        </div>

        {/* 검색바 */}
        <SearchBar onSearch={search} className="mb-8" />

        {/* 검색 중 */}
        {isSearching && (
          <div className="text-center text-[var(--color-text-light)] py-8">
            검색 중...
          </div>
        )}

        {/* 검색 결과가 없을 때 */}
        {!isSearching && results.length === 0 && (
          <div className="text-center text-[var(--color-text-light)] py-8">
            검색 결과가 없습니다
          </div>
        )}

        {/* 검색 결과 목록 (단어가 선택되지 않았을 때만 표시) */}
        {!isSearching && results.length > 0 && !selectedResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleResultSelect(result)}
                className="p-4 rounded-[var(--radius-md)] border text-left transition-all duration-150 border-[var(--color-border)] bg-white hover:border-[var(--color-medium-gray)] hover:shadow-[var(--shadow-subtle)]"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] japanese">
                    {result.word}
                  </span>
                  <span className="text-[var(--font-size-small)] text-[var(--color-text-light)] japanese">
                    {result.reading}
                  </span>
                </div>
                <div className="text-[var(--font-size-small)] text-[var(--color-text)] line-clamp-2">
                  {result.meanings[0]?.definitions[0]}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 다른 검색 결과 보기 버튼 (단어가 선택되었고 결과가 2개 이상일 때) */}
        {selectedResult && results.length > 1 && (
          <div className="mb-4">
            <button
              onClick={() => {
                setSelectedResult(null);
                setSelectedKanji(null);
                setSelectedComponent(null);
                setComponentKanjiList([]);
              }}
              className="inline-flex items-center gap-2 text-[var(--font-size-body)] text-[var(--color-sky-blue)] hover:text-[var(--color-text)] transition-colors font-medium"
            >
              ← 다른 검색 결과 보기 ({results.length}개)
            </button>
          </div>
        )}

        {/* 섹션 1: 선택한 단어 상세 */}
        {selectedResult && (
          <div className="p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-subtle)]">
            <h2 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-4">
              검색된 단어
            </h2>

            <div className="mb-4">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[2rem] font-bold text-[var(--color-text)] japanese">
                  {selectedResult.word}
                </span>
                <span className="text-[1.25rem] text-[var(--color-text-light)] japanese">
                  {selectedResult.reading}
                </span>
              </div>

              {/* 뜻 */}
              <div className="mb-4">
                {selectedResult.meanings.map((meaning: any, idx: number) => (
                  <div key={idx} className="mb-2">
                    <span className="text-[var(--font-size-small)] text-[var(--color-text-lighter)] font-medium">
                      [{meaning.partOfSpeech}]{' '}
                    </span>
                    <span className="text-[var(--font-size-body)] text-[var(--color-text)]">
                      {meaning.definitions.join(', ')}
                    </span>
                  </div>
                ))}
              </div>

              {/* 클릭 가능한 한자들 */}
              <div>
                <span className="text-[var(--font-size-small)] text-[var(--color-text-lighter)] font-semibold block mb-2">
                  한자를 클릭하여 구성 요소 확인:
                </span>
                <div className="flex gap-2">
                  {extractKanji(selectedResult.word).map((kanji) => (
                    <button
                      key={kanji}
                      onClick={() => handleKanjiClick(kanji)}
                      className={`w-14 h-14 rounded-[var(--radius-md)] border-2 transition-all duration-150 ${
                        selectedKanji === kanji
                          ? 'border-[var(--color-sky-blue)] bg-[var(--color-sky-tint)] shadow-[var(--shadow-soft)]'
                          : 'border-[var(--color-border)] bg-[var(--color-cream-tint)] hover:border-[var(--color-sky-blue)]'
                      }`}
                    >
                      <span className="text-[1.5rem] font-bold japanese">{kanji}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 섹션 2: 선택한 한자의 구성 요소 */}
        {selectedKanji && (
          <div className="mt-8 p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-subtle)]">
            <h2 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-4">
              선택한 한자의 구성 요소
            </h2>

            <div className="mb-4">
              <span className="text-[2rem] font-bold text-[var(--color-text)] japanese">
                {selectedKanji}
              </span>
              <span className="text-[var(--font-size-body)] text-[var(--color-text-light)] ml-3">
                = {selectedKanjiComponents.map((c) => c.character).join(' + ')}
              </span>
            </div>

            <ComponentDisplay
              components={selectedKanjiComponents}
              onComponentClick={handleComponentClick}
            />
          </div>
        )}

        {/* 섹션 3: 선택한 요소를 포함한 한자들 */}
        {selectedComponent && componentKanjiList.length > 0 && (
          <div className="mt-8 p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-subtle)]">
            <KanjiListSection
              title={`${selectedComponent} 포함 한자`}
              kanjiList={componentKanjiList}
              bookmarkedCharacters={bookmarkedCharacters}
              onBookmarkToggle={handleBookmarkToggle}
              autoSaved={autoSavedComponents.has(selectedComponent)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
