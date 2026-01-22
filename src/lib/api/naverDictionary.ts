// Jisho.org API를 사용한 일본어 사전 검색
// 공식 API로 CORS 제한 없음

export interface NaverDictionaryResult {
  word: string; // 清潔
  reading: string; // せいけつ
  meanings: string[]; // ["깨끗함", "청결"]
  examples: {
    japanese: string; // 部屋を清潔に保つ
    korean: string; // 방을 깨끗하게 유지하다
  }[];
}

const JISHO_API_BASE = 'https://jisho.org/api/v1/search/words';

/**
 * Jisho.org API로 일본어 단어 검색
 * @param query 검색할 단어
 * @returns 검색 결과
 */
export async function searchNaverDictionary(
  query: string
): Promise<NaverDictionaryResult | null> {
  if (!query.trim()) {
    return null;
  }

  try {
    const url = `${JISHO_API_BASE}?keyword=${encodeURIComponent(query)}`;

    console.log('🔍 검색 시도:', query);
    console.log('📡 API URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 API 응답:', data);

    // Jisho API 응답 구조 확인
    if (!data || !data.data || data.data.length === 0) {
      console.warn('❌ 검색 결과 없음');
      return null;
    }

    // 첫 번째 검색 결과 사용
    const firstResult = data.data[0];
    console.log('✅ 첫 번째 결과:', firstResult);

    // 단어와 읽기 추출
    const japanese = firstResult.japanese?.[0];
    const word = japanese?.word || query;
    const reading = japanese?.reading || '';

    // 영어 뜻 추출 (한국어가 없으므로 영어로 대체)
    const meanings: string[] = [];
    if (firstResult.senses && firstResult.senses.length > 0) {
      for (const sense of firstResult.senses) {
        if (sense.english_definitions && sense.english_definitions.length > 0) {
          meanings.push(...sense.english_definitions);
        }
      }
    }

    // 예문은 Jisho API에 포함되지 않으므로 빈 배열
    const examples: { japanese: string; korean: string }[] = [];

    const result = {
      word,
      reading,
      meanings: meanings.slice(0, 5), // 최대 5개로 제한
      examples,
    };

    console.log('✨ 최종 결과:', result);
    return result;
  } catch (error) {
    console.error('❌ 사전 검색 중 오류:', error);
    if (error instanceof Error) {
      console.error('오류 상세:', error.message);
    }
    return null;
  }
}

/**
 * 한자만 추출하는 유틸리티 함수
 * @param text 텍스트
 * @returns 한자 배열
 */
export function extractKanji(text: string): string[] {
  const kanjiRegex = /[\u4e00-\u9faf]/g;
  const matches = text.match(kanjiRegex);
  return matches ? Array.from(new Set(matches)) : [];
}
