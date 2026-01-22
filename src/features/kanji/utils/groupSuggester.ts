import type { GroupSuggestion } from '@/types/group';
import { extractKanji } from './kanjiExtractor';
import { analyzeByRadical, analyzeByRadicalWithExisting } from './radicalAnalyzer';
import { analyzeByComponent, analyzeByComponentWithExisting } from './componentAnalyzer';
import { analyzeByReading, analyzeByReadingWithExisting } from './readingAnalyzer';
import { db } from '@/lib/db/schema';

// 단어에 대한 그룹 추천 생성 (전체 샘플 데이터 기반)
export async function suggestGroups(word: string): Promise<GroupSuggestion[]> {
  // 한자 추출
  const kanjiList = extractKanji(word);
  
  if (kanjiList.length === 0) {
    return []; // 한자가 없으면 빈 배열 반환
  }
  
  const suggestions: GroupSuggestion[] = [];
  
  // 1. 부수 기반 그룹 추천 (전체 샘플 데이터에서 같은 부수를 가진 한자들 찾기)
  const radicalGroups = await analyzeByRadical(kanjiList);
  for (const group of radicalGroups) {
    suggestions.push({
      type: 'radical',
      name: `${group.radical} (${group.radicalName})`,
      criterion: group.radical,
      relatedWords: group.kanji,
      count: group.count,
    });
  }
  
  // 2. 구성 요소 기반 그룹 추천 (전체 샘플 데이터에서 같은 구성 요소를 가진 한자들 찾기)
  const componentGroups = await analyzeByComponent(kanjiList);
  for (const group of componentGroups) {
    suggestions.push({
      type: 'component',
      name: `${group.component} 포함`,
      criterion: group.component,
      relatedWords: group.kanji,
      count: group.count,
    });
  }
  
  // 3. 음독 기반 그룹 추천 (전체 샘플 데이터에서 같은 음독을 가진 한자들 찾기)
  const readingGroups = await analyzeByReading(kanjiList);
  for (const group of readingGroups) {
    suggestions.push({
      type: 'reading',
      name: `${group.reading} 음독`,
      criterion: group.reading,
      relatedWords: group.kanji,
      count: group.count,
    });
  }
  
  // 개수 내림차순 정렬 후 상위 8개만 반환 (더 많은 추천 제공)
  return suggestions
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

// 기존 저장된 북마크들과 함께 그룹 추천 생성
export async function suggestGroupsWithExisting(word: string): Promise<GroupSuggestion[]> {
  // 한자 추출
  const newKanjiList = extractKanji(word);
  
  if (newKanjiList.length === 0) {
    return [];
  }
  
  // DB에서 기존 저장된 모든 북마크 조회
  const existingBookmarks = await db.bookmarks.toArray();
  const existingKanjiList = existingBookmarks.map((b) => b.character);
  
  const suggestions: GroupSuggestion[] = [];
  
  // 1. 부수 기반 그룹 추천 (기존 북마크들의 한자 포함)
  const radicalGroups = await analyzeByRadicalWithExisting(newKanjiList, existingKanjiList);
  for (const group of radicalGroups) {
    suggestions.push({
      type: 'radical',
      name: `${group.radical} (${group.radicalName})`,
      criterion: group.radical,
      relatedWords: group.kanji,
      count: group.count,
    });
  }
  
  // 2. 구성 요소 기반 그룹 추천
  const componentGroups = await analyzeByComponentWithExisting(newKanjiList, existingKanjiList);
  for (const group of componentGroups) {
    suggestions.push({
      type: 'component',
      name: `${group.component} 포함`,
      criterion: group.component,
      relatedWords: group.kanji,
      count: group.count,
    });
  }
  
  // 3. 음독 기반 그룹 추천
  const readingGroups = await analyzeByReadingWithExisting(newKanjiList, existingKanjiList);
  for (const group of readingGroups) {
    suggestions.push({
      type: 'reading',
      name: `${group.reading} 음독`,
      criterion: group.reading,
      relatedWords: group.kanji,
      count: group.count,
    });
  }
  
  // 개수 내림차순 정렬 후 상위 8개만 반환
  return suggestions
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}
