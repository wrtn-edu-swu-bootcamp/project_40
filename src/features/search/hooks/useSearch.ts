import { useCallback } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';
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
      // 샘플 데이터에서 검색
      const searchResults = searchDictionary(searchQuery);
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
