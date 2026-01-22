import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  // 루트 경로에서 검색 페이지로 리다이렉트
  return <Navigate to="/search" />;
}
