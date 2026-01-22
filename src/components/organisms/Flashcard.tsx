import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';
import type { Word } from '@/types/word';

export interface FlashcardProps {
  word: Word;
  className?: string;
}

export const Flashcard = memo(function Flashcard({
  word,
  className,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  function handleFlip() {
    setIsFlipped(!isFlipped);
  }
  
  return (
    <div className={cn('perspective-1000', className)}>
      <motion.div
        className="relative w-full h-[500px] cursor-pointer"
        onClick={handleFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 앞면 (단어) */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden',
            'bg-white rounded-2xl border-2 border-[var(--color-border)] shadow-lg',
            'flex flex-col items-center justify-center p-8'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center mb-6">
            <h2 className="text-6xl font-bold text-[var(--color-text)] mb-4 japanese">
              {word.word}
            </h2>
            {word.jlptLevel && (
              <Badge variant="jlpt" jlptLevel={word.jlptLevel} className="text-base px-4 py-1">
                {word.jlptLevel}
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-[var(--color-text-lighter)] mt-auto">
            클릭하여 뒤집기 (Space)
          </div>
        </div>
        
        {/* 뒷면 (뜻) */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden',
            'bg-[var(--color-cream-tint)] rounded-2xl border-2 border-[var(--color-sky-blue)] shadow-lg',
            'flex flex-col p-8 overflow-y-auto'
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* 읽기 */}
          <div className="text-center mb-6">
            <h3 className="text-4xl font-bold text-[var(--color-text)] japanese mb-2">
              {word.reading}
            </h3>
            <div className="text-2xl text-[var(--color-text-light)] japanese">
              {word.word}
            </div>
          </div>
          
          {/* 뜻 */}
          <div className="flex-1 mb-6">
            {word.meanings.map((meaning, idx) => (
              <div key={idx} className="mb-4">
                <div className="text-sm text-[var(--color-text-lighter)] mb-2">
                  {meaning.partOfSpeech}
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {meaning.definitions.map((def, defIdx) => (
                    <li key={defIdx} className="text-lg text-[var(--color-text)]">
                      {def}
                    </li>
                  ))}
                </ul>
                {meaning.examples && meaning.examples.length > 0 && (
                  <div className="mt-2 pl-4 text-sm text-[var(--color-text-light)] japanese">
                    {meaning.examples[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-[var(--color-text-lighter)] text-center">
            클릭하여 뒤집기 (Space)
          </div>
        </div>
      </motion.div>
    </div>
  );
});
