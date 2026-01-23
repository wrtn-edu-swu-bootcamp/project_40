import Dexie, { type EntityTable } from 'dexie';
import type { Bookmark } from '@/types/bookmark';
import type { Group, GroupKanji } from '@/types/group';

// Dexie 데이터베이스 클래스
export class AppDatabase extends Dexie {
  // 테이블 정의
  bookmarks!: EntityTable<Bookmark, 'id'>;
  groups!: EntityTable<Group, 'id'>;
  groupKanji!: EntityTable<GroupKanji, 'id'>;

  constructor() {
    super('JapaneseVocabDB');

    // 버전 2 스키마 정의 (새로운 구조)
    this.version(2).stores({
      // bookmarks 테이블
      // id: 기본 키
      // character: 한자 문자 (중복 체크용)
      // sourceWord: 원본 단어
      // createdAt: 생성일
      bookmarks: 'id, character, sourceWord, createdAt',

      // groups 테이블
      // id: 기본 키
      // type: 그룹 타입별 필터링용
      // criterion: 그룹화 기준 (부수/구성요소/음독)
      // *kanjiCharacters: 한자 문자 배열 (multi-entry 인덱스)
      groups: 'id, type, criterion, *kanjiCharacters, createdAt',

      // groupKanji 테이블 (그룹-한자 관계)
      // id: 기본 키
      // groupId: 그룹 ID
      // character: 한자 문자
      groupKanji: 'id, groupId, character, createdAt',
    });
  }
}

// 데이터베이스 인스턴스 생성 및 export
export const db = new AppDatabase();
