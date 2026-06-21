import ProtectedRoute from '@/components/ProtectedRoute';
import Progress from '@/pages/Progress';

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <Progress />
    </ProtectedRoute>
  );
}
