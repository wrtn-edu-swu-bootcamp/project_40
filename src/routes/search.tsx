import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { useSearch } from '@/features/search/hooks/useSearch';
import { useWords } from '@/features/words/hooks/useWords';
import { useGroups } from '@/features/groups/hooks/useGroups';
import { suggestGroups } from '@/features/kanji/utils/groupSuggester';
import { addWordToGroup, updateWord, getWordByExactMatch } from '@/lib/db/queries';
import { cn } from '@/lib/utils/cn';
import type { GroupSuggestion } from '@/types/group';
import type { DictionaryEntry } from '@/lib/data/sample-words';

export const Route = createFileRoute('/search')({
  component: SearchPage,
});

function SearchPage() {
  const { results, selectedIndex, selectedResult, isSearching, search, setSelectedIndex } = useSearch();
  const { createWord } = useWords();
  const { createGroup } = useGroups();
  const [isSaving, setIsSaving] = useState(false);
  const [showGroupSuggestions, setShowGroupSuggestions] = useState(false);
  const [groupSuggestions, setGroupSuggestions] = useState<GroupSuggestion[]>([]);
  const [selectedGroupIndices, setSelectedGroupIndices] = useState<Set<number>>(new Set());
  const [savedWordId, setSavedWordId] = useState<string | null>(null);
  
  async function handleSave(entry: DictionaryEntry) {
    setIsSaving(true);
    try {
      // 중복 체크
      const existingWord = await getWordByExactMatch(entry.word);
      if (existingWord) {
        alert('이미 저장된 단어입니다.');
        setIsSaving(false);
        return;
      }
      
      // 단어 저장
      const word = await createWord({
        word: entry.word,
        reading: entry.reading,
        meanings: entry.meanings,
        jlptLevel: entry.jlptLevel,
      });
      
      setSavedWordId(word.id);
      
      // 그룹 추천 생성
      const suggestions = await suggestGroups(word.word);
      
      if (suggestions.length > 0) {
        setGroupSuggestions(suggestions);
        // 기본적으로 모든 그룹 선택
        setSelectedGroupIndices(new Set(suggestions.map((_, idx) => idx)));
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
  
  function toggleGroupSelection(index: number) {
    const newSelection = new Set(selectedGroupIndices);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedGroupIndices(newSelection);
  }
  
  async function confirmGroupSuggestions() {
    if (!savedWordId) return;
    
    setIsSaving(true);
    try {
      const createdGroupIds: string[] = [];
      
      // 선택된 그룹들을 실제로 생성하고 단어 연결
      for (const index of Array.from(selectedGroupIndices)) {
        const suggestion = groupSuggestions[index];
        
        // 그룹 생성 (중복 체크는 createGroup에서 처리)
        const group = await createGroup({
          type: suggestion.type,
          name: suggestion.name,
          criterion: suggestion.criterion,
          wordIds: [savedWordId],
        });
        
        createdGroupIds.push(group.id);
        
        // 단어를 그룹에 연결
        await addWordToGroup(group.id, savedWordId);
      }
      
      // 단어의 groupIds 업데이트
      await updateWord(savedWordId, {
        groupIds: createdGroupIds,
      });
      
      alert(`단어가 저장되었고, ${selectedGroupIndices.size}개의 그룹에 추가되었습니다!`);
      closeGroupSuggestions();
    } catch (error) {
      console.error('그룹 생성 중 오류:', error);
      alert('그룹 생성에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }
  
  function closeGroupSuggestions() {
    setShowGroupSuggestions(false);
    setGroupSuggestions([]);
    setSelectedGroupIndices(new Set());
    setSavedWordId(null);
  }
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="px-12 py-8 border-b border-[var(--color-dark-charcoal)]">
          <h1 className="text-[var(--font-size-h1)] font-medium text-[var(--color-text)] tracking-tight mb-4">
            단어 검색
          </h1>
          <SearchBar onSearch={search} />
        </div>
        
        {/* 2단 레이아웃 */}
        <div className="grid grid-cols-2">
          {/* 좌측: 검색 결과 리스트 */}
          <div className="h-[650px] overflow-y-auto border-r border-[var(--color-dark-charcoal)]">
            {/* 헤더 */}
            <div className="px-8 py-4 border-b border-[var(--color-dark-charcoal)] sticky top-0 bg-[var(--color-ivory)]">
              <span className="text-[var(--font-size-small)] font-medium text-[var(--color-text)]">
                검색 결과 ({results.length})
              </span>
            </div>
            
            {isSearching && (
              <div className="px-8 py-12 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
                검색 중...
              </div>
            )}
            
            {!isSearching && results.length === 0 && (
              <div className="px-8 py-12 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
                검색 결과가 없습니다
              </div>
            )}
            
            {/* 테이블 형식 검색 결과 */}
            <div className="space-y-0">
              {results.map((entry, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "px-8 py-4 border-b border-[var(--color-light-beige)] cursor-pointer transition-colors",
                    selectedIndex === index ? "bg-[var(--color-cream-tint)]" : "hover:bg-[var(--color-warm-white)]"
                  )}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-medium text-[var(--font-size-body)] text-[var(--color-text)] japanese">
                      {entry.word}
                    </span>
                    <span className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] japanese">
                      {entry.reading}
                    </span>
                    {entry.jlptLevel && (
                      <span className="ml-auto text-[var(--font-size-tiny)] text-[var(--color-text-lighter)]">
                        {entry.jlptLevel}
                      </span>
                    )}
                  </div>
                  <div className="text-[var(--font-size-small)] text-[var(--color-text-light)] truncate">
                    {entry.meanings[0]?.definitions[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 우측: 선택한 단어 상세 */}
          <div className="px-12 py-8 h-[650px] overflow-y-auto">
            {selectedResult ? (
              <>
                <div className="mb-8 pb-6 border-b border-[var(--color-light-beige)]">
                  <div className="flex items-baseline gap-4 mb-3">
                    <h2 className="text-[1.75rem] font-normal text-[var(--color-text)] japanese">
                      {selectedResult.word}
                    </h2>
                    <span className="text-[var(--font-size-body)] text-[var(--color-text-light)] japanese">
                      {selectedResult.reading}
                    </span>
                  </div>
                  
                  {selectedResult.jlptLevel && (
                    <span className="text-[var(--font-size-tiny)] text-[var(--color-text-light)]">
                      {selectedResult.jlptLevel}
                    </span>
                  )}
                </div>
                
                {/* 뜻 */}
                <div className="mb-8">
                  <h3 className="text-[var(--font-size-tiny)] font-medium text-[var(--color-text-light)] mb-4 uppercase tracking-wide">
                    의미
                  </h3>
                  {selectedResult.meanings.map((meaning, idx) => (
                    <div key={idx} className="mb-4 pb-4 border-b border-[var(--color-light-beige)] last:border-b-0">
                      <div className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] mb-2 uppercase tracking-wide">
                        {meaning.partOfSpeech}
                      </div>
                      <ul className="space-y-1">
                        {meaning.definitions.map((def, defIdx) => (
                          <li key={defIdx} className="text-[var(--font-size-small)] text-[var(--color-text)] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0">
                            {def}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {/* 저장 버튼 */}
                <div className="border-t border-[var(--color-dark-charcoal)]">
                  <button
                    onClick={() => handleSave(selectedResult)}
                    disabled={isSaving}
                    className="w-full py-3 text-[var(--font-size-small)] text-[var(--color-text)] hover:bg-[var(--color-sky-tint)] transition-colors"
                  >
                    {isSaving ? '저장 중...' : '내 단어장에 저장'}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-[var(--font-size-small)] text-[var(--color-text-light)]">
                단어를 선택하세요
              </div>
            )}
          </div>
        </div>
        
        {/* 그룹 추천 모달 */}
        {showGroupSuggestions && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-[var(--color-ivory)] border border-[var(--color-dark-charcoal)] max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
              {/* 헤더 */}
              <div className="px-8 py-6 border-b border-[var(--color-dark-charcoal)]">
                <h2 className="text-[var(--font-size-h2)] font-medium text-[var(--color-text)] mb-2">
                  그룹 추천
                </h2>
                <p className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
                  이 단어와 관련된 그룹을 발견했습니다. 추가할 그룹을 선택하세요.
                </p>
              </div>
              
              {/* 그룹 목록 */}
              <div className="space-y-0">
                {groupSuggestions.map((suggestion, idx) => (
                  <label
                    key={idx}
                    className={cn(
                      "block py-4 px-8 cursor-pointer transition-colors border-b border-[var(--color-light-beige)] last:border-b-0",
                      selectedGroupIndices.has(idx)
                        ? 'bg-[var(--color-cream-tint)]'
                        : 'hover:bg-[var(--color-warm-white)]'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedGroupIndices.has(idx)}
                        onChange={() => toggleGroupSelection(idx)}
                        className="mt-0.5 w-4 h-4"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[var(--font-size-body)] text-[var(--color-text)] mb-1 japanese">
                          {suggestion.name}
                        </div>
                        <div className="text-[var(--font-size-small)] text-[var(--color-text-light)] mb-1">
                          {suggestion.relatedWords.join(', ')}
                        </div>
                        <div className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)]">
                          {suggestion.count}개 한자
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              
              {/* 버튼 */}
              <div className="grid grid-cols-2 border-t border-[var(--color-dark-charcoal)]">
                <button
                  onClick={closeGroupSuggestions}
                  disabled={isSaving}
                  className="py-4 text-[var(--font-size-small)] text-[var(--color-text-light)] border-r border-[var(--color-light-beige)] hover:bg-[var(--color-warm-white)] transition-colors disabled:opacity-30"
                >
                  그룹 없이 저장
                </button>
                <button
                  onClick={confirmGroupSuggestions}
                  disabled={isSaving || selectedGroupIndices.size === 0}
                  className="py-4 text-[var(--font-size-small)] text-[var(--color-text)] hover:bg-[var(--color-warm-white)] transition-colors disabled:opacity-30"
                >
                  {isSaving ? '저장 중...' : selectedGroupIndices.size === 0 ? '그룹을 선택하세요' : `${selectedGroupIndices.size}개 그룹에 추가`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
