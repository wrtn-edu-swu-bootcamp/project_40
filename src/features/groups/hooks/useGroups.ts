import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { db } from '@/lib/db/schema';
import { addGroup, updateGroup, deleteGroup, getGroupByCriterion } from '@/lib/db/queries';
import type { Group, CreateGroupInput } from '@/types/group';
import { generateUUID } from '@/lib/utils/uuid';

export function useGroups() {
  // Dexie React Hooks로 실시간 쿼리
  const groups = useLiveQuery(
    () => db.groups.orderBy('createdAt').reverse().toArray(),
    []
  );
  
  const createGroup = useCallback(async (input: CreateGroupInput): Promise<Group> => {
    // 중복 체크
    const existing = await getGroupByCriterion(input.criterion);
    if (existing) {
      // 기존 그룹이 있으면 wordIds를 병합
      const mergedWordIds = [...new Set([...existing.wordIds, ...input.wordIds])];
      await updateGroup(existing.id, {
        wordIds: mergedWordIds,
      });
      // 업데이트된 그룹 반환
      const updated = await getGroupByCriterion(input.criterion);
      return updated || existing;
    }
    
    const now = new Date();
    const newGroup: Group = {
      id: generateUUID(),
      type: input.type,
      name: input.name,
      criterion: input.criterion,
      wordIds: input.wordIds,
      createdAt: now,
      updatedAt: now,
    };
    
    await addGroup(newGroup);
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
