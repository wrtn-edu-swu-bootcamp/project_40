import { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchStore } from '@/stores/useSearchStore';
import { findKanjiByComponent } from '@/features/kanji/utils/componentAnalyzer';
import { findKanjiByRadical } from '@/features/kanji/utils/radicalAnalyzer';
import { getKanjiFromDictionary } from '@/lib/data/kanji-dictionary';
import type { KanjiInfo } from '@/types/kanji';

interface RelatedKanjiGroupProps {
  component: string;
  isRadical?: boolean;
}

const RelatedKanjiGroup = memo(function RelatedKanjiGroup({
  component,
  isRadical = false,
}: RelatedKanjiGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const relatedKanjiChars = useMemo(() => {
    return isRadical ? findKanjiByRadical(component) : findKanjiByComponent(component);
  }, [component, isRadical]);

  const relatedKanjiInfo = useMemo(() => {
    return relatedKanjiChars
      .map((char) => getKanjiFromDictionary(char))
      .filter((info): info is KanjiInfo => info !== null);
  }, [relatedKanjiChars]);

  const displayedKanji = showAll ? relatedKanjiInfo : relatedKanjiInfo.slice(0, 20);

  const componentInfo = getKanjiFromDictionary(component);
  const componentLabel = isRadical
    ? `부수 "${component}"${componentInfo ? ` (${componentInfo.radicalName})` : ''}`
    : `구성 요소 "${component}"`;

  if (relatedKanjiInfo.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-[var(--shadow-subtle)] overflow-hidden">
      {/* 헤더 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-[var(--color-cream-tint)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-[1.5rem] font-semibold japanese">{component}</span>
          <span className="text-[var(--font-size-body)] text-[var(--color-text)]">
            {componentLabel}를 포함하는 한자
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-[var(--radius-sm)] bg-[var(--color-sky-tint)] text-[var(--color-sky-blue)] text-[var(--font-size-small)] font-semibold">
            {relatedKanjiInfo.length}개
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--color-text-light)] transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 콘텐츠 */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 border-t border-[var(--color-border)]">
              <div className="pt-4 space-y-2">
                {displayedKanji.map((kanji) => (
                  <div
                    key={kanji.character}
                    className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream-tint)] hover:border-[var(--color-sky-blue)] hover:bg-[var(--color-sky-tint)] transition-all"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[1.5rem] font-semibold text-[var(--color-text)] japanese">
                        {kanji.character}
                      </span>
                      <div className="flex gap-2 text-[var(--font-size-small)] text-[var(--color-text-light)]">
                        {kanji.readings.on.length > 0 && (
                          <span className="japanese">{kanji.readings.on.join(', ')}</span>
                        )}
                        {kanji.readings.kun.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="japanese">{kanji.readings.kun[0]}</span>
                          </>
                        )}
                      </div>
                      <span className="ml-auto text-[var(--font-size-small)] text-[var(--color-text)]">
                        {kanji.meanings[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 더보기 버튼 */}
              {relatedKanjiInfo.length > 20 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-4 w-full py-2 text-[var(--font-size-small)] text-[var(--color-sky-blue)] font-semibold hover:bg-[var(--color-sky-tint)] rounded-[var(--radius-md)] transition-colors"
                >
                  {showAll
                    ? '접기'
                    : `더보기 (${relatedKanjiInfo.length - 20}개 더 있음)`}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export const RelatedKanjiSection = memo(function RelatedKanjiSection() {
  const { selectedKanji, selectedComponents } = useSearchStore();

  if (!selectedKanji || selectedComponents.length === 0) {
    return null;
  }

  const kanjiInfo = getKanjiFromDictionary(selectedKanji);

  if (!kanjiInfo) {
    return null;
  }

  // 부수를 먼저, 나머지 구성 요소는 그 다음
  const radical = kanjiInfo.radical;
  const otherComponents = selectedComponents.filter((c) => c !== radical);

  return (
    <div className="space-y-4">
      {/* 부수 그룹 */}
      {radical && <RelatedKanjiGroup component={radical} isRadical={true} />}

      {/* 다른 구성 요소 그룹들 */}
      {otherComponents.map((component) => (
        <RelatedKanjiGroup key={component} component={component} isRadical={false} />
      ))}
    </div>
  );
});
