import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { db } from '@/lib/db/schema';
import { addWord, updateWord, deleteWord } from '@/lib/db/queries';
import type { Word, CreateWordInput, StudyStatus } from '@/types/word';
import { generateUUID } from '@/lib/utils/uuid';
import { extractKanji } from '@/features/kanji/utils/kanjiExtractor';

export function useWords() {
  // Dexie React Hooks로 실시간 쿼리
  const words = useLiveQuery(
    () => db.words.orderBy('createdAt').reverse().toArray(),
    []
  );
  
  const createWord = useCallback(async (input: CreateWordInput): Promise<Word> => {
    const now = new Date();
    const kanji = extractKanji(input.word);
    
    const newWord: Word = {
      id: generateUUID(),
      word: input.word,
      reading: input.reading,
      meanings: input.meanings,
      kanji,
      jlptLevel: input.jlptLevel,
      groupIds: [],
      studyStatus: 'new',
      reviewCount: 0,
      correctCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    
    await addWord(newWord);
    return newWord;
  }, []);
  
  const toggleWordStatus = useCallback(async (wordId: string) => {
    const word = await db.words.get(wordId);
    if (!word) return;
    
    const newStatus: StudyStatus = word.studyStatus === 'mastered' ? 'learning' : 'mastered';
    await updateWord(wordId, { studyStatus: newStatus });
  }, []);
  
  const removeWord = useCallback(async (wordId: string) => {
    await deleteWord(wordId);
  }, []);
  
  return {
    words: words || [],
    isLoading: words === undefined,
    createWord,
    toggleWordStatus,
    removeWord,
  };
}
