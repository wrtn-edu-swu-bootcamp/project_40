import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/words/$wordId')({
  component: WordDetailPage,
});

function WordDetailPage() {
  const { wordId } = Route.useParams();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-text mb-4">
        단어 상세
      </h1>
      <p className="text-text-light">
        단어 ID: {wordId}
      </p>
    </div>
  );
}
