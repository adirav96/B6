import ProtectedRoute from '@/components/ProtectedRoute';
import InterviewSession from '@/views/InterviewSession';

export default function SessionPage() {
  return (
    <ProtectedRoute>
      <InterviewSession />
    </ProtectedRoute>
  );
}
