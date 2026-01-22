import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/words/$wordId')({
  component: WordDetailPage,
});

function WordDetailPage() {
  const { wordId } = Route.useParams();
  
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="pb-6 border-b-[var(--border-base)] border-[var(--color-border)] mb-8">
          <h1 className="text-[var(--font-size-display)] font-semibold text-[var(--color-text)] tracking-tight mb-2">
            단어 상세
          </h1>
          <p className="text-[var(--font-size-body)] text-[var(--color-text-light)]">
            단어 ID: {wordId}
          </p>
        </div>
      </div>
    </div>
  );
}
