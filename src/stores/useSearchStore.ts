import { create } from 'zustand';
import type { DictionaryEntry } from '@/lib/data/sample-words';

interface SearchState {
  query: string;
  results: DictionaryEntry[];
  selectedIndex: number | null;
  isSearching: boolean;
  
  setQuery: (query: string) => void;
  setResults: (results: DictionaryEntry[]) => void;
  setSelectedIndex: (index: number | null) => void;
  setIsSearching: (isSearching: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: '',
  results: [],
  selectedIndex: null,
  isSearching: false,
  
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results, selectedIndex: results.length > 0 ? 0 : null }),
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
  setIsSearching: (isSearching) => set({ isSearching }),
  clearSearch: () => set({ query: '', results: [], selectedIndex: null, isSearching: false }),
}));
