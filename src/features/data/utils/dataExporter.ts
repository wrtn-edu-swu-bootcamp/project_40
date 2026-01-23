import { db } from '@/lib/db/schema';
import type { Bookmark } from '@/types/bookmark';
import type { Group } from '@/types/group';

// 전체 데이터 내보내기
export async function exportAllData(): Promise<string> {
  const bookmarks = await db.bookmarks.toArray();
  const groups = await db.groups.toArray();

  const data = {
    version: '2.0',
    exportedAt: new Date().toISOString(),
    bookmarks,
    groups,
  };

  return JSON.stringify(data, null, 2);
}

// JSON 파일로 다운로드
export async function downloadDataAsJSON(): Promise<void> {
  const jsonData = await exportAllData();
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `japanese-kanji-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// JSON 데이터 가져오기
export async function importDataFromJSON(jsonString: string): Promise<{
  success: boolean;
  bookmarksCount: number;
  groupsCount: number;
  error?: string;
}> {
  try {
    const data = JSON.parse(jsonString);

    // 버전 체크
    if (!data.version || !data.bookmarks || !data.groups) {
      throw new Error('올바르지 않은 데이터 형식입니다');
    }

    // 데이터 변환 (Date 객체 복원)
    const bookmarks: Bookmark[] = data.bookmarks.map((b: any) => ({
      ...b,
      createdAt: new Date(b.createdAt),
    }));

    const groups: Group[] = data.groups.map((g: any) => ({
      ...g,
      createdAt: new Date(g.createdAt),
      updatedAt: new Date(g.updatedAt),
    }));

    // 기존 데이터 삭제 옵션 (주석 처리 - 병합 방식)
    // await db.bookmarks.clear();
    // await db.groups.clear();

    // 새 데이터 추가 (중복 체크)
    let bookmarksAdded = 0;
    let groupsAdded = 0;

    for (const bookmark of bookmarks) {
      const existing = await db.bookmarks.get(bookmark.id);
      if (!existing) {
        await db.bookmarks.add(bookmark);
        bookmarksAdded++;
      }
    }

    for (const group of groups) {
      const existing = await db.groups.get(group.id);
      if (!existing) {
        await db.groups.add(group);
        groupsAdded++;
      }
    }

    return {
      success: true,
      bookmarksCount: bookmarksAdded,
      groupsCount: groupsAdded,
    };
  } catch (error) {
    return {
      success: false,
      bookmarksCount: 0,
      groupsCount: 0,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

// 파일에서 가져오기
export async function importDataFromFile(file: File): Promise<{
  success: boolean;
  bookmarksCount: number;
  groupsCount: number;
  error?: string;
}> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const result = await importDataFromJSON(content);
      resolve(result);
    };

    reader.onerror = () => {
      resolve({
        success: false,
        bookmarksCount: 0,
        groupsCount: 0,
        error: '파일 읽기 실패',
      });
    };

    reader.readAsText(file);
  });
}
