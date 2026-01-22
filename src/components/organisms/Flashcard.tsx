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
            'bg-[var(--color-ivory)] border border-[var(--color-dark-charcoal)]',
            'flex flex-col items-center justify-center p-12'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <h2 className="text-[4rem] font-normal text-[var(--color-text)] mb-4 japanese">
              {word.word}
            </h2>
            {word.jlptLevel && (
              <span className="text-[var(--font-size-small)] text-[var(--color-text-light)]">
                {word.jlptLevel}
              </span>
            )}
          </div>
          
          <div className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] mt-auto uppercase tracking-wide">
            클릭하여 뒤집기 (Space)
          </div>
        </div>
        
        {/* 뒷면 (뜻) */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden',
            'bg-[var(--color-ivory)] border border-[var(--color-dark-charcoal)]',
            'flex flex-col p-12 overflow-y-auto'
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* 읽기 */}
          <div className="text-center mb-8 pb-6 border-b border-[var(--color-light-beige)]">
            <h3 className="text-[2.5rem] font-normal text-[var(--color-text)] japanese mb-2">
              {word.reading}
            </h3>
            <div className="text-[var(--font-size-body)] text-[var(--color-text-light)] japanese">
              {word.word}
            </div>
          </div>
          
          {/* 뜻 */}
          <div className="flex-1 mb-6">
            {word.meanings.map((meaning, idx) => (
              <div key={idx} className="mb-5 pb-5 border-b border-[var(--color-light-beige)] last:border-b-0 last:pb-0">
                <div className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] mb-2 uppercase tracking-wide">
                  {meaning.partOfSpeech}
                </div>
                <ul className="space-y-2">
                  {meaning.definitions.map((def, defIdx) => (
                    <li key={defIdx} className="text-[var(--font-size-body)] text-[var(--color-text)] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0">
                      {def}
                    </li>
                  ))}
                </ul>
                {meaning.examples && meaning.examples.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-light-beige)] text-[var(--font-size-small)] text-[var(--color-text-light)] japanese">
                    {meaning.examples[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] text-center uppercase tracking-wide">
            클릭하여 뒤집기 (Space)
          </div>
        </div>
      </motion.div>
    </div>
  );
});
