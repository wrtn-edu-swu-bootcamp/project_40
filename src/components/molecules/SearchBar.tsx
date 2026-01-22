import { memo, useState, type FormEvent } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils/cn';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = memo(function SearchBar({
  onSearch,
  placeholder = '단어를 검색하세요 (한국어, 히라가나, 한자 모두 가능)',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      // #region agent log
      console.log('📝 [SearchBar] SUBMIT', {originalQuery: query, trimmedQuery: query.trim(), hypothesisId: 'C'});
      // #endregion
      onSearch(query.trim());
    }
  }
  
  function handleClear() {
    setQuery('');
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex items-center border-b border-[var(--color-dark-charcoal)]', className)}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 py-3 px-0 bg-transparent border-none text-[var(--font-size-body)] text-[var(--color-text)] placeholder:text-[var(--color-text-lighter)] focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-1 text-[var(--font-size-small)] text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors"
        >
          지우기
        </button>
      )}
      <button
        type="submit"
        disabled={!query.trim()}
        className="px-4 py-1 text-[var(--font-size-small)] text-[var(--color-text)] hover:text-[var(--color-sky-blue)] transition-colors disabled:opacity-30"
      >
        검색
      </button>
    </form>
  );
});
