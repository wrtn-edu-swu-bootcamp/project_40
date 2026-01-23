import type { KanjiInfo } from './kanji';

// 북마크된 한자
export interface Bookmark {
  id: string; // UUID
  character: string; // 한자 문자 (예: '清')
  kanjiInfo: KanjiInfo; // 한자 정보 (뜻, 음독, 훈독 등)
  sourceWord?: string; // 원본 단어 (예: '清潔')
  createdAt: Date; // 생성일
}

// 북마크 생성 입력 타입
export interface CreateBookmarkInput {
  character: string;
  kanjiInfo: KanjiInfo;
  sourceWord?: string;
}
