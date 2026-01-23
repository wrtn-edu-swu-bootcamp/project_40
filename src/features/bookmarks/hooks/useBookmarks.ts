import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db/schema';
import {
  getBookmarkByCharacter,
  isBookmarked,
  addBookmark as addBookmarkQuery,
  deleteBookmark as deleteBookmarkQuery,
  deleteBookmarkByCharacter,
} from '@/lib/db/queries';
import type { Bookmark, CreateBookmarkInput } from '@/types/bookmark';
import type { KanjiInfo } from '@/types/kanji';
import { generateUUID } from '@/lib/utils/uuid';

export function useBookmarks() {
  // 모든 북마크 실시간 조회
  const bookmarks = useLiveQuery(() => db.bookmarks.orderBy('createdAt').reverse().toArray());

  // 북마크 추가
  async function createBookmark(input: CreateBookmarkInput): Promise<Bookmark> {
    // 중복 체크
    const existing = await getBookmarkByCharacter(input.character);
    if (existing) {
      throw new Error('이미 북마크된 한자입니다.');
    }

    const bookmark: Bookmark = {
      id: generateUUID(),
      character: input.character,
      kanjiInfo: input.kanjiInfo,
      sourceWord: input.sourceWord,
      createdAt: new Date(),
    };

    await addBookmarkQuery(bookmark);
    return bookmark;
  }

  // 북마크 삭제
  async function removeBookmark(id: string): Promise<void> {
    await deleteBookmarkQuery(id);
  }

  // 한자 문자로 북마크 삭제
  async function removeBookmarkByCharacter(character: string): Promise<void> {
    await deleteBookmarkByCharacter(character);
  }

  // 북마크 여부 확인
  async function checkIsBookmarked(character: string): Promise<boolean> {
    return await isBookmarked(character);
  }

  // 북마크 토글 (추가/삭제)
  async function toggleBookmark(
    character: string,
    kanjiInfo: KanjiInfo,
    sourceWord?: string
  ): Promise<boolean> {
    const existing = await getBookmarkByCharacter(character);
    
    if (existing) {
      // 이미 존재하면 삭제
      await removeBookmark(existing.id);
      return false; // 삭제됨
    } else {
      // 존재하지 않으면 추가
      await createBookmark({ character, kanjiInfo, sourceWord });
      return true; // 추가됨
    }
  }

  return {
    bookmarks: bookmarks || [],
    isLoading: bookmarks === undefined,
    createBookmark,
    removeBookmark,
    removeBookmarkByCharacter,
    checkIsBookmarked,
    toggleBookmark,
    getBookmarkByCharacter,
  };
}
