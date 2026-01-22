import type { GroupSuggestion } from '@/types/group';
import { extractKanji } from './kanjiExtractor';
import { analyzeByRadical } from './radicalAnalyzer';
import { analyzeByComponent } from './componentAnalyzer';
import { analyzeByReading } from './readingAnalyzer';

// 단어에 대한 그룹 추천 생성
export async function suggestGroups(word: string): Promise<GroupSuggestion[]> {
  // 한자 추출
  const kanjiList = extractKanji(word);
  
  if (kanjiList.length === 0) {
    return []; // 한자가 없으면 빈 배열 반환
  }
  
  const suggestions: GroupSuggestion[] = [];
  
  // 1. 부수 기반 그룹 추천
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
  
  // 2. 구성 요소 기반 그룹 추천
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
  
  // 3. 음독 기반 그룹 추천
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
  
  // 개수 내림차순 정렬 후 상위 5개만 반환
  return suggestions
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
