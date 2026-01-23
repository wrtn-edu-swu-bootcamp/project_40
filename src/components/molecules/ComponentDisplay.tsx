import { memo } from 'react';
import { cn } from '@/lib/utils/cn';
import type { KanjiInfo } from '@/types/kanji';

export interface ComponentDisplayProps {
  components: KanjiInfo[];
  onComponentClick?: (character: string) => void;
  className?: string;
}

export const ComponentDisplay = memo(function ComponentDisplay({
  components,
  onComponentClick,
  className,
}: ComponentDisplayProps) {
  if (components.length === 0) {
    return (
      <div className={cn('text-[var(--color-text-light)] text-center py-4', className)}>
        구성 요소 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {components.map((component, index) => (
        <button
          key={`${component.character}-${index}`}
          onClick={() => onComponentClick?.(component.character)}
          className={cn(
            'w-full p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream-tint)] text-left transition-all duration-150',
            onComponentClick &&
              'cursor-pointer hover:border-[var(--color-sky-blue)] hover:shadow-[var(--shadow-subtle)] hover:bg-white'
          )}
        >
          <div className="flex items-start gap-4">
            {/* 한자 문자 */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 flex items-center justify-center rounded-[var(--radius-md)] bg-white border border-[var(--color-border)]">
                <span className="text-[2rem] font-bold text-[var(--color-text)] japanese">
                  {component.character}
                </span>
              </div>
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              {/* 부수 이름 */}
              {component.radicalName && (
                <div className="mb-2">
                  <span className="text-[var(--font-size-small)] font-semibold text-[var(--color-text)]">
                    {component.radicalName}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-2">
                {/* 뜻 */}
                <div>
                  <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] font-semibold uppercase tracking-wider">
                    뜻:{' '}
                  </span>
                  <span className="text-[var(--font-size-small)] text-[var(--color-text)]">
                    {component.meanings && component.meanings.length > 0
                      ? component.meanings.join(', ')
                      : '-'}
                  </span>
                </div>

                {/* 음독 */}
                <div>
                  <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] font-semibold uppercase tracking-wider">
                    음독:{' '}
                  </span>
                  <span className="text-[var(--font-size-small)] text-[var(--color-text)] japanese">
                    {component.readings.on && component.readings.on.length > 0
                      ? component.readings.on.join(', ')
                      : '-'}
                  </span>
                </div>

                {/* 훈독 */}
                <div>
                  <span className="text-[var(--font-size-tiny)] text-[var(--color-text-lighter)] font-semibold uppercase tracking-wider">
                    훈독:{' '}
                  </span>
                  <span className="text-[var(--font-size-small)] text-[var(--color-text)] japanese">
                    {component.readings.kun && component.readings.kun.length > 0
                      ? component.readings.kun.join(', ')
                      : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
});
