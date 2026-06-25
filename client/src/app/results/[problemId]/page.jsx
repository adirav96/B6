import ProtectedRoute from '@/components/ProtectedRoute';
import Results from '@/views/Results';

export default function ResultsPage() {
  return (
    <ProtectedRoute>
      <Results />
    </ProtectedRoute>
  );
}
