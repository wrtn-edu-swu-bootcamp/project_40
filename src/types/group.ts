// 그룹 타입
export const GROUP_TYPE = {
  RADICAL: 'radical', // 부수 기반
  COMPONENT: 'component', // 구성 요소 기반
  READING: 'reading', // 음독 기반
  CUSTOM: 'custom', // 사용자 정의
} as const;

export type GroupType = typeof GROUP_TYPE[keyof typeof GROUP_TYPE];

// 한자 그룹
export interface Group {
  id: string; // UUID
  type: GroupType; // 그룹 타입
  name: string; // 그룹 이름 (예: '氵(물 수변)', '青 포함', 'セイ 음독')
  criterion: string; // 그룹화 기준 (부수/구성요소/음독 문자)
  wordIds: string[]; // 포함된 단어 ID 배열
  createdAt: Date; // 생성일
  updatedAt: Date; // 수정일
}

// 그룹 생성 입력 타입
export interface CreateGroupInput {
  type: GroupType;
  name: string;
  criterion: string;
  wordIds: string[];
}

// 그룹 추천 결과
export interface GroupSuggestion {
  type: GroupType;
  name: string;
  criterion: string;
  relatedWords: string[]; // 관련된 단어들 (단어 문자열)
  count: number; // 관련 단어 개수
}
