import ProtectedRoute from '@/components/ProtectedRoute';
import Results from '@/pages/Results';

export default function ResultsPage() {
  return (
    <ProtectedRoute>
      <Results />
    </ProtectedRoute>
  );
}
