import type { ComponentGroup, KanjiInfo } from '@/types/kanji';
import { getMultipleKanjiFromDictionary, getAllKanjiFromDictionary } from '@/lib/data/kanji-dictionary';

// 구성 요소 기반 한자 분석 (전체 한자 사전에서 같은 구성 요소를 가진 한자들을 찾음)
export async function analyzeByComponent(kanjiList: string[]): Promise<ComponentGroup[]> {
  // 입력된 한자들의 정보 조회
  const inputKanjiInfoList = getMultipleKanjiFromDictionary(kanjiList);
  
  if (inputKanjiInfoList.length === 0) {
    return [];
  }
  
  // 전체 한자 사전 가져오기
  const allKanji = getAllKanjiFromDictionary();
  
  // 입력된 한자들의 모든 구성 요소 수집
  const targetComponents = new Set<string>();
  for (const kanjiInfo of inputKanjiInfoList) {
    for (const component of kanjiInfo.components) {
      targetComponents.add(component);
    }
  }
  
  // 각 구성 요소별로 전체 한자 사전에서 해당 구성 요소를 포함하는 한자들을 찾음
  const componentGroups: ComponentGroup[] = [];
  
  for (const component of targetComponents) {
    // 전체 한자 사전에서 같은 구성 요소를 포함하는 한자들 찾기
    const kanjiWithSameComponent = allKanji.filter((k) =>
      k.components.includes(component)
    );
    
    // 해당 구성 요소를 포함하는 한자가 2개 이상이면 그룹 생성
    if (kanjiWithSameComponent.length >= 2) {
      componentGroups.push({
        component,
        kanji: kanjiWithSameComponent.map((k) => k.character),
        count: kanjiWithSameComponent.length,
      });
    }
  }
  
  // 개수 내림차순 정렬
  return componentGroups.sort((a, b) => b.count - a.count);
}

// 특정 구성 요소를 포함하는 한자 찾기 (전체 한자 사전에서)
export function findKanjiByComponent(component: string): string[] {
  const allKanji = getAllKanjiFromDictionary();
  return allKanji
    .filter((k) => k.components.includes(component))
    .map((k) => k.character);
}

// 기존 저장된 단어들과 함께 구성 요소 분석
export async function analyzeByComponentWithExisting(
  newKanjiList: string[],
  existingKanjiList: string[]
): Promise<ComponentGroup[]> {
  // 새 한자와 기존 한자를 합침
  const allKanjiChars = [...new Set([...newKanjiList, ...existingKanjiList])];
  
  // 모든 한자 정보 조회
  const allKanjiInfo = getMultipleKanjiFromDictionary(allKanjiChars);
  
  // 모든 구성 요소 수집
  const allComponents = new Set<string>();
  for (const kanjiInfo of allKanjiInfo) {
    for (const component of kanjiInfo.components) {
      allComponents.add(component);
    }
  }
  
  // 각 구성 요소를 포함하는 한자 찾기
  const componentGroups: ComponentGroup[] = [];
  
  for (const component of allComponents) {
    const kanjiWithComponent = allKanjiInfo.filter((k) =>
      k.components.includes(component)
    );
    
    // 새 한자 중 하나라도 이 구성 요소를 포함하는지 확인
    const newKanjiInGroup = kanjiWithComponent.filter((k) =>
      newKanjiList.includes(k.character)
    );
    
    // 새 한자가 포함되고, 전체 2개 이상인 경우에만 추천
    if (newKanjiInGroup.length > 0 && kanjiWithComponent.length >= 2) {
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
