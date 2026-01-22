import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { WordCard } from '@/components/molecules/WordCard';
import { FilterPanel } from '@/components/organisms/FilterPanel';
import { Button } from '@/components/atoms/Button';
import { useWords } from '@/features/words/hooks/useWords';
import { cn } from '@/lib/utils/cn';
import type { StudyStatus, Word } from '@/types/word';

export const Route = createFileRoute('/words/')({
  component: WordsPage,
});

function WordsPage() {
  const { words, isLoading, toggleWordStatus, removeWord } = useWords();
  const [selectedStatus, setSelectedStatus] = useState<StudyStatus | 'all'>('all');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  
  // 필터링된 단어 목록
  const filteredWords = useMemo(() => {
    if (selectedStatus === 'all') return words;
    return words.filter((word) => word.studyStatus === selectedStatus);
  }, [words, selectedStatus]);
  
  // 상태별 개수
  const counts = useMemo(() => ({
    all: words.length,
    new: words.filter((w) => w.studyStatus === 'new').length,
    learning: words.filter((w) => w.studyStatus === 'learning').length,
    mastered: words.filter((w) => w.studyStatus === 'mastered').length,
  }), [words]);
  
  async function handleToggleStatus(wordId: string) {
    await toggleWordStatus(wordId);
  }
  
  async function handleDelete(wordId: string) {
    if (confirm('정말 이 단어를 삭제하시겠습니까?')) {
      await removeWord(wordId);
      if (selectedWord?.id === wordId) {
        setSelectedWord(null);
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="px-12 py-8 border-b border-[var(--color-dark-charcoal)]">
          <h1 className="text-[var(--font-size-h1)] font-medium text-[var(--color-text)] tracking-tight">
            내 단어장
          </h1>
        </div>
        
        {/* 3단 테이블 레이아웃 */}
        <div className="grid grid-cols-12">
          {/* 좌측: 필터 */}
          <div className="col-span-2 border-r border-[var(--color-dark-charcoal)] px-8 py-8">
            <h3 className="text-[var(--font-size-tiny)] font-medium text-[var(--color-text-light)] mb-4 uppercase tracking-wide">
              학습 상태
            </h3>
            <div className="space-y-0">
              {[
                { value: 'all', label: '전체', key: 'all' as const },
                { value: 'new', label: '새 단어', key: 'new' as const },
                { value: 'learning', label: '학습중', key: 'learning' as const },
                { value: 'mastered', label: '암기함', key: 'mastered' as const },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedStatus(filter.value)}
                  className={cn(
                    "w-full text-left py-2 px-3 text-[var(--font-size-small)] border-l-[2px] transition-colors",
                    selectedStatus === filter.value
                      ? "border-[var(--color-dark-charcoal)] text-[var(--color-text)] font-medium"
                      : "border-transparent text-[var(--color-text-light)] hover:border-[var(--color-light-beige)]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{filter.label}</span>
                    <span className="text-[var(--font-size-tiny)] tabular-nums">
                      {counts[filter.key]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* 중앙: 단어 목록 */}
          <div className="col-span-5 border-r border-[var(--color-dark-charcoal)]">
            <div className="h-[700px] overflow-y-auto">
              {/* 헤더 */}
              <div className="px-8 py-4 border-b border-[var(--color-dark-charcoal)] sticky top-0 bg-[var(--color-ivory)]">
                <span className="text-[var(--font-size-small)] font-medium text-[var(--color-text)]">
                  단어 목록 ({filteredWords.length})
                </span>
              </div>
              
              {isLoading && (
                <div className="px-8 py-12 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
                  로딩 중...
                </div>
              )}
              
              {!isLoading && filteredWords.length === 0 && (
                <div className="px-8 py-12 text-center text-[var(--font-size-small)] text-[var(--color-text-light)]">
                  {selectedStatus === 'all' 
                    ? '저장된 단어가 없습니다'
                    : '해당 상태의 단어가 없습니다'}
                </div>
              )}
              
              {/* 테이블 형식 단어 목록 */}
              <div className="space-y-0">
                {filteredWords.map((word, index) => (
                  <div
                    key={word.id}
                    onClick={() => setSelectedWord(word)}
                    className={cn(
                      "px-8 py-4 border-b border-[var(--color-light-beige)] cursor-pointer transition-colors",
                      selectedWord?.id === word.id ? "bg-[var(--color-cream-tint)]" : "hover:bg-[var(--color-warm-white)]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* 체크박스 */}
                      <input
                        type="checkbox"
                        checked={word.studyStatus === 'mastered'}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(word.id);
                        }}
                        className="w-4 h-4"
                      />
                      
                      {/* 단어 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-medium text-[var(--font-size-body)] text-[var(--color-text)] japanese">
                            {word.word}
                          </span>
                          <span className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] japanese">
                            {word.reading}
                          </span>
                        </div>
                        <div className="text-[var(--font-size-small)] text-[var(--color-text-light)] truncate">
                          {word.meanings[0]?.definitions[0]}
                        </div>
                      </div>
                      
                      {/* 상태 표시 */}
                      <div className="flex items-center gap-2">
                        {word.jlptLevel && (
                          <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)]">
                            {word.jlptLevel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 우측: 단어 상세 */}
          <div className="col-span-5">
            <div className="px-12 py-8 h-[700px] overflow-y-auto">
              {selectedWord ? (
                <>
                  <div className="mb-8 pb-6 border-b border-[var(--color-light-beige)]">
                    <div className="flex items-baseline gap-4 mb-3">
                      <h2 className="text-[1.75rem] font-normal text-[var(--color-text)] japanese">
                        {selectedWord.word}
                      </h2>
                      <span className="text-[var(--font-size-body)] text-[var(--color-text-light)] japanese">
                        {selectedWord.reading}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[var(--font-size-tiny)] text-[var(--color-text-light)]">
                      {selectedWord.jlptLevel && (
                        <span>{selectedWord.jlptLevel}</span>
                      )}
                      <span>·</span>
                      <span>
                        {selectedWord.studyStatus === 'mastered' ? '암기함' :
                         selectedWord.studyStatus === 'learning' ? '학습중' : '새 단어'}
                      </span>
                    </div>
                  </div>
                  
                  {/* 뜻 */}
                  <div className="mb-8">
                    <h3 className="text-[var(--font-size-tiny)] font-medium text-[var(--color-text-light)] mb-4 uppercase tracking-wide">
                      의미
                    </h3>
                    {selectedWord.meanings.map((meaning, idx) => (
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
                  
                  {/* 한자 정보 */}
                  {selectedWord.kanji.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-[var(--font-size-tiny)] font-medium text-[var(--color-text-light)] mb-4 uppercase tracking-wide">
                        포함된 한자
                      </h3>
                      <div className="flex gap-3 flex-wrap">
                        {selectedWord.kanji.map((k, idx) => (
                          <span
                            key={idx}
                            className="text-[1.125rem] japanese text-[var(--color-text)]"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 학습 통계 */}
                  <div className="mb-8 pt-6 border-t border-[var(--color-light-beige)]">
                    <h3 className="text-[var(--font-size-tiny)] font-medium text-[var(--color-text-light)] mb-4 uppercase tracking-wide">
                      학습 기록
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] mb-1 uppercase tracking-wide">복습 횟수</div>
                        <div className="text-[var(--font-size-h2)] font-normal text-[var(--color-text)] tabular-nums">
                          {selectedWord.reviewCount}<span className="text-[var(--font-size-small)] ml-1">회</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] mb-1 uppercase tracking-wide">정답률</div>
                        <div className="text-[var(--font-size-h2)] font-normal text-[var(--color-text)] tabular-nums">
                          {selectedWord.reviewCount > 0
                            ? Math.round((selectedWord.correctCount / selectedWord.reviewCount) * 100)
                            : 0}<span className="text-[var(--font-size-small)] ml-1">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 액션 버튼 */}
                  <div className="flex gap-0 border-t border-[var(--color-dark-charcoal)]">
                    <button
                      onClick={() => handleToggleStatus(selectedWord.id)}
                      className="flex-1 py-3 text-[var(--font-size-small)] text-[var(--color-text)] border-r border-[var(--color-light-beige)] hover:bg-[var(--color-sky-tint)] transition-colors"
                    >
                      {selectedWord.studyStatus === 'mastered' ? '학습중으로' : '암기함으로'}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedWord.id)}
                      className="px-6 py-3 text-[var(--font-size-small)] text-[var(--color-coral-pink)] hover:bg-[var(--color-pink-tint)] transition-colors"
                    >
                      삭제
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
        </div>
      </div>
    </div>
  );
}
