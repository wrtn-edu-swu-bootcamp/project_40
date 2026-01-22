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
    { to: '/', label: '대시보드', icon: '📊' },
    { to: '/search', label: '단어 검색', icon: '🔍' },
    { to: '/words', label: '내 단어장', icon: '📚' },
    { to: '/groups', label: '한자 그룹', icon: '🏷️' },
    { to: '/study', label: '학습 모드', icon: '✏️' },
  ];
  
  return (
    <aside className={cn('w-[220px] bg-[var(--color-gray-tint)] border-r border-[var(--color-border)] p-6 min-h-screen', className)}>
      {/* 로고 */}
      <div className="mb-8 pb-6 border-b border-[var(--color-border)]">
        <h1 className="text-[var(--font-size-h3)] font-semibold text-[var(--color-text)] mb-1">
          일본어 단어장
        </h1>
        <p className="text-[var(--font-size-tiny)] text-[var(--color-text-light)]">
          한자 자동 그룹화
        </p>
      </div>
      
      {/* 네비게이션 */}
      <nav className="mb-8">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-[var(--font-size-body)] text-[var(--color-text-light)] transition-all duration-150',
                  'hover:bg-[var(--color-cream-tint)] hover:text-[var(--color-text)]',
                  '[&.active]:bg-[var(--color-cream-tint)] [&.active]:text-[var(--color-sky-blue)] [&.active]:border-l-[3px] [&.active]:border-[var(--color-sky-blue)] [&.active]:font-semibold [&.active]:pl-[13px]'
                )}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* 데이터 관리 */}
      <div className="border-t border-[var(--color-border)] pt-6 mt-auto">
        <h3 className="text-[var(--font-size-tiny)] font-semibold text-[var(--color-text-light)] mb-3 uppercase tracking-wider">
          데이터 관리
        </h3>
        <div className="space-y-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            className="w-full justify-start text-[var(--font-size-small)]"
          >
            📥 내보내기
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleImport}
            disabled={isImporting}
            className="w-full justify-start text-[var(--font-size-small)]"
          >
            📤 {isImporting ? '가져오는 중...' : '가져오기'}
          </Button>
        </div>
      </div>
    </aside>
  );
});
