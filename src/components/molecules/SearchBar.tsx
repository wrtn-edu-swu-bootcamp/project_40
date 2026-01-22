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
      className={cn('flex gap-2 items-center', className)}
    >
      <div className="flex-1 relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-[var(--color-gray-tint)] text-[var(--color-medium-gray)] transition-colors"
          >
            ×
          </button>
        )}
      </div>
      <Button type="submit" disabled={!query.trim()}>
        검색
      </Button>
    </form>
  );
});
