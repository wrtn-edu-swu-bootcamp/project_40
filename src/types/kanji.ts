// 한자 읽기 정보
export interface KanjiReading {
  on: string[]; // 음독 (예: セイ, ショウ)
  kun: string[]; // 훈독 (예: きよ.い, きよ.める)
}

// 한자 정보
export interface KanjiInfo {
  id: string; // 한자 문자 자체를 ID로 사용 (예: '清')
  character: string; // 한자 문자 (예: '清')
  radical: string; // 부수 (예: '氵')
  radicalName: string; // 부수 이름 (예: '물 수변')
  strokeCount: number; // 획수
  readings: KanjiReading; // 읽기 정보
  meanings: string[]; // 뜻 (영어)
  components: string[]; // 구성 요소 (예: ['氵', '青'])
  jlptLevel?: string; // JLPT 레벨
  frequency?: number; // 사용 빈도 (낮을수록 자주 사용)
}

// 한자 분석 결과
export interface KanjiAnalysisResult {
  radicalGroups: RadicalGroup[]; // 부수 기반 그룹
  componentGroups: ComponentGroup[]; // 구성 요소 기반 그룹
  readingGroups: ReadingGroup[]; // 음독 기반 그룹
}

// 부수 그룹
export interface RadicalGroup {
  radical: string; // 부수 (예: '氵')
  radicalName: string; // 부수 이름 (예: '물 수변')
  kanji: string[]; // 해당 부수를 가진 한자들
  count: number; // 개수
}

// 구성 요소 그룹
export interface ComponentGroup {
  component: string; // 구성 요소 (예: '青')
  kanji: string[]; // 해당 구성 요소를 포함하는 한자들
  count: number; // 개수
}

// 음독 그룹
export interface ReadingGroup {
  reading: string; // 음독 (예: 'セイ')
  kanji: string[]; // 해당 음독을 가진 한자들
  count: number; // 개수
}
