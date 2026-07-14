import ProtectedRoute from '@/components/ProtectedRoute';
import AdminUsers from '@/views/AdminUsers';

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminUsers />
    </ProtectedRoute>
  );
}
