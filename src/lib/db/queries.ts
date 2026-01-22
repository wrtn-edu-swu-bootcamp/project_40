import { db } from './schema';
import type { Bookmark } from '@/types/bookmark';
import type { Group, GroupKanji, GroupType } from '@/types/group';

// ===== Bookmark 쿼리 =====

// 모든 북마크 조회 (최신순)
export async function getAllBookmarks(): Promise<Bookmark[]> {
  return await db.bookmarks.orderBy('createdAt').reverse().toArray();
}

// ID로 북마크 조회
export async function getBookmarkById(id: string): Promise<Bookmark | undefined> {
  return await db.bookmarks.get(id);
}

// 한자 문자로 북마크 조회 (중복 체크용)
export async function getBookmarkByCharacter(character: string): Promise<Bookmark | undefined> {
  return await db.bookmarks.where('character').equals(character).first();
}

// 북마크 여부 확인
export async function isBookmarked(character: string): Promise<boolean> {
  const bookmark = await getBookmarkByCharacter(character);
  return bookmark !== undefined;
}

// 북마크 추가
export async function addBookmark(bookmark: Bookmark): Promise<string> {
  // 중복 체크
  const existing = await getBookmarkByCharacter(bookmark.character);
  if (existing) {
    throw new Error('이미 북마크된 한자입니다.');
  }
  return await db.bookmarks.add(bookmark);
}

// 북마크 삭제
export async function deleteBookmark(id: string): Promise<void> {
  await db.bookmarks.delete(id);
}

// 한자 문자로 북마크 삭제
export async function deleteBookmarkByCharacter(character: string): Promise<void> {
  const bookmark = await getBookmarkByCharacter(character);
  if (bookmark) {
    await db.bookmarks.delete(bookmark.id);
  }
}

// ===== Group 쿼리 =====

// 모든 그룹 조회 (최신순)
export async function getAllGroups(): Promise<Group[]> {
  return await db.groups.orderBy('createdAt').reverse().toArray();
}

// ID로 그룹 조회
export async function getGroupById(id: string): Promise<Group | undefined> {
  return await db.groups.get(id);
}

// 타입별 그룹 조회
export async function getGroupsByType(type: GroupType): Promise<Group[]> {
  return await db.groups.where('type').equals(type).toArray();
}

// 기준으로 그룹 조회 (중복 방지용)
export async function getGroupByCriterion(criterion: string): Promise<Group | undefined> {
  return await db.groups.where('criterion').equals(criterion).first();
}

// 기준과 타입으로 그룹 조회 (더 정확한 중복 체크)
export async function getGroupByCriterionAndType(
  criterion: string,
  type: GroupType
): Promise<Group | undefined> {
  return await db.groups
    .where('criterion')
    .equals(criterion)
    .and((group) => group.type === type)
    .first();
}

// 그룹 추가
export async function addGroup(group: Group): Promise<string> {
  return await db.groups.add(group);
}

// 그룹 업데이트
export async function updateGroup(id: string, changes: Partial<Group>): Promise<number> {
  return await db.groups.update(id, {
    ...changes,
    updatedAt: new Date(),
  });
}

// 그룹에 한자 추가
export async function addKanjiToGroup(groupId: string, character: string): Promise<void> {
  const group = await getGroupById(groupId);
  if (group && !group.kanjiCharacters.includes(character)) {
    await updateGroup(groupId, {
      kanjiCharacters: [...group.kanjiCharacters, character],
    });
    
    // groupKanji 테이블에도 추가
    await db.groupKanji.add({
      id: `${groupId}-${character}`,
      groupId,
      character,
      createdAt: new Date(),
    });
  }
}

// 그룹에서 한자 제거
export async function removeKanjiFromGroup(groupId: string, character: string): Promise<void> {
  const group = await getGroupById(groupId);
  if (group) {
    await updateGroup(groupId, {
      kanjiCharacters: group.kanjiCharacters.filter((c) => c !== character),
    });
    
    // groupKanji 테이블에서도 제거
    await db.groupKanji.where({ groupId, character }).delete();
  }
}

// 그룹 삭제
export async function deleteGroup(id: string): Promise<void> {
  await db.groups.delete(id);
  // 관련 groupKanji 레코드도 삭제
  await db.groupKanji.where('groupId').equals(id).delete();
}

// ===== GroupKanji 쿼리 =====

// 그룹의 모든 한자 조회
export async function getKanjiByGroupId(groupId: string): Promise<GroupKanji[]> {
  return await db.groupKanji.where('groupId').equals(groupId).toArray();
}

// 한자가 속한 모든 그룹 조회
export async function getGroupsByKanji(character: string): Promise<Group[]> {
  const groupKanjiList = await db.groupKanji.where('character').equals(character).toArray();
  const groupIds = groupKanjiList.map((gk) => gk.groupId);
  
  if (groupIds.length === 0) {
    return [];
  }
  
  return await db.groups.where('id').anyOf(groupIds).toArray();
}

// ===== 통계 쿼리 =====

// 전체 북마크 수
export async function getTotalBookmarkCount(): Promise<number> {
  return await db.bookmarks.count();
}

// 전체 그룹 수
export async function getTotalGroupCount(): Promise<number> {
  return await db.groups.count();
}

// 타입별 그룹 수
export async function getGroupCountByType(type: GroupType): Promise<number> {
  return await db.groups.where('type').equals(type).count();
}
