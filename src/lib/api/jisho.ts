import type { DictionaryEntry, WordMeaning } from '@/types/word';

// Jisho.org API 응답 타입
interface JishoApiResponse {
  meta: {
    status: number;
  };
  data: JishoEntry[];
}

interface JishoEntry {
  slug: string;
  japanese: Array<{
    word?: string;
    reading: string;
  }>;
  senses: Array<{
    english_definitions: string[];
    parts_of_speech: string[];
    tags: string[];
  }>;
  jlpt?: string[];
  tags?: string[];
}

// 품사 번역 맵
const PARTS_OF_SPEECH_MAP: Record<string, string> = {
  'Noun': '명사',
  'Verb': '동사',
  'I-adjective': '이형용사',
  'Na-adjective': '나형용사',
  'Adverb': '부사',
  'Particle': '조사',
  'Expression': '표현',
  'Godan verb': '오단동사',
  'Ichidan verb': '일단동사',
  'Suru verb': '사변동사',
  'Interjection': '감탄사',
  'Suffix': '접미사',
  'Prefix': '접두사',
  'Counter': '조수사',
  'Copula': '계사',
};

// 품사 번역 함수
function translatePartOfSpeech(pos: string): string {
  return PARTS_OF_SPEECH_MAP[pos] || pos;
}

// JLPT 레벨 추출 함수
function extractJlptLevel(jlpt?: string[]): 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | undefined {
  if (!jlpt || jlpt.length === 0) return undefined;
  
  const level = jlpt[0].replace('jlpt-', '').toUpperCase();
  if (level === 'N5' || level === 'N4' || level === 'N3' || level === 'N2' || level === 'N1') {
    return level;
  }
  return undefined;
}

// Jisho API 엔트리를 DictionaryEntry로 변환
function convertJishoEntry(entry: JishoEntry): DictionaryEntry {
  // 단어와 읽기 추출
  const primaryJapanese = entry.japanese[0];
  const word = primaryJapanese.word || primaryJapanese.reading;
  const reading = primaryJapanese.reading;
  
  // 의미 변환
  const meanings: WordMeaning[] = entry.senses.map((sense) => ({
    partOfSpeech: sense.parts_of_speech.length > 0 
      ? translatePartOfSpeech(sense.parts_of_speech[0])
      : '기타',
    definitions: sense.english_definitions.slice(0, 3), // 최대 3개까지
  }));
  
  // JLPT 레벨
  const jlptLevel = extractJlptLevel(entry.jlpt);
  
  return {
    word,
    reading,
    meanings,
    jlptLevel,
  };
}

/**
 * Jisho.org API를 사용하여 일본어 단어 검색
 * @param query 검색어 (히라가나, 가타카나, 한자, 로마자, 한국어)
 * @param limit 최대 결과 개수 (기본값: 20)
 * @returns 검색 결과 배열
 */
export async function searchJisho(query: string, limit: number = 20): Promise<DictionaryEntry[]> {
  const trimmedQuery = query.trim();
  
  if (!trimmedQuery) {
    return [];
  }
  
  try {
    // Vite 프록시를 통한 Jisho.org API 호출
    const url = `/api/jisho/v1/search/words?keyword=${encodeURIComponent(trimmedQuery)}`;
    
    console.log('🌐 [Jisho API] 요청:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Jisho API 오류: ${response.status} ${response.statusText}`);
    }
    
    const data: JishoApiResponse = await response.json();
    
    console.log('✅ [Jisho API] 응답:', {
      status: data.meta.status,
      resultCount: data.data.length,
    });
    
    // 결과 변환 및 제한
    const results = data.data
      .slice(0, limit)
      .map(convertJishoEntry);
    
    return results;
    
  } catch (error) {
    console.error('❌ [Jisho API] 검색 실패:', error);
    throw error;
  }
}

/**
 * 특정 단어의 상세 정보 검색
 * @param word 일본어 단어 (한자 또는 히라가나)
 * @returns 단어 정보 (없으면 null)
 */
export async function searchWordDetail(word: string): Promise<DictionaryEntry | null> {
  try {
    const results = await searchJisho(word, 1);
    
    if (results.length === 0) {
      return null;
    }
    
    return results[0];
    
  } catch (error) {
    console.error('❌ [Jisho API] 단어 상세 검색 실패:', error);
    return null;
  }
}
