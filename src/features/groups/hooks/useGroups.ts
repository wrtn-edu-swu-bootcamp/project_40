import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { db } from '@/lib/db/schema';
import {
  addGroup,
  updateGroup,
  deleteGroup,
  getGroupByCriterionAndType,
  addKanjiToGroup,
} from '@/lib/db/queries';
import type { Group, CreateGroupInput } from '@/types/group';
import { generateUUID } from '@/lib/utils/uuid';

export function useGroups() {
  // Dexie React Hooks로 실시간 쿼리
  const groups = useLiveQuery(
    () => db.groups.orderBy('createdAt').reverse().toArray(),
    []
  );

  const createGroup = useCallback(async (input: CreateGroupInput): Promise<Group> => {
    // 중복 체크 (criterion과 type 모두 확인)
    const existing = await getGroupByCriterionAndType(input.criterion, input.type);
    
    if (existing) {
      // 기존 그룹이 있으면 한자들을 병합
      const mergedKanji = [...new Set([...existing.kanjiCharacters, ...input.kanjiCharacters])];
      await updateGroup(existing.id, {
        kanjiCharacters: mergedKanji,
      });
      
      // 각 한자를 groupKanji 테이블에도 추가
      for (const character of input.kanjiCharacters) {
        await addKanjiToGroup(existing.id, character);
      }
      
      // 업데이트된 그룹 반환
      const updated = await getGroupByCriterionAndType(input.criterion, input.type);
      return updated || existing;
    }

    const now = new Date();
    const newGroup: Group = {
      id: generateUUID(),
      type: input.type,
      name: input.name,
      criterion: input.criterion,
      kanjiCharacters: input.kanjiCharacters,
      createdAt: now,
      updatedAt: now,
    };

    await addGroup(newGroup);
    
    // 각 한자를 groupKanji 테이블에도 추가
    for (const character of input.kanjiCharacters) {
      await addKanjiToGroup(newGroup.id, character);
    }

    return newGroup;
  }, []);

  const removeGroup = useCallback(async (groupId: string) => {
    await deleteGroup(groupId);
  }, []);

  return {
    groups: groups || [],
    isLoading: groups === undefined,
    createGroup,
    removeGroup,
  };
}
