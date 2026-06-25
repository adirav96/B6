import ProtectedRoute from '@/components/ProtectedRoute';
import Simulation from '@/views/Simulation';

export default function SimulationPage() {
  return (
    <ProtectedRoute>
      <Simulation />
    </ProtectedRoute>
  );
}
