// 단어 뜻 (여러 의미를 가질 수 있음)
export interface WordMeaning {
  partOfSpeech: string; // 품사 (명사, 동사, 형용사 등)
  definitions: string[]; // 뜻 리스트
  examples?: string[]; // 예문
}

// 단어 학습 상태
export const STUDY_STATUS = {
  NEW: 'new',
  LEARNING: 'learning',
  MASTERED: 'mastered',
} as const;

export type StudyStatus = typeof STUDY_STATUS[keyof typeof STUDY_STATUS];

// JLPT 레벨
export const JLPT_LEVELS = {
  N5: 'N5',
  N4: 'N4',
  N3: 'N3',
  N2: 'N2',
  N1: 'N1',
} as const;

export type JlptLevel = typeof JLPT_LEVELS[keyof typeof JLPT_LEVELS];

// 단어 인터페이스
export interface Word {
  id: string; // UUID
  word: string; // 단어 (한자 포함) 예: 清潔
  reading: string; // 읽기 (히라가나) 예: せいけつ
  meanings: WordMeaning[]; // 뜻 리스트
  kanji: string[]; // 포함된 한자 배열 예: ['清', '潔']
  jlptLevel?: JlptLevel; // JLPT 레벨
  groupIds: string[]; // 속한 그룹 ID 배열
  studyStatus: StudyStatus; // 학습 상태
  nextReview?: Date; // 다음 복습 날짜
  reviewCount: number; // 복습 횟수
  correctCount: number; // 정답 횟수
  createdAt: Date; // 생성일
  updatedAt: Date; // 수정일
}

// 단어 생성 입력 타입
export interface CreateWordInput {
  word: string;
  reading: string;
  meanings: WordMeaning[];
  jlptLevel?: JlptLevel;
}

// 사전 검색 결과 (API 응답)
export interface DictionaryEntry {
  word: string;
  reading: string;
  meanings: WordMeaning[];
  jlptLevel?: JlptLevel;
}
