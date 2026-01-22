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
      return existing;
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
