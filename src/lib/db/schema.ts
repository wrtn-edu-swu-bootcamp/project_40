import Dexie, { type EntityTable } from 'dexie';

// 검색 기록 타입
export interface SearchHistory {
  id?: number;
  query: string;
  word: string;
  reading: string;
  searchedAt: Date;
}

// 한자 캐시 타입
export interface KanjiCache {
  character: string; // 기본 키
  components: string[];
  radical: string;
  radicalName: string;
  readings: {
    on: string[];
    kun: string[];
  };
  meanings: string[];
  updatedAt: Date;
}

// Dexie 데이터베이스 클래스
export class AppDatabase extends Dexie {
  // 테이블 정의
  searchHistory!: EntityTable<SearchHistory, 'id'>;
  kanjiCache!: EntityTable<KanjiCache, 'character'>;

  constructor() {
    super('JapaneseKanjiSearchDB');

    // 버전 1 스키마 정의
    this.version(1).stores({
      // searchHistory 테이블
      // id: 자동 증가 기본 키
      // query: 검색어 인덱스
      // searchedAt: 날짜순 정렬용
      searchHistory: '++id, query, word, reading, searchedAt',

      // kanjiCache 테이블
      // character: 한자 문자 (기본 키)
      // updatedAt: 캐시 갱신 시간
      kanjiCache: 'character, updatedAt',
    });
  }
}

// 데이터베이스 인스턴스 생성 및 export
export const db = new AppDatabase();
