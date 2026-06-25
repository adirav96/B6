import ProtectedRoute from '@/components/ProtectedRoute';
import Problems from '@/views/Problems';

export default function ProblemsPage() {
  return (
    <ProtectedRoute>
      <Problems />
    </ProtectedRoute>
  );
}
