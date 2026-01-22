import type { ComponentGroup, KanjiInfo } from '@/types/kanji';
import { getMultipleKanjiInfo } from '@/lib/data/sample-kanji';

// 구성 요소 기반 한자 분석
export async function analyzeByComponent(kanjiList: string[]): Promise<ComponentGroup[]> {
  // 한자 정보 조회
  const kanjiInfoList = getMultipleKanjiInfo(kanjiList);
  
  // 모든 구성 요소 수집
  const allComponents = new Set<string>();
  for (const kanjiInfo of kanjiInfoList) {
    for (const component of kanjiInfo.components) {
      allComponents.add(component);
    }
  }
  
  // 각 구성 요소를 포함하는 한자 찾기
  const componentGroups: ComponentGroup[] = [];
  
  for (const component of allComponents) {
    const kanjiWithComponent = kanjiInfoList.filter((k) =>
      k.components.includes(component)
    );
    
    // 2개 이상인 그룹만 추가
    if (kanjiWithComponent.length >= 2) {
      componentGroups.push({
        component,
        kanji: kanjiWithComponent.map((k) => k.character),
        count: kanjiWithComponent.length,
      });
    }
  }
  
  // 개수 내림차순 정렬
  return componentGroups.sort((a, b) => b.count - a.count);
}

// 특정 구성 요소를 포함하는 한자 찾기
export function findKanjiByComponent(kanjiList: string[], component: string): string[] {
  const kanjiInfoList = getMultipleKanjiInfo(kanjiList);
  return kanjiInfoList
    .filter((k) => k.components.includes(component))
    .map((k) => k.character);
}
