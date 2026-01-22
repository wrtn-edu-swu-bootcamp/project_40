import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchStore } from '@/stores/useSearchStore';
import { getKanjiFromDictionary } from '@/lib/data/kanji-dictionary';
import type { KanjiInfo } from '@/types/kanji';

export const KanjiDetailSection = memo(function KanjiDetailSection() {
  const { selectedKanji, setSelectedComponents } = useSearchStore();
  const [kanjiInfo, setKanjiInfo] = useState<KanjiInfo | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (selectedKanji) {
      const info = getKanjiFromDictionary(selectedKanji);
      setKanjiInfo(info || null);
      setIsExpanded(true);

      // 구성 요소 설정 (부수 + 다른 구성 요소들)
      if (info) {
        const components = [info.radical, ...info.components.filter((c) => c !== info.radical)];
        setSelectedComponents(components);
      }
    } else {
      setKanjiInfo(null);
      setSelectedComponents([]);
    }
  }, [selectedKanji, setSelectedComponents]);

  if (!selectedKanji || !kanjiInfo) {
    return null;
  }

  return (
    <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-[var(--shadow-subtle)] overflow-hidden">
      {/* 헤더 (클릭 가능) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-[var(--color-cream-tint)] transition-colors"
      >
        <div className="flex items-baseline gap-3">
          <span className="text-[2rem] font-semibold text-[var(--color-text)] japanese">
            {kanjiInfo.character}
          </span>
          <div className="flex gap-2 text-[var(--font-size-body)] text-[var(--color-text-light)]">
            {kanjiInfo.readings.kun.length > 0 && (
              <span className="japanese">{kanjiInfo.readings.kun[0]}</span>
            )}
            {kanjiInfo.readings.on.length > 0 && (
              <>
                <span>•</span>
                <span className="japanese">{kanjiInfo.readings.on.join(', ')}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[var(--color-text-light)]">
          <span className="text-[var(--font-size-small)]">
            {isExpanded ? '접기' : '펼치기'}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* 콘텐츠 (애니메이션) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 space-y-4 border-t border-[var(--color-border)]">
              {/* 뜻 */}
              <div className="pt-4">
                <h4 className="text-[var(--font-size-small)] font-semibold text-[var(--color-text-light)] mb-2">
                  의미
                </h4>
                <p className="text-[var(--font-size-body)] text-[var(--color-text)]">
                  {kanjiInfo.meanings.join(', ')}
                </p>
              </div>

              {/* 부수 */}
              <div>
                <h4 className="text-[var(--font-size-small)] font-semibold text-[var(--color-text-light)] mb-2">
                  부수 (Radical)
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-[1.5rem] font-semibold text-[var(--color-sky-blue)] japanese">
                    {kanjiInfo.radical}
                  </span>
                  <span className="text-[var(--font-size-body)] text-[var(--color-text)]">
                    {kanjiInfo.radicalName}
                  </span>
                </div>
              </div>

              {/* 구성 요소 */}
              {kanjiInfo.components.length > 0 && (
                <div>
                  <h4 className="text-[var(--font-size-small)] font-semibold text-[var(--color-text-light)] mb-2">
                    구성 요소
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {kanjiInfo.components.map((component, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream-tint)]"
                      >
                        <span className="text-[1.125rem] font-medium japanese">{component}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 획수 */}
              <div className="flex gap-6 text-[var(--font-size-small)] text-[var(--color-text-light)]">
                <div>
                  <span className="font-semibold">획수:</span> {kanjiInfo.strokeCount}획
                </div>
                {kanjiInfo.jlptLevel && (
                  <div>
                    <span className="font-semibold">JLPT:</span> {kanjiInfo.jlptLevel}
                  </div>
                )}
              </div>

              {/* 읽기 상세 */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--color-border)]">
                <div>
                  <h5 className="text-[var(--font-size-small)] font-semibold text-[var(--color-text-light)] mb-1">
                    음독 (ON)
                  </h5>
                  <p className="text-[var(--font-size-body)] text-[var(--color-text)] japanese">
                    {kanjiInfo.readings.on.join(', ') || '-'}
                  </p>
                </div>
                <div>
                  <h5 className="text-[var(--font-size-small)] font-semibold text-[var(--color-text-light)] mb-1">
                    훈독 (KUN)
                  </h5>
                  <p className="text-[var(--font-size-body)] text-[var(--color-text)] japanese">
                    {kanjiInfo.readings.kun.join(', ') || '-'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
