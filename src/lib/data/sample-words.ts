import type { Word, WordMeaning } from '@/types/word';

// MVP용 샘플 단어 데이터 (약 50개)
// 실제로는 JMdict에서 로드하지만, 개발 속도를 위해 하드코딩

export interface DictionaryEntry {
  word: string;
  reading: string;
  meanings: WordMeaning[];
  jlptLevel?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export const SAMPLE_DICTIONARY: DictionaryEntry[] = [
  // N5 레벨 (기초)
  {
    word: '水',
    reading: 'みず',
    meanings: [{ partOfSpeech: '명사', definitions: ['물'] }],
    jlptLevel: 'N5',
  },
  {
    word: '学生',
    reading: 'がくせい',
    meanings: [{ partOfSpeech: '명사', definitions: ['학생'] }],
    jlptLevel: 'N5',
  },
  {
    word: '先生',
    reading: 'せんせい',
    meanings: [{ partOfSpeech: '명사', definitions: ['선생님'] }],
    jlptLevel: 'N5',
  },
  {
    word: '学校',
    reading: 'がっこう',
    meanings: [{ partOfSpeech: '명사', definitions: ['학교'] }],
    jlptLevel: 'N5',
  },
  {
    word: '生活',
    reading: 'せいかつ',
    meanings: [{ partOfSpeech: '명사', definitions: ['생활'] }],
    jlptLevel: 'N5',
  },
  
  // N4 레벨
  {
    word: '清潔',
    reading: 'せいけつ',
    meanings: [{ partOfSpeech: '형용동사', definitions: ['청결한', '깨끗한'] }],
    jlptLevel: 'N4',
  },
  {
    word: '清水',
    reading: 'しみず',
    meanings: [{ partOfSpeech: '명사', definitions: ['맑은 물', '청수'] }],
    jlptLevel: 'N4',
  },
  {
    word: '海水',
    reading: 'かいすい',
    meanings: [{ partOfSpeech: '명사', definitions: ['바닷물', '해수'] }],
    jlptLevel: 'N4',
  },
  {
    word: '河川',
    reading: 'かせん',
    meanings: [{ partOfSpeech: '명사', definitions: ['하천', '강'] }],
    jlptLevel: 'N4',
  },
  {
    word: '湖水',
    reading: 'こすい',
    meanings: [{ partOfSpeech: '명사', definitions: ['호수의 물'] }],
    jlptLevel: 'N4',
  },
  
  // N3 레벨 (청 포함 한자)
  {
    word: '晴天',
    reading: 'せいてん',
    meanings: [{ partOfSpeech: '명사', definitions: ['맑은 날씨', '청천'] }],
    jlptLevel: 'N3',
  },
  {
    word: '晴れ',
    reading: 'はれ',
    meanings: [{ partOfSpeech: '명사', definitions: ['맑음', '개임'] }],
    jlptLevel: 'N3',
  },
  {
    word: '静か',
    reading: 'しずか',
    meanings: [{ partOfSpeech: '형용동사', definitions: ['조용한', '고요한'] }],
    jlptLevel: 'N3',
  },
  {
    word: '請求',
    reading: 'せいきゅう',
    meanings: [{ partOfSpeech: '명사', definitions: ['청구', '요구'] }],
    jlptLevel: 'N3',
  },
  {
    word: '情報',
    reading: 'じょうほう',
    meanings: [{ partOfSpeech: '명사', definitions: ['정보'] }],
    jlptLevel: 'N3',
  },
  
  // N2 레벨 (세이 음독)
  {
    word: '正確',
    reading: 'せいかく',
    meanings: [{ partOfSpeech: '형용동사', definitions: ['정확한'] }],
    jlptLevel: 'N2',
  },
  {
    word: '生産',
    reading: 'せいさん',
    meanings: [{ partOfSpeech: '명사', definitions: ['생산'] }],
    jlptLevel: 'N2',
  },
  {
    word: '成功',
    reading: 'せいこう',
    meanings: [{ partOfSpeech: '명사', definitions: ['성공'] }],
    jlptLevel: 'N2',
  },
  {
    word: '政治',
    reading: 'せいじ',
    meanings: [{ partOfSpeech: '명사', definitions: ['정치'] }],
    jlptLevel: 'N2',
  },
  {
    word: '性格',
    reading: 'せいかく',
    meanings: [{ partOfSpeech: '명사', definitions: ['성격'] }],
    jlptLevel: 'N2',
  },
  
  // 추가 단어들
  {
    word: '池',
    reading: 'いけ',
    meanings: [{ partOfSpeech: '명사', definitions: ['연못'] }],
    jlptLevel: 'N4',
  },
  {
    word: '海',
    reading: 'うみ',
    meanings: [{ partOfSpeech: '명사', definitions: ['바다'] }],
    jlptLevel: 'N5',
  },
  {
    word: '川',
    reading: 'かわ',
    meanings: [{ partOfSpeech: '명사', definitions: ['강'] }],
    jlptLevel: 'N5',
  },
  {
    word: '湖',
    reading: 'みずうみ',
    meanings: [{ partOfSpeech: '명사', definitions: ['호수'] }],
    jlptLevel: 'N4',
  },
  {
    word: '洗濯',
    reading: 'せんたく',
    meanings: [{ partOfSpeech: '명사', definitions: ['세탁', '빨래'] }],
    jlptLevel: 'N4',
  },
  {
    word: '泳ぐ',
    reading: 'およぐ',
    meanings: [{ partOfSpeech: '동사', definitions: ['수영하다', '헤엄치다'] }],
    jlptLevel: 'N4',
  },
  {
    word: '注意',
    reading: 'ちゅうい',
    meanings: [{ partOfSpeech: '명사', definitions: ['주의', '조심'] }],
    jlptLevel: 'N4',
  },
  {
    word: '流れ',
    reading: 'ながれ',
    meanings: [{ partOfSpeech: '명사', definitions: ['흐름', '유동'] }],
    jlptLevel: 'N3',
  },
  {
    word: '温泉',
    reading: 'おんせん',
    meanings: [{ partOfSpeech: '명사', definitions: ['온천'] }],
    jlptLevel: 'N4',
  },
  {
    word: '冷たい',
    reading: 'つめたい',
    meanings: [{ partOfSpeech: '형용사', definitions: ['차가운', '냉담한'] }],
    jlptLevel: 'N5',
  },
];

// 단어 검색 함수 (딕셔너리에서)
export function searchDictionary(query: string): DictionaryEntry[] {
  const normalizedQuery = query.trim();
  
  // #region agent log
  console.log('🔍 [searchDictionary] START', {originalQuery: query, normalizedQuery, dictionarySize: SAMPLE_DICTIONARY.length, hypothesisId: 'A,B,C'});
  // #endregion
  
  if (!normalizedQuery) {
    return [];
  }
  
  const results = SAMPLE_DICTIONARY.filter((entry) => {
    const wordMatch = entry.word.includes(normalizedQuery);
    const readingMatch = entry.reading.includes(normalizedQuery);
    const meaningMatch = entry.meanings.some(m => m.definitions.some(d => d.includes(normalizedQuery)));
    const matches = wordMatch || readingMatch || meaningMatch;
    
    // #region agent log
    if (matches) {
      console.log('✅ [Entry matched]', {word: entry.word, reading: entry.reading, normalizedQuery, wordMatch, readingMatch, meaningMatch, hypothesisId: 'B,D,E'});
    }
    // #endregion
    
    return matches;
  });
  
  // #region agent log
  console.log('🔍 [searchDictionary] END', {normalizedQuery, totalEntries: SAMPLE_DICTIONARY.length, matchedCount: results.length, matchedWords: results.map(r=>r.word), hypothesisId: 'A,E'});
  // #endregion
  
  return results;
}
