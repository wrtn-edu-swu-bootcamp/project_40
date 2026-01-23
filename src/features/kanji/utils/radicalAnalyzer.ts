import type { RadicalGroup, KanjiInfo } from '@/types/kanji';
import { getMultipleKanjiFromDictionary, getAllKanjiFromDictionary } from '@/lib/data/kanji-dictionary';

// 부수 기반 한자 분석 (전체 한자 사전에서 같은 부수를 가진 한자들을 찾음)
export async function analyzeByRadical(kanjiList: string[]): Promise<RadicalGroup[]> {
  // 입력된 한자들의 정보 조회
  const inputKanjiInfoList = getMultipleKanjiFromDictionary(kanjiList);
  
  if (inputKanjiInfoList.length === 0) {
    return [];
  }
  
  // 전체 한자 사전 가져오기
  const allKanji = getAllKanjiFromDictionary();
  
  // 입력된 한자들의 부수 수집
  const targetRadicals = new Set<string>();
  for (const kanjiInfo of inputKanjiInfoList) {
    targetRadicals.add(kanjiInfo.radical);
  }
  
  // 각 부수별로 전체 한자 사전에서 해당 부수를 가진 한자들을 찾음
  const radicalGroups: RadicalGroup[] = [];
  
  for (const radical of targetRadicals) {
    // 전체 한자 사전에서 같은 부수를 가진 한자들 찾기
    const kanjiWithSameRadical = allKanji.filter(
      (k) => k.radical === radical
    );
    
    // 해당 부수를 가진 한자가 1개 이상이면 그룹 생성
    if (kanjiWithSameRadical.length >= 1) {
      radicalGroups.push({
        radical,
        radicalName: kanjiWithSameRadical[0].radicalName,
        kanji: kanjiWithSameRadical.map((k) => k.character),
        count: kanjiWithSameRadical.length,
      });
    }
  }
  
  // 개수 내림차순 정렬
  return radicalGroups.sort((a, b) => b.count - a.count);
}

// 특정 부수를 가진 한자 찾기 (전체 한자 사전에서)
export function findKanjiByRadical(radical: string): string[] {
  const allKanji = getAllKanjiFromDictionary();
  return allKanji
    .filter((k) => k.radical === radical)
    .map((k) => k.character);
}

// 기존 저장된 단어들과 함께 부수 분석
export async function analyzeByRadicalWithExisting(
  newKanjiList: string[],
  existingKanjiList: string[]
): Promise<RadicalGroup[]> {
  // 새 한자와 기존 한자를 합침
  const allKanjiChars = [...new Set([...newKanjiList, ...existingKanjiList])];
  
  // 모든 한자 정보 조회
  const allKanjiInfo = getMultipleKanjiFromDictionary(allKanjiChars);
  
  // 부수별로 그룹화
  const radicalMap = new Map<string, KanjiInfo[]>();
  
  for (const kanjiInfo of allKanjiInfo) {
    const radical = kanjiInfo.radical;
    if (!radicalMap.has(radical)) {
      radicalMap.set(radical, []);
    }
    radicalMap.get(radical)!.push(kanjiInfo);
  }
  
  // RadicalGroup 형태로 변환 (2개 이상인 그룹만)
  const radicalGroups: RadicalGroup[] = [];
  
  for (const [radical, kanjiInfos] of radicalMap.entries()) {
    // 새 한자 중 하나라도 이 부수에 속하는지 확인
    const newKanjiInGroup = kanjiInfos.filter((k) => 
      newKanjiList.includes(k.character)
    );
    
    // 새 한자가 포함되고, 전체 2개 이상인 경우에만 추천
    if (newKanjiInGroup.length > 0 && kanjiInfos.length >= 2) {
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
