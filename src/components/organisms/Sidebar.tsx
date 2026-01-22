import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils/cn';
import { downloadDataAsJSON, importDataFromFile } from '@/features/words/utils/dataExporter';

export interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(function Sidebar({ className }: SidebarProps) {
  const [isImporting, setIsImporting] = useState(false);
  
  async function handleExport() {
    try {
      await downloadDataAsJSON();
      alert('데이터를 성공적으로 내보냈습니다!');
    } catch (error) {
      console.error('내보내기 오류:', error);
      alert('데이터 내보내기에 실패했습니다.');
    }
  }
  
  async function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      setIsImporting(true);
      try {
        const result = await importDataFromFile(file);
        if (result.success) {
          alert(`데이터를 성공적으로 가져왔습니다!\n단어: ${result.wordsCount}개\n그룹: ${result.groupsCount}개`);
        } else {
          alert(`데이터 가져오기 실패: ${result.error}`);
        }
      } catch (error) {
        console.error('가져오기 오류:', error);
        alert('데이터 가져오기에 실패했습니다.');
      } finally {
        setIsImporting(false);
      }
    };
    
    input.click();
  }
  
  const navItems = [
    { to: '/', label: '대시보드' },
    { to: '/search', label: '단어 검색' },
    { to: '/words', label: '내 단어장' },
    { to: '/groups', label: '한자 그룹' },
    { to: '/study', label: '학습 모드' },
  ];
  
  return (
    <aside className={cn('w-[200px] bg-[var(--color-warm-white)] min-h-screen flex flex-col', className)}>
      {/* 로고 */}
      <div className="px-6 py-8 border-b border-[var(--color-dark-charcoal)]">
        <h1 className="text-[var(--font-size-body)] font-medium text-[var(--color-text)] mb-1">
          일본어 단어장
        </h1>
        <p className="text-[var(--font-size-tiny)] text-[var(--color-text-light)] uppercase tracking-wide">
          Kanji Grouping
        </p>
      </div>
      
      {/* 네비게이션 */}
      <nav className="flex-1 py-4">
        <ul className="space-y-0">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  'block px-6 py-3 text-[var(--font-size-small)] text-[var(--color-text-light)] transition-colors',
                  'border-l-[2px] border-transparent',
                  'hover:text-[var(--color-text)] hover:bg-[var(--color-ivory)]',
                  '[&.active]:text-[var(--color-text)] [&.active]:border-l-[2px] [&.active]:border-[var(--color-dark-charcoal)] [&.active]:font-medium [&.active]:bg-[var(--color-ivory)]'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* 데이터 관리 */}
      <div className="border-t border-[var(--color-dark-charcoal)]">
        <h3 className="px-6 py-3 text-[var(--font-size-tiny)] font-medium text-[var(--color-text-lighter)] uppercase tracking-wider">
          데이터 관리
        </h3>
        <div className="space-y-0">
          <button
            onClick={handleExport}
            className="w-full px-6 py-2 text-left text-[var(--font-size-small)] text-[var(--color-text-light)] hover:text-[var(--color-text)] hover:bg-[var(--color-ivory)] transition-colors"
          >
            내보내기
          </button>
          <button
            onClick={handleImport}
            disabled={isImporting}
            className="w-full px-6 py-2 text-left text-[var(--font-size-small)] text-[var(--color-text-light)] hover:text-[var(--color-text)] hover:bg-[var(--color-ivory)] transition-colors disabled:opacity-50"
          >
            {isImporting ? '가져오는 중...' : '가져오기'}
          </button>
        </div>
      </div>
    </aside>
  );
});
