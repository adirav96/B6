import ProtectedRoute from '@/components/ProtectedRoute';
import InterviewSession from '@/pages/InterviewSession';

export default function SessionPage() {
  return (
    <ProtectedRoute>
      <InterviewSession />
    </ProtectedRoute>
  );
}
