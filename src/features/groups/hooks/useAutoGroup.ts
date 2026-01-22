import {
  getGroupByCriterionAndType,
  addGroup as addGroupQuery,
  addKanjiToGroup,
} from '@/lib/db/queries';
import type { Group, GroupType } from '@/types/group';
import { generateUUID } from '@/lib/utils/uuid';

export function useAutoGroup() {
  // 자동으로 그룹에 한자들 저장
  async function autoSaveToGroup(
    component: string,
    kanjiList: string[],
    type: GroupType,
    groupName: string
  ): Promise<Group> {
    // 기존 그룹 확인 (같은 criterion과 type)
    let group = await getGroupByCriterionAndType(component, type);

    if (!group) {
      // 그룹이 없으면 새로 생성
      group = {
        id: generateUUID(),
        type,
        name: groupName,
        criterion: component,
        kanjiCharacters: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addGroupQuery(group);
    }

    // 각 한자를 그룹에 추가 (중복 체크는 addKanjiToGroup에서 처리)
    for (const character of kanjiList) {
      await addKanjiToGroup(group.id, character);
    }

    return group;
  }

  // 부수 기반 자동 그룹 저장
  async function autoSaveRadicalGroup(
    radical: string,
    radicalName: string,
    kanjiList: string[]
  ): Promise<Group> {
    const groupName = `${radical} (${radicalName})`;
    return await autoSaveToGroup(radical, kanjiList, 'radical', groupName);
  }

  // 구성 요소 기반 자동 그룹 저장
  async function autoSaveComponentGroup(
    component: string,
    kanjiList: string[]
  ): Promise<Group> {
    const groupName = `${component} 포함`;
    return await autoSaveToGroup(component, kanjiList, 'component', groupName);
  }

  // 음독 기반 자동 그룹 저장
  async function autoSaveReadingGroup(
    reading: string,
    kanjiList: string[]
  ): Promise<Group> {
    const groupName = `${reading} 음독`;
    return await autoSaveToGroup(reading, kanjiList, 'reading', groupName);
  }

  return {
    autoSaveToGroup,
    autoSaveRadicalGroup,
    autoSaveComponentGroup,
    autoSaveReadingGroup,
  };
}
