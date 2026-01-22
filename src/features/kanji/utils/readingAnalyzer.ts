import type { ReadingGroup, KanjiInfo } from '@/types/kanji';
import { getMultipleKanjiInfo } from '@/lib/data/sample-kanji';

// 음독 기반 한자 분석
export async function analyzeByReading(kanjiList: string[]): Promise<ReadingGroup[]> {
  // 한자 정보 조회
  const kanjiInfoList = getMultipleKanjiInfo(kanjiList);
  
  // 음독별로 그룹화
  const readingMap = new Map<string, KanjiInfo[]>();
  
  for (const kanjiInfo of kanjiInfoList) {
    for (const onReading of kanjiInfo.readings.on) {
      if (!readingMap.has(onReading)) {
        readingMap.set(onReading, []);
      }
      readingMap.get(onReading)!.push(kanjiInfo);
    }
  }
  
  // ReadingGroup 형태로 변환 (2개 이상인 그룹만)
  const readingGroups: ReadingGroup[] = [];
  
  for (const [reading, kanjiInfos] of readingMap.entries()) {
    // 중복 제거 (한 한자가 여러 음독을 가질 수 있음)
    const uniqueKanji = [...new Set(kanjiInfos.map((k) => k.character))];
    
    if (uniqueKanji.length >= 2) {
      readingGroups.push({
        reading,
        kanji: uniqueKanji,
        count: uniqueKanji.length,
      });
    }
  }
  
  // 개수 내림차순 정렬
  return readingGroups.sort((a, b) => b.count - a.count);
}

// 특정 음독을 가진 한자 찾기
export function findKanjiByReading(kanjiList: string[], reading: string): string[] {
  const kanjiInfoList = getMultipleKanjiInfo(kanjiList);
  return kanjiInfoList
    .filter((k) => k.readings.on.includes(reading))
    .map((k) => k.character);
}
