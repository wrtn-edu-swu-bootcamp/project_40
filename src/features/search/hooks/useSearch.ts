import { useCallback } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';
import { searchJisho } from '@/lib/api/jisho';
import { searchDictionary } from '@/lib/data/sample-words';

export function useSearch() {
  const { query, results, selectedIndex, isSearching, setQuery, setResults, setSelectedIndex, setIsSearching, clearSearch } = useSearchStore();
  
  const search = useCallback(async (searchQuery: string) => {
    setIsSearching(true);
    setQuery(searchQuery);
    
    // #region agent log
    console.log('🔎 [useSearch] CALLED', {searchQuery, queryLength: searchQuery.length, queryCharCodes: Array.from(searchQuery).map(c=>c.charCodeAt(0)), hypothesisId: 'C,D'});
    // #endregion
    
    try {
      let searchResults;
      
      try {
        // 1차 시도: Jisho.org API에서 검색
        console.log('🌐 [useSearch] Jisho API 사용 중...');
        searchResults = await searchJisho(searchQuery, 30);
        console.log('✅ [useSearch] Jisho API 성공:', searchResults.length, '개 결과');
      } catch (apiError) {
        // 2차 시도: API 실패 시 로컬 샘플 데이터 사용
        console.warn('⚠️ [useSearch] Jisho API 실패, 로컬 데이터 사용:', apiError);
        searchResults = searchDictionary(searchQuery);
        console.log('📂 [useSearch] 로컬 데이터 사용:', searchResults.length, '개 결과');
      }
      
      // #region agent log
      console.log('📊 [useSearch] RESULTS', {searchQuery, resultsCount: searchResults.length, results: searchResults.map(r=>r.word), hypothesisId: 'A,E'});
      // #endregion
      setResults(searchResults);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [setIsSearching, setQuery, setResults]);
  
  const selectedResult = selectedIndex !== null ? results[selectedIndex] : null;
  
  return {
    query,
    results,
    selectedIndex,
    selectedResult,
    isSearching,
    search,
    setSelectedIndex,
    clearSearch,
  };
}
