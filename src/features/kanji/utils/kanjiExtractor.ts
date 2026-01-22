// 한자 유니코드 범위: U+4E00 ~ U+9FAF
const KANJI_REGEX = /[\u4e00-\u9faf]/g;

// 단어에서 한자 추출
export function extractKanji(text: string): string[] {
  const matches = text.match(KANJI_REGEX);
  if (!matches) return [];
  
  // 중복 제거 및 배열 반환
  return [...new Set(matches)];
}

// 여러 단어에서 한자 추출 (중복 제거)
export function extractKanjiFromWords(words: string[]): string[] {
  const allKanji = words.flatMap((word) => extractKanji(word));
  return [...new Set(allKanji)];
}

// 한자인지 확인
export function isKanji(char: string): boolean {
  return KANJI_REGEX.test(char);
}

// 히라가나인지 확인 (U+3040 ~ U+309F)
export function isHiragana(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x3040 && code <= 0x309f;
}

// 가타카나인지 확인 (U+30A0 ~ U+30FF)
export function isKatakana(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x30a0 && code <= 0x30ff;
}

// 문자열에 한자가 포함되어 있는지 확인
export function containsKanji(text: string): boolean {
  return KANJI_REGEX.test(text);
}
