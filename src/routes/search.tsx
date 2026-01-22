import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { useSearch } from '@/features/search/hooks/useSearch';
import { useWords } from '@/features/words/hooks/useWords';
import { suggestGroups } from '@/features/kanji/utils/groupSuggester';
import type { GroupSuggestion } from '@/types/group';
import type { DictionaryEntry } from '@/lib/data/sample-words';

export const Route = createFileRoute('/search')({
  component: SearchPage,
});

function SearchPage() {
  const { results, selectedIndex, selectedResult, isSearching, search, setSelectedIndex } = useSearch();
  const { createWord } = useWords();
  const [isSaving, setIsSaving] = useState(false);
  const [showGroupSuggestions, setShowGroupSuggestions] = useState(false);
  const [groupSuggestions, setGroupSuggestions] = useState<GroupSuggestion[]>([]);
  
  async function handleSave(entry: DictionaryEntry) {
    setIsSaving(true);
    try {
      // 단어 저장
      const word = await createWord({
        word: entry.word,
        reading: entry.reading,
        meanings: entry.meanings,
        jlptLevel: entry.jlptLevel,
      });
      
      // 그룹 추천 생성
      const suggestions = await suggestGroups(word.word);
      
      if (suggestions.length > 0) {
        setGroupSuggestions(suggestions);
        setShowGroupSuggestions(true);
      } else {
        alert('단어가 저장되었습니다!');
      }
    } catch (error) {
      console.error('단어 저장 중 오류:', error);
      alert('단어 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }
  
  function closeGroupSuggestions() {
    setShowGroupSuggestions(false);
    setGroupSuggestions([]);
  }
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] mb-2 tracking-tight">
            단어 검색
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            한국어, 히라가나, 한자, 로마자 모두 검색 가능합니다 (214,000+ 단어)
          </p>
        </div>
        
        {/* 검색바 */}
        <SearchBar onSearch={search} className="mb-8" />
        
        {/* 2단 레이아웃 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 좌측: 검색 결과 리스트 */}
          <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-5 h-[650px] overflow-y-auto shadow-[var(--shadow-subtle)]">
            <h2 className="text-[var(--font-size-h2)] font-semibold text-[var(--color-text)] mb-4">
              검색 결과 ({results.length})
            </h2>
            
            {isSearching && (
              <div className="text-center text-[var(--color-text-light)] py-8">
                검색 중...
              </div>
            )}
            
            {!isSearching && results.length === 0 && (
              <div className="text-center text-[var(--color-text-light)] py-8">
                검색 결과가 없습니다
              </div>
            )}
            
            <div className="space-y-3">
              {results.map((entry, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-[var(--radius-md)] border-[var(--border-thin)] cursor-pointer transition-all duration-150 ${
                    selectedIndex === index
                      ? 'border-[var(--color-sky-blue)] bg-[var(--color-sky-tint)] shadow-[var(--shadow-soft)]'
                      : 'border-[var(--color-border)] bg-[var(--color-cream-tint)] hover:border-[var(--color-medium-gray)] hover:shadow-[var(--shadow-subtle)]'
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-[var(--font-size-h2)] font-medium text-[var(--color-text)] japanese">
                      {entry.word}
                    </span>
                    <span className="text-[var(--font-size-small)] text-[var(--color-text-light)] japanese">
                      {entry.reading}
                    </span>
                    {entry.jlptLevel && (
                      <Badge variant="jlpt" jlptLevel={entry.jlptLevel} className="ml-auto">
                        {entry.jlptLevel}
                      </Badge>
                    )}
                  </div>
                  <div className="text-[var(--font-size-body)] text-[var(--color-text)] leading-relaxed">
                    {entry.meanings[0]?.definitions[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 우측: 선택한 단어 상세 */}
          <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 h-[650px] overflow-y-auto shadow-[var(--shadow-subtle)]">
            {selectedResult ? (
              <>
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <h2 className="text-[2rem] font-semibold text-[var(--color-text)] japanese">
                      {selectedResult.word}
                    </h2>
                    <span className="text-[1.25rem] text-[var(--color-text-light)] japanese">
                      {selectedResult.reading}
                    </span>
                  </div>
                  
                  {selectedResult.jlptLevel && (
                    <Badge variant="jlpt" jlptLevel={selectedResult.jlptLevel}>
                      {selectedResult.jlptLevel}
                    </Badge>
                  )}
                </div>
                
                {/* 뜻 */}
                <div className="mb-6">
                  <h3 className="text-[var(--font-size-body)] font-semibold text-[var(--color-text)] mb-3">
                    의미
                  </h3>
                  {selectedResult.meanings.map((meaning, idx) => (
                    <div key={idx} className="mb-4 p-3 rounded-[var(--radius-md)] bg-[var(--color-cream-tint)]">
                      <div className="text-[var(--font-size-small)] text-[var(--color-text-lighter)] mb-2 font-medium">
                        {meaning.partOfSpeech}
                      </div>
                      <ul className="list-disc list-inside space-y-1.5">
                        {meaning.definitions.map((def, defIdx) => (
                          <li key={defIdx} className="text-[var(--font-size-body)] text-[var(--color-text)] leading-relaxed">
                            {def}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {/* 저장 버튼 */}
                <Button
                  onClick={() => handleSave(selectedResult)}
                  disabled={isSaving}
                  className="w-full"
                >
                  {isSaving ? '저장 중...' : '내 단어장에 저장'}
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-[var(--color-text-light)]">
                단어를 선택하세요
              </div>
            )}
          </div>
        </div>
        
        {/* 그룹 추천 모달 */}
        {showGroupSuggestions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">
                그룹 추천
              </h2>
              <p className="text-sm text-[var(--color-text-light)] mb-4">
                이 단어와 관련된 그룹을 발견했습니다!
              </p>
              
              <div className="space-y-3 mb-6">
                {groupSuggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-cream-tint)]"
                  >
                    <div className="font-bold text-[var(--color-text)] mb-1 japanese">
                      {suggestion.name}
                    </div>
                    <div className="text-sm text-[var(--color-text-light)] mb-2">
                      관련 한자: {suggestion.relatedWords.join(', ')}
                    </div>
                    <Badge>{suggestion.count}개 한자</Badge>
                  </div>
                ))}
              </div>
              
              <Button onClick={closeGroupSuggestions} className="w-full">
                확인
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
