import { db } from './schema';
import type { Word, StudyStatus } from '@/types/word';
import type { Group, GroupType } from '@/types/group';
import type { KanjiInfo } from '@/types/kanji';

// ===== Word 쿼리 =====

// 모든 단어 조회 (최신순)
export async function getAllWords(): Promise<Word[]> {
  return await db.words.orderBy('createdAt').reverse().toArray();
}

// ID로 단어 조회
export async function getWordById(id: string): Promise<Word | undefined> {
  return await db.words.get(id);
}

// 단어 검색 (단어 또는 읽기로)
export async function searchWords(query: string): Promise<Word[]> {
  const normalizedQuery = query.toLowerCase();
  
  return await db.words
    .filter((word) => {
      return (
        word.word.toLowerCase().includes(normalizedQuery) ||
        word.reading.toLowerCase().includes(normalizedQuery)
      );
    })
    .toArray();
}

// 학습 상태별 단어 조회
export async function getWordsByStatus(status: StudyStatus): Promise<Word[]> {
  return await db.words.where('studyStatus').equals(status).toArray();
}

// 특정 한자를 포함하는 단어 조회
export async function getWordsByKanji(kanji: string): Promise<Word[]> {
  return await db.words.where('kanji').equals(kanji).toArray();
}

// 복습 대기 단어 조회 (오늘 날짜 기준)
export async function getWordsForReview(): Promise<Word[]> {
  const today = new Date();
  today.setHours(23, 59, 59, 999); // 오늘 끝까지
  
  return await db.words
    .where('nextReview')
    .belowOrEqual(today)
    .and((word) => word.studyStatus !== 'mastered')
    .toArray();
}

// 단어 추가
export async function addWord(word: Word): Promise<string> {
  return await db.words.add(word);
}

// 단어 업데이트
export async function updateWord(id: string, changes: Partial<Word>): Promise<number> {
  return await db.words.update(id, {
    ...changes,
    updatedAt: new Date(),
  });
}

// 단어 삭제
export async function deleteWord(id: string): Promise<void> {
  await db.words.delete(id);
}

// ===== KanjiInfo 쿼리 =====

// 한자 정보 조회
export async function getKanjiInfo(character: string): Promise<KanjiInfo | undefined> {
  return await db.kanjiInfo.get(character);
}

// 여러 한자 정보 조회
export async function getMultipleKanjiInfo(characters: string[]): Promise<KanjiInfo[]> {
  return await db.kanjiInfo.where('id').anyOf(characters).toArray();
}

// 부수별 한자 조회
export async function getKanjiByRadical(radical: string): Promise<KanjiInfo[]> {
  return await db.kanjiInfo.where('radical').equals(radical).toArray();
}

// 음독별 한자 조회
export async function getKanjiByReading(reading: string): Promise<KanjiInfo[]> {
  return await db.kanjiInfo.where('readings.on').equals(reading).toArray();
}

// 한자 정보 추가
export async function addKanjiInfo(kanjiInfo: KanjiInfo): Promise<string> {
  return await db.kanjiInfo.add(kanjiInfo);
}

// 한자 정보 일괄 추가
export async function bulkAddKanjiInfo(kanjiInfoList: KanjiInfo[]): Promise<string> {
  return await db.kanjiInfo.bulkAdd(kanjiInfoList, { allKeys: true }) as unknown as string;
}

// ===== Group 쿼리 =====

// 모든 그룹 조회
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

// 그룹에 단어 추가
export async function addWordToGroup(groupId: string, wordId: string): Promise<void> {
  const group = await getGroupById(groupId);
  if (group && !group.wordIds.includes(wordId)) {
    await updateGroup(groupId, {
      wordIds: [...group.wordIds, wordId],
    });
  }
}

// 그룹에서 단어 제거
export async function removeWordFromGroup(groupId: string, wordId: string): Promise<void> {
  const group = await getGroupById(groupId);
  if (group) {
    await updateGroup(groupId, {
      wordIds: group.wordIds.filter((id) => id !== wordId),
    });
  }
}

// 그룹 삭제
export async function deleteGroup(id: string): Promise<void> {
  await db.groups.delete(id);
}

// ===== 통계 쿼리 =====

// 전체 단어 수
export async function getTotalWordCount(): Promise<number> {
  return await db.words.count();
}

// 학습 상태별 단어 수
export async function getWordCountByStatus(status: StudyStatus): Promise<number> {
  return await db.words.where('studyStatus').equals(status).count();
}

// 오늘 복습할 단어 수
export async function getTodayReviewCount(): Promise<number> {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  return await db.words
    .where('nextReview')
    .belowOrEqual(today)
    .and((word) => word.studyStatus !== 'mastered')
    .count();
}
