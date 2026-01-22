import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { Flashcard } from '@/components/organisms/Flashcard';
import { Button } from '@/components/atoms/Button';
import { useWords } from '@/features/words/hooks/useWords';
import type { Word } from '@/types/word';

export const Route = createFileRoute('/study')({
  component: StudyPage,
});

function StudyPage() {
  const { words } = useWords();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyWords, setStudyWords] = useState<Word[]>([]);
  
  // 학습할 단어 필터링 (암기함 제외)
  useEffect(() => {
    const wordsToStudy = words.filter((w) => w.studyStatus !== 'mastered');
    setStudyWords(wordsToStudy);
    setCurrentIndex(0);
  }, [words]);
  
  const currentWord = studyWords[currentIndex];
  const progress = studyWords.length > 0 ? ((currentIndex + 1) / studyWords.length) * 100 : 0;
  
  // 이전 카드
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);
  
  // 다음 카드
  const handleNext = useCallback(() => {
    if (currentIndex < studyWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, studyWords.length]);
  
  // 키보드 단축키
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);
  
  if (studyWords.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            학습할 단어가 없습니다
          </h1>
          <p className="text-[var(--color-text-light)] mb-6">
            먼저 단어를 검색하여 저장해주세요
          </p>
          <Button onClick={() => window.location.href = '/search'}>
            단어 검색하기
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-6">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] tracking-tight">
              학습 모드
            </h1>
            <div className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
              {currentIndex + 1} / {studyWords.length}
            </div>
          </div>
          
          {/* 진행률 바 */}
          <div className="w-full h-2 bg-[var(--color-light-beige)] overflow-hidden">
            <div
              className="h-full bg-[var(--color-sky-blue)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* 플래시카드 */}
        <Flashcard word={currentWord} className="mb-8" />
        
        {/* 컨트롤 */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            ← 이전 (←)
          </Button>
          
          <div className="text-sm text-[var(--color-text-light)] text-center">
            Space: 뒤집기
          </div>
          
          <Button
            variant="secondary"
            onClick={handleNext}
            disabled={currentIndex === studyWords.length - 1}
            className="flex-1"
          >
            다음 (→)
          </Button>
        </div>
        
        {/* 학습 완료 */}
        {currentIndex === studyWords.length - 1 && (
          <div className="mt-8 py-5 px-6 border-[var(--border-base)] border-[var(--color-success)] text-[var(--color-success)] text-center">
            <p className="font-bold mb-3">마지막 카드입니다!</p>
            <p className="text-sm">모든 단어를 학습했습니다. 수고하셨습니다!</p>
          </div>
        )}
      </div>
    </div>
  );
}
