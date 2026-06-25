import ProtectedRoute from '@/components/ProtectedRoute';
import Progress from '@/views/Progress';

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <Progress />
    </ProtectedRoute>
  );
}
