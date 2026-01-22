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
  placeholder = '단어를 검색하세요 (히라가나 또는 한자)',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex gap-2', className)}
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit" disabled={!query.trim()}>
        검색
      </Button>
    </form>
  );
});
