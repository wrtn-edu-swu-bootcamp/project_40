import type { RadicalGroup, KanjiInfo } from '@/types/kanji';
import { getMultipleKanjiInfo } from '@/lib/data/sample-kanji';

// 부수 기반 한자 분석
export async function analyzeByRadical(kanjiList: string[]): Promise<RadicalGroup[]> {
  // 한자 정보 조회
  const kanjiInfoList = getMultipleKanjiInfo(kanjiList);
  
  // 부수별로 그룹화
  const radicalMap = new Map<string, KanjiInfo[]>();
  
  for (const kanjiInfo of kanjiInfoList) {
    const radical = kanjiInfo.radical;
    if (!radicalMap.has(radical)) {
      radicalMap.set(radical, []);
    }
    radicalMap.get(radical)!.push(kanjiInfo);
  }
  
  // RadicalGroup 형태로 변환 (2개 이상인 그룹만)
  const radicalGroups: RadicalGroup[] = [];
  
  for (const [radical, kanjiInfos] of radicalMap.entries()) {
    if (kanjiInfos.length >= 2) {
      radicalGroups.push({
        radical,
        radicalName: kanjiInfos[0].radicalName,
        kanji: kanjiInfos.map((k) => k.character),
        count: kanjiInfos.length,
      });
    }
  }
  
  // 개수 내림차순 정렬
  return radicalGroups.sort((a, b) => b.count - a.count);
}

// 특정 부수를 가진 한자 찾기
export function findKanjiByRadical(kanjiList: string[], radical: string): string[] {
  const kanjiInfoList = getMultipleKanjiInfo(kanjiList);
  return kanjiInfoList
    .filter((k) => k.radical === radical)
    .map((k) => k.character);
}
