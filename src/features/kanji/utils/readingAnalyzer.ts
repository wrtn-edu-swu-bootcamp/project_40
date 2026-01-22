import type { ReadingGroup, KanjiInfo } from '@/types/kanji';
import { getMultipleKanjiFromDictionary, getAllKanjiFromDictionary } from '@/lib/data/kanji-dictionary';

// 음독 기반 한자 분석 (전체 한자 사전에서 같은 음독을 가진 한자들을 찾음)
export async function analyzeByReading(kanjiList: string[]): Promise<ReadingGroup[]> {
  // 입력된 한자들의 정보 조회
  const inputKanjiInfoList = getMultipleKanjiFromDictionary(kanjiList);
  
  if (inputKanjiInfoList.length === 0) {
    return [];
  }
  
  // 전체 한자 사전 가져오기
  const allKanji = getAllKanjiFromDictionary();
  
  // 입력된 한자들의 모든 음독 수집
  const targetReadings = new Set<string>();
  for (const kanjiInfo of inputKanjiInfoList) {
    for (const onReading of kanjiInfo.readings.on) {
      targetReadings.add(onReading);
    }
  }
  
  // 각 음독별로 전체 한자 사전에서 해당 음독을 가진 한자들을 찾음
  const readingGroups: ReadingGroup[] = [];
  
  for (const reading of targetReadings) {
    // 전체 한자 사전에서 같은 음독을 가진 한자들 찾기
    const kanjiWithSameReading = allKanji.filter((k) =>
      k.readings.on.includes(reading)
    );
    
    // 해당 음독을 가진 한자가 2개 이상이면 그룹 생성
    if (kanjiWithSameReading.length >= 2) {
      readingGroups.push({
        reading,
        kanji: kanjiWithSameReading.map((k) => k.character),
        count: kanjiWithSameReading.length,
      });
    }
  }
  
  // 개수 내림차순 정렬
  return readingGroups.sort((a, b) => b.count - a.count);
}

// 특정 음독을 가진 한자 찾기 (전체 한자 사전에서)
export function findKanjiByReading(reading: string): string[] {
  const allKanji = getAllKanjiFromDictionary();
  return allKanji
    .filter((k) => k.readings.on.includes(reading))
    .map((k) => k.character);
}

// 기존 저장된 단어들과 함께 음독 분석
export async function analyzeByReadingWithExisting(
  newKanjiList: string[],
  existingKanjiList: string[]
): Promise<ReadingGroup[]> {
  // 새 한자와 기존 한자를 합침
  const allKanjiChars = [...new Set([...newKanjiList, ...existingKanjiList])];
  
  // 모든 한자 정보 조회
  const allKanjiInfo = getMultipleKanjiFromDictionary(allKanjiChars);
  
  // 음독별로 그룹화
  const readingMap = new Map<string, KanjiInfo[]>();
  
  for (const kanjiInfo of allKanjiInfo) {
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
    // 중복 제거
    const uniqueKanji = [...new Set(kanjiInfos.map((k) => k.character))];
    
    // 새 한자 중 하나라도 이 음독을 가지는지 확인
    const newKanjiInfo = getMultipleKanjiFromDictionary(newKanjiList);
    const newKanjiWithReading = newKanjiInfo.filter((k) =>
      k.readings.on.includes(reading)
    );
    
    // 새 한자가 포함되고, 전체 2개 이상인 경우에만 추천
    if (newKanjiWithReading.length > 0 && uniqueKanji.length >= 2) {
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
