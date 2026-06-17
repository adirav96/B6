import ProtectedRoute from '@/components/ProtectedRoute';
import Problems from '@/pages/Problems';

export default function ProblemsPage() {
  return (
    <ProtectedRoute>
      <Problems />
    </ProtectedRoute>
  );
}
