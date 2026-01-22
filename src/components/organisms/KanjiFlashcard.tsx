import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import type { KanjiInfo } from '@/types/kanji';

export interface KanjiFlashcardProps {
  kanjiInfo: KanjiInfo;
  className?: string;
}

export const KanjiFlashcard = memo(function KanjiFlashcard({
  kanjiInfo,
  className,
}: KanjiFlashcardProps) {
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
        {/* 앞면 (한자) */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden',
            'bg-white rounded-2xl border-2 border-[var(--color-border)] shadow-lg',
            'flex flex-col items-center justify-center p-8'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <h2 className="text-[8rem] font-bold text-[var(--color-text)] japanese">
              {kanjiInfo.character}
            </h2>
          </div>

          <div className="text-sm text-[var(--color-text-lighter)] mt-auto">
            클릭하여 뒤집기 (Space)
          </div>
        </div>

        {/* 뒷면 (뜻, 음독, 훈독) */}
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
          {/* 한자 (작게) */}
          <div className="text-center mb-6">
            <h3 className="text-5xl font-bold text-[var(--color-text)] japanese">
              {kanjiInfo.character}
            </h3>
            {kanjiInfo.radicalName && (
              <div className="text-lg text-[var(--color-text-light)] mt-2">
                {kanjiInfo.radicalName}
              </div>
            )}
          </div>

          {/* 뜻 */}
          {kanjiInfo.meanings && kanjiInfo.meanings.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-[var(--color-text-lighter)] font-semibold mb-2 uppercase tracking-wider">
                뜻
              </div>
              <div className="text-2xl text-[var(--color-text)] font-medium">
                {kanjiInfo.meanings.join(', ')}
              </div>
            </div>
          )}

          {/* 음독 */}
          {kanjiInfo.readings.on && kanjiInfo.readings.on.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-[var(--color-text-lighter)] font-semibold mb-2 uppercase tracking-wider">
                음독
              </div>
              <div className="text-2xl text-[var(--color-text)] font-medium japanese">
                {kanjiInfo.readings.on.join(', ')}
              </div>
            </div>
          )}

          {/* 훈독 */}
          {kanjiInfo.readings.kun && kanjiInfo.readings.kun.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-[var(--color-text-lighter)] font-semibold mb-2 uppercase tracking-wider">
                훈독
              </div>
              <div className="text-2xl text-[var(--color-text)] font-medium japanese">
                {kanjiInfo.readings.kun.join(', ')}
              </div>
            </div>
          )}

          {/* 부수 */}
          {kanjiInfo.radical && (
            <div className="mb-6">
              <div className="text-sm text-[var(--color-text-lighter)] font-semibold mb-2 uppercase tracking-wider">
                부수
              </div>
              <div className="text-xl text-[var(--color-text)] japanese">
                {kanjiInfo.radical} ({kanjiInfo.radicalName})
              </div>
            </div>
          )}

          <div className="text-sm text-[var(--color-text-lighter)] text-center mt-auto">
            클릭하여 뒤집기 (Space)
          </div>
        </div>
      </motion.div>
    </div>
  );
});
