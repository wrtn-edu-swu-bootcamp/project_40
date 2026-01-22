import { create } from 'zustand';
import type { NaverDictionaryResult } from '@/lib/api/naverDictionary';

interface SearchState {
  query: string;
  searchResult: NaverDictionaryResult | null;
  selectedKanji: string | null;
  selectedComponents: string[];
  isLoading: boolean;
  error: string | null;

  setQuery: (query: string) => void;
  setSearchResult: (result: NaverDictionaryResult | null) => void;
  selectKanji: (kanji: string | null) => void;
  setSelectedComponents: (components: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  query: '',
  searchResult: null,
  selectedKanji: null,
  selectedComponents: [],
  isLoading: false,
  error: null,
};

export const useSearchStore = create<SearchState>()((set) => ({
  ...initialState,

  setQuery: (query) => set({ query }),
  setSearchResult: (searchResult) => set({ searchResult }),
  selectKanji: (selectedKanji) => set({ selectedKanji }),
  setSelectedComponents: (selectedComponents) => set({ selectedComponents }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
