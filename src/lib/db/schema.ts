import Dexie, { type EntityTable } from 'dexie';
import type { Word } from '@/types/word';
import type { KanjiInfo } from '@/types/kanji';
import type { Group } from '@/types/group';

// Dexie 데이터베이스 클래스
export class AppDatabase extends Dexie {
  // 테이블 정의
  words!: EntityTable<Word, 'id'>;
  kanjiInfo!: EntityTable<KanjiInfo, 'id'>;
  groups!: EntityTable<Group, 'id'>;

  constructor() {
    super('JapaneseVocabDB');

    // 버전 1 스키마 정의
    this.version(1).stores({
      // words 테이블
      // id: 기본 키
      // word: 단어 검색용 인덱스
      // *kanji: 한자 배열 (multi-entry 인덱스)
      // *groupIds: 그룹 ID 배열 (multi-entry 인덱스)
      // studyStatus: 학습 상태별 필터링용
      // nextReview: 복습 스케줄 조회용
      words: 'id, word, reading, *kanji, *groupIds, studyStatus, nextReview, createdAt',

      // kanjiInfo 테이블
      // id: 한자 문자 자체 (기본 키)
      // character: 한자 검색용
      // radical: 부수별 그룹화용
      // *readings.on: 음독 배열 (multi-entry 인덱스)
      kanjiInfo: 'id, character, radical, *readings.on, jlptLevel',

      // groups 테이블
      // id: 기본 키
      // type: 그룹 타입별 필터링용
      // criterion: 그룹화 기준 (부수/구성요소/음독)
      groups: 'id, type, criterion, createdAt',
    });
  }
}

// 데이터베이스 인스턴스 생성 및 export
export const db = new AppDatabase();
