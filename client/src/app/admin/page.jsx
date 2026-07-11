import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import Admin from '@/views/Admin';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminRoute>
        <Admin />
      </AdminRoute>
    </ProtectedRoute>
  );
}