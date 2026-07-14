import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/views/Dashboard';

export default function DashboardPage() {
  return (
    <ProtectedRoute blockAdmin>
      <Dashboard />
    </ProtectedRoute>
  );
}
