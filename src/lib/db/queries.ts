import { db, type SearchHistory, type KanjiCache } from './schema';

// ===== SearchHistory 쿼리 =====

// 최근 검색 기록 조회 (최대 20개)
export async function getRecentSearchHistory(limit: number = 20): Promise<SearchHistory[]> {
  return await db.searchHistory.orderBy('searchedAt').reverse().limit(limit).toArray();
}

// 검색 기록 추가
export async function addSearchHistory(
  query: string,
  word: string,
  reading: string
): Promise<number | undefined> {
  return await db.searchHistory.add({
    query,
    word,
    reading,
    searchedAt: new Date(),
  });
}

// 검색 기록 삭제 (오래된 항목)
export async function clearOldSearchHistory(keepCount: number = 50): Promise<void> {
  const allHistory = await db.searchHistory.orderBy('searchedAt').reverse().toArray();
  
  if (allHistory.length > keepCount) {
    const idsToDelete = allHistory.slice(keepCount).map((h) => h.id).filter((id): id is number => id !== undefined);
    await db.searchHistory.bulkDelete(idsToDelete);
  }
}

// ===== KanjiCache 쿼리 =====

// 한자 캐시 조회
export async function getKanjiCache(character: string): Promise<KanjiCache | undefined> {
  return await db.kanjiCache.get(character);
}

// 한자 캐시 추가/업데이트
export async function setKanjiCache(cache: KanjiCache): Promise<string> {
  return await db.kanjiCache.put({
    ...cache,
    updatedAt: new Date(),
  });
}

// 여러 한자 캐시 조회
export async function getMultipleKanjiCache(characters: string[]): Promise<KanjiCache[]> {
  return await db.kanjiCache.bulkGet(characters).then((results) => 
    results.filter((r): r is KanjiCache => r !== undefined)
  );
}

// 오래된 캐시 삭제 (30일 이상)
export async function clearOldKanjiCache(): Promise<void> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const oldCaches = await db.kanjiCache
    .where('updatedAt')
    .below(thirtyDaysAgo)
    .toArray();
  
  const keysToDelete = oldCaches.map((c) => c.character);
  await db.kanjiCache.bulkDelete(keysToDelete);
}
