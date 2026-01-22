import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { WordCard } from '@/components/molecules/WordCard';
import { FilterPanel } from '@/components/organisms/FilterPanel';
import { Button } from '@/components/atoms/Button';
import { useWords } from '@/features/words/hooks/useWords';
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
    <div className="min-h-screen bg-[var(--color-ivory)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            내 단어장
          </h1>
          <p className="text-sm text-[var(--color-text-light)]">
            저장한 단어를 관리하고 학습하세요
          </p>
        </div>
        
        {/* 3단 레이아웃 */}
        <div className="grid grid-cols-12 gap-6">
          {/* 좌측: 필터 패널 */}
          <div className="col-span-2">
            <FilterPanel
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              counts={counts}
            />
          </div>
          
          {/* 중앙: 단어 목록 */}
          <div className="col-span-5">
            <div className="bg-white rounded-lg border border-[var(--color-border)] p-4 h-[700px] overflow-y-auto">
              <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">
                단어 목록 ({filteredWords.length})
              </h2>
              
              {isLoading && (
                <div className="text-center text-[var(--color-text-light)] py-8">
                  로딩 중...
                </div>
              )}
              
              {!isLoading && filteredWords.length === 0 && (
                <div className="text-center text-[var(--color-text-light)] py-8">
                  {selectedStatus === 'all' 
                    ? '저장된 단어가 없습니다'
                    : '해당 상태의 단어가 없습니다'}
                </div>
              )}
              
              <div className="space-y-3">
                {filteredWords.map((word) => (
                  <WordCard
                    key={word.id}
                    word={word}
                    selected={selectedWord?.id === word.id}
                    showCheckbox
                    onSelect={() => setSelectedWord(word)}
                    onToggleStatus={() => handleToggleStatus(word.id)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* 우측: 단어 상세 */}
          <div className="col-span-5">
            <div className="bg-white rounded-lg border border-[var(--color-border)] p-6 h-[700px] overflow-y-auto">
              {selectedWord ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-3">
                      <h2 className="text-3xl font-bold text-[var(--color-text)] japanese">
                        {selectedWord.word}
                      </h2>
                      <span className="text-xl text-[var(--color-text-light)] japanese">
                        {selectedWord.reading}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedWord.jlptLevel && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--color-jlpt-n3)] text-[var(--color-text)]">
                          {selectedWord.jlptLevel}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        selectedWord.studyStatus === 'mastered'
                          ? 'bg-[var(--color-success)] text-white'
                          : selectedWord.studyStatus === 'learning'
                          ? 'bg-[var(--color-warning)] text-[var(--color-text)]'
                          : 'bg-[var(--color-light-beige)] text-[var(--color-text)]'
                      }`}>
                        {selectedWord.studyStatus === 'mastered' ? '암기함' :
                         selectedWord.studyStatus === 'learning' ? '학습중' : '새 단어'}
                      </span>
                    </div>
                  </div>
                  
                  {/* 뜻 */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[var(--color-text)] mb-2">
                      의미
                    </h3>
                    {selectedWord.meanings.map((meaning, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="text-sm text-[var(--color-text-lighter)] mb-1">
                          {meaning.partOfSpeech}
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {meaning.definitions.map((def, defIdx) => (
                            <li key={defIdx} className="text-sm text-[var(--color-text)]">
                              {def}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* 한자 정보 */}
                  {selectedWord.kanji.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-[var(--color-text)] mb-2">
                        포함된 한자
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {selectedWord.kanji.map((k, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-md bg-[var(--color-cream-tint)] border border-[var(--color-border)] text-lg japanese"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 학습 통계 */}
                  <div className="mb-6 p-4 rounded-lg bg-[var(--color-cream-tint)]">
                    <h3 className="text-sm font-bold text-[var(--color-text)] mb-2">
                      학습 기록
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-[var(--color-text-lighter)]">복습 횟수</div>
                        <div className="font-bold text-[var(--color-text)]">
                          {selectedWord.reviewCount}회
                        </div>
                      </div>
                      <div>
                        <div className="text-[var(--color-text-lighter)]">정답률</div>
                        <div className="font-bold text-[var(--color-text)]">
                          {selectedWord.reviewCount > 0
                            ? Math.round((selectedWord.correctCount / selectedWord.reviewCount) * 100)
                            : 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 액션 버튼 */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleToggleStatus(selectedWord.id)}
                      className="flex-1"
                    >
                      {selectedWord.studyStatus === 'mastered' ? '학습중으로 변경' : '암기함으로 표시'}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(selectedWord.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--color-text-light)]">
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
